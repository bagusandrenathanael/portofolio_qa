const tools = [
  ["jenkins", "J", "#d24939", false],
  ["katalon", "K", "#1769ff", false],
  ["selenium", "Se", "#43b02a", false],
  ["playwright", "Pw", "#2ead6e", false],
  ["typescript", "TS", "#3178c6", false],
  ["javascript", "JS", "#f7df1e", true],
  ["java", "♨", "#007396", false],
  ["postman", "P", "#ff6c37", false],
  ["swagger", "Sw", "#62a626", false],
  ["bruno", "B", "#f16a37", false],
  ["k6", "k6", "#7d64ff", false],
  ["jmeter", "J", "#d22128", false],
  ["vscode", "</>", "#007acc", false],
  ["office", "O", "#d83b01", false],
  ["sql", "SQL", "#294c8a", false],
] as const;

export default function ToolIconField() {
  return (
    <div className="tool-icon-field" aria-hidden="true">
      {tools.map(([tool, glyph, color, dark]) => (
        <span className={`tool-icon tool-icon-${tool}`} key={tool}>
          <svg viewBox="0 0 40 40" focusable="false">
            <rect x="2" y="2" width="36" height="36" rx="11" fill={color} />
            <text x="20" y="21" fill={dark ? "#202124" : "#fff"} textAnchor="middle" dominantBaseline="central" fontFamily="Arial, sans-serif" fontWeight="800" fontSize={glyph.length > 2 ? "10" : glyph.length > 1 ? "13" : "19"}>{glyph}</text>
          </svg>
        </span>
      ))}
    </div>
  );
}
