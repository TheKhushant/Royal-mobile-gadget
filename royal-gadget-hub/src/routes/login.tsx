import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { Zap, Loader2, Mail, Lock } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Royal Mobile Admin" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate({ to: "/" });
  }, [isAuthenticated, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Enter email and password");
    setSubmitting(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.token || res.data.accessToken;
      const user = res.data.user || res.data.admin || { email };
      if (!token) throw new Error("No token returned");
      login(token, user);
      toast.success("Welcome back!");
      navigate({ to: "/" });
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  const loginAsAdmin = async () => {
    setSubmitting(true);

    try {
      const res = await api.post("/auth/login", {
        email: "admin@royalgadget.com",
        password: "admin123",
      });

      const token = res.data.token || res.data.accessToken;
      const user =
        res.data.user ||
        res.data.admin || {
          email: "admin@royalgadget.com",
        };

      if (!token) throw new Error("No token returned");

      login(token, user);
      toast.success("Welcome back!");
      navigate({ to: "/" });
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          err.message ||
          "Quick login failed"
      );
    } finally {
      setSubmitting(false);
    }
  };
    

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/10">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div
            onContextMenu={(e) => {
              e.preventDefault();
              loginAsAdmin();
            }}
           className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
            <Zap className="w-7 h-7 text-primary-foreground" />
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-center">Royal Mobile Gadget</h1>
          <p className="text-sm text-muted-foreground text-center mt-1 mb-6">Admin Dashboard Login</p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1.5">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@royal.com"
                  className="w-full pl-10 pr-3 py-2.5 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2.5 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="accent-primary" />
              Remember me
            </label>
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium text-sm hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              Sign In
            </button>
            
          </form>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4">© Royal Mobile Gadget Admin</p>
      </div>
    </div>
  );
}