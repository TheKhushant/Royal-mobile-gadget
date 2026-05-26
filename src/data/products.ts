import {
  Smartphone,
  Cpu,
  Laptop,
  Mouse,
  Watch,
  Headphones,
  Speaker,
  ToyBrick,
  Gift,
  LucideIcon,
} from "lucide-react";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  mrp: number;
  rating: number;
  image: string;
  description: string;
  badge?: string;
  specs?: string[];
};

const img = (q: string, seed: number) =>
  `https://images.unsplash.com/photo-${q}?auto=format&fit=crop&w=800&q=80&sig=${seed}`;

// Curated Unsplash photo IDs (royalty-free)
// export const products: Product[] = [
//   { id: "p1", name: "Royal Wireless Earbuds Pro", category: "Earbuds", price: 1299, mrp: 2999, rating: 4.7, image: img("1606220588913-b3aacb4d2f46", 1), description: "Premium ANC earbuds with 36hr battery, crystal HD audio and touch controls.", badge: "Bestseller", specs: ["Bluetooth 5.3", "Active Noise Cancel", "36h Battery", "IPX5"] },
//   { id: "p2", name: "Gold Edition Smart Watch", category: "Smart Watches", price: 1899, mrp: 4999, rating: 4.8, image: img("1546868871-7041f2a55e12", 2), description: "1.92\" AMOLED, BT calling, 100+ sport modes, SpO2 & heart-rate.", badge: "-62%", specs: ["AMOLED 1.92\"", "BT Calling", "IP68", "7-day battery"] },
//   { id: "p3", name: "Thunder Bluetooth Speaker", category: "Bluetooth Speakers", price: 999, mrp: 2499, rating: 4.6, image: img("1608043152269-423dbba4e7e1", 3), description: "20W stereo punch, deep bass, RGB lights and 12hr playback.", badge: "Hot", specs: ["20W RMS", "RGB Lights", "TWS Pairing", "12h Play"] },
//   { id: "p4", name: "65W GaN Fast Charger", category: "Mobile Accessories", price: 799, mrp: 1599, rating: 4.5, image: img("1583863788434-e58a36330cf0", 4), description: "Compact 3-port GaN charger – charge laptop, phone & buds together.", specs: ["65W PD", "3 Ports", "GaN III", "Foldable Pin"] },
//   { id: "p5", name: "Braided Type-C Cable 1.5m", category: "Mobile Accessories", price: 199, mrp: 499, rating: 4.4, image: img("1601524909162-ae8725290836", 5), description: "Tangle-free nylon braided cable, 6A fast charging.", specs: ["6A", "1.5m", "Nylon Braided"] },
//   { id: "p6", name: "Royal Gaming Mouse RGB", category: "Computer Accessories", price: 899, mrp: 1999, rating: 4.6, image: img("1527864550417-7fd91fc51a46", 6), description: "12000 DPI optical, 7 programmable buttons, lightweight.", specs: ["12000 DPI", "RGB", "7 Buttons"] },
//   { id: "p7", name: "Mechanical Keyboard 87 Keys", category: "Computer Accessories", price: 1799, mrp: 3499, rating: 4.7, image: img("1587829741301-dc798b83add3", 7), description: "Hot-swap blue switches, RGB backlit, USB-C detachable.", specs: ["TKL 87", "Blue Switch", "Hot Swap"] },
//   { id: "p8", name: "Laptop Cooling Stand", category: "Laptop Accessories", price: 1199, mrp: 2299, rating: 4.5, image: img("1593642632559-0c6d3fc62b89", 8), description: "Aluminium ergonomic stand with dual silent fans.", specs: ["Aluminium", "Dual Fan", "6 Heights"] },
//   { id: "p9", name: "USB-C Hub 7-in-1", category: "Laptop Accessories", price: 1499, mrp: 2999, rating: 4.6, image: img("1625948515291-69613efd103f", 9), description: "HDMI 4K, SD/TF, 3x USB 3.0, PD 100W passthrough.", specs: ["4K HDMI", "PD 100W", "SD/TF"] },
//   { id: "p10", name: "Remote Control Race Car", category: "Toys", price: 699, mrp: 1499, rating: 4.5, image: img("1558060370-d644479cb6f7", 10), description: "Rechargeable high-speed RC car, 2.4GHz, drift mode.", specs: ["2.4GHz", "Rechargeable", "20 km/h"] },
//   { id: "p11", name: "Soft Plush Teddy Bear", category: "Toys", price: 499, mrp: 999, rating: 4.8, image: img("1535268647677-300dbf3d78d1", 11), description: "Super soft 2ft teddy – perfect cuddly gift.", specs: ["60cm", "Hypoallergenic"] },
//   { id: "p12", name: "Premium Gift Hamper – Him", category: "Gifts", price: 1599, mrp: 2999, rating: 4.7, image: img("1549007994-cb92caebd54b", 12), description: "Curated wallet, perfume, watch & card – ready to gift.", badge: "Gift Pack", specs: ["Gift Wrapped", "4 Items"] },
//   { id: "p13", name: "Rose Gold Jewellery Box", category: "Gifts", price: 899, mrp: 1799, rating: 4.6, image: img("1515562141207-7a88fb7ce338", 13), description: "Elegant gift box with LED light & mirror.", specs: ["LED Light", "Velvet Lined"] },
//   { id: "p14", name: "Smart Ring Light Tripod", category: "Gadgets", price: 1099, mrp: 2199, rating: 4.5, image: img("1556761175-5973dc0f32e7", 14), description: "10\" ring light, 3 modes, BT remote, 1.6m tripod.", specs: ["10 inch", "BT Remote", "1.6m Tripod"] },
//   { id: "p15", name: "Mini Drone with Camera", category: "Gadgets", price: 2499, mrp: 4999, rating: 4.6, image: img("1473968512647-3e447244af8f", 15), description: "1080p HD camera, gesture control, foldable.", badge: "New", specs: ["1080p", "Foldable", "15 min Fly"] },
//   { id: "p16", name: "Magnetic Phone Holder", category: "Mobile Accessories", price: 299, mrp: 699, rating: 4.4, image: img("1574944985070-8f3ebc6b79d2", 16), description: "Strong magnet car & desk mount.", specs: ["N52 Magnet", "360° Rotate"] },
// ];

