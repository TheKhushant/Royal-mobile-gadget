import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { categories, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { z } from "zod";

const searchSchema = z.object({ category: z.string().optional() });

export const Route = createFileRoute("/shop")({
  component: Shop,
  validateSearch: searchSchema,
  head: () => ({ meta: [{ title: "Shop — Royal Mobile Accessories" }] }),
});

function Shop() {
  const { category } = Route.useSearch();
  const [active, setActive] = useState<string | undefined>(category);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    let list = [...products];
    if (active) list = list.filter((p) => p.category === active);
    if (q.trim()) list = list.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [active, q, sort]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="font-display text-4xl sm:text-5xl"><span className="text-gradient-gold">Shop</span> {active && <span className="text-foreground">— {active}</span>}</h1>
        <p className="text-muted-foreground mt-2">{filtered.length} products available</p>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="space-y-6 lg:sticky lg:top-20 self-start">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products..." className="w-full bg-input border border-border rounded-md pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-1 ring-gold" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-primary mb-3">Sort</div>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full bg-input border border-border rounded-md px-3 py-2 text-sm">
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-primary mb-3">Categories</div>
            <div className="space-y-1">
              <button onClick={() => setActive(undefined)} className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${!active ? "bg-secondary text-primary" : "hover:bg-secondary/60 text-muted-foreground"}`}>All Products</button>
              {categories.map((c) => (
                <button key={c.slug} onClick={() => setActive(c.slug)} className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2 ${active === c.slug ? "bg-secondary text-primary" : "hover:bg-secondary/60 text-muted-foreground"}`}>
                  <span>{c.icon}</span> {c.slug}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">No products match your filters.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
