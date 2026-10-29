const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { prisma } = require('./src/lib/prisma');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    app: 'Copilot MLM App Test 1',
    stack: 'Node.js + Express + PostgreSQL + Prisma',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/plans', async (_req, res) => {
  const plans = await prisma.plan.findMany({ orderBy: { createdAt: 'asc' } });
  res.json(plans);
});

app.get('/api/members', async (_req, res) => {
  const members = await prisma.user.findMany({
    orderBy: { createdAt: 'asc' },
    include: { sponsor: true, plan: true },
  });
  res.json(members);
});

app.get('/api/products', async (_req, res) => {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: 'asc' },
  });
  res.json(products);
});

app.get('/api/orders', async (_req, res) => {
  const orders = await prisma.order.findMany({
    include: { user: true, product: true },
    orderBy: { createdAt: 'asc' },
  });
  res.json(orders);
});

app.get('/api/summary', async (_req, res) => {
  const [totalMembers, activeMembers, totalProducts, totalSales] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { status: 'ACTIVE' } }),
    prisma.product.count({ where: { active: true } }),
    prisma.order.aggregate({
      _sum: { total: true },
    }),
  ]);

  const activePlan = await prisma.plan.findFirst({ where: { status: 'active' } });

  res.json({
    totalMembers,
    activeMembers,
    pausedMembers: totalMembers - activeMembers,
    totalProducts,
    totalSales: Number(totalSales._sum.total || 0),
    activePlan,
    generatedAt: new Date().toISOString(),
  });
});

app.get('/api/tree/:memberId', async (req, res) => {
  const memberId = req.params.memberId;
  const member = await prisma.user.findUnique({
    where: { id: memberId },
    include: { sponsor: true, downline: true },
  });

  if (!member) {
    return res.status(404).json({ error: 'Member not found' });
  }

  const tree = {
    ...member,
    children: await buildDownlineTree(member.id),
  };

  res.json(tree);
});

app.get('/api/commissions/:memberId', async (req, res) => {
  const memberId = req.params.memberId;

  const member = await prisma.user.findUnique({
    where: { id: memberId },
    include: { plan: true },
  });

  if (!member) {
    return res.status(404).json({ error: 'Member not found' });
  }

  const commissionRows = await prisma.commission.findMany({
    where: { userId: memberId },
    include: { order: true, plan: true },
  });

  const totalCommission = commissionRows.reduce((sum, row) => sum + Number(row.amount), 0);

  res.json({
    memberId,
    memberName: `${member.firstName} ${member.lastName}`,
    planName: member.plan?.name || 'No plan',
    totalCommission,
    rows: commissionRows,
  });
});

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

app.listen(PORT, () => {
  console.log(`MLM app running on http://localhost:${PORT}`);
});
