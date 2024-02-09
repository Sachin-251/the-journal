import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();

    return new NextResponse(JSON.stringify(categories, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const {slug, title, img} = await req.json();
    const existance = await prisma.category.count(
      {
        where: {slug: slug},
      }
    );

    if(existance > 0){
      return NextResponse.json(
        { message: "Already Exist"} , {status: 402 }
      );
    }

    const category = await prisma.category.create({
      data: { slug, title, img },
    });

    return new NextResponse(JSON.stringify(category, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
}