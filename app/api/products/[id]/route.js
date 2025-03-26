import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(req, { params }) {
  const { id } = await params;
  console.log(id);
  try {
    const productDetail = await prisma.product.findUnique({
        where: {
          id: id,
        },
      });
    console.log("product",productDetail)

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

// export async function PUT(req, { params }) {
//   try {
//     const { id } = await params;
//     const data = await req.json();

//     console.log(data);

//     const productDetail = await Prisma.product.findUnique({
//       where: { id },
//     });

//     if (!productDetail) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     //   const updatedProduct = await prisma.product.update({
//     //     where: { id },
//     //     data: { status },
//     //   });

//     return NextResponse.json({});
//   } catch (error) {
//     console.error("Error updating product:", error);
//     if (error.code === "P2025") {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }
//     return NextResponse.json(
//       { error: "Failed to update product", details: error.message },
//       { status: 500 }
//     );
//   }
// }
