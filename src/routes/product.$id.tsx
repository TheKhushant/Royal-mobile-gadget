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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-rose-600 mb-8 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Shop
      </Link>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
        {/* Image Section */}
        <div className="royal-border bg-white rounded-3xl overflow-hidden aspect-square shadow-sm">
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
          />
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div className="text-xs uppercase tracking-widest text-rose-600 font-medium">{p.category}</div>
          
          <h1 className="font-display text-4xl sm:text-5xl leading-tight tracking-tight">{p.name}</h1>

          <div className="flex items-center gap-2">
            <div className="flex text-amber-500">
              <Star size={18} fill="currentColor" />
            </div>
            <span className="font-medium">{p.rating}</span>
            <span className="text-zinc-500 text-sm">(238 reviews)</span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-semibold text-zinc-900">₹{p.price}</span>
            <span className="text-xl line-through text-zinc-400">₹{p.mrp}</span>
            {off > 0 && (
              <span className="bg-rose-600 text-white text-sm font-bold px-4 py-1 rounded-2xl">
                -{off}% OFF
              </span>
            )}
          </div>

          <p className="text-zinc-600 leading-relaxed text-[15.5px]">{p.description}</p>

          {p.specs && (
            <div className="royal-border bg-white rounded-2xl p-6">
              <div className="uppercase text-xs tracking-widest text-rose-600 mb-4">Specifications</div>
              <ul className="grid grid-cols-2 gap-y-2 text-sm text-zinc-700">
                {p.specs.map((s: string) => (
                  <li key={s} className="flex items-start gap-2">• {s}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-6 text-sm text-zinc-600">
            <span className="inline-flex items-center gap-2"><Truck className="text-emerald-600" size={18} /> Free Delivery in Nagpur</span>
            <span className="inline-flex items-center gap-2"><Shield className="text-amber-600" size={18} /> 6 Months Warranty</span>
          </div>

          {/* Quantity & Stock */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-zinc-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-5 py-3 hover:bg-zinc-100 transition-colors text-xl"
              >
                −
              </button>
              <span className="px-8 font-semibold text-lg">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="px-5 py-3 hover:bg-zinc-100 transition-colors text-xl"
              >
                +
              </button>
            </div>
            <span className="text-emerald-600 font-medium">✓ In Stock</span>
          </div>

          {/* Action Buttons */}
          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            <button
              onClick={() => {
                add(p, qty);
                toast.success(`${p.name} added to cart`);
              }}
              className="border border-zinc-300 hover:border-zinc-400 font-semibold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.985]"
            >
              <ShoppingCart size={20} /> Add to Cart
            </button>

            <Link
              to="/cart"
              onClick={() => add(p, qty)}
              className="bg-gradient-to-r from-rose-600 to-rose-700 text-white font-semibold py-4 rounded-2xl text-center shadow-lg shadow-rose-500/30 hover:shadow-xl transition-all active:scale-[0.985]"
            >
              Buy Now
            </Link>
          </div>

          <a
            href={`https://wa.me/919876543210?text=${encodeURIComponent(waMsg)}`}
            target="_blank"
            rel="noreferrer"
            className="mt-2 w-full bg-[#25D366] text-white py-4 rounded-2xl inline-flex items-center justify-center gap-3 font-semibold hover:brightness-110 transition-all"
          >
            <MessageCircle size={20} /> Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="mt-24">
          <h2 className="font-display text-3xl mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((r) => (
              <ProductCard key={r.id} product={r} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}