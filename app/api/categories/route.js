import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { updated: "desc" },
    });
    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch categories" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req) {
  try {
    const { title, description } = await req.json();

    console.log(title, description);

    // Validate required fields
    if (!title || !description) {
      return new Response(
        JSON.stringify({
          error:
            "Missing required fields: title, and description are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const createdCategory = await prisma.category.create({
      data: {
        title: title,
        description: description,
      },
    });

    console.log(createdCategory);

    return new Response(JSON.stringify(createdCategory), {
      status: 201, // 201 Created is more appropriate for resource creation
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return new Response(JSON.stringify({ error: "Failed to create category" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    await prisma.$disconnect();
  }
}
