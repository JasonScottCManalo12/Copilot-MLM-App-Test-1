const express = require('express');
const cors = require('cors');
const { prisma } = require('./lib/prisma');
const {
  getPlans,
  getMembers,
  getProducts,
  getOrders,
  getSummary,
  getTree,
  getCommissionSummary,
} = require('./services/mlmService');

const app = express();

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
  try {
    const plans = await getPlans();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/members', async (_req, res) => {
  try {
    const members = await getMembers();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products', async (_req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders', async (_req, res) => {
  try {
    const orders = await getOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/summary', async (_req, res) => {
  try {
    const summary = await getSummary();
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/tree/:memberId', async (req, res) => {
  try {
    const tree = await getTree(req.params.memberId);
    res.json(tree);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/commissions/:memberId', async (req, res) => {
  try {
    const commissions = await getCommissionSummary(req.params.memberId);
    res.json(commissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
