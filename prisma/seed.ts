import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.product.deleteMany();

  const products = [
    {
      name: "Red Velvet Cake",
      description: "Rich, moist red velvet cake with cream cheese frosting",
      category: "cakes",
      price: 1000,
      available: true,
      sortOrder: 1,
    },
    {
      name: "Chocolate Cake",
      description: "Decadent chocolate cake with chocolate ganache",
      category: "cakes",
      price: 1000,
      available: true,
      sortOrder: 2,
    },
    {
      name: "Vanilla Cake",
      description: "Classic vanilla sponge cake with vanilla buttercream",
      category: "cakes",
      price: 1000,
      available: true,
      sortOrder: 3,
    },
    {
      name: "Stir-Fry Spaghetti",
      description: "Flavorful stir-fried spaghetti with vegetables and seasoning",
      category: "food",
      price: 1800,
      available: true,
      sortOrder: 4,
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log("Seeded 4 products");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
