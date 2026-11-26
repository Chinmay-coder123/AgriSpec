const $ = (selector) => document.querySelector(selector);
const promptInput = $('#prompt');
const charCount = $('#char-count');
const generateButton = $('#generate-button');
const loadingSection = $('#loading-section');
const loadingTitle = $('#loading-title');
const loadingDetail = $('#loading-detail');
const resultSection = $('#result-section');
const resultTitle = $('#result-title');
const resultContent = $('#result-content');
const errorBanner = $('#error-banner');
const downloadButton = $('#download-button');
const copyButton = $('#copy-button');
const newButton = $('#new-button');
const statusDot = $('#status-dot');
const statusText = $('#status-text');
const statusModel = $('#status-model');

let latest = null;
let activeTab = 'document';

const SAMPLES = {
  'Smart irrigation':
    'A smart irrigation system for smallholder farmers in a fictional district. Soil-moisture and weather sensors send readings over a low-power network to a gateway. A mobile app in Hindi, Kannada, and English works offline and shows irrigation schedules. Farmers get SMS alerts. An FPO dashboard shows all member plots. Valves can be opened remotely.',
  'Mandi marketplace':
    'An online marketplace connecting farmers, FPOs, and buyers for fruits and vegetables. Farmers list produce with quality photos and expected quantity, buyers place bids, and the platform handles quality grading, price discovery from published mandi prices, digital payments, and delivery tracking. Traders and officers can view audit reports.',
  'Crop insurance claims':
    'A crop-insurance claim platform for a fictional state agriculture department. Farmers enrol and report crop loss with geo-tagged photos, field officers verify losses using a mobile app that works offline, satellite and weather data support assessments, and insurer staff approve claims and trigger direct payments. Peak load occurs right after floods.',
  'Drone spraying': 'A drone service platform where farmers book drone spraying for their crops. Certified drone operators receive jobs, plan flight paths over geo-fenced field boundaries, record the spray log, and the platform stores compliance records and sends the farmer a service report.',
};

// ---------- Markdown rendering (headings, lists, tables, code, hr) ----------
const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char]);
const inline = (value) => escapeHtml(value).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
const splitRow = (line) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim());
const isTableSeparator = (line) => /^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(line.trim());

function renderMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  let html = '';
  let list = null;
  let inCode = false;
  const closeList = () => { if (list) { html += `</${list}>`; list = null; } };

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();

    if (line.startsWith('```')) {
      closeList();
      html += inCode ? '</code></pre>' : '<pre><code>';
      inCode = !inCode;
      continue;
    }
    if (inCode) { html += `${escapeHtml(raw)}\n`; continue; }
    if (!line) { closeList(); continue; }

    if (line.includes('|') && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      closeList();
      const head = splitRow(line);
      let rows = '';
      i += 2;
      while (i < lines.length && lines[i].trim().includes('|')) { rows += `<tr>${splitRow(lines[i]).map((cell) => `<td>${inline(cell)}</td>`).join('')}</tr>`; i++; }
      i--;
      html += `<div class="table-wrap"><table><thead><tr>${head.map((cell) => `<th>${inline(cell)}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>`;
      continue;
    }
    if (/^#{1,4} /.test(line)) { closeList(); const level = line.match(/^#+/)[0].length; html += `<h${level}>${inline(line.slice(level + 1))}</h${level}>`; continue; }
    if (/^[-*] /.test(line)) { if (list !== 'ul') { closeList(); list = 'ul'; html += '<ul>'; } html += `<li>${inline(line.slice(2))}</li>`; continue; }
    if (/^\d+\. /.test(line)) { if (list !== 'ol') { closeList(); list = 'ol'; html += '<ol>'; } html += `<li>${inline(line.replace(/^\d+\. /, ''))}</li>`; continue; }
    if (/^-{3,}$/.test(line)) { closeList(); html += '<hr>'; continue; }
    closeList();
    html += `<p>${inline(line)}</p>`;
  }
  closeList();
  if (inCode) html += '</code></pre>';
  return html;
}

function renderResult() {
  if (!latest) return;
  const text = activeTab === 'requirements' ? latest.requirements : activeTab === 'sdlc' ? latest.sdlc : latest.document;
  resultContent.innerHTML = renderMarkdown(text || 'No output was returned for this tab.');
}

// ---------- UI helpers ----------
const showError = (message) => { errorBanner.textContent = message; errorBanner.classList.remove('hidden'); };
function setLoading(on) {
  loadingSection.classList.toggle('hidden', !on);
  generateButton.disabled = on;
  if (on) { resultSection.classList.add('hidden'); errorBanner.classList.add('hidden'); }
}
function setTab(tab) {
  activeTab = tab;
  document.querySelectorAll('.tab').forEach((item) => item.classList.toggle('active', item.dataset.tab === tab));
  renderResult();
}

promptInput.addEventListener('input', () => { charCount.textContent = promptInput.value.length.toLocaleString(); });
document.querySelectorAll('.tab').forEach((tab) => tab.addEventListener('click', () => setTab(tab.dataset.tab)));

for (const [label, text] of Object.entries(SAMPLES)) {
  const chip = document.createElement('button');
  chip.className = 'chip';
  chip.type = 'button';
  chip.textContent = label;
  chip.addEventListener('click', () => { promptInput.value = text; promptInput.dispatchEvent(new Event('input')); promptInput.focus(); });
  $('#sample-list').appendChild(chip);
}

// ---------- Generate ----------
async function generate() {
  const prompt = promptInput.value.trim();
  if (prompt.length < 20) return showError('Please enter a project brief of at least 20 characters.');

  setLoading(true);
  const startedAt = Date.now();
  loadingTitle.textContent = 'Retrieving AgriTech evidence';
  const tick = setInterval(() => {
    const seconds = Math.round((Date.now() - startedAt) / 1000);
    const stage = seconds < 3 ? 'Retrieving AgriTech evidence' : 'Agents (i) and (ii) are working in sequence';
    loadingTitle.textContent = `${stage} · ${seconds}s`;
    loadingDetail.textContent = 'This can take a few minutes on a local model. Keep this window open until the result is ready.';
  }, 1000);

  try {
    const response = await fetch('/api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt }) });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || 'The analysis could not be completed.');
    latest = payload;
    resultTitle.textContent = payload.outOfDomain ? 'Outside the AgriTech domain' : `Analysis ready${payload.elapsedSeconds ? ` · ${payload.elapsedSeconds}s` : ''}`;
    setTab('document');
    resultSection.classList.remove('hidden');
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
    showError(error.message || 'The analysis could not be completed.');
  } finally {
    clearInterval(tick);
    setLoading(false);
  }
}

generateButton.addEventListener('click', generate);
promptInput.addEventListener('keydown', (event) => { if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') generate(); });

copyButton.addEventListener('click', async () => {
  if (!latest) return;
  try { await navigator.clipboard.writeText(latest.document); copyButton.textContent = 'Copied'; } catch { copyButton.textContent = 'Copy failed'; }
  setTimeout(() => { copyButton.textContent = 'Copy Markdown'; }, 1500);
});

downloadButton.addEventListener('click', () => {
  if (!latest) return;
  const blob = new Blob([latest.document], { type: 'text/markdown;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'agrispec-agritech-analysis.md';
  link.click();
  URL.revokeObjectURL(link.href);
});

newButton.addEventListener('click', () => { resultSection.classList.add('hidden'); promptInput.focus(); window.scrollTo({ top: 0, behavior: 'smooth' }); });

// ---------- LM Studio status ----------
async function refreshStatus() {
  try {
    const health = await (await fetch('/api/health')).json();
    statusModel.textContent = health.model || '';
    if (!health.reachable) { statusDot.className = 'status-dot bad'; statusText.textContent = 'LM Studio not reachable'; }
    else if (!health.modelLoaded) { statusDot.className = 'status-dot warn'; statusText.textContent = 'Model not loaded'; }
    else { statusDot.className = 'status-dot ok'; statusText.textContent = health.busy ? 'Local model (busy)' : 'Local model ready'; }
  } catch {
    statusDot.className = 'status-dot bad';
    statusText.textContent = 'Server not reachable';
  }
}
refreshStatus();
setInterval(refreshStatus, 20000);
