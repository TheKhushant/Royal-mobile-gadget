import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Sparkles, Truck, Shield, Gift, Star, Trophy } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { categories, products, reviews } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
// import { Bot } from "lucide-react";
import toyPhoto from "@/assets/Royal Imgs/ele.png";

export const Route = createFileRoute("/")({ component: Home });
function HeroSlider() {
  const [currentImage, setCurrentImage] = useState(0);

  // Auto import all images from Flash cards folder
  const flashCards = Object.values(
    import.meta.glob("@/assets/Flash cards/*.{png,jpg,jpeg}", {
      eager: true,
      as: "url",
    })
  );

  // Change image every 3 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % flashCards.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [flashCards.length]);

  return (
    <motion.img
      key={currentImage}
      src={flashCards[currentImage]}
      alt="Royal accessories"
      className="w-full h-auto object-cover object-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    />
  );
}

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

// floting photo component
function FloatingToy() {
  const [showMessage, setShowMessage] = useState(true);
  const [currentToy, setCurrentToy] = useState(0);

  // Auto import all images from HomeToys folder
  const toys = Object.values(
    import.meta.glob("@/assets/HomeToys/*.{png,jpg,jpeg}", {
      eager: true,
      as: "url",
    })
  );

  // Hide hello message after 4 sec
  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Change toy every 5 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentToy((prev) => (prev + 1) % toys.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [toys.length]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute right-6 top-[100px] z-50 flex items-center gap-3"
    >
      {/* Hello bubble */}
      {showMessage && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white px-4 py-2 rounded-2xl shadow-lg border text-sm font-medium text-zinc-800"
        >
          Hello 👋
        </motion.div>
      )}

      {/* Toy image */}
      <motion.img
        key={currentToy}
        src={toys[currentToy]}
        alt="Toy"
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-24 h-24 object-cover rounded-2xl shadow-xl rotate-[-12deg] hover:rotate-0 transition-transform duration-300 cursor-pointer"
      />
    </motion.div>
  );
}

// Toy Say Hi component
// function FloatingToy() {
//   const [showMessage, setShowMessage] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setShowMessage(false), 4000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
    
//     <motion.div
//       initial={{ opacity: 0, x: 50 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.6 }}
//       className="fixed right-6 top-[200px] z-50 flex items-center gap-3"
//     >
//       {/* Hello Message */}
//       {showMessage && (
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           className="bg-white px-4 py-2 rounded-2xl shadow-lg border text-sm font-medium text-zinc-800"
//         >
//           Hello 👋
//         </motion.div>
//       )}

//       {/* Toy */}
//       <motion.div
//         animate={{ y: [0, -8, 0] }}
//         transition={{ repeat: Infinity, duration: 2 }}
//         className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 shadow-xl flex items-center justify-center text-white cursor-pointer"
//       >
//         <Bot size={30} />
//       </motion.div>
//     </motion.div>
//   );
// }

