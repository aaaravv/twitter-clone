import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * @name handler
 * @description
 * This is the API route that returns the current user.
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 * @returns {Promise<NextApiResponse>} // currentUser
 *
 **/

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const currentUser = await serverAuth(req);

    return res.status(200).json(currentUser);
  } catch (error) {
    console.error(error);
    return res.status(400).end();
  }
}
