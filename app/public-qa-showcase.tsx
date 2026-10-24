import type { Language } from "../lib/i18n";
import { t } from "../lib/i18n";
import type { PublicQaRecord } from "../lib/public-showcase";

const sectionMeta = {
  "test-case": { id: "test-cases", eyebrow: "qaRecordsEyebrow", title: "testShowcaseTitle", description: "testShowcaseDescription", index: "03 — TEST COVERAGE" },
  "bug-report": { id: "bug-reports", eyebrow: "qaRecordsEyebrow", title: "bugShowcaseTitle", description: "bugShowcaseDescription", index: "04 — DEFECTS" },
  "api-test": { id: "api-testing", eyebrow: "qaRecordsEyebrow", title: "apiShowcaseTitle", description: "apiShowcaseDescription", index: "05 — API QUALITY" },
  automation: { id: "automation-showcase", eyebrow: "qaRecordsEyebrow", title: "automationShowcaseTitle", description: "automationShowcaseDescription", index: "06 — AUTOMATION" },
  performance: { id: "performance-testing", eyebrow: "qaRecordsEyebrow", title: "performanceShowcaseTitle", description: "performanceShowcaseDescription", index: "07 — PERFORMANCE" },
} as const;

function Heading({ language, section }: { language: Language; section: (typeof sectionMeta)[keyof typeof sectionMeta] }) {
  return <div className="section-title"><div><p className="eyebrow">{t(language, section.eyebrow)}</p><h2>{t(language, section.title)}</h2><p className="muted">{t(language, section.description)}</p></div><small className="index">{section.index}</small></div>;
}

function safeEndpoint(value: string) {
  try {
    const url = new URL(value);
    if (!/^https?:$/.test(url.protocol)) return "";
    return `${url.origin}${url.pathname}`.slice(0, 180);
  } catch {
    return value.startsWith("/") ? value.split(/[?#]/, 1)[0].slice(0, 180) : "";
  }
}

function safeRepository(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? `${url.origin}${url.pathname}`.slice(0, 180) : "";
  } catch {
    return "";
  }
}

function valueLabel(value: string, suffix = "") {
  if (!value) return "—";
  return `${value}${suffix}`;
}

export default function PublicQaShowcase({ language, records }: { language: Language; records: PublicQaRecord[] }) {
  const of = (module: PublicQaRecord["module"]) => records.filter((record) => record.module === module);
  const cases = of("test-case");
  const bugs = of("bug-report");
  const apiTests = of("api-test");
  const automation = of("automation");
  const performance = of("performance");

  return <>
    {cases.length > 0 && <section className="section wrap qa-public-section" id={sectionMeta["test-case"].id}>
      <Heading language={language} section={sectionMeta["test-case"]} />
      <div className="qa-public-table-wrap"><table className="qa-public-table"><thead><tr><th>{t(language, "testIdLabel")}</th><th>{t(language, "testScenarioLabel")}</th><th>{t(language, "projectLabel")}</th><th>{t(language, "priorityLabel")}</th><th>{t(language, "statusLabel")}</th></tr></thead><tbody>{cases.map((record) => <tr key={record.id}><td data-label={t(language, "testIdLabel")}><code>{record.id.slice(-8).toUpperCase()}</code></td><td data-label={t(language, "testScenarioLabel")}>{record.title}</td><td data-label={t(language, "projectLabel")}>{record.project || "QA Project"}</td><td data-label={t(language, "priorityLabel")}><span className={`qa-public-priority ${record.priority.toLowerCase()}`}>{record.priority}</span></td><td data-label={t(language, "statusLabel")}><span className={`qa-public-status ${/pass|publish|resolved|closed/i.test(record.status) ? "is-good" : /fail|block|open/i.test(record.status) ? "is-alert" : ""}`}>{record.status}</span></td></tr>)}</tbody></table></div>
    </section>}

    {bugs.length > 0 && <section className="section wrap qa-public-section" id={sectionMeta["bug-report"].id}>
      <Heading language={language} section={sectionMeta["bug-report"]} />
      <div className="qa-public-bug-grid">{bugs.map((record) => <article className="qa-public-bug" key={record.id}><div className="qa-bug-art"><span>{t(language, "bugReportLabel")}</span><i aria-hidden="true">!</i><small>{record.project || "QA Project"}</small></div><div className="qa-public-bug-body"><div className="qa-public-badges"><span className={`qa-public-priority ${record.details.severity?.toLowerCase() || record.priority.toLowerCase()}`}>{record.details.severity || record.priority}</span><span className="qa-public-status">{record.status}</span></div><h3>{record.title}</h3><p>{record.details.environment || t(language, "bugEnvironmentPrivate")}</p></div></article>)}</div>
    </section>}

    {apiTests.length > 0 && <section className="section wrap qa-public-section" id={sectionMeta["api-test"].id}>
      <Heading language={language} section={sectionMeta["api-test"]} />
      <div className="qa-public-api-grid">{apiTests.map((record) => <article className="qa-public-api" key={record.id}><div className="qa-api-top"><span className={`qa-method ${record.details.method?.toLowerCase() || "get"}`}>{record.details.method || "API"}</span><span className={`qa-public-status ${/pass|publish|resolved|closed/i.test(record.status) ? "is-good" : /fail/i.test(record.status) ? "is-alert" : ""}`}>{record.status}</span></div><h3>{record.title}</h3><code className="qa-endpoint">{safeEndpoint(record.details.endpoint) || t(language, "endpointNotShared")}</code><p>{record.details.validation || t(language, "apiValidationPrivate")}</p></article>)}</div>
    </section>}

    {automation.length > 0 && <section className="section wrap qa-public-section" id={sectionMeta.automation.id}>
      <Heading language={language} section={sectionMeta.automation} />
      <div className="qa-public-automation-grid">{automation.map((record) => { const repository = safeRepository(record.details.repository); return <article className="qa-public-automation" key={record.id}><div><span className="qa-automation-mark" aria-hidden="true">&lt;/&gt;</span><div><small>{record.details.framework || t(language, "automationFramework")}</small><h3>{record.title}</h3></div></div><p>{record.project || t(language, "automationSuite")}</p><footer><span className={`qa-public-status ${/pass|publish|resolved|closed/i.test(record.status) ? "is-good" : ""}`}>{record.status}</span>{repository && <a href={repository} target="_blank" rel="noreferrer">{t(language, "viewRepository")} ↗</a>}</footer></article>; })}</div>
    </section>}

    {performance.length > 0 && <section className="section wrap qa-public-section" id={sectionMeta.performance.id}>
      <Heading language={language} section={sectionMeta.performance} />
      <div className="qa-public-performance-grid">{performance.map((record) => <article className="qa-public-performance" key={record.id}><div className="qa-performance-title"><div><small>{record.details.scenario || t(language, "performanceScenario")}</small><h3>{record.title}</h3></div><span className={`qa-public-status ${/pass|publish|resolved|closed/i.test(record.status) ? "is-good" : /fail/i.test(record.status) ? "is-alert" : ""}`}>{record.status}</span></div><div className="qa-performance-metrics"><div><small>{t(language, "virtualUsersLabel")}</small><b>{valueLabel(record.details.virtualUsers)}</b></div><div><small>{t(language, "responseTimeLabel")}</small><b>{valueLabel(record.details.responseTime, " ms")}</b></div><div><small>{t(language, "throughputLabel")}</small><b>{valueLabel(record.details.throughput, " req/min")}</b></div><div><small>{t(language, "errorRateLabel")}</small><b>{valueLabel(record.details.errorRate, "%")}</b></div></div></article>)}</div>
    </section>}
  </>;
}
