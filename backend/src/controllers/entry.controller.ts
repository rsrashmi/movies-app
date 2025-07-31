import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { entrySchema } from "../schemas/entry.schema";
import { Prisma } from "@prisma/client";

export const createEntry = async (req: Request, res: Response) => {
  try {
    const result = entrySchema.parse(req.body);

    const entry = await prisma.entry.create({
      data: {
        title: result.title,
        type: result.type,
        director: result.director,
        budget: result.budget,
        location: result.location,
        duration: result.duration,
        yearTime: result.yearTime,
        poster: result.poster || null,
        userId: req.user.id,
      } as Prisma.EntryUncheckedCreateInput,
    });

    res.status(201).json(entry);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid entry", error: err });
  }
};

export const getEntriesPaginated = async (req: any, res: Response) => {
  const { page = 1, limit = 10, search = "", type = "" } = req.query;

  const filters: any = {
    userId: req.user.id,
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { director: { contains: search, mode: "insensitive" } },
      ],
    }),
    ...(type && { type }),
  };

  const entries = await prisma.entry.findMany({
    where: filters,
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy: { createdAt: "desc" },
  });

  res.json(entries);
};

export const updateEntry = async (req: any, res: Response) => {
  const { id } = req.params;

  const updated = await prisma.entry.update({
    where: { id: parseInt(id), userId: req.user.id },
    data: req.body,
  });

  res.json(updated);
};

export const deleteEntry = async (req: any, res: Response) => {
  const { id } = req.params;
  await prisma.entry.delete({
    where: { id: parseInt(id), userId: req.user.id },
  });
  res.json({ message: "Entry deleted" });
};
