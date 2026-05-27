import { createFileRoute, Link } from "@tanstack/react-router";
import { giftOccasions, giftRecipients, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export const Route = createFileRoute("/gifts")({
  component: Gifts,
  head: () => ({ meta: [{ title: "Gift Store — Royal Mobile Accessories" }] }),
});

function Gifts() {
  const giftProducts = products.filter(
    (p) =>
      p.category === "Gifts" ||
      p.category === "Toys" ||
      p.badge === "Gift Pack"
  );

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-rose-700 to-rose-800 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-16 text-center">
          <div className="text-[10px] sm:text-xs uppercase tracking-wide opacity-90">
            Thoughtful Gifting
          </div>

          <h1 className="font-display text-2xl sm:text-5xl mt-2">
            Gifts That Speak Royal
          </h1>

          <p className="mt-2 sm:mt-4 max-w-md mx-auto text-xs sm:text-lg opacity-90">
            Curated premium accessories, gadgets & hampers for every person and
            every occasion
          </p>
        </div>
      </section>

      {/* Shop by Recipient */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 py-8 sm:py-14">
        <h2 className="font-display text-xl sm:text-3xl mb-4 sm:mb-8">
          Shop by Recipient
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
          {giftRecipients.map((r) => (
            <Link
              key={r}
              to="/shop"
              search={{ category: "Gifts" } as any}
              className="royal-border bg-white rounded-xl sm:rounded-3xl p-3 sm:p-6 text-center hover:shadow-md transition-all group"
            >
              <div className="text-xl sm:text-4xl mb-1 sm:mb-3">🎁</div>

              <div className="font-medium text-[10px] sm:text-base group-hover:text-rose-600 transition-colors">
                For {r}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Shop by Occasion */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 pb-8 sm:pb-14">
        <h2 className="font-display text-xl sm:text-3xl mb-4 sm:mb-6">
          Shop by Occasion
        </h2>

        <div className="flex flex-wrap gap-2">
          {giftOccasions.map((o) => (
            <Link
              key={o}
              to="/shop"
              search={{ category: "Gifts" } as any}
              className="px-3 sm:px-5 py-1.5 sm:py-2 border border-zinc-200 hover:border-rose-600 hover:text-rose-600 rounded-lg sm:rounded-xl text-[10px] sm:text-sm font-medium transition-all"
            >
              {o}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 pb-10 sm:pb-16">
        <h2 className="font-display text-xl sm:text-3xl mb-4 sm:mb-8">
          Featured Gift Picks
        </h2>

        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-5">
          {giftProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}