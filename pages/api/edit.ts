import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).end();
  }
  try {
    //FIXME: se presenta un error por algun motivo no explicado  no lee la sesion
    //razon por la cual se envia el id por la peticion
    //const { currentUser } = await serverAuth(req);

    const { id, name, username, bio, profileImage, coverImage } = req.body;

    if (!name || !username) {
      throw new Error("Missing fields");
    }

    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return res.status(200).json(updateUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
