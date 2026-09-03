async function loadLeaderboard() {
  const tbody = document.getElementById("leaderboard-body");
  const status = document.getElementById("leaderboard-status");

  function fmtScore(value) {
    if (value === null || value === undefined || value === "") return "—";
    const n = Number(value);
    if (!Number.isFinite(n)) return "—";
    return n.toFixed(4);
  }

  function fmtDate(value) {
    if (!value) return "—";
    return String(value).slice(0, 10);
  }

  try {
    const response = await fetch("leaderboard/leaderboard.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const rows = await response.json();

    if (!Array.isArray(rows) || rows.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7">No public submissions yet.</td></tr>';
      status.textContent = "No public submissions yet.";
      return;
    }

    tbody.innerHTML = rows.map((row, idx) => `
      <tr>
        <td>${escapeHtml(row.rank ?? idx + 1)}</td>
        <td>${escapeHtml(row.display_name || row.system_name || "Unnamed system")}</td>
        <td>${escapeHtml(row.track || "")}</td>
        <td class="num">${fmtScore(row.track1_score)}</td>
        <td class="num">${fmtScore(row.track2_score)}</td>
        <td class="num">${fmtScore(row.overall_score)}</td>
        <td>${escapeHtml(fmtDate(row.processed_at || row.submitted_at))}</td>
      </tr>
    `).join("");

    status.textContent = `Showing ${rows.length} public leaderboard record${rows.length === 1 ? "" : "s"}.`;
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="7">Could not load leaderboard.</td></tr>';
    status.textContent = "Could not load leaderboard.";
    console.error(err);
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[ch]));
}

loadLeaderboard();
