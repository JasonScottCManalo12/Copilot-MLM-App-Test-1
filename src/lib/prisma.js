const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const planCount = await prisma.plan.count();
  if (planCount > 0) {
    console.log('Seed already exists; skipping.');
    return;
  }

  const plans = await prisma.plan.createMany({
    data: [
      {
        name: 'Sponsor Plus',
        type: 'SPONSOR_TREE',
        status: 'active',
        description: 'Product-based sponsor tree with direct retail and team volume bonuses.',
        config: {
          retailCommissionRate: 0.1,
          teamVolumeBonusRate: 0.04,
          monthlyQualificationPv: 50,
          monthlyQualificationRetailSales: 150,
          maxDepth: 6,
          maxWidth: 8,
        },
      },
      {
        name: 'Matrix Growth',
        type: 'MATRIX',
        status: 'draft',
        description: 'Structured matrix plan for future expansion and plan switching.',
        config: {
          retailCommissionRate: 0.09,
          teamVolumeBonusRate: 0.03,
          monthlyQualificationPv: 75,
          monthlyQualificationRetailSales: 200,
          matrixWidth: 3,
          matrixDepth: 3,
        },
      },
    ],
  });

  const sponsorPlan = await prisma.plan.findFirst({ where: { type: 'SPONSOR_TREE' } });

  const root = await prisma.user.create({
    data: {
      firstName: 'Alice',
      lastName: 'Nguyen',
      email: 'alice@company.test',
      status: 'ACTIVE',
      rank: 'founder',
      city: 'Manila',
      country: 'PH',
      planId: sponsorPlan.id,
    },
  });

  const members = [
    { firstName: 'Bob', lastName: 'Jones', email: 'bob@company.test', sponsorId: root.id, status: 'ACTIVE', rank: 'consultant', city: 'Cebu', country: 'PH', planId: sponsorPlan.id },
    { firstName: 'Cora', lastName: 'Smith', email: 'cora@company.test', sponsorId: root.id, status: 'ACTIVE', rank: 'consultant', city: 'Davao', country: 'PH', planId: sponsorPlan.id },
    { firstName: 'Derek', lastName: 'Lee', email: 'derek@company.test', sponsorId: root.id, status: 'ACTIVE', rank: 'senior', city: 'Bacolod', country: 'PH', planId: sponsorPlan.id },
    { firstName: 'Ella', lastName: 'Brown', email: 'ella@company.test', sponsorId: root.id, status: 'ACTIVE', rank: 'consultant', city: 'Iloilo', country: 'PH', planId: sponsorPlan.id },
  ];

  const createdMembers = [];
  for (const member of members) {
    const created = await prisma.user.create({ data: member });
    createdMembers.push(created);
  }

  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Wellness Starter Pack',
        sku: 'WELL-START',
        price: 129.00,
        pv: 25,
        bv: 20,
        commissionRate: 0.1,
        active: true,
      },
      {
        name: 'Daily Vitality Kit',
        sku: 'VITAL-KIT',
        price: 249.00,
        pv: 45,
        bv: 40,
        commissionRate: 0.12,
        active: true,
      },
      {
        name: 'Signature Bundle',
        sku: 'SIGN-BUNDLE',
        price: 399.00,
        pv: 75,
        bv: 65,
        commissionRate: 0.15,
        active: true,
      },
    ],
  });

  const starterPack = await prisma.product.findUnique({ where: { sku: 'WELL-START' } });
  const vitalityKit = await prisma.product.findUnique({ where: { sku: 'VITAL-KIT' } });

  const orders = [
    { userId: root.id, productId: starterPack.id, quantity: 2, total: 258.00, isRetail: true },
    { userId: createdMembers[0].id, productId: vitalityKit.id, quantity: 1, total: 249.00, isRetail: true },
    { userId: createdMembers[1].id, productId: starterPack.id, quantity: 3, total: 387.00, isRetail: true },
    { userId: createdMembers[2].id, productId: vitalityKit.id, quantity: 1, total: 249.00, isRetail: true },
  ];

  for (const order of orders) {
    await prisma.order.create({
      data: {
        userId: order.userId,
        productId: order.productId,
        quantity: order.quantity,
        total: order.total,
        isRetail: order.isRetail,
      },
    });
  }

  console.log('Seed data created successfully.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
