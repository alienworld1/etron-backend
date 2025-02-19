const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.sprite.create({
    data: {
      name: 'Master Chief',
      description: 'Master Chief',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/4/42/Master_chief_halo_infinite.png/220px-Master_chief_halo_infinite.png',
    },
  });
}
