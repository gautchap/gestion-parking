import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const places = new Array(30).fill(0).map((_, i) => {
  return { id: i + 1 };
});

async function main() {
  await prisma.parking.create({
    data: {
      places: {
        create: places,
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
