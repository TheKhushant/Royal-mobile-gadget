import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { Search, X } from "lucide-react";
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

  const navigate = Route.useNavigate();

  const [active, setActive] = useState<string | undefined>(category);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("featured");

  // Sync URL category with local state when URL changes
  useEffect(() => {
    setActive(category);
  }, [category]);

  const filtered = useMemo(() => {
    let list = [...products];

    if (active) {
      list = list.filter((p) => p.category === active);
    }

    if (q.trim()) {
      const term = q.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      );
    }

    // Sorting
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [active, q, sort]);

  const clearFilters = () => {
    setQ("");
    setActive(undefined);
    // Optionally update URL
    navigate({ search: {} });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="font-display text-5xl">
          {active ? active : "All Products"}
        </h1>
        <p className="text-zinc-500 mt-2">{filtered.length} premium products</p>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-10">
        {/* Sidebar Filters */}
        <aside className="lg:sticky lg:top-24 self-start space-y-8">
          {/* Search */}
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-white border border-zinc-200 rounded-2xl pl-11 py-3.5 text-sm focus:border-rose-300 focus:outline-none"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div>
            <div className="text-xs uppercase tracking-widest text-rose-600 mb-3">Sort By</div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-rose-300"
            >
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {/* Categories */}
          <div>
            <div className="text-xs uppercase tracking-widest text-rose-600 mb-3">Categories</div>
            <div className="space-y-1">
              <button
                onClick={() => setActive(undefined)}
                className={`w-full text-left px-5 py-3 rounded-2xl text-sm transition-all ${
                  !active ? "bg-rose-50 text-rose-700 font-medium" : "hover:bg-zinc-100"
                }`}
              >
                All Products
              </button>

              {categories.map((c) => {
                const Icon = c.icon; // Important: Get the component
                return (
                  <button
                    key={c.slug}
                    onClick={() => setActive(c.slug)}
                    className={`w-full text-left px-5 py-3 rounded-2xl text-sm flex items-center gap-3 transition-all ${
                      active === c.slug ? "bg-rose-50 text-rose-700 font-medium" : "hover:bg-zinc-100"
                    }`}
                  >
                    <div className="text-rose-500">
                      <Icon size={22} />
                    </div>
                    {c.slug}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div>
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-zinc-400">No products found</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-rose-600 hover:text-rose-700 underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}