const express = require('express');
const path = require('path');
const { members, products, orders, plans, payoutBatches } = require('./src/data');
const { buildTree, getDownline, calculateCommissions, summarizeCommissionData } = require('./src/mlm');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    app: 'Copilot-MLM-App-Test-1',
    mode: 'legitimate-product-based-mlm',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/plans', (_req, res) => {
  res.json(plans);
});

app.get('/api/members', (_req, res) => {
  res.json(members);
});

app.get('/api/products', (_req, res) => {
  res.json(products);
});

app.get('/api/orders', (_req, res) => {
  res.json(orders);
});

app.get('/api/payouts', (_req, res) => {
  res.json(payoutBatches);
});

app.get('/api/tree/:memberId', (req, res) => {
  const { memberId } = req.params;
  const tree = buildTree(members, memberId);
  res.json(tree);
});

app.get('/api/downline/:memberId', (req, res) => {
  const { memberId } = req.params;
  const downline = getDownline(memberId, members);
  res.json(downline);
});

app.get('/api/commissions/:memberId', (req, res) => {
  const { memberId } = req.params;
  const output = calculateCommissions(memberId, members, products, orders, plans);
  res.json(output);
});

app.get('/api/summary', (_req, res) => {
  const summary = summarizeCommissionData(members, products, orders, plans);
  res.json(summary);
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`MLM App Test 1 running on http://localhost:${PORT}`);
});
