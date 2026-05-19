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
      <div className="bg-background/60 border border-gold rounded-md px-3 py-2 font-display text-2xl text-primary tabular-nums">{String(v).padStart(2, "0")}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{l}</div>
    </div>
  );
  return <div className="flex gap-2 justify-center md:justify-start">{box(t.h, "Hours")}{box(t.m, "Min")}{box(t.s, "Sec")}</div>;
}

function Home() {
  const trending = products.slice(0, 8);
  const featured = categories.slice(0, 6);
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,oklch(0.78_0.14_75/.4),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-20 lg:py-24 grid lg:grid-cols-2 gap-10 items-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 bg-secondary border border-gold/40 rounded-full px-3 py-1 text-xs text-primary mb-5">
              <Sparkles size={14} /> Nagpur's #1 Gadget Boutique
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              Best Deals on <span className="text-gradient-gold">Accessories</span>,<br />
              Gadgets &amp; <span className="italic text-accent">Gifts</span>
            </h1>
            <p className="mt-5 text-muted-foreground max-w-lg">
              Shop premium quality earbuds, smart watches, speakers, laptop gear, toys and royal gift hampers — handpicked by Royal Mobile Accessories, Nagpur.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/shop" className="bg-gradient-gold text-primary-foreground px-6 py-3 rounded-md font-semibold inline-flex items-center gap-2 shadow-gold">
                Shop Now <ArrowRight size={18} />
              </Link>
              <Link to="/gifts" className="border border-gold text-primary px-6 py-3 rounded-md font-semibold inline-flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                <Gift size={18} /> Gift Store
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><BadgeCheck size={14} className="text-primary" /> 100% Genuine</span>
              <span className="inline-flex items-center gap-1.5"><Truck size={14} className="text-primary" /> Same-day Nagpur Delivery</span>
              <span className="inline-flex items-center gap-1.5"><Shield size={14} className="text-primary" /> Warranty Assured</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-gold/40 shadow-royal">
              <img src={hero} alt="Royal accessories" width={1536} height={1024} className="w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent" />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-card royal-border rounded-xl p-4 shadow-card hidden sm:block">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Festive Flash Sale</div>
              <div className="font-display text-xl text-gradient-gold">Up to 70% OFF</div>
              <div className="mt-2"><Countdown /></div>
            </div>
          </motion.div>
        </div>

        {/* marquee */}
        <div className="border-y border-border/60 bg-card/40 overflow-hidden">
          <div className="marquee flex gap-12 py-3 whitespace-nowrap text-sm">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex gap-12 px-6">
                {["🚚 Free delivery above ₹499", "🎁 Free gift wrap on all gifts", "⭐ 10,000+ happy customers", "🔥 Diwali Mega Sale Live", "💳 UPI / COD / Razorpay"].map((t, i) => (
                  <span key={i} className="text-muted-foreground"><span className="text-primary">●</span> {t}</span>
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
            <div className="text-xs uppercase tracking-[0.25em] text-primary">Explore</div>
            <h2 className="font-display text-3xl sm:text-4xl mt-1">Featured Categories</h2>
          </div>
          <Link to="/categories" className="text-sm text-primary inline-flex items-center gap-1 hover:gap-2 transition-all">All categories <ArrowRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {featured.map((c, i) => (
            <motion.div key={c.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to="/shop" search={{ category: c.slug } as any} className="royal-border rounded-xl p-5 flex flex-col items-center gap-2 hover:shadow-gold transition-shadow text-center">
                <div className="text-3xl">{c.icon}</div>
                <div className="text-sm font-medium">{c.slug}</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* OFFER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-2xl bg-gradient-royal p-8 relative overflow-hidden">
            <div className="text-xs uppercase tracking-widest opacity-80">Limited Time</div>
            <h3 className="font-display text-3xl mt-2 text-white">Smart Watches<br /><span className="text-gold">Flat 60% OFF</span></h3>
            <Link to="/shop" search={{ category: "Smart Watches" } as any} className="mt-5 inline-flex bg-background text-foreground px-4 py-2 rounded-md text-sm font-medium">Shop Watches</Link>
            <div className="absolute -right-10 -bottom-10 text-[200px] opacity-10">⌚</div>
          </div>
          <div className="rounded-2xl bg-gradient-gold p-8 relative overflow-hidden text-primary-foreground">
            <div className="text-xs uppercase tracking-widest opacity-80">Festive Gifting</div>
            <h3 className="font-display text-3xl mt-2">Royal Gift Hampers<br /><span className="italic">From ₹499</span></h3>
            <Link to="/gifts" className="mt-5 inline-flex bg-background text-foreground px-4 py-2 rounded-md text-sm font-medium">Explore Gifts</Link>
            <div className="absolute -right-10 -bottom-10 text-[200px] opacity-15">🎁</div>
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-primary">Hot Right Now</div>
            <h2 className="font-display text-3xl sm:text-4xl mt-1">Trending Products</h2>
          </div>
          <Link to="/shop" className="text-sm text-primary inline-flex items-center gap-1 hover:gap-2 transition-all">View all <ArrowRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {trending.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* WHY US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-[0.25em] text-primary">The Royal Promise</div>
          <h2 className="font-display text-3xl sm:text-4xl mt-1">Why Choose Us</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { i: BadgeCheck, t: "100% Genuine", d: "Every product is brand authentic with original warranty." },
            { i: Truck, t: "Fast Delivery", d: "Same-day delivery within Nagpur. PAN-India shipping." },
            { i: Shield, t: "Trusted Service", d: "10+ years of serving Nagpur's tech lovers." },
            { i: Gift, t: "Custom Orders", d: "Can't find it? We'll source it for you specially." },
          ].map(({ i: I, t, d }, idx) => (
            <motion.div key={t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }} className="royal-border rounded-xl p-6">
              <div className="inline-grid place-items-center w-12 h-12 rounded-full bg-gradient-gold text-primary-foreground"><I size={22} /></div>
              <div className="mt-4 font-display text-xl">{t}</div>
              <p className="text-sm text-muted-foreground mt-1">{d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-[0.25em] text-primary">Loved by Nagpur</div>
          <h2 className="font-display text-3xl sm:text-4xl mt-1">Customer Reviews</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="royal-border rounded-xl p-6">
              <div className="flex gap-1 text-gold-soft mb-3">
                {Array.from({ length: r.rating }).map((_, k) => <Star key={k} size={14} fill="currentColor" />)}
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed">"{r.text}"</p>
              <div className="mt-4 text-xs text-primary font-medium">— {r.name}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