function Home() {
  const trending = products.slice(0, 8);
  const featured = categories.slice(0, 6);

  return (
    <>
    <FloatingToy />
      {/* HERO */}
      <section className="relative overflow-hidden bg-white ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-20 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 border border-rose-100 rounded-full px-4 py-1 text-xs font-medium mb-6">
              <Trophy size={15} /> Nagpur's Most Trusted Store
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tighter">
              Premium Accessories,<br />
              <span className="text-gradient-gold">Gadgets</span> &amp; <span className="italic">Gifts</span>
            </h1>

            <p className="mt-6 text-lg text-zinc-600 max-w-lg">
              Handpicked collection of earbuds, smartwatches, chargers, power banks, and luxurious gift hampers.
            </p>

           <div className="mt-8 flex flex-nowrap gap-2 overflow-x-auto">
          <Link
            to="/shop"
            className="whitespace-nowrap bg-gradient-to-r from-rose-600 to-rose-700 text-white px-6 py-3 rounded-2xl font-semibold inline-flex items-center gap-2 shadow-lg shadow-rose-500/30 hover:shadow-xl transition-all shrink-0"
          >
            Shop Now <ArrowRight size={20} />
          </Link>

          <Link
            to="/gifts"
            className="whitespace-nowrap border border-zinc-300 hover:border-rose-600 text-zinc-800 px-5 py-3 rounded-2xl font-semibold inline-flex items-center gap-2 transition-all shrink-0"
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
            
            <div className="relative h-[250px] rounded-3xl overflow-hidden border border-zinc-100 flex items-center justify-center">
              <HeroSlider />
            </div>

            {/* Flash Sale Card */}
            {/* <div className="absolute -bottom-6 -left-4 bg-white royal-border rounded-3xl p-6 shadow-xl hidden sm:block">
              <div className="text-xs uppercase tracking-widest text-rose-600">Festive Flash Sale</div>
              <div className="font-display text-2xl text-gradient-gold mt-1">Up to 70% OFF</div>
              <div className="mt-4"><Countdown /></div>
            </div> */}
          </motion.div>
        </div>

        {/* Marquee */}
        {/* <div className="border-y border-zinc-100 bg-zinc-50 py-4 overflow-hidden">
          <div className="marquee flex gap-12 whitespace-nowrap text-sm text-zinc-600">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex gap-12 px-6">
                {["🚚 Free Delivery on orders above ₹499", "🎁 Free Gift Wrapping", "⭐ 10,000+ Happy Customers", "🔥 Diwali Sale Live", "💳 UPI • Cards • COD"].map((t, i) => (
                  <span key={i}>• {t}</span>
                ))}
              </div>
            ))}
          </div>
        </div> */}
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-rose-600">Discover</div>
            <h2 className="font-display text-4xl mt-1">Featured Categories</h2>
          </div>
          <Link to="/categories" className="text-rose-600 inline-flex items-center gap-2 hover:gap-3 transition-all">
            All Categories <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {featured.map((c, i) => {
            const Icon = c.icon;   // important

            return (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to="/shop"
                  search={{ category: c.slug } as any}
                  className="royal-border bg-white rounded-2xl p-3 sm:p-4 min-h-[120px] sm:min-h-[140px] flex flex-col items-center justify-center text-center hover:shadow-xl transition-all group"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-rose-50 flex items-center justify-center mb-3 group-hover:bg-rose-100 transition">
                    <Icon className="w-7 h-7 sm:w-9 sm:h-9 text-rose-500 group-hover:scale-110 transition-transform" />
                  </div>

                  {/* Text */}
                  <div className="font-medium text-xs sm:text-sm lg:text-base leading-tight line-clamp-2 group-hover:text-rose-600 transition-colors">
                    {c.slug}
                  </div>
                </Link>
              </motion.div>
              
            );
          })}
        </div>
      </section>

      {/* OFFER BANNERS */}
<section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
  <div className="grid md:grid-cols-2 gap-8">

    {/* Card 1 */}
    <div className="group relative overflow-hidden rounded-[32px] bg-gradient-to-br from-rose-600 via-rose-700 to-black min-h-[320px] shadow-xl hover:shadow-2xl transition-all duration-500">

      {/* Background Glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex flex-col sm:flex-row items-center h-full p-8 gap-6">

        {/* Image */}
        <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-3xl overflow-hidden shadow-2xl shrink-0 group-hover:scale-105 transition duration-500">
          <img
            src="/images/watch.jpg"
            alt="Smart Watch"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="text-white text-center sm:text-left">
          <span className="text-xs uppercase tracking-[3px] text-white/70">
            Limited Time Offer
          </span>

          <h3 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            Smart Watches <br />
            <span className="text-amber-300">Flat 60% OFF</span>
          </h3>

          <p className="mt-3 text-sm text-white/80 max-w-xs">
            Premium collection with exclusive festive discounts.
          </p>

          <Link
            to="/shop"
            search={{ category: "Smart Watches" } as any}
            className="mt-5 inline-flex items-center bg-white text-black px-6 py-3 rounded-full font-semibold text-sm hover:bg-amber-300 transition"
          >
            Shop Now →
          </Link>
        </div>
      </div>
    </div>

    {/* Card 2 */}
    <div className="group relative overflow-hidden rounded-[32px] bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-600 min-h-[320px] shadow-xl hover:shadow-2xl transition-all duration-500">

      {/* Background Glow */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex flex-col sm:flex-row-reverse items-center h-full p-8 gap-6">

        {/* Image */}
        <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-3xl overflow-hidden shadow-2xl shrink-0 group-hover:scale-105 transition duration-500">
          <img
            src="/images/gift.jpg"
            alt="Gift Hamper"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="text-zinc-900 text-center sm:text-left">
          <span className="text-xs uppercase tracking-[3px] text-black/60">
            Festive Collection
          </span>

          <h3 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            Royal Gift Hampers <br />
            From <span className="text-white">₹499</span>
          </h3>

          <p className="mt-3 text-sm text-black/70 max-w-xs">
            Curated premium gift combos for every occasion.
          </p>

          <Link
            to="/gifts"
            className="mt-5 inline-flex items-center bg-black text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-white hover:text-black transition"
          >
            Explore Gifts →
          </Link>
        </div>
      </div>
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