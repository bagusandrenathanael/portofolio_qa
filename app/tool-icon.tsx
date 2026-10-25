import {
  Activity, AppWindow, Bug, CheckCircle2, Code2, Database, Gauge, GitBranch,
  Layers3, ListChecks, Network, Workflow,
} from "lucide-react";

type ToolIconProps = { name: string; size?: number };

const normalize = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "").replace(/^apache/, "");

/** Locally rendered product marks for vendor tools and clear symbols for QA methods. */
export default function ToolIcon({ name, size = 24 }: ToolIconProps) {
  const key = normalize(name);
  const common = { width: size, height: size, viewBox: "0 0 48 48", fill: "none", "aria-hidden": true as const };

  if (["vscode", "visualstudiocode"].includes(key)) return <svg {...common}>
    <path fill="#007ACC" d="M34.4 3.8 46 9.2v29.6l-11.6 5.4L16.8 29.4 8.5 35.8 2 32.6v-17.2l6.5-3.2 8.3 6.4L34.4 3.8ZM8.2 19.2v9.6l5-4.8-5-4.8Zm12.1 4.8 14.1 10.8V13.2L20.3 24Z"/>
  </svg>;
  if (key.includes("postman")) return <svg {...common}>
    <circle cx="24" cy="24" r="21" fill="#FF6C37"/>
    <path d="M13.5 27.8 30.8 15.5m-6.5 17.2 6.5-17.2m-6.5 17.2-10.8-5.1m10.8 5.1-2.5-8.1" stroke="white" strokeWidth="3.1" strokeLinecap="round"/>
    <circle cx="13.5" cy="27.8" r="3.5" fill="white"/><circle cx="30.8" cy="15.5" r="3.5" fill="white"/><circle cx="24.3" cy="32.7" r="3.5" fill="white"/>
  </svg>;
  if (["microsoftoffice", "office"].includes(key)) return <svg {...common}>
    <path fill="#EA3E23" d="M7 10.4 28 4v40L7 37.6V10.4Z"/><path fill="#F5A623" d="M28 4 42 8v32l-14 4V4Z"/>
    <path fill="#D83B01" d="m7 10.4 21-3.2v33.6L7 37.6V10.4Z"/><path fill="#C43E1C" d="M17 14.2 28 12v24l-11-2.2v-19.6Z" opacity=".95"/>
  </svg>;
  if (["typescript", "javascript"].includes(key)) return <svg {...common}>
    <rect x="4" y="4" width="40" height="40" rx="5" fill={key === "typescript" ? "#3178C6" : "#F7DF1E"}/>
    <text x="24" y="31" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="18" fontWeight="700" fill={key === "typescript" ? "white" : "#171717"}>{key === "typescript" ? "TS" : "JS"}</text>
  </svg>;
  if (key.includes("selenium")) return <svg {...common}>
    <path d="M24 4 41 14v20L24 44 7 34V14L24 4Z" fill="#43B02A"/>
    <path d="M30.6 13.2c-1.7-1.1-3.9-1.7-6.4-1.7-5.8 0-9.6 3-9.6 7.1 0 3.5 2.8 5.4 8 6.8 3.4.9 4.5 1.7 4.5 3 0 1.5-1.5 2.4-3.8 2.4-2.8 0-5.3-1-7.5-2.7l-2.4 3.8c2.8 2.1 6.1 3.2 9.9 3.2 6 0 10-2.9 10-7.5 0-3.6-2.3-5.6-7.7-7.1-3.8-1-4.8-1.7-4.8-2.9 0-1.1 1.2-1.9 3.3-1.9 2 0 4 .6 5.7 1.8l2.4-4.3Z" fill="white"/>
  </svg>;
  if (key.includes("playwright")) return <svg {...common}>
    <path d="M8 9c5.3-5 16.6-5.7 23.5 1.2 5.2 5.2 5.8 12.8 3.5 19.6-2.6 7.7-8.9 11.8-15 10.2C13.4 38.4 9.4 31.7 8 24.3 7 19.1 7.1 13.6 8 9Z" fill="#2EAD6E"/>
    <path d="M15 18.5h.1m12.8 0h.1M16 29c4.2-3.3 8.2-3.3 12.2 0" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
    <path d="M8 11 3.5 8.5m4.2 6.1-5.1.2m27.9-.7 4.4-3.2" stroke="#45C58A" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>;
  if (key.includes("jenkins")) return <svg {...common}>
    <path d="M24 3 41 10v14c0 11-7 18-17 21C14 42 7 35 7 24V10L24 3Z" fill="#D33833"/>
    <path d="M16 20c0-4 3-7 8-7s8 3 8 7v10c0 4-3 7-8 7s-8-3-8-7V20Z" fill="#fff"/>
    <circle cx="21" cy="24" r="2" fill="#D33833"/><circle cx="27" cy="24" r="2" fill="#D33833"/>
    <path d="M20 30c2 2 6 2 8 0" stroke="#D33833" strokeWidth="2" strokeLinecap="round"/>
  </svg>;
  if (key.includes("jmeter")) return <svg {...common}>
    <path d="M9 36c7-2 15-10 20-21 2-4 5-7 9-8-1 6-3 10-7 14-6 7-13 12-22 15Z" fill="#D22128"/>
    <path d="M8 38c8-1 19-7 28-17M14 31l-3-7m8 1-1-8m7 1 3-7" stroke="#A91920" strokeWidth="2.3" strokeLinecap="round"/>
    <circle cx="37" cy="7" r="3" fill="#F4A340"/>
  </svg>;
  if (key.includes("java") && !key.includes("javascript")) return <svg {...common}>
    <path d="M21 7c-5 4 6 5 1 10-3 3-6 4-5 7 1 2 4 2 5 1-3-2 4-4 6-7 4-6-8-7-3-11 1-1 2-2 2-3-2 1-4 2-6 3Z" fill="#E76F00"/>
    <path d="M12 30h23c-1 7-4 10-12 10s-11-3-11-10Z" fill="#5382A1"/><path d="M9 28h29M14 35c-4 1-4 4 1 5m20-5c4 1 4 4-1 5" stroke="#5382A1" strokeWidth="2" strokeLinecap="round"/>
  </svg>;
  if (key.includes("katalon")) return <svg {...common}>
    <path d="M13 7h22v8H21v8h14v8H21v10h-8V7Z" fill="#1769FF"/><path d="M27 23h8v8h-8z" fill="#69A3FF"/>
  </svg>;
  if (key.includes("github")) return <svg {...common}>
    <path fill="#24292F" d="M24 4a20 20 0 0 0-6.3 39c1 .2 1.4-.4 1.4-1v-3.7c-5.8 1.3-7-2.5-7-2.5-.9-2.3-2.3-2.9-2.3-2.9-1.9-1.3.1-1.3.1-1.3 2.1.1 3.2 2.1 3.2 2.1 1.8 3.1 4.7 2.2 5.9 1.7.2-1.3.7-2.2 1.3-2.7-4.6-.5-9.5-2.3-9.5-10.2 0-2.2.8-4 2.1-5.4-.2-.5-.9-2.6.2-5.4 0 0 1.7-.5 5.5 2.1a19 19 0 0 1 10 0c3.8-2.6 5.5-2.1 5.5-2.1 1.1 2.8.4 4.9.2 5.4 1.3 1.4 2.1 3.2 2.1 5.4 0 7.9-4.9 9.7-9.5 10.2.8.7 1.4 1.9 1.4 3.8V42c0 .6.4 1.2 1.4 1A20 20 0 0 0 24 4Z"/>
  </svg>;
  if (key.includes("jira")) return <svg {...common}><path d="M31 6H16c0 5 4 9 9 9h2v2H12c0 5 4 9 9 9h6v2H16c0 5 4 9 9 9h6V6Z" fill="#2684FF"/><path d="M25 15h6v8h-6z" fill="#0052CC"/></svg>;
  if (key.includes("oracle")) return <svg {...common}><ellipse cx="24" cy="24" rx="20" ry="13" stroke="#C74634" strokeWidth="5"/><ellipse cx="24" cy="24" rx="10" ry="5" stroke="#C74634" strokeWidth="3"/></svg>;
  if (key.includes("swagger")) return <svg {...common}><path d="M11 8h8v7h-8zM29 8h8v7h-8zM20 11h8m-4 4v8m-13 0h26v17H11z" stroke="#85B440" strokeWidth="3" strokeLinejoin="round"/><path d="m18 29-2 4m8-4-2 4m8-4-2 4" stroke="#85B440" strokeWidth="2.5" strokeLinecap="round"/></svg>;

  const commonIcon = /sql|database|data/.test(key) ? Database
    : /api|network|contract/.test(key) ? Network
      : /performance|jmeter|load|k6/.test(key) ? Gauge
        : /manual|regression|test|quality|qa|bug/.test(key) ? (key.includes("bug") ? Bug : ListChecks)
          : /agile|waterfall|sdlc|stlc|workflow|cucumber/.test(key) ? (key.includes("agile") || key.includes("cucumber") ? Workflow : Layers3)
            : /git|jenkins|branch/.test(key) ? GitBranch
              : /code|bruno|groovy|shell|java|typescript|javascript/.test(key) ? Code2
                : /office|workspace|chrome|appium|mobile/.test(key) ? AppWindow
                  : /automation|katalon|selenium/.test(key) ? CheckCircle2 : Activity;
  const Icon = commonIcon;
  return <Icon size={size} strokeWidth={1.8} aria-hidden="true" />;
}
