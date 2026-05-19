import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, products } from "@/data/products";

export const Route = createFileRoute("/categories")({
  component: Categories,
  head: () => ({ meta: [{ title: "Categories — Royal Mobile Accessories" }] }),
});

function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
      <div className="text-center mb-12">
        <div className="text-xs uppercase tracking-[0.25em] text-primary">Browse</div>
        <h1 className="font-display text-4xl sm:text-5xl mt-1">All Categories</h1>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Find exactly what you're looking for — handpicked premium products in every category.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {categories.map((c) => {
          const sample = products.find((p) => p.category === c.slug);
          const count = products.filter((p) => p.category === c.slug).length;
          return (
            <Link key={c.slug} to="/shop" search={{ category: c.slug } as any} className="group royal-border rounded-2xl overflow-hidden relative aspect-[5/4] shadow-card hover:shadow-gold transition-shadow">
              {sample && (
                <img src={sample.image} alt={c.slug} loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-5">
                <div className="text-3xl">{c.icon}</div>
                <div className="font-display text-xl mt-1">{c.slug}</div>
                <div className="text-xs text-primary">{count}+ products →</div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
