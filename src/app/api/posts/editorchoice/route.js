import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// GET SINGLE POST
export const GET = async (req) => {
  
    try {
      const posts  = await prisma.post.findMany({take:3, where: {editor: true}});
      return new NextResponse(JSON.stringify( posts , { status: 200 }));
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!"+err }, { status: 500 })
      );
    }
  };