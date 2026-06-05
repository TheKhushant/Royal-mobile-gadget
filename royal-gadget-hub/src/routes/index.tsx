import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAuth } from "@/lib/auth";
import { api } from "@/lib/api";
import { Package, FolderTree, Image as ImageIcon, AlertTriangle, ArrowRight, Clock, Copy } from "lucide-react";
import { Link } from "@tanstack/react-router";
import toast from "react-hot-toast";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Dashboard — Royal Mobile Gadget Admin" }] }),
  component: DashboardPage,
});

interface Order {
  _id: string;
  customerName: string;
  city?: string;
  state?: string;
  createdAt: string;
  total: number;
  status?: string;

  items?: {
    quantity: number;
    price: number;
    product?: {
      _id: string;
      name: string;
      images?: string[];
    };
  }[];
}

function DashboardPage() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    activeBanners: 0,
    lowStock: 0,
  });
  
  const [recentProducts, setRecentProducts] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const fullAddress = selectedOrder
  ? [
      selectedOrder.address,
      selectedOrder.city,
      selectedOrder.state,
      selectedOrder.pincode,
    ]
      .filter(Boolean)
      .join(", ")
  : "";

  const getProductDisplay = (order: Order) => {
    if (!order.items || order.items.length === 0) {
      return {
        text: "No Products",
        extra: 0,
      };
    }

    const names = order.items
      .map((item) => item.product?.name)
      .filter(Boolean);

    return {
      text: names[0] || "Unknown Product",
      extra: names.length - 1,
    };
  };

  useEffect(() => {
    if (!loading && !isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchDashboardData = async () => {
      setLoadingStats(true);

      try {
        const [pRes, cRes, bRes, oRes] = await Promise.all([
          api.get("/products"),
          api.get("/categories"),
          api.get("/banners"),
          api.get("/orders"),
        ]);

        const products = Array.isArray(pRes.data)
          ? pRes.data
          : pRes.data?.products || [];

        const categories = Array.isArray(cRes.data)
          ? cRes.data
          : cRes.data?.categories || [];

        const banners = Array.isArray(bRes.data)
          ? bRes.data
          : bRes.data?.banners || [];

        let orders = Array.isArray(oRes.data)
          ? oRes.data
          : oRes.data?.orders || [];

        orders = orders
          .sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
          )
          .slice(0, 5);

        setStats({
          products: products.length,
          categories: categories.length,
          activeBanners: banners.filter(
            (x: any) => x.isActive ?? x.active
          ).length,
          lowStock: products.filter(
            (x: any) => (x.stock ?? 0) < 5
          ).length,
        });

        setRecentProducts(products.slice(0, 6));
        setRecentOrders(orders);
      } finally {
        setLoadingStats(false);
      }
    };

    const fetchData = async () => {
      setLoadingStats(true);
      try {
        const [pRes, cRes, bRes, oRes] = await Promise.all([
          api.get("/products"),
          api.get("/categories"),
          api.get("/banners"),
          api.get("/orders"),           // ← New: Fetch real orders
        ]);

        const products = Array.isArray(pRes.data) ? pRes.data : pRes.data?.products || [];
        const categories = Array.isArray(cRes.data) ? cRes.data : cRes.data?.categories || [];
        const banners = Array.isArray(bRes.data) ? bRes.data : bRes.data?.banners || [];
        
        // Process Orders
        let orders = Array.isArray(oRes.data) 
          ? oRes.data 
          : oRes.data?.orders || oRes.data?.data || [];

        // Take only latest 5 orders
        orders = orders
          .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);

        setStats({
          products: products.length,
          categories: categories.length,
          activeBanners: banners.filter((x: any) => x.isActive ?? x.active).length,
          lowStock: products.filter((x: any) => (x.stock ?? 0) < 5).length,
        });

        setRecentProducts(products.slice(0, 6));
        setRecentOrders(orders);

      } catch (err) {
        console.error("Dashboard data fetch error:", err);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  if (loading || !isAuthenticated) return null;

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
     <div className="grid grid-cols-4 gap-2 mb-5">
      {[
        {
          label: "Products",
          value: stats.products,
          icon: Package,
          color: "text-blue-500 bg-blue-500/10",
        },
        {
          label: "Categories",
          value: stats.categories,
          icon: FolderTree,
          color: "text-emerald-500 bg-emerald-500/10",
        },
        {
          label: "Banners",
          value: stats.activeBanners,
          icon: ImageIcon,
          color: "text-amber-500 bg-amber-500/10",
        },
        {
          label: "Stock",
          value: stats.lowStock,
          icon: AlertTriangle,
          color: "text-red-500 bg-red-500/10",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-card border border-border rounded-lg p-2 flex flex-col items-center text-center shadow-sm"
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${item.color}`}
          >
            <item.icon className="w-4 h-4" />
          </div>

          <p className="text-base sm:text-lg font-bold leading-none">
            {loadingStats ? "—" : item.value}
          </p>

          <p className="text-[9px] sm:text-[11px] text-muted-foreground mt-1 leading-tight">
            {item.label}
          </p>
        </div>
      ))}
    </div>

      {/* Recent Orders Section - Now Real Data */}
      <div className="mb-4">
  <div className="flex items-center justify-between mb-2">
    <h2 className="font-semibold text-sm sm:text-base flex items-center gap-1">
      <Clock className="w-4 h-4" />
      Orders
    </h2>

    <Link
      to="/orders"
      className="text-xs sm:text-sm text-primary flex items-center gap-1"
    >
      All <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
    </Link>
  </div>

  <div className="bg-card border border-border rounded-xl overflow-hidden">
    {loadingStats ? (
      <div className="py-4 text-center text-xs text-muted-foreground">
        Loading...
      </div>
    ) : recentOrders.length === 0 ? (
      <div className="py-4 text-center text-xs text-muted-foreground">
        No orders
      </div>
    ) : (
      <div className="divide-y divide-border">
        {recentOrders.map((order) => (
          <div
            key={order._id}
            onClick={() => setSelectedOrder(order)}
            className="p-2 sm:p-4 hover:bg-muted/50 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              
              {/* Left */}
              <div className="min-w-0 w-24 sm:w-40">
                <p className="font-medium text-sm truncate">
                  {order.customerName}
                </p>
              </div>

              {/* Center */}
              <div className="flex-1 text-center min-w-0">
                <p className="text-xs sm:text-sm truncate">
                  {(() => {
                    const product = getProductDisplay(order);

                    return (
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-xs sm:text-sm truncate">
                          {product.text}
                        </p>

                        {product.extra > 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px]">
                            +{product.extra}
                          </span>
                        )}
                      </div>
                    );
                  })()}
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                  {order.city || "N/A"}, {order.state || "N/A"}
                </p>
              </div>

              {/* Right */}
              <div className="text-right shrink-0">
                <p className="font-semibold text-xs sm:text-sm">
                  ₹{(order.total || 0).toLocaleString("en-IN")}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                  })}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

      {/* Recent Products - Unchanged */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-sm sm:text-base">
            Recent Products
          </h2>

          <Link
            to="/products"
            className="text-xs sm:text-sm text-primary flex items-center gap-1"
          >
            All <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          {recentProducts.map((p: any) => (
            <Link
              key={p._id || p.id}
              to="/products"
              className="bg-card border border-border rounded-xl p-2 sm:p-4 hover:border-primary/50 transition-all"
            >
              <div className="flex flex-col gap-1">
                <h3 className="font-medium text-xs sm:text-sm line-clamp-2">
                  {p.name}
                </h3>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    ₹{p.price}
                  </p>

                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      p.stock > 5
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.stock}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions - Unchanged */}
      <div>
        <h2 className="font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { to: "/products", label: "Add Product", icon: Package },
            { to: "/categories", label: "Add Category", icon: FolderTree },
            { to: "/banners", label: "Add Banner", icon: ImageIcon },
            { to: "/reviews", label: "Reviews", icon: Clock },
          ].map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className="flex flex-col items-center justify-center bg-card border border-border hover:border-primary/50 rounded-2xl p-6 transition-all hover:shadow-sm"
            >
              <action.icon className="w-7 h-7 text-primary mb-3" />
              <span className="text-sm font-medium text-center">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md max-h-[85vh] overflow-hidden flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b shrink-0">
              <h2 className="text-lg font-semibold">
                Order Details
              </h2>

              <button
                onClick={() => setSelectedOrder(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            {/* Customer */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
              <p><strong>Name:</strong> {selectedOrder.customerName}</p>
              <div className="flex items-center gap-2">
                <strong>Phone:</strong>

                <a
                  href={`tel:${selectedOrder.phone}`}
                  className="text-primary hover:underline"
                >
                  {selectedOrder.phone}
                </a>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedOrder.phone);
                    toast.success("Phone copied");
                  }}
                  className="p-1 rounded hover:bg-muted"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground">
                    Delivery Address
                  </p>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(fullAddress);
                      toast.success("Address copied");
                    }}
                    className="p-1 rounded hover:bg-background/50 transition"
                    title="Copy Address"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm break-words leading-relaxed">
                  {fullAddress}
                </p>
              </div>
              <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold">
                    Products
                  </p>

                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/10">
                    {selectedOrder.items?.length || 0} Items
                  </span>
                </div>

                <div className="space-y-2">
                  {selectedOrder.items?.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border bg-background p-2"
                    >
                      <div className="min-w-0">
                        <p
                          onClick={() =>
                            setExpandedProduct(
                              expandedProduct === item._id
                                ? null
                                : item._id
                            )
                          }
                          className={`font-medium text-sm cursor-pointer ${
                            expandedProduct === item._id
                              ? "whitespace-normal break-words"
                              : "truncate"
                          }`}
                        >
                          {item.product?.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold">
                        ₹{item.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <p><strong>Total:</strong> ₹{selectedOrder.total?.toLocaleString("en-IN")}</p>

              <p>
                <strong>Ordered On:</strong>{" "}
                {new Date(selectedOrder.createdAt).toLocaleString("en-IN")}
              </p>
              {/* <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-3">
        <p className="text-xs text-muted-foreground mb-1">
          Delivery Address
        </p>

        <p className="text-sm break-words leading-relaxed">
          {[
            selectedOrder.address,
            selectedOrder.city,
            selectedOrder.state,
            selectedOrder.pincode,
          ]
            .filter(Boolean)
            .join(", ")}
        </p>
      </div> */}
            </div>
            

            {/* Actions */}
            <div className="p-4 border-t flex flex-wrap gap-2 shrink-0">

              <button
                className="flex-1 px-4 py-2 rounded-xl bg-yellow-500 text-black"
                onClick={async () => {
                  try {
                    await api.put(`/orders/${selectedOrder._id}/status`, {
                      status: "Pending",
                    });

                    toast.success("Order marked pending");
                    setSelectedOrder(null);

                    // loadDashboardData(); // ya loadOrders()
                  } catch {
                    toast.error("Failed to update order");
                  }
                }}
              >
                Keep Pending
              </button>

              <button
                className="flex-1 px-4 py-2 rounded-xl bg-green-600 text-white"
                onClick={async () => {
                  try {
                    await api.put(`/orders/${selectedOrder._id}/status`, {
                      status: "Confirmed",
                    });

                    toast.success("Order approved");
                    setSelectedOrder(null);

                    // Orders reload karne ke liye
                    // loadDashboardData(); // ya loadOrders()
                  } catch {
                    toast.error("Failed to approve order");
                  }
                }}
              >
                Approve
              </button>

              <button
                className="flex-1 px-4 py-2 rounded-xl bg-red-600 text-white"
                onClick={async () => {
                  try {
                    await api.put(`/orders/${selectedOrder._id}/status`, {
                      status: "Cancelled"
                    });

                    toast.success("Order declined");
                    setSelectedOrder(null);

                    // loadDashboardData(); // ya loadOrders()
                  } catch {
                    toast.error("Failed to decline order");
                  }
                }}
              >
                Decline
              </button>

            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}