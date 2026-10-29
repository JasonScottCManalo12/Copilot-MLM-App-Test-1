* {
  box-sizing: border-box;
}

:root {
  --bg: #f5f7fb;
  --panel: #ffffff;
  --text: #1d2433;
  --muted: #5e6a85;
  --primary: #2f6fed;
  --primary-soft: #eaf1ff;
  --success: #0d9f6e;
  --warning: #d97706;
  --border: #e6ebf4;
  --shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: var(--bg);
  color: var(--text);
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  background: #fff;
  border-bottom: 1px solid var(--border);
}

.eyebrow {
  margin: 0 0 4px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
}

h1, h2, h3, p {
  margin-top: 0;
}

button {
  border: none;
  background: var(--primary);
  color: white;
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;
  font-weight: 700;
}

.dashboard {
  padding: 24px 32px 48px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.card {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 18px;
  box-shadow: var(--shadow);
}

.card .label {
  display: block;
  font-size: 12px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 10px;
}

.card .value {
  font-size: 28px;
  font-weight: 700;
}

.panel {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 14px;
  box-shadow: var(--shadow);
  padding: 18px;
  margin-bottom: 24px;
}

.panel-header {
  margin-bottom: 14px;
}

.two-column {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 20px;
}

.list {
  display: grid;
  gap: 12px;
}

.plan-item {
  background: var(--primary-soft);
  border: 1px solid #d5e2ff;
  border-radius: 10px;
  padding: 12px 14px;
}

.plan-item strong {
  display: block;
  margin-bottom: 4px;
}

.tree-view, .commission-view {
  display: grid;
  gap: 12px;
}

.member-node {
  background: #f8fafc;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px;
}

.member-node .meta {
  color: var(--muted);
  font-size: 12px;
}

.comp-row {
  background: #fafbff;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.badge {
  display: inline-block;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 11px;
  background: #ebfdf6;
  color: var(--success);
  font-weight: 700;
}

@media (max-width: 768px) {
  .topbar, .dashboard {
    padding-left: 16px;
    padding-right: 16px;
  }

  .two-column {
    grid-template-columns: 1fr;
  }
}
