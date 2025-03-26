import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { updated: "desc" },
      include: { category: true }, 
    });
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req) {
  try {
    const { title, quantity, price, category } = await req.json();

    console.log(title, quantity, price, category);

    // Validate required fields
    if (!title || quantity === undefined || price === undefined || !category) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: title, quantity, price, and category are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

   

    console.log("Catid", category);

    

    // Validate quantity and price are valid numbers
    const parsedQuantity = parseInt(quantity);
    const parsedPrice = parseFloat(price);

    if (isNaN(parsedQuantity) || isNaN(parsedPrice)) {
      return new Response(
        JSON.stringify({ error: "Quantity and price must be valid numbers" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const createdProduct = await prisma.product.create({
      data: {
        title: title,
        quantity: parsedQuantity,
        price: parsedPrice,
        categoryId: category,
      },
    });

    console.log(createdProduct);

    return new Response(JSON.stringify(createdProduct), {
      status: 201, // 201 Created is more appropriate for resource creation
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return new Response(JSON.stringify({ error: "Failed to create product" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    await prisma.$disconnect();
  }
}
