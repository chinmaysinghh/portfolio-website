"use client";

import { motion } from "framer-motion";

const posts = [
  {
    title: "How Recommendation Systems Control Your Digital Life",
    category: "Technology",
    date: "Featured Article",
    excerpt:
      "A reflection on how algorithmic recommendations quietly shape what we watch, buy, read, and believe often without us realizing how much control they actually have over our digital habits.",
    image: "/images/blog-1 img.png",
    link: "https://chinmayssingh.hashnode.dev/how-recommendation-systems-control-your-digital-life",
  },
];

export default function Blogs() {
  return (
    <section id="blogs" className="relative px-6 md:px-12 py-28 md:py-40">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-6">
              Blogs — 01
            </p>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight text-ink">
              Thoughtful writing on technology, systems, and digital life.
            </h2>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="group mx-auto w-full max-w-5xl overflow-hidden rounded-[28px] border border-[rgba(243,239,230,0.08)] bg-[rgba(15,19,18,0.7)] shadow-[0_20px_80px_rgba(0,0,0,0.18)]"
            >
              <div className="relative overflow-hidden md:grid md:grid-cols-[1.1fr_0.9fr]">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full min-h-[260px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d0c] via-[#0a0d0c]/15 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-[#0a0d0c]/75 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-accent backdrop-blur-sm">
                    {post.category}
                  </div>
                </div>

                <div className="flex flex-col justify-center space-y-5 p-6 md:p-8">
                  <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.18em] text-ink-faint font-mono">
                    <span>{post.date}</span>
                    
                  </div>

                  <h3 className="font-display text-2xl md:text-[2.5rem] leading-tight text-ink transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>

                  <p className="text-[15px] leading-relaxed text-ink-dim">{post.excerpt}</p>

                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(243,239,230,0.12)] bg-[rgba(243,239,230,0.03)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent transition-colors hover:border-accent/40 hover:bg-[rgba(47,214,167,0.06)]"
                  >
                    <span>Read article</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
