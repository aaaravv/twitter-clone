import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });

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
