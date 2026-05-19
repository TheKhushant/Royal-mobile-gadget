import { createFileRoute, Link } from "@tanstack/react-router";
import { giftOccasions, giftRecipients, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export const Route = createFileRoute("/gifts")({
  component: Gifts,
  head: () => ({ meta: [{ title: "Gift Store — Royal Mobile Accessories" }] }),
});

function Gifts() {
  const giftProducts = products.filter((p) => p.category === "Gifts" || p.category === "Toys" || p.badge === "Gift Pack");
  return (
    <>
      <section className="bg-gradient-royal text-accent-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
          <div className="text-xs uppercase tracking-[0.3em] opacity-80">Gift the Royal way</div>
          <h1 className="font-display text-4xl sm:text-6xl mt-2">A Gift for Every <span className="text-gold italic">Heart</span></h1>
          <p className="mt-4 max-w-xl mx-auto opacity-90">Curated hampers, premium accessories and thoughtful surprises for every occasion and every loved one.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="font-display text-3xl mb-6">Shop by Recipient</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {giftRecipients.map((r) => (
            <Link key={r} to="/shop" search={{ category: "Gifts" } as any} className="royal-border rounded-xl p-5 text-center hover:shadow-gold transition-shadow">
              <div className="text-2xl">🎁</div>
              <div className="text-sm font-medium mt-2">For {r}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">
        <h2 className="font-display text-3xl mb-6">Shop by Occasion</h2>
        <div className="flex flex-wrap gap-3">
          {giftOccasions.map((o) => (
            <Link key={o} to="/shop" search={{ category: "Gifts" } as any} className="border border-gold/50 text-primary px-5 py-2.5 rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
              {o}
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <h2 className="font-display text-3xl mb-6">Featured Gift Picks</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {giftProducts.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </>
  );
}
