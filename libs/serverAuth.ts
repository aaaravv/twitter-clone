import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  // User is not logged in
  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  // Find this user in the database
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  // User isn't in the database
  if (!currentUser) {
    throw new Error("Not signed in");
  }

  return { currentUser };
};

export default serverAuth;
