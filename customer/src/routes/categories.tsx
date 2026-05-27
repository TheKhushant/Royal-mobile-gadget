import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, products } from "@/data/products";

export const Route = createFileRoute("/categories")({
  component: Categories,
  head: () => ({ meta: [{ title: "Categories — Royal Mobile Accessories" }] }),
});

function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 py-8 sm:py-14">
      
      {/* Header */}
      <div className="text-center mb-8 sm:mb-14">
        <div className="text-[10px] sm:text-xs uppercase tracking-wide text-rose-600 font-medium">
          Explore Our Collection
        </div>

        <h1 className="font-display text-2xl sm:text-5xl mt-2">
          All Categories
        </h1>

        <p className="text-muted-foreground mt-2 sm:mt-4 max-w-md mx-auto text-xs sm:text-lg">
          Premium handpicked mobile accessories, gadgets, gifts & more
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-5">
        {categories.map((c) => {
          const sample = products.find((p) => p.category === c.slug);
          const count = products.filter((p) => p.category === c.slug).length;
          const Icon = c.icon;

          return (
            <Link
              key={c.slug}
              to="/shop"
              search={{ category: c.slug } as any}
              className="group relative rounded-xl sm:rounded-3xl overflow-hidden aspect-[4/3] shadow-sm hover:shadow-lg border border-zinc-100 hover:border-zinc-200 transition-all duration-300"
            >
              {sample && (
                <img
                  src={sample.image}
                  alt={c.slug}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 inset-x-0 p-2 sm:p-5">
                <div className="text-lg sm:text-4xl mb-1"><Icon size={18} className="sm:w-8 sm:h-8 text-white" /></div>

                <div className="font-display text-xs sm:text-2xl text-white tracking-tight line-clamp-1">
                  {c.slug}
                </div>

                <div className="text-white/80 text-[9px] sm:text-sm mt-0.5 flex items-center gap-1">
                  {count}+ products
                  <span className="text-[8px] sm:text-xs opacity-75 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>

              {/* Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-amber-400 to-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}