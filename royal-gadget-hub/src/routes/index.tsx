import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAuth } from "@/lib/auth";
import { api } from "@/lib/api";
import { Package, FolderTree, Image as ImageIcon, AlertTriangle, Plus, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Dashboard — Royal Mobile Gadget Admin" }] }),
  component: DashboardPage,
});

interface Stats {
  products: number;
  categories: number;
  activeBanners: number;
  lowStock: number;
  recent: any[];
}

function DashboardPage() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({ products: 0, categories: 0, activeBanners: 0, lowStock: 0, recent: [] });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    if (!isAuthenticated) return;
    (async () => {
      try {
        const [p, c, b] = await Promise.all([
          api.get("/products"),
          api.get("/categories"),
          api.get("/banners"),
        ]);
        const products = Array.isArray(p.data) ? p.data : p.data?.products || p.data?.data || [];
        const categories = Array.isArray(c.data) ? c.data : c.data?.categories || c.data?.data || [];
        const banners = Array.isArray(b.data) ? b.data : b.data?.banners || b.data?.data || [];
        setStats({
          products: products.length,
          categories: categories.length,
          activeBanners: banners.filter((x: any) => x.isActive ?? x.active).length,
          lowStock: products.filter((x: any) => (x.stock ?? 0) < 5).length,
          recent: products.slice(0, 5),
        });
      } catch {
        /* offline-friendly */
      } finally {
        setLoadingStats(false);
      }
    })();
  }, [isAuthenticated]);

  if (loading || !isAuthenticated) return null;

  const cards = [
    { label: "Total Products", value: stats.products, icon: Package, color: "from-blue-500 to-indigo-500" },
    { label: "Total Categories", value: stats.categories, icon: FolderTree, color: "from-emerald-500 to-teal-500" },
    { label: "Active Banners", value: stats.activeBanners, icon: ImageIcon, color: "from-amber-500 to-orange-500" },
    { label: "Low Stock Items", value: stats.lowStock, icon: AlertTriangle, color: "from-rose-500 to-red-500" },
  ];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground">Manage your electronics store at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cards.map((c) => (
          <div key={c.label} className="bg-card border border-border rounded-2xl p-5 relative overflow-hidden">
            <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${c.color} opacity-20`} />
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-3`}>
              <c.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm text-muted-foreground">{c.label}</p>
            <p className="text-3xl font-bold mt-1">{loadingStats ? "—" : c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent Products</h2>
            <Link to="/products" className="text-sm text-primary flex items-center gap-1 hover:underline">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-muted-foreground border-b border-border">
                <tr>
                  <th className="py-2 pr-3">Name</th>
                  <th className="py-2 pr-3">Price</th>
                  <th className="py-2 pr-3">Stock</th>
                </tr>
              </thead>
              <tbody> 
                {stats.recent.length === 0 && (
                  <tr><td colSpan={3} className="py-8 text-center text-muted-foreground">No products yet</td></tr>
                )}
                {stats.recent.map((p: any) => (
                  <tr key={p._id || p.id} className="border-b border-border/50">
                    <td className="py-3 pr-3 font-medium">{p.name}</td>
                    <td className="py-3 pr-3">${p.price}</td>
                    <td className="py-3 pr-3">{p.stock ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { to: "/products", label: "Add Product" },
              { to: "/categories", label: "Add Category" },
              { to: "/banners", label: "Add Banner" },
              { to: "/reviews", label: "Moderate Reviews" },
            ].map((q) => (
              <Link
                key={q.to}
                to={q.to}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted text-sm"
              >
                <span className="flex items-center gap-2"><Plus className="w-4 h-4 text-primary" />{q.label}</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
