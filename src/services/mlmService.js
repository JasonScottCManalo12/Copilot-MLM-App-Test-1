const { prisma } = require('./lib/prisma');

async function getPlans() {
  return prisma.plan.findMany({ orderBy: { createdAt: 'asc' } });
}

async function getMembers() {
  return prisma.user.findMany({
    orderBy: { createdAt: 'asc' },
    include: { sponsor: true, plan: true },
  });
}

async function getProducts() {
  return prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: 'asc' },
  });
}

async function getOrders() {
  return prisma.order.findMany({
    include: { user: true, product: true },
    orderBy: { createdAt: 'asc' },
  });
}

async function getSummary() {
  const [totalMembers, activeMembers, totalProducts, totalSales] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { status: 'ACTIVE' } }),
    prisma.product.count({ where: { active: true } }),
    prisma.order.aggregate({
      _sum: { total: true },
    }),
  ]);

  const activePlan = await prisma.plan.findFirst({ where: { status: 'active' } });

  return {
    totalMembers,
    activeMembers,
    pausedMembers: totalMembers - activeMembers,
    totalProducts,
    totalSales: Number(totalSales._sum.total || 0),
    activePlan,
    generatedAt: new Date().toISOString(),
  };
}

async function buildDownlineTree(memberId) {
  const directChildren = await prisma.user.findMany({
    where: { sponsorId: memberId },
    include: { sponsor: true },
  });

  const children = [];
  for (const child of directChildren) {
    children.push({
      ...child,
      children: await buildDownlineTree(child.id),
    });
  }

  return children;
}

async function getTree(memberId) {
  const member = await prisma.user.findUnique({
    where: { id: memberId },
    include: { sponsor: true },
  });

  if (!member) {
    throw new Error('Member not found');
  }

  return {
    ...member,
    children: await buildDownlineTree(member.id),
  };
}

async function getCommissionSummary(memberId) {
  const member = await prisma.user.findUnique({
    where: { id: memberId },
    include: { plan: true },
  });

  if (!member) {
    throw new Error('Member not found');
  }

  const rows = await prisma.commission.findMany({
    where: { userId: memberId },
    include: { order: true, plan: true },
  });

  const totalCommission = rows.reduce((sum, row) => sum + Number(row.amount), 0);

  return {
    memberId,
    memberName: `${member.firstName} ${member.lastName}`,
    planName: member.plan?.name || 'No plan',
    totalCommission,
    rows,
  };
}

module.exports = {
  getPlans,
  getMembers,
  getProducts,
  getOrders,
  getSummary,
  getTree,
  getCommissionSummary,
};
