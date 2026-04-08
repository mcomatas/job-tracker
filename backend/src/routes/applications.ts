import prisma from "../lib/prisma";
import { Router } from "express";

const router = Router();

// GET /applications
router.get("/", async (req, res) => {
  const applications = await prisma.applications.findMany();
  res.json(applications);
});

// GET /applications/:id
router.get("/:id", async (req, res) => {
  const application = await prisma.applications.findUnique({
    where: { id: req.params.id },
  });
  res.json(application);
});

// POST /applications
router.post("/", async (req, res) => {
  const application = await prisma.applications.create({
    data: req.body,
  });
  res.json({ data: application });
});

// PATCH /applications/:id
router.patch("/:id", async (req, res) => {
  const application = await prisma.applications.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json(application);
});

// DELETE /applications/:id
router.delete("/:id", async (req, res) => {
  const application = await prisma.applications.delete({
    where: { id: req.params.id },
  });
  res.json({ data: application });
});

export default router;
