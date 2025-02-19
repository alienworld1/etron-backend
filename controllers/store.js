const { PrismaClient } = require('@prisma/client');
const asyncHandler = require('express-async-handler');
const ethers = require('ethers');

const { provider, nftContract } = require('../utils/web3');

const prisma = new PrismaClient();

const purchasePost = asyncHandler(async (req, res, next) => {
  const { nftId, fromUserId: buyerId } = req.body;

  const buyer = await prisma.user.findUnique({
    where: {
      id: buyerId,
    },
  });

  if (!buyer) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  const nft = await prisma.nFT.findUnique({
    where: {
      id: nftId,
    },
  });

  if (!nft) {
    return res.status(404).json({
      success: false,
      message: 'NFT not found',
    });
  }

  const priceInETH = ethers.parseEther(nft.price);

  const buyerWalletBalance = await provider.getBalance(buyer.walletAddress);

  if (priceInETH > buyerWalletBalance) {
    return res.status(400).json({
      success: false,
      message: 'Insufficient balance',
    });
  }

  const transaction = await nftContract.mint(buyer.walletAddress);
  await transaction.wait();

  const order = await prisma.order.create({
    data: {
      price: nft.price,
      buyer: {
        connect: {
          id: buyerId,
        },
      },
      nft: {
        connect: {
          id: nftId,
        },
      },
      status: 'completed',
      transactionHash: transaction.hash,
    },
  });

  await Promise.all([
    prisma.transaction.create({
      data: {
        amount: nft.price,
        fromAddress: buyer.walletAddress,
        toAddress: process.env.WALLET_ADDRESS,
        order: {
          connect: {
            id: order.id,
          },
        },
        transactionHash: transaction.hash,
        transactionSuccessful: true,
      },
    }),
    prisma.nFT.update({
      where: {
        id: nftId,
      },
      data: {
        minted: true,
      },
    }),
  ]);

  return res.json({ success: true, message: 'NFT minted successfully', order });
});

const ordersGet = asyncHandler(async (req, res) => {
  const orders = await prisma.order.findMany();
  return res.json(orders);
});

module.exports = {
  purchasePost,
  ordersGet,
};