// export const categories = [
//   { slug: "Mobile Accessories", icon: Smartphone },
//   { slug: "Gadgets", icon: Cpu },
//   { slug: "Laptop Accessories", icon: Laptop },
//   { slug: "Computer Accessories", icon: Mouse },
//   { slug: "Smart Watches", icon: Watch },
//   { slug: "Earbuds", icon: Headphones },
//   { slug: "Bluetooth Speakers", icon: Speaker },
//   { slug: "Toys", icon: ToyBrick },
//   { slug: "Gifts", icon: Gift },
// ];

type Category = {
  slug: string;
  icon: LucideIcon;
};

export const categories: Category[] = [
  { slug: "Mobile Accessories", icon: Smartphone },
  { slug: "Gadgets", icon: Cpu },
  { slug: "Laptop Accessories", icon: Laptop },
  { slug: "Computer Accessories", icon: Mouse },
  { slug: "Smart Watches", icon: Watch },
  { slug: "Earbuds", icon: Headphones },
  { slug: "Bluetooth Speakers", icon: Speaker },
  { slug: "Toys", icon: ToyBrick },
  { slug: "Gifts", icon: Gift },
];


export const giftRecipients = ["Baby", "Boyfriend", "Girlfriend", "Mom", "Dad", "Sister", "Husband", "Wife"];
export const giftOccasions = ["Birthday", "Marriage", "Reception", "Anniversary", "Valentine", "Raksha Bandhan", "Baby Shower"];

export const reviews = [
  { name: "Aarav S.", text: "Genuine products at unbeatable prices. The Royal staff helped me pick the perfect smartwatch!", rating: 5 },
  { name: "Priya K.", text: "Loved the gift hamper – beautifully packed. Will surely come again.", rating: 5 },
  { name: "Rahul M.", text: "Got my custom phone cover printed in 2 days. Quality is top notch.", rating: 5 },
  { name: "Sneha P.", text: "Best mobile accessories shop in Nagpur. Highly recommended!", rating: 5 },
];

