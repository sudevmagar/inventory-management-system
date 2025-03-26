import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(req, { params }) {
  const { id } = await params;
  console.log(id);
  try {
    const categoryDetail = await prisma.category.findUnique({
      where: {
        id: id,
      },
    });

    console.log("category", categoryDetail);

    if (categoryDetail) {
      return new Response(JSON.stringify(categoryDetail), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error finding category data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch category data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const { title, description } = await req.json();

    console.log(id);

    const categoryDetail = await prisma.category.findUnique({
      where: { id },
    });

    if (!categoryDetail) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
  
    const updatedCategory= await prisma.category.update({
      where: { id },
      data: {
        title: title,
        description: description
      },
    });

    console.log(updatedCategory);

    return new Response(JSON.stringify(updatedCategory), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update category" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  console.log(`Attempting to delete category with ID: ${id}`);

  try {
    // First check if the product exists
    const existingCategory = await prisma.category.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingCategory) {
      return new Response(JSON.stringify({ error: "Category not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Delete the product
    const deletedCategory = await prisma.category.delete({
      where: {
        id: id,
      },
    });

    console.log("Deleted product:", deletedCategory);

    return new Response(
      JSON.stringify({
        message: "Category deleted successfully",
        deletedCategory,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error deleting category:", error);
    return new Response(JSON.stringify({ error: "Failed to delete category" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

