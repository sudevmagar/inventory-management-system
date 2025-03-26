import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // get all products
    const products = await prisma.product.findMany({
      orderBy: { updated: "desc" },
    });

    // get all categories
    const categories = await prisma.category.findMany({
      orderBy: { updated: "desc" },
    });

    const totalProducts = products.length;
    const totalCategories = categories.length;

    // Get total quantity using sum aggregation
    const quantityResult = await prisma.product.aggregate({
      _sum: {
        quantity: true,
      },
    });

    const totalQuantity = quantityResult._sum.quantity || 0;

    const totalPrice = products.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);

    console.log("data: ", totalProducts, totalPrice, totalQuantity, totalCategories);

    // Return all statistics in the response
    return NextResponse.json({
      totalProducts,
      totalCategories,
      totalQuantity,
      totalPrice,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard statistics" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}