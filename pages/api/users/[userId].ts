import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== "string")
      throw new Error("Invalid user id");

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // for each user, count if this userId is in their followingIds array
    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    res.status(200).json({
      ...existingUser,
      followersCount,
    });
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
}
