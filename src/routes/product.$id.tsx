import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ShoppingCart, MessageCircle, Truck, Shield, Star, ArrowLeft } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";

export const Route = createFileRoute("/product/$id")({
  component: ProductPage,
  loader: ({ params }) => {
    const p = products.find((x) => x.id === params.id);
    if (!p) throw notFound();
    return p;
  },
  notFoundComponent: () => <div className="py-32 text-center text-muted-foreground">Product not found.</div>,
});

function ProductPage() {
  const p = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  const off = Math.round(((p.mrp - p.price) / p.mrp) * 100);
  const waMsg = `Hi Royal Mobile Accessories! I'm interested in ${p.name} (₹${p.price}). Is it available?`;
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6"><ArrowLeft size={14} /> Back to shop</Link>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="royal-border rounded-2xl overflow-hidden aspect-square bg-secondary">
          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-primary">{p.category}</div>
          <h1 className="font-display text-3xl sm:text-4xl mt-1">{p.name}</h1>
          <div className="flex items-center gap-2 mt-2 text-sm text-gold-soft">
            <Star size={14} fill="currentColor" /> {p.rating} <span className="text-muted-foreground">(238 reviews)</span>
          </div>
          <div className="flex items-baseline gap-3 mt-5">
            <span className="text-3xl font-semibold text-primary">₹{p.price}</span>
            <span className="text-lg line-through text-muted-foreground">₹{p.mrp}</span>
            <span className="bg-gradient-royal text-accent-foreground text-xs px-2 py-1 rounded font-semibold">-{off}% OFF</span>
          </div>
          <p className="mt-5 text-muted-foreground leading-relaxed">{p.description}</p>

          {p.specs && (
            <div className="mt-6 royal-border rounded-xl p-4">
              <div className="text-xs uppercase tracking-wider text-primary mb-2">Specifications</div>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                {p.specs.map((s: string) => <li key={s} className="text-muted-foreground">• {s}</li>)}
              </ul>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Truck size={14} className="text-primary" /> Free delivery in Nagpur</span>
            <span className="inline-flex items-center gap-1.5"><Shield size={14} className="text-primary" /> 6-month warranty</span>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center border border-border rounded-md">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-secondary">−</button>
              <span className="px-4 font-medium">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-2 hover:bg-secondary">+</button>
            </div>
            <span className="text-sm text-primary">In stock</span>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            <button onClick={() => { add(p, qty); toast.success("Added to cart"); }} className="border border-gold text-primary font-medium py-3 rounded-md inline-flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors">
              <ShoppingCart size={16} /> Add to Cart
            </button>
            <Link to="/cart" onClick={() => add(p, qty)} className="bg-gradient-gold text-primary-foreground font-semibold py-3 rounded-md text-center shadow-gold">Buy Now</Link>
          </div>
          <a href={`https://wa.me/919876543210?text=${encodeURIComponent(waMsg)}`} target="_blank" rel="noreferrer" className="mt-3 w-full bg-[#25D366] text-white py-3 rounded-md inline-flex items-center justify-center gap-2 font-medium">
            <MessageCircle size={16} /> WhatsApp Inquiry
          </a>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-display text-2xl sm:text-3xl mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {related.map((r) => <ProductCard key={r.id} product={r} />)}
          </div>
        </div>
      )}
    </section>
  );
}
