import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Sparkles, Truck, Shield, Gift, Star } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { categories, products, reviews } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({ component: Home });

function Countdown() {
  const [t, setT] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    const end = new Date();
    end.setHours(23, 59, 59, 0);
    const id = setInterval(() => {
      const diff = +end - +new Date();
      const h = Math.max(0, Math.floor(diff / 3.6e6));
      const m = Math.max(0, Math.floor((diff / 6e4) % 60));
      const s = Math.max(0, Math.floor((diff / 1000) % 60));
      setT({ h, m, s });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const box = (v: number, l: string) => (
    <div className="text-center">
      <div className="bg-white border border-amber-300 rounded-2xl px-4 py-3 font-display text-2xl text-zinc-900 tabular-nums shadow-sm">
        {String(v).padStart(2, "0")}
      </div>
      <div className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1.5">{l}</div>
    </div>
  );

  return <div className="flex gap-3 justify-center">{box(t.h, "Hours")}{box(t.m, "Min")}{box(t.s, "Sec")}</div>;
}

function Home() {
  const trending = products.slice(0, 8);
  const featured = categories.slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-white pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-20 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 border border-rose-100 rounded-full px-4 py-1 text-xs font-medium mb-6">
              <Sparkles size={15} /> Nagpur's Most Trusted Store
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tighter">
              Premium Accessories,<br />
              <span className="text-gradient-gold">Gadgets</span> &amp; <span className="italic">Gifts</span>
            </h1>

            <p className="mt-6 text-lg text-zinc-600 max-w-lg">
              Handpicked collection of earbuds, smartwatches, chargers, power banks, and luxurious gift hampers.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="bg-gradient-to-r from-rose-600 to-rose-700 text-white px-8 py-4 rounded-2xl font-semibold inline-flex items-center gap-2 shadow-lg shadow-rose-500/30 hover:shadow-xl transition-all"
              >
                Shop Now <ArrowRight size={20} />
              </Link>
              <Link
                to="/gifts"
                className="border border-zinc-300 hover:border-rose-600 text-zinc-800 px-8 py-4 rounded-2xl font-semibold inline-flex items-center gap-2 transition-all"
              >
                <Gift size={20} /> Gift Store
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-zinc-600">
              <span className="inline-flex items-center gap-2"><BadgeCheck className="text-emerald-600" size={18} /> 100% Genuine</span>
              <span className="inline-flex items-center gap-2"><Truck className="text-rose-600" size={18} /> Same Day Delivery</span>
              <span className="inline-flex items-center gap-2"><Shield className="text-amber-600" size={18} /> Warranty Assured</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-zinc-100 shadow-2xl">
              <img src={hero} alt="Royal accessories" className="w-full h-auto" />
            </div>

            {/* Flash Sale Card */}
            <div className="absolute -bottom-6 -left-4 bg-white royal-border rounded-3xl p-6 shadow-xl hidden sm:block">
              <div className="text-xs uppercase tracking-widest text-rose-600">Festive Flash Sale</div>
              <div className="font-display text-2xl text-gradient-gold mt-1">Up to 70% OFF</div>
              <div className="mt-4"><Countdown /></div>
            </div>
          </motion.div>
        </div>

        {/* Marquee */}
        <div className="border-y border-zinc-100 bg-zinc-50 py-4 overflow-hidden">
          <div className="marquee flex gap-12 whitespace-nowrap text-sm text-zinc-600">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex gap-12 px-6">
                {["🚚 Free Delivery on orders above ₹499", "🎁 Free Gift Wrapping", "⭐ 10,000+ Happy Customers", "🔥 Diwali Sale Live", "💳 UPI • Cards • COD"].map((t, i) => (
                  <span key={i}>• {t}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-rose-600">Discover</div>
            <h2 className="font-display text-4xl mt-1">Featured Categories</h2>
          </div>
          <Link to="/categories" className="text-rose-600 inline-flex items-center gap-2 hover:gap-3 transition-all">
            All Categories <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {featured.map((c, i) => (
            <motion.div key={c.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link
                to="/shop"
                search={{ category: c.slug } as any}
                className="royal-border bg-white rounded-3xl p-8 flex flex-col items-center text-center hover:shadow-xl transition-all group"
              >
                <div className="text-4xl mb-4">{c.icon}</div>
                <div className="font-medium text-lg group-hover:text-rose-600 transition-colors">{c.slug}</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* OFFER BANNERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-rose-700 to-rose-800 rounded-3xl p-10 text-white relative overflow-hidden">
            <div className="text-xs uppercase tracking-widest opacity-75">Limited Time Offer</div>
            <h3 className="font-display text-4xl mt-3">Smart Watches<br />Flat <span className="text-amber-300">60% OFF</span></h3>
            <Link to="/shop" search={{ category: "Smart Watches" } as any} className="mt-6 inline-block bg-white text-black px-6 py-3 rounded-2xl font-semibold">Shop Now</Link>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-yellow-600 rounded-3xl p-10 text-zinc-900 relative overflow-hidden">
            <div className="text-xs uppercase tracking-widest opacity-75">Festive Collection</div>
            <h3 className="font-display text-4xl mt-3">Royal Gift Hampers<br />From <span className="font-semibold">₹499</span></h3>
            <Link to="/gifts" className="mt-6 inline-block bg-white text-black px-6 py-3 rounded-2xl font-semibold">Explore Gifts</Link>
          </div>
        </div>
      </section>

      {/* TRENDING PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-rose-600">Hot Right Now</div>
            <h2 className="font-display text-4xl mt-1">Trending Products</h2>
          </div>
          <Link to="/shop" className="text-rose-600 inline-flex items-center gap-2 hover:gap-3 transition-all">View All <ArrowRight size={16} /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trending.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* WHY US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 bg-zinc-50">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest text-rose-600">The Royal Promise</div>
          <h2 className="font-display text-4xl mt-2">Why Choose Us</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: BadgeCheck, title: "100% Genuine", desc: "Every product is brand authentic with original warranty" },
            { icon: Truck, title: "Fast Delivery", desc: "Same-day delivery in Nagpur & PAN-India shipping" },
            { icon: Shield, title: "Trusted Service", desc: "10+ years serving Nagpur with excellence" },
            { icon: Gift, title: "Custom Orders", desc: "Special sourcing for anything you desire" },
          ].map(({ icon: Icon, title, desc }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="royal-border bg-white rounded-3xl p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-white">
                <Icon size={28} />
              </div>
              <div className="font-display text-2xl mt-6">{title}</div>
              <p className="text-zinc-600 mt-2">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest text-rose-600">Loved by Nagpur</div>
          <h2 className="font-display text-4xl mt-2">Customer Reviews</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="royal-border bg-white rounded-3xl p-8"
            >
              <div className="flex text-amber-500 mb-4">
                {Array.from({ length: r.rating }).map((_, k) => (
                  <Star key={k} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-zinc-700 leading-relaxed">"{r.text}"</p>
              <div className="mt-6 text-sm font-medium text-rose-600">— {r.name}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}