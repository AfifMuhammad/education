import { PrismaClient } from "@prisma/client";
import admins from "./admin.json";

const prisma = new PrismaClient();
async function main() {
  admins.forEach(async (admin) => {
    await prisma.user.upsert({
      where: { id: admin.id },
      update: {},
      create: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        emailVerified: new Date(admin.emailVerified),
        password: admin.password,
        createdAt: new Date(admin.createdAt),
        updatedAt: new Date(admin.updatedAt),
      },
    });
  });

  console.log("seed success");
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
