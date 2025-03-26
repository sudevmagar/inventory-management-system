import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(req, { params }) {
  const { id } = await params;
  console.log(id);
  try {
    const productDetail = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: { category: true },
    });

    console.log("product", productDetail);

    if (productDetail) {
      console.log(productDetail);
      return new Response(JSON.stringify(productDetail), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error finding product data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch product data" }),
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
    const { title, quantity, price, category } = await req.json();

    console.log(id);

    const productDetail = await prisma.product.findUnique({
      where: { id },
    });

    if (!productDetail) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    const productCategoryId = await prisma.category.findUnique({
      where: { title: category },
    });

    console.log("Catid", productCategoryId);

    const parsedQuantity = parseInt(quantity);
    const parsedPrice = parseFloat(price);
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        title: title,
        quantity: parsedQuantity,
        price: parsedPrice,
        categoryId: productCategoryId.id,
      },
    });

    console.log(updatedProduct);

    return new Response(JSON.stringify(updatedProduct), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update products" }),
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

  console.log(`Attempting to delete product with ID: ${id}`);

  try {
    // First check if the product exists
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingProduct) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Delete the product
    const deletedProduct = await prisma.product.delete({
      where: {
        id: id,
      },
    });

    console.log("Deleted product:", deletedProduct);

    return new Response(
      JSON.stringify({
        message: "Product deleted successfully",
        deletedProduct,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return new Response(JSON.stringify({ error: "Failed to delete product" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