export const products = [
  {
    id: "p1",
    name: "Royal Wireless Earbuds Pro",
    price: 1299,
    mrp: 2999,
    rating: 4.7,
    category: "Earbuds",
    badge: "Bestseller",
    description: "Premium ANC earbuds with 36hr battery, crystal HD audio and touch controls.",
    specs: ["Bluetooth 5.3", "Active Noise Cancel", "36h Battery", "IPX5"],
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500",
    images: [
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
      "https://images.unsplash.com/photo-1606220945777-b4b6c2c9e0c1?w=500"
    ],
    relatedItems: [
      { id: "p2", name: "Gold Edition Smart Watch" },
      { id: "p3", name: "Thunder Bluetooth Speaker" },
      { id: "p6", name: "Royal Gaming Mouse RGB" }
    ]
  },
  {
    id: "p2",
    name: "Gold Edition Smart Watch",
    price: 1899,
    mrp: 4999,
    rating: 4.8,
    category: "Smart Watches",
    badge: "-62%",
    description: "1.92\" AMOLED, BT calling, 100+ sport modes, SpO2 & heart-rate.",
    specs: ["AMOLED 1.92\"", "BT Calling", "IP68", "7-day battery"],
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500",
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    ],
    relatedItems: [
      { id: "p1", name: "Royal Wireless Earbuds Pro" },
      { id: "p3", name: "Thunder Bluetooth Speaker" },
      { id: "p4", name: "65W GaN Fast Charger" }
    ]
  },
  {
    id: "p3",
    name: "Thunder Bluetooth Speaker",
    price: 999,
    mrp: 2499,
    rating: 4.6,
    category: "Bluetooth Speakers",
    badge: "Hot",
    description: "20W stereo punch, deep bass, RGB lights and 12hr playback.",
    specs: ["20W RMS", "RGB Lights", "TWS Pairing", "12h Play"],
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
      "https://images.unsplash.com/photo-1589003077984-894e133ddfab?w=500",
      "https://images.unsplash.com/photo-1589256469067-e39d5a7bfb52?w=500",
      "https://images.unsplash.com/photo-1589256469067-e39d5a7bfb52?w=500"
    ],
    relatedItems: [
      { id: "p1", name: "Royal Wireless Earbuds Pro" },
      { id: "p2", name: "Gold Edition Smart Watch" },
      { id: "p14", name: "Smart Ring Light Tripod" }
    ]
  },
  {
    id: "p4",
    name: "65W GaN Fast Charger",
    price: 799,
    mrp: 1599,
    rating: 4.5,
    category: "Mobile Accessories",
    description: "Compact 3-port GaN charger – charge laptop, phone & buds together.",
    specs: ["65W PD", "3 Ports", "GaN III", "Foldable Pin"],
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500",
    images: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500",
      "https://images.unsplash.com/photo-1627308595117-86a71c5f0b3d?w=500",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500",
      "https://images.unsplash.com/photo-1627308595117-86a71c5f0b3d?w=500"
    ],
    relatedItems: [
      { id: "p5", name: "Braided Type-C Cable 1.5m" },
      { id: "p16", name: "Magnetic Phone Holder" },
      { id: "p2", name: "Gold Edition Smart Watch" }
    ]
  },
  {
    id: "p5",
    name: "Braided Type-C Cable 1.5m",
    price: 199,
    mrp: 499,
    rating: 4.4,
    category: "Mobile Accessories",
    description: "Tangle-free nylon braided cable, 6A fast charging.",
    specs: ["6A", "1.5m", "Nylon Braided"],
    image: "https://images.unsplash.com/photo-1601524909162-ae8725290836?w=500",
    images: [
      "https://images.unsplash.com/photo-1601524909162-ae8725290836?w=500",
      "https://images.unsplash.com/photo-1546039907-2fa7a31ad169?w=500",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500",
      "https://images.unsplash.com/photo-1546039907-2fa7a31ad169?w=500"
    ],
    relatedItems: [
      { id: "p4", name: "65W GaN Fast Charger" },
      { id: "p16", name: "Magnetic Phone Holder" },
      { id: "p1", name: "Royal Wireless Earbuds Pro" }
    ]
  },
  {
    id: "p6",
    name: "Royal Gaming Mouse RGB",
    price: 899,
    mrp: 1999,
    rating: 4.6,
    category: "Computer Accessories",
    description: "12000 DPI optical, 7 programmable buttons, lightweight.",
    specs: ["12000 DPI", "RGB", "7 Buttons"],
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500",
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500"
    ],
    relatedItems: [
      { id: "p7", name: "Mechanical Keyboard 87 Keys" },
      { id: "p8", name: "Laptop Cooling Stand" },
      { id: "p1", name: "Royal Wireless Earbuds Pro" }
    ]
  },
  {
    id: "p7",
    name: "Mechanical Keyboard 87 Keys",
    price: 1799,
    mrp: 3499,
    rating: 4.7,
    category: "Computer Accessories",
    description: "Hot-swap blue switches, RGB backlit, USB-C detachable.",
    specs: ["TKL 87", "Blue Switch", "Hot Swap"],
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
      "https://images.unsplash.com/photo-1618384887929-16ec33a6e7d5?w=500",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500",
      "https://images.unsplash.com/photo-1618384887929-16ec33a6e7d5?w=500"
    ],
    relatedItems: [
      { id: "p6", name: "Royal Gaming Mouse RGB" },
      { id: "p8", name: "Laptop Cooling Stand" },
      { id: "p9", name: "USB-C Hub 7-in-1" }
    ]
  },
  {
    id: "p8",
    name: "Laptop Cooling Stand",
    price: 1199,
    mrp: 2299,
    rating: 4.5,
    category: "Laptop Accessories",
    description: "Aluminium ergonomic stand with dual silent fans.",
    specs: ["Aluminium", "Dual Fan", "6 Heights"],
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500",
    images: [
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500",
      "https://images.unsplash.com/photo-1588875732367-080b327b4903?w=500",
      "https://images.unsplash.com/photo-1593642532454-e138e28a63f4?w=500",
      "https://images.unsplash.com/photo-1588875732367-080b327b4903?w=500"
    ],
    relatedItems: [
      { id: "p7", name: "Mechanical Keyboard 87 Keys" },
      { id: "p9", name: "USB-C Hub 7-in-1" },
      { id: "p6", name: "Royal Gaming Mouse RGB" }
    ]
  },
  {
    id: "p9",
    name: "USB-C Hub 7-in-1",
    price: 1499,
    mrp: 2999,
    rating: 4.6,
    category: "Laptop Accessories",
    description: "HDMI 4K, SD/TF, 3x USB 3.0, PD 100W passthrough.",
    specs: ["4K HDMI", "PD 100W", "SD/TF"],
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500",
    images: [
      "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500",
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=500",
      "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=500",
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=500"
    ],
    relatedItems: [
      { id: "p8", name: "Laptop Cooling Stand" },
      { id: "p7", name: "Mechanical Keyboard 87 Keys" },
      { id: "p4", name: "65W GaN Fast Charger" }
    ]
  },
  {
    id: "p10",
    name: "Remote Control Race Car",
    price: 699,
    mrp: 1499,
    rating: 4.5,
    category: "Toys",
    description: "Rechargeable high-speed RC car, 2.4GHz, drift mode.",
    specs: ["2.4GHz", "Rechargeable", "20 km/h"],
    image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500",
    images: [
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500",
      "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=500",
      "https://images.unsplash.com/photo-1551893478-d726eaf0442c?w=500",
      "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=500"
    ],
    relatedItems: [
      { id: "p11", name: "Soft Plush Teddy Bear" },
      { id: "p15", name: "Mini Drone with Camera" },
      { id: "p3", name: "Thunder Bluetooth Speaker" }
    ]
  },
  {
    id: "p11",
    name: "Soft Plush Teddy Bear",
    price: 499,
    mrp: 999,
    rating: 4.8,
    category: "Toys",
    description: "Super soft 2ft teddy – perfect cuddly gift.",
    specs: ["60cm", "Hypoallergenic"],
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=500",
    images: [
      "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=500",
      "https://images.unsplash.com/photo-1567225557594-88d73e55f2b1?w=500",
      "https://images.unsplash.com/photo-1567225557594-88d73e55f2b1?w=500",
      "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=500"
    ],
    relatedItems: [
      { id: "p10", name: "Remote Control Race Car" },
      { id: "p12", name: "Premium Gift Hamper – Him" },
      { id: "p13", name: "Rose Gold Jewellery Box" }
    ]
  },
  {
    id: "p12",
    name: "Premium Gift Hamper – Him",
    price: 1599,
    mrp: 2999,
    rating: 4.7,
    category: "Gifts",
    badge: "Gift Pack",
    description: "Curated wallet, perfume, watch & card – ready to gift.",
    specs: ["Gift Wrapped", "4 Items"],
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500",
    images: [
      "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500",
      "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500"
    ],
    relatedItems: [
      { id: "p13", name: "Rose Gold Jewellery Box" },
      { id: "p11", name: "Soft Plush Teddy Bear" },
      { id: "p2", name: "Gold Edition Smart Watch" }
    ]
  },
  {
    id: "p13",
    name: "Rose Gold Jewellery Box",
    price: 899,
    mrp: 1799,
    rating: 4.6,
    category: "Gifts",
    description: "Elegant gift box with LED light & mirror.",
    specs: ["LED Light", "Velvet Lined"],
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500",
      "https://images.unsplash.com/photo-1583845112203-29329902332e?w=500",
      "https://images.unsplash.com/photo-1583845112203-29329902332e?w=500",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500"
    ],
    relatedItems: [
      { id: "p12", name: "Premium Gift Hamper – Him" },
      { id: "p11", name: "Soft Plush Teddy Bear" },
      { id: "p14", name: "Smart Ring Light Tripod" }
    ]
  },
  {
    id: "p14",
    name: "Smart Ring Light Tripod",
    price: 1099,
    mrp: 2199,
    rating: 4.5,
    category: "Gadgets",
    description: "10\" ring light, 3 modes, BT remote, 1.6m tripod.",
    specs: ["10 inch", "BT Remote", "1.6m Tripod"],
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500",
    images: [
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500"
    ],
    relatedItems: [
      { id: "p15", name: "Mini Drone with Camera" },
      { id: "p3", name: "Thunder Bluetooth Speaker" },
      { id: "p13", name: "Rose Gold Jewellery Box" }
    ]
  },
  {
    id: "p15",
    name: "Mini Drone with Camera",
    price: 2499,
    mrp: 4999,
    rating: 4.6,
    category: "Gadgets",
    badge: "New",
    description: "1080p HD camera, gesture control, foldable.",
    specs: ["1080p", "Foldable", "15 min Fly"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500",
    images: [
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500",
      "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=500",
      "https://images.unsplash.com/photo-1506947411487-a56738267384?w=500",
      "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=500"
    ],
    relatedItems: [
      { id: "p14", name: "Smart Ring Light Tripod" },
      { id: "p10", name: "Remote Control Race Car" },
      { id: "p3", name: "Thunder Bluetooth Speaker" }
    ]
  },
  {
    id: "p16",
    name: "Magnetic Phone Holder",
    price: 299,
    mrp: 699,
    rating: 4.4,
    category: "Mobile Accessories",
    description: "Strong magnet car & desk mount.",
    specs: ["N52 Magnet", "360° Rotate"],
    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500",
    images: [
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500",
      "https://images.unsplash.com/photo-1589719674482-ee4cb4f624f1?w=500",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500",
      "https://images.unsplash.com/photo-1589719674482-ee4cb4f624f1?w=500"
    ],
    relatedItems: [
      { id: "p4", name: "65W GaN Fast Charger" },
      { id: "p5", name: "Braided Type-C Cable 1.5m" },
      { id: "p1", name: "Royal Wireless Earbuds Pro" }
    ]
  }
];