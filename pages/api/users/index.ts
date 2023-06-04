import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const users = prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
}
