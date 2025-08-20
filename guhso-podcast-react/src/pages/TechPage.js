import React, { useMemo, useState } from 'react';
import './TechPage.css';

// --- Utility helpers ---
const fmtDate = (d) => d.toLocaleDateString(undefined, {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

const defaultSections = () => ([
  {
    key: 'highlights',
    icon: '🚀',
    title: 'Top Highlights',
    placeholder: '• Big win: …\n• Metric moved: …\n• Risk/issue: …',
    value: `• Launched v2 of landing page – +23% CTR week-over-week\n• Closed 3 deals (MRR: $5.2k)\n• Risk: auth rate limits spiking on Stripe webhook – hotfix in progress`,
    enabled: true,
  },
  {
    key: 'ai_news',
    icon: '🧠',
    title: 'AI News',
    placeholder: '• Model releases, funding rounds, policy shifts…',
    value: `• Open-source LLM X adds structured output; early tests show faster tool use\n• Adobe rolls out new gen-fill guardrails for brands\n• EU AI Act compliance checklists trending across vendors`,
    enabled: true,
  },
  {
    key: 'ai_tools',
    icon: '🛠️',
    title: 'AI Tools Worth a Look',
    placeholder: '• Tool – one-liner value | link',
    value: `• Cursor – pair-programming IDE that actually ships | <https://cursor.sh|cursor>\n• Bolt.new – spin up full-stack in minutes | <https://bolt.new|bolt.new>\n• ComfyUI-Manager – reproducible T2I graphs | <https://github.com/ltdrdata/ComfyUI-Manager|repo>`,
    enabled: true,
  },
  {
    key: 'context_engineering',
    icon: '🧩',
    title: 'Context Engineering & Prompting',
    placeholder: '• Playbooks, snippets, patterns',
    value: `• RAG hygiene: keep chunks <1k tokens; embed titles + IDs\n• Prompt pattern: “Role + Guardrails + Single action + Examples + JSON schema”\n• Eval tip: track faithfulness & factuality separately`,
    enabled: true,
  },
  {
    key: 'actions',
    icon: '✅',
    title: 'Action Items',
    placeholder: '• Owner – task (due)',
    value: `• Sean – ship Slack digest MVP to marketing (EOD)\n• Nina – draft Block Kit feed for #announcements (Fri)\n• DevOps – rate-limit alerting threshold PR (today)`,
    enabled: true,
  },
]);

const buildSlackMsg = ({ title, date, sections, compact, includeHeaderDivider }) => {
  const header = `*${title} — ${fmtDate(date)}*`;
  const divider = includeHeaderDivider ? '\n――――――――――――――――――――――――――\n' : '\n';
  const body = sections
    .filter((s) => s.enabled && s.value.trim().length > 0)
    .map((s) => {
      const lines = s.value.split(/\r?\n/).filter(Boolean);
      const bullets = lines
        .map((l, i) => (compact ? `• ${l.replace(/^[-•\d.\s]*/g, '')}` : `${i + 1}. ${l.replace(/^[-•\d.\s]*/g, '')}`))
        .join('\n');
      return `${s.icon} *${s.title}*\n${bullets}`;
    })
    .join('\n\n');
  return `${header}${divider}${body}`.trim();
};

const formatDateForInput = (date) =>
  new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);

const TechPage = () => {
  const [title, setTitle] = useState('Slack-Ready Digest');
  const [date, setDate] = useState(new Date());
  const [sections, setSections] = useState(defaultSections());
  const [compactBullets, setCompactBullets] = useState(true);
  const [headerDivider, setHeaderDivider] = useState(true);
  const [showPreview, setShowPreview] = useState(true);

  const slackMessage = useMemo(
    () =>
      buildSlackMsg({
        title,
        date,
        sections,
        compact: compactBullets,
        includeHeaderDivider: headerDivider,
      }),
    [title, date, sections, compactBullets, headerDivider]
  );

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(slackMessage);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  const copyAsCodeBlock = async () => {
    try {
      await navigator.clipboard.writeText('```\n' + slackMessage + '\n```');
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  const resetDefaults = () => setSections(defaultSections());

  const updateSection = (key, patch) => {
    setSections((prev) => prev.map((s) => (s.key === key ? { ...s, ...patch } : s)));
  };

  return (
    <div className="tech-page">
      <h1 className="tech-title">Slack-Ready Digest</h1>
      <div className="tech-controls">
        <input
          className="tech-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Digest title"
        />
        <input
          type="date"
          className="tech-input"
          value={formatDateForInput(date)}
          onChange={(e) => setDate(new Date(e.target.value + 'T12:00:00'))}
        />
        <button className="tech-button" onClick={resetDefaults}>
          Reset
        </button>
      </div>
      <div className="tech-options">
        <label>
          <input
            type="checkbox"
            checked={compactBullets}
            onChange={(e) => setCompactBullets(e.target.checked)}
          />{' '}
          Compact bullets
        </label>
        <label>
          <input
            type="checkbox"
            checked={headerDivider}
            onChange={(e) => setHeaderDivider(e.target.checked)}
          />{' '}
          Header divider
        </label>
        <label>
          <input
            type="checkbox"
            checked={showPreview}
            onChange={(e) => setShowPreview(e.target.checked)}
          />{' '}
          Live preview
        </label>
      </div>
      <div className="tech-sections">
        {sections.map((s) => (
          <div key={s.key} className="tech-section">
            <div className="tech-section-header">
              <div className="tech-section-title">
                <span className="tech-section-icon" aria-hidden>
                  {s.icon}
                </span>
                {s.title}
              </div>
              <label className="tech-include">
                <input
                  type="checkbox"
                  checked={s.enabled}
                  onChange={(e) => updateSection(s.key, { enabled: e.target.checked })}
                />{' '}
                Include
              </label>
            </div>
            <textarea
              className="tech-textarea"
              placeholder={s.placeholder}
              value={s.value}
              onChange={(e) => updateSection(s.key, { value: e.target.value })}
            />
          </div>
        ))}
      </div>
      <div className="tech-actions">
        <button className="tech-button" onClick={copyToClipboard}>
          Copy Slack message
        </button>
        <button className="tech-button" onClick={copyAsCodeBlock}>
          Copy as code block
        </button>
      </div>

      {showPreview && (
        <div className="tech-preview">
          <h2>Preview</h2>
          <div className="preview-content">
            <div className="preview-title">
              {title} — {fmtDate(date)}
            </div>
            {headerDivider && <hr />}
            {sections
              .filter((s) => s.enabled && s.value.trim())
              .map((s) => (
                <div key={s.key} className="preview-section">
                  <div className="preview-section-title">
                    {s.icon} {s.title}
                  </div>
                  <ul>
                    {s.value
                      .split(/\r?\n/)
                      .filter(Boolean)
                      .map((line, idx) => (
                        <li key={idx}>{line.replace(/^[-•\d.\s]*/g, '')}</li>
                      ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="tech-raw">
        <h2>Raw Slack Message</h2>
        <pre>{slackMessage}</pre>
        <button className="tech-button" onClick={copyToClipboard}>
          Copy
        </button>
      </div>
    </div>
  );
};

export default TechPage;

