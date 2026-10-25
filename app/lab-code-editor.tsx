import type { ReactNode } from "react";

type CodeLanguage = "typescript" | "javascript" | "sql" | "shell";

const keywordSets: Record<CodeLanguage, Set<string>> = {
  typescript: new Set(["import", "from", "const", "let", "async", "await", "test", "true", "false", "null", "if", "return", "new", "process", "expect"]),
  javascript: new Set(["const", "let", "var", "async", "await", "function", "return", "if", "else", "throw", "new", "true", "false", "null", "undefined"]),
  sql: new Set(["select", "from", "left", "right", "inner", "join", "on", "where", "and", "or", "as", "is", "not", "null", "distinct", "group", "by", "order", "having", "case", "when", "then", "else", "end"]),
  shell: new Set(["jmeter", "set", "export", "if", "then", "fi"]),
};

function languageFor(tool: string): CodeLanguage {
  if (/sql/i.test(tool)) return "sql";
  if (/jmeter|load testing/i.test(tool)) return "shell";
  if (/postman|javascript/i.test(tool)) return "javascript";
  return "typescript";
}

function fileFor(title: string, language: CodeLanguage) {
  if (language === "sql") return "etl-reconciliation.sql";
  if (language === "shell") return "run-performance-test.sh";
  if (language === "javascript") return "response-contract.test.js";
  return title.toLowerCase().includes("page") ? "login.spec.ts" : "qa-smoke.spec.ts";
}

function tokenClass(token: string, language: CodeLanguage, tail: string) {
  if (/^(\/\/|--|#)/.test(token)) return "comment";
  if (/^("|'|`)/.test(token)) return "string";
  if (/^\d/.test(token)) return "number";
  if (/^[A-Za-z_$]/.test(token)) {
    if (keywordSets[language].has(token.toLowerCase())) return "keyword";
    if (/^(LoginPage|Page|APIResponse|JSON)$/.test(token)) return "type";
    if (/^(test|expect|signIn|open|toHaveURL|toBe|toEqual|pm|record_id)$/i.test(token) && /^\s*\(/.test(tail)) return "function";
    if (/^(page|response|body|request|s|t|amount|record_id)$/i.test(token)) return "variable";
  }
  return "plain";
}

function highlightLine(line: string, language: CodeLanguage): ReactNode[] {
  const pattern = /\/\/[^\n]*|--[^\n]*|#[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b\d+(?:\.\d+)?\b|[A-Za-z_$][\w$]*|=>|===|!==|==|!=|<=|>=|[{}()[\].,;:+*/=<>!&|-]/g;
  const output: ReactNode[] = [];
  let cursor = 0;
  let index = 0;
  for (const match of line.matchAll(pattern)) {
    const token = match[0];
    const start = match.index ?? 0;
    if (start > cursor) output.push(line.slice(cursor, start));
    const kind = tokenClass(token, language, line.slice(start + token.length));
    output.push(<span className={`vscode-token-${kind}`} key={`${start}-${index++}`}>{token}</span>);
    cursor = start + token.length;
  }
  if (cursor < line.length) output.push(line.slice(cursor));
  return output;
}

export default function LabCodeEditor({ title, tool, source }: { title: string; tool: string; source: string }) {
  const language = languageFor(tool);
  const languageLabel = language === "shell" ? "Shell" : language === "sql" ? "SQL" : language === "javascript" ? "JavaScript" : "TypeScript";
  const lines = source.replace(/\r\n/g, "\n").split("\n");

  return <div className="vscode-editor" aria-label={`${languageLabel} code preview`}>
    <div className="vscode-titlebar" aria-hidden="true">
      <div className="vscode-window-controls"><i/><i/><i/></div>
      <div className="vscode-tab"><span className={`vscode-file-icon ${language}`}>{language === "sql" ? "DB" : language === "shell" ? "$" : language === "javascript" ? "JS" : "TS"}</span>{fileFor(title, language)}</div>
      <span className="vscode-language-label">{languageLabel}</span>
    </div>
    <pre className="vscode-code"><code>{lines.map((line, index) => <span className="vscode-line" key={index}><span className="vscode-line-number" aria-hidden="true">{index + 1}</span><span className="vscode-line-source">{line ? highlightLine(line, language) : " "}</span></span>)}</code></pre>
  </div>;
}
