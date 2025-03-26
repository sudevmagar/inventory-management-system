const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.product.deleteMany();
    console.log("Cleared all products");
    await prisma.category.deleteMany();
    console.log("Cleared all categories");

    const categories = await prisma.category.createMany({
      data: [
        {
          title: "Electronics",
          description: "Gadgets and devices",
          updated: new Date(),
        },
        {
          title: "Clothing",
          description: "Apparel and accessories",
          updated: new Date(),
        },
        {
          title: "Books",
          description: "Literature and educational materials",
          updated: new Date(),
        },
      ],
    });
    console.log("Seeded categories:", categories.count);

    const electronics = await prisma.category.findFirst({
      where: { title: "Electronics" },
    });
    const clothing = await prisma.category.findFirst({
      where: { title: "Clothing" },
    });
    const books = await prisma.category.findFirst({
      where: { title: "Books" },
    });

    const products = await prisma.product.createMany({
      data: [
        {
          title: "Smartphone",
          categoryId: electronics.id,
          quantity: 50,
          price: 599.99,
          updated: new Date(),
        },
        {
          title: "Laptop",
          categoryId: electronics.id,
          quantity: 30,
          price: 1299.99,
          updated: new Date(),
        },
        {
          title: "T-Shirt",
          categoryId: clothing.id,
          quantity: 100,
          price: 19.99,
          updated: new Date(),
        },
        {
          title: "Jeans",
          categoryId: clothing.id,
          quantity: 80,
          price: 49.99,
          updated: new Date(),
        },
        {
          title: "Programming Book",
          categoryId: books.id,
          quantity: 25,
          price: 39.99,
          updated: new Date(),
        },
        {
          title: "Novel",
          categoryId: books.id,
          quantity: 60,
          price: 14.99,
          updated: new Date(),
        },
      ],
    });
    console.log("Seeded products:", products.count);

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();