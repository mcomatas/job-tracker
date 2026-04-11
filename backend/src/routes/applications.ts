import prisma from "../lib/prisma";
import { Router } from "express";
import { Prisma } from "../generated/prisma/client";
import { z } from "zod";
import { publishStatusChange } from "../services/queue";

const router = Router();

const ApplicationStatus = z.enum([
  "applied",
  "screening",
  "interview",
  "offer",
  "rejected",
  "followedUp",
  "takeHome",
  "rejectedAfterInterview",
  "expired",
  "saved",
]);

export const createApplicationSchema = z.object({
  company: z.string(),
  role: z.string(),
  status: ApplicationStatus,
  location: z.string(),
  appliedDate: z.string().datetime(),
  jobUrl: z.string().optional(),
  salaryRange: z.string().optional(),
  notes: z.string().optional(),
});

export const updateApplicationSchema = createApplicationSchema.partial();

// GET /applications
router.get("/", async (req, res) => {
  try {
    const applications = await prisma.applications.findMany();
    res.status(200).json({ data: applications });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /applications/:id
router.get("/:id", async (req, res) => {
  try {
    const application = await prisma.applications.findUnique({
      where: { id: req.params.id },
      include: { statusEvents: { orderBy: { createdAt: "asc" } } },
    });

    if (!application) {
      res.status(404).json({ error: "Application not found" });
      return;
    }

    res.status(200).json({ data: application });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /applications
router.post("/", async (req, res) => {
  try {
    const result = createApplicationSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ error: result.error.issues });
      return;
    }

    const application = await prisma.applications.create({
      data: result.data,
    });

    res.status(201).json({ data: application });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// PATCH /applications/:id
router.patch("/:id", async (req, res) => {
  try {
    const result = updateApplicationSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ error: result.error.issues });
      return;
    }

    const application = await prisma.applications.findUnique({
      where: { id: req.params.id },
    });
    if (!application) {
      res.status(404).json({ error: "Application not found" });
      return;
    }
    const fromStatus = application.status;

    const updatedApplication = await prisma.applications.update({
      where: { id: req.params.id },
      data: result.data,
    });

    // Publish status change only if status is in the update AND
    // the status is not the same the old status
    if (result.data.status && result.data.status !== fromStatus) {
      await publishStatusChange(
        updatedApplication.id,
        fromStatus,
        updatedApplication.status,
      );
    }

    res.status(200).json({ data: updatedApplication });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code == "P2025"
    ) {
      res.status(404).json({ error: "Application not found" });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /applications/:id
router.delete("/:id", async (req, res) => {
  try {
    const application = await prisma.applications.delete({
      where: { id: req.params.id },
    });
    res.status(200).json({ data: application });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code == "P2025"
    ) {
      res.status(404).json({ error: "Application not found" });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
