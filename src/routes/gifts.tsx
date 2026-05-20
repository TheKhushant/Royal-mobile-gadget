import { createFileRoute, Link } from "@tanstack/react-router";
import { giftOccasions, giftRecipients, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export const Route = createFileRoute("/gifts")({
  component: Gifts,
  head: () => ({ meta: [{ title: "Gift Store — Royal Mobile Accessories" }] }),
});

function Gifts() {
  const giftProducts = products.filter(
    (p) => p.category === "Gifts" || p.category === "Toys" || p.badge === "Gift Pack"
  );

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-rose-700 to-rose-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
          <div className="text-xs uppercase tracking-[2px] opacity-90">Thoughtful Gifting</div>
          <h1 className="font-display text-5xl sm:text-6xl mt-3">Gifts That Speak Royal</h1>
          <p className="mt-4 max-w-xl mx-auto text-lg opacity-90">
            Curated premium accessories, gadgets &amp; hampers for every person and every occasion
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-display text-3xl mb-8">Shop by Recipient</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {giftRecipients.map((r) => (
            <Link
              key={r}
              to="/shop"
              search={{ category: "Gifts" } as any}
              className="royal-border bg-white rounded-3xl p-8 text-center hover:shadow-xl transition-all group"
            >
              <div className="text-4xl mb-4">🎁</div>
              <div className="font-semibold text-lg group-hover:text-rose-600 transition-colors">For {r}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="font-display text-3xl mb-6">Shop by Occasion</h2>
        <div className="flex flex-wrap gap-3">
          {giftOccasions.map((o) => (
            <Link
              key={o}
              to="/shop"
              search={{ category: "Gifts" } as any}
              className="px-6 py-3 border border-zinc-200 hover:border-rose-600 hover:text-rose-600 rounded-2xl text-sm font-medium transition-all"
            >
              {o}
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <h2 className="font-display text-3xl mb-8">Featured Gift Picks</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {giftProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}