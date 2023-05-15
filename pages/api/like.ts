import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const { postId, currentUserId } = req.body;

    
    //problemas con serverAuth
    //const { currentUser } = await serverAuth(req);
    const currentUser = await prisma.user.findUnique({
      where: {
        id: currentUserId,
      },
    });

    if (!currentUser) {
      throw new Error("Not signed in");
    }

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Invalid ID");
    }

    let updatedLikeIds = [...(post.likedIds || [])];

    if (req.method === "POST") {
      updatedLikeIds.push(currentUser.id);
    }

    if (req.method === "DELETE") {
      updatedLikeIds = updatedLikeIds.filter(
        (likeId) => likeId !== currentUser.id
      );
    }

    const updatePost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikeIds,
      },
    });

    res.status(200).json(updatePost);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
