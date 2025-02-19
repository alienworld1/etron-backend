const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// TODO: Dynamically generate Metadata URIs for the database
async function main() {
  await prisma.nFT.create({
    data: {
      name: 'NFT 1',
      price: 0.01,
      description: 'A very cool NFT',
      imageUrl:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      metadataUrl: 'https://example.com/metadata/1',
    },
  });

  await prisma.nFT.create({
    data: {
      name: 'NFT 2',
      price: 0.02,
      description: 'Another cool NFT',
      imageUrl:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      metadataUrl: 'https://example.com/metadata/1',
    },
  });

  await prisma.nFT.create({
    data: {
      name: 'NFT 3',
      price: 0.03,
      description: 'Yet another cool NFT',
      imageUrl:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      metadataUrl: 'https://example.com/metadata/1',
    },
  });
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
