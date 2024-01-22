import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    try {
        const post = await prisma.post.findFirst({
            where: {
                id: postId,
            },
        });
        // console.log(post.userEmail);
        const posts = await prisma.post.findMany({
            where: {
                userEmail: post.userEmail,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })
        return new NextResponse(JSON.stringify(posts, { status: 200 }));
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
        );
    }
}