const { PrismaClient } = require('@prisma/client');
const asyncHandler = require('express-async-handler');

const prisma = new PrismaClient();

const nftsGet = asyncHandler(async (req, res) => {
  const nfts = await prisma.nFT.findMany();
  return res.json(nfts);
});

const nftGet = asyncHandler(async (req, res, next) => {
  const id = req.params.id ?? '';
  const nft = await prisma.nFT.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return res.json(nft);
});

module.exports = {
  nftsGet,
  nftGet,
};
