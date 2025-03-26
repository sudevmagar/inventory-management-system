const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  await prisma.product.createMany({
    data: [
      { title: "Product 1", category: "Category 1", quantity: 500, price: 1000 },
      { title: "Product 2", category: "Category 2", quantity: 368, price: 434 },
    ],
  });

  await prisma.category.createMany({
    data: [
      { title: "Category 1", description: "First category" },
      { title: "Category 2", description: "Second category" },
    ],
  });

  console.log("Seeded data successfully");
}

seed()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());