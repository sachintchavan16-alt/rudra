import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

/**
 * Custom Playwright reporter.
 * Collects every test result and writes a machine readable JSON file plus a
 * self-contained HTML dashboard into reports/custom.
 */
class CustomReporter {
  /** @param {{ outputDir?: string }} [options] */
  constructor(options = {}) {
    const dir = options.outputDir || 'reports/custom';
    this.outputDir = path.isAbsolute(dir) ? dir : path.join(ROOT, dir);
    this.results = [];
    this.startedAt = null;
  }

  onBegin(config, suite) {
    this.startedAt = new Date();
    this.totalTests = suite.allTests().length;
    console.log(`\n[CustomReporter] Running ${this.totalTests} test(s)...`);
  }

  onTestEnd(test, result) {
    this.results.push({
      title: test.title,
      suite: test.titlePath().filter(Boolean).slice(0, -1).join(' > '),
      file: path.relative(ROOT, test.location.file).replace(/\\/g, '/'),
      line: test.location.line,
      project: test.parent?.project()?.name || 'unknown',
      status: result.status,
      durationMs: result.duration,
      retry: result.retry,
      error: result.error ? result.error.message || String(result.error) : null,
      attachments: result.attachments.map((a) => a.name),
    });
  }

  onEnd(runResult) {
    const finishedAt = new Date();
    const summary = this.#buildSummary(runResult, finishedAt);
    fs.mkdirSync(this.outputDir, { recursive: true });
    fs.writeFileSync(
      path.join(this.outputDir, 'results.json'),
      JSON.stringify({ summary, tests: this.results }, null, 2),
    );
    fs.writeFileSync(path.join(this.outputDir, 'summary.html'), this.#buildHtml(summary));
    console.log(
      `[CustomReporter] ${summary.passed} passed, ${summary.failed} failed, ` +
        `${summary.skipped} skipped -> ${path.relative(ROOT, this.outputDir)}`,
    );
  }

  printsToStdio() {
    return false;
  }

  #buildSummary(runResult, finishedAt) {
    const counts = { passed: 0, failed: 0, timedOut: 0, skipped: 0, interrupted: 0 };
    for (const t of this.results) counts[t.status] = (counts[t.status] || 0) + 1;
    return {
      status: runResult.status,
      startedAt: this.startedAt?.toISOString(),
      finishedAt: finishedAt.toISOString(),
      durationMs: finishedAt - this.startedAt,
      total: this.results.length,
      ...counts,
    };
  }

  #buildHtml(s) {
    const rows = this.results
      .map(
        (t) => `<tr class="${t.status}">
        <td>${escapeHtml(t.project)}</td>
        <td>${escapeHtml(t.file)}:${t.line}</td>
        <td>${escapeHtml(t.title)}</td>
        <td>${t.status}</td>
        <td>${t.durationMs} ms</td>
      </tr>`,
      )
      .join('');

    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>RUDRA Custom Test Report</title>
<style>
  body { font-family: Segoe UI, Arial, sans-serif; margin: 24px; color: #1f2933; }
  h1 { margin: 0 0 4px; }
  .meta { color: #616e7c; margin-bottom: 20px; }
  .cards { display: flex; gap: 12px; margin-bottom: 20px; }
  .card { padding: 14px 20px; border-radius: 8px; color: #fff; min-width: 90px; }
  .card span { display: block; font-size: 24px; font-weight: 700; }
  .total { background: #3e4c59; } .passed { background: #2f9e44; }
  .failed { background: #e03131; } .skipped { background: #f08c00; }
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #d9e2ec; padding: 8px 10px; text-align: left; font-size: 13px; }
  th { background: #f0f4f8; }
  tr.failed td { background: #fff5f5; }
  tr.passed td { background: #f4fce3; }
  tr.skipped td { background: #fff9db; }
</style>
</head>
<body>
  <h1>RUDRA Custom Test Report</h1>
  <div class="meta">
    Status: <strong>${s.status}</strong> &middot;
    ${s.startedAt} &rarr; ${s.finishedAt} &middot;
    ${(s.durationMs / 1000).toFixed(1)}s
  </div>
  <div class="cards">
    <div class="card total">Total<span>${s.total}</span></div>
    <div class="card passed">Passed<span>${s.passed}</span></div>
    <div class="card failed">Failed<span>${s.failed + s.timedOut}</span></div>
    <div class="card skipped">Skipped<span>${s.skipped}</span></div>
  </div>
  <table>
    <thead><tr><th>Project</th><th>Location</th><th>Test</th><th>Status</th><th>Duration</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
</body>
</html>`;
  }
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default CustomReporter;
