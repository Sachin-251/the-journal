import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// GET SINGLE POST
export const GET = async (req) => {
  
    try {
      const post = await prisma.post.findFirst({
        where: {featured: true},
      });
  
      return new NextResponse(JSON.stringify(post, { status: 200 }));
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
      );
    }
  };