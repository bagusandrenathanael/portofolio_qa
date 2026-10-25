"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Clock3, Search, SlidersHorizontal } from "lucide-react";

type BlogPost = {
  title: string;
  category: string;
  readTime: string;
  description: string;
  body: string;
  image?: string;
  date?: string;
  sortOrder?: number;
};

function renderArticle(body: string) {
  const codeBlocks: string[] = [];
  const preserved = body.replace(/(?:```|~~~)[\w-]*\n[\s\S]*?\n(?:```|~~~)/g, (block) => {
    const marker = `@@CODE_${codeBlocks.length}@@`;
    codeBlocks.push(block);
    return `\n\n${marker}\n\n`;
  });
  return preserved.split(/\n\s*\n/).filter(Boolean).map((block, index) => {
    const heading = block.match(/^##\s+(.+)$/);
    const marker = block.match(/^@@CODE_(\d+)@@$/);
    const code = marker ? codeBlocks[Number(marker[1])]?.match(/^(?:```|~~~)([\w-]*)\n([\s\S]*?)\n(?:```|~~~)$/) : null;
    if (heading) return <h4 key={index}>{heading[1]}</h4>;
    if (code) return <pre key={index} className="article-code"><code>{code[2]}</code></pre>;
    return <p key={index}>{block}</p>;
  });
}

export default function BlogShowcase({ posts, language, author, avatar }: { posts: BlogPost[]; language: string; author: string; avatar: string }) {
  const isId = language === "id";
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("latest");
  const categories = useMemo(() => [...new Set(posts.map((post) => post.category).filter(Boolean))], [posts]);
  const filtered = useMemo(() => posts.filter((post) => (category === "all" || post.category === category)
    && `${post.title} ${post.category} ${post.description}`.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) => sort === "oldest" ? (a.date || "").localeCompare(b.date || "") || (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
      : sort === "title" ? a.title.localeCompare(b.title)
        : (b.date || "").localeCompare(a.date || "") || (a.sortOrder ?? 0) - (b.sortOrder ?? 0)), [posts, category, query, sort]);
  const dateLabel = (date?: string) => date ? new Intl.DateTimeFormat(isId ? "id-ID" : "en-US", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${date}T00:00:00`)) : "QA Notes";

  return <div className="article-archive">
    <div className="article-toolbar">
      <div className="article-filters" role="group" aria-label={isId ? "Filter kategori artikel" : "Filter article category"}>
        <button className={category === "all" ? "active" : ""} onClick={() => setCategory("all")}>{isId ? "Semua Artikel" : "All Articles"}</button>
        {categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}
      </div>
      <label className="article-search"><Search size={16}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={isId ? "Cari artikel..." : "Search articles..."} /></label>
      <label className="article-sort"><SlidersHorizontal size={15}/><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label={isId ? "Urutkan artikel" : "Sort articles"}>
        <option value="latest">{isId ? "Terbaru" : "Latest"}</option><option value="oldest">{isId ? "Terlama" : "Oldest"}</option><option value="title">A–Z</option>
      </select></label>
    </div>
    {filtered.length ? <div className="post-grid">{filtered.map((post, index) => <article className="article-card" key={post.title}>
      <div className="post-art">{post.image ? <img src={post.image} alt={`${post.title} — QA article illustration`} loading="lazy" /> : <span>{["RISK\n≠\nBUG", "MAKE\nIT\nREPEATABLE", "BUG REPORT\nTHAT HELPS"][index % 3]}</span>}</div>
      <div className="post-card-content">
        <div className="article-card-meta"><span className="article-category">{post.category}</span><span><Clock3 size={13}/>{post.readTime}</span></div>
        <h3>{post.title}</h3><p className="article-excerpt">{post.description}</p>
        <div className="article-card-footer"><div className="article-author"><img src={avatar} alt=""/><span><b>{author}</b><time>{dateLabel(post.date)}</time></span></div>
          {post.body ? <details className="post-details"><summary>{isId ? "Baca Artikel" : "Read Article"}<ArrowRight size={15}/></summary><div className="post-article-body">{renderArticle(post.body)}</div></details> : <span className="article-read-label">{isId ? "Segera hadir" : "Coming soon"}</span>}
        </div>
      </div>
    </article>)}</div> : <p className="article-empty">{isId ? "Tidak ada artikel yang cocok." : "No articles match your search."}</p>}
  </div>;
}
