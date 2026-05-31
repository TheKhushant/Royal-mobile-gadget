import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ConfirmDialog } from "@/components/admin/Modal";
import { useRequireAuth } from "@/components/admin/useRequireAuth";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { Loader2, Trash2, Eye, EyeOff, Star } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({ meta: [{ title: "Reviews — Admin" }] }),
  component: ReviewsPage,
});

interface Review {
  _id?: string; id?: string;
  product?: any; user?: any; userName?: string;
  rating?: number; comment?: string; approved?: boolean; isVisible?: boolean;
  createdAt?: string;
}

function ReviewsPage() {
  const { ready } = useRequireAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [productFilter, setProductFilter] = useState("");
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      const r = await api.get("/products");
      const list = Array.isArray(r.data) ? r.data : r.data?.products || r.data?.data || [];
      setProducts(list);
      return list;
    } catch { return []; }
  };

  const loadReviews = async (list: any[]) => {
    setLoading(true);
    try {
      const targets = productFilter ? list.filter((p) => (p._id || p.id) === productFilter) : list;
      const results = await Promise.allSettled(targets.map((p) => api.get(`/reviews/product/${p._id || p.id}`)));
      const all: Review[] = [];
      results.forEach((res, idx) => {
        if (res.status === "fulfilled") {
          const data = res.value.data;
          const arr = Array.isArray(data) ? data : data?.reviews || data?.data || [];
          arr.forEach((rv: any) => all.push({ ...rv, product: rv.product || targets[idx] }));
        }
      });
      setReviews(all);
    } catch { toast.error("Failed to load reviews"); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    if (!ready) return;
    (async () => {
      const list = await loadProducts();
      await loadReviews(list);
    })();
  }, [ready]);

  useEffect(() => {
    if (ready && products.length) loadReviews(products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productFilter]);

  const toggle = async (r: Review) => {
    const id = r._id || r.id;
    try {
      await api.put(`/reviews/${id}`, { approved: !r.approved, isVisible: !(r.isVisible ?? r.approved) });
      toast.success("Updated");
      loadReviews(products);
    } catch { toast.error("Update failed"); }
  };

  const del = async (id: string) => {
    try { await api.delete(`/reviews/${id}`); toast.success("Deleted"); loadReviews(products); }
    catch { toast.error("Delete failed"); }
  };

  if (!ready) return null;

  return (
    <AdminLayout>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="text-2xl font-bold">Reviews</h1>
          <p className="text-sm text-muted-foreground">{reviews.length} reviews</p>
        </div>
        <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)} className="px-3 py-2 bg-input border border-border rounded-lg text-sm min-w-[200px]">
          <option value="">All products</option>
          {products.map((p) => <option key={p._id || p.id} value={p._id || p.id}>{p.name}</option>)}
        </select>
      </div>

      {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto mt-12" /> : (
        <div className="space-y-3">
          {reviews.length === 0 && <p className="text-muted-foreground text-center py-12">No reviews found</p>}
          {reviews.map((r) => {
            const id = (r._id || r.id)!;
            const visible = r.isVisible ?? r.approved ?? true;
            return (
              <div key={id} className="bg-card border border-border rounded-2xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium">{r.userName || r.user?.name || "Anonymous"}</span>
                      <span className="text-xs text-muted-foreground">on {r.product?.name || "—"}</span>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < (r.rating || 0) ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
                        ))}
                      </div>
                      <span className={`px-2 py-0.5 rounded text-xs ${visible ? "bg-emerald-500/15 text-emerald-500" : "bg-muted text-muted-foreground"}`}>
                        {visible ? "Visible" : "Hidden"}
                      </span>
                    </div>
                    <p className="text-sm mt-2">{r.comment}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => toggle(r)} className="p-2 rounded hover:bg-muted text-primary" title={visible ? "Hide" : "Show"}>
                      {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button onClick={() => setConfirmId(id)} className="p-2 rounded hover:bg-muted text-destructive"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ConfirmDialog open={!!confirmId} onClose={() => setConfirmId(null)} onConfirm={() => confirmId && del(confirmId)} title="Delete review?" />
    </AdminLayout>
  );
}