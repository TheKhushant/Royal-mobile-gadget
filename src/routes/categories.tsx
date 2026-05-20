import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, products } from "@/data/products";

export const Route = createFileRoute("/categories")({
  component: Categories,
  head: () => ({ meta: [{ title: "Categories — Royal Mobile Accessories" }] }),
});

function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-16">
        <div className="text-xs uppercase tracking-[2px] text-rose-600 font-medium">Explore Our Collection</div>
        <h1 className="font-display text-5xl sm:text-6xl mt-3">All Categories</h1>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
          Premium handpicked mobile accessories, gadgets, gifts &amp; more
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((c) => {
          const sample = products.find((p) => p.category === c.slug);
          const count = products.filter((p) => p.category === c.slug).length;

          return (
            <Link
              key={c.slug}
              to="/shop"
              search={{ category: c.slug } as any}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3.2] shadow-sm hover:shadow-xl border border-zinc-100 hover:border-zinc-200 transition-all duration-300"
            >
              {sample && (
                <img
                  src={sample.image}
                  alt={c.slug}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent transition-opacity group-hover:via-black/40" />

              {/* Content */}
              <div className="absolute bottom-0 inset-x-0 p-6">
                <div className="text-4xl mb-2 drop-shadow-md">{c.icon}</div>
                <div className="font-display text-2xl text-white tracking-tight">{c.slug}</div>
                <div className="text-white/80 text-sm mt-1 flex items-center gap-2">
                  {count}+ products
                  <span className="text-xs opacity-75 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>

              {/* Gold Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}