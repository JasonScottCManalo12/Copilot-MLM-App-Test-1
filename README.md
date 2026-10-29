async function fetchJson(url) {
  const response = await fetch(url);
  return response.json();
}

function renderSummary(summary) {
  const cards = [
    { label: 'Members', value: summary.totalMembers },
    { label: 'Active', value: summary.activeMembers },
    { label: 'Paused', value: summary.pausedMembers },
    { label: 'Sales', value: `$${summary.totalSales.toFixed(2)}` },
  ];

  document.getElementById('summaryCards').innerHTML = cards
    .map(
      (card) => `
        <div class="card">
          <span class="label">${card.label}</span>
          <span class="value">${card.value}</span>
        </div>
      `,
    )
    .join('');
}

function renderPlans(plans) {
  const el = document.getElementById('plansList');
  el.innerHTML = plans
    .map(
      (plan) => `
        <div class="plan-item">
          <strong>${plan.name}</strong>
          <div>${plan.type}</div>
          <div class="meta">Status: ${plan.status}</div>
        </div>
      `,
    )
    .join('');
}

function renderTree(tree) {
  const el = document.getElementById('treeView');

  function renderNode(node) {
    if (!node) return '';
    const children = node.children && node.children.length ? node.children.map(renderNode).join('') : '';
    return `
      <div class="member-node">
        <div><strong>${node.firstName} ${node.lastName}</strong></div>
        <div class="meta">Rank: ${node.rank} • ${node.location}</div>
        <div class="meta">Status: ${node.status}</div>
        ${children ? `<div class="tree-children">${children}</div>` : ''}
      </div>
    `;
  }

  const root = Array.isArray(tree) ? tree : [tree];
  el.innerHTML = root.map(renderNode).join('');
}

async function renderCommissionSummary() {
  const commissions = await fetchJson('/api/commissions/m-100');
  const el = document.getElementById('commissionView');

  const rows = [
    { label: 'Direct sales', value: `$${commissions.totalCommission.toFixed(2)}` },
    { label: 'Team bonus', value: `$${commissions.teamBonus.toFixed(2)}` },
    { label: 'Total payout', value: `$${commissions.totalPayout.toFixed(2)}` },
    { label: 'Team volume', value: `$${commissions.teamVolume.toFixed(2)}` },
  ];

  el.innerHTML = rows
    .map(
      (row) => `
        <div class="comp-row">
          <span>${row.label}</span>
          <strong>${row.value}</strong>
        </div>
      `,
    )
    .join('');
}

async function main() {
  const summary = await fetchJson('/api/summary');
  const plans = await fetchJson('/api/plans');
  const tree = await fetchJson('/api/tree/m-100');

  renderSummary(summary);
  renderPlans(plans);
  renderTree(tree);
  renderCommissionSummary();
}

const refreshButton = document.getElementById('refreshButton');
refreshButton.addEventListener('click', main);

main();
