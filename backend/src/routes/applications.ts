import prisma from "../lib/prisma";
import { Router } from "express";
import { Prisma } from "../generated/prisma/client";

const router = Router();

// GET /applications
router.get("/", async (req, res) => {
  try {
    const applications = await prisma.applications.findMany();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /applications/:id
router.get("/:id", async (req, res) => {
  try {
    const application = await prisma.applications.findUnique({
      where: { id: req.params.id },
    });

    if (!application) {
      res.status(404).json({ error: "Application not found" });
      return;
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /applications
router.post("/", async (req, res) => {
  try {
    const application = await prisma.applications.create({
      data: req.body,
    });

    res.status(201).json({ data: application });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// PATCH /applications/:id
router.patch("/:id", async (req, res) => {
  try {
    const application = await prisma.applications.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(application);
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
    res.json({ data: application });
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
