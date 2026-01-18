"use client";

import { useUIStore } from "@/store/useUIStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { AuthUser } from "@/types/auth";

export const AuthModal = () => {
  const { isAuthOpen, closeAuth, authIntent, authReturnTo } = useUIStore();
  const [activeTab, setActiveTab] = useState<"signin" | "register">("signin");
  const [signinStage, setSigninStage] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { setUser, setGuest } = useAuthStore();

  const fallbackReturnTo = useMemo(() => {
    if (authIntent === "checkout") return "/checkout";

    const candidate = authReturnTo ?? pathname ?? "";
    if (candidate.startsWith("/product/") || candidate.startsWith("/shop/")) return candidate;
    return "/shop/all";
  }, [authIntent, authReturnTo, pathname]);

  useEffect(() => {
    if (!isAuthOpen) return;
    setError(null);
    setSigninStage("email");
    setPassword("");
  }, [isAuthOpen]);

  useEffect(() => {
    setError(null);
    setSigninStage("email");
    setPassword("");
  }, [activeTab]);

  const upsert = async (kind: "guest" | "account") => {
    setError(null);
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      setError("Email is required.");
      return null;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/upsert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
          name: activeTab === "register" ? name.trim() || undefined : undefined,
          kind,
          password: activeTab === "register" ? (password.trim() || undefined) : undefined,
        }),
      });

      if (!res.ok) {
        setError("Could not continue. Please check your email and try again.");
        return null;
      }

      const data = (await res.json()) as { user: AuthUser };
      setUser(data.user);
      return data.user;
    } catch {
      setError("Network error. Please try again.");
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  const finish = (returnTo: string) => {
    closeAuth();
    router.push(returnTo);
  };

  const handleAuth = async () => {
    if (activeTab === "signin" && signinStage === "email") {
      const normalizedEmail = email.trim();
      if (!normalizedEmail) {
        setError("Email is required.");
        return;
      }
      setSigninStage("password");
      return;
    }

    if (activeTab === "signin") {
      const normalizedEmail = email.trim().toLowerCase();
      if (!normalizedEmail) {
        setError("Email is required.");
        return;
      }
      if (!password.trim()) {
        setError("Password is required.");
        return;
      }

      setIsSubmitting(true);
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: normalizedEmail, password }),
        });
        if (!res.ok) {
          setError("Invalid email or password.");
          return;
        }
        const data = (await res.json()) as { user: AuthUser };
        setUser(data.user);
        finish(authIntent === "checkout" ? "/checkout" : "/account");
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Register
    if (!password.trim() || password.trim().length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const user = await upsert("account");
    if (!user) return;
    finish(authIntent === "checkout" ? "/checkout" : "/account");
  };

  const handleGuest = async () => {
    // Guest session should not require email here.
    setGuest();
    if (authIntent === "checkout") {
      finish("/checkout");
      return;
    }

    finish(fallbackReturnTo);
  };

  if (!isAuthOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-charcoal/30 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in-slow"
        onClick={closeAuth}
      >
        <div 
          className="bg-alabaster w-full max-w-md p-12 relative shadow-2xl animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={closeAuth}
            className="absolute top-6 right-6 font-mono text-xs opacity-50 hover:opacity-100"
          >
            [CLOSE]
          </button>

          {/* Header Tabs */}
          <div className="flex gap-8 mb-12 border-b border-charcoal/10 pb-4">
            <button 
              onClick={() => setActiveTab("signin")}
              className={`font-mono text-xs tracking-widest transition-opacity ${activeTab === "signin" ? "opacity-100" : "opacity-40"}`}
            >
              SIGN IN
            </button>
            <button 
              onClick={() => setActiveTab("register")}
              className={`font-mono text-xs tracking-widest transition-opacity ${activeTab === "register" ? "opacity-100" : "opacity-40"}`}
            >
              CREATE ACCOUNT
            </button>
          </div>

          {/* Form Content */}
          <div className="space-y-6">
            {activeTab === "register" && (
              <div className="space-y-1">
                <label className="font-mono text-[10px] uppercase tracking-wider block opacity-60">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b border-charcoal/20 py-2 font-mono text-sm focus:outline-none focus:border-charcoal transition-colors rounded-none placeholder:text-charcoal/20"
                  placeholder="JOHN DOE"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="font-mono text-[10px] uppercase tracking-wider block opacity-60">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-charcoal/20 py-2 font-mono text-sm focus:outline-none focus:border-charcoal transition-colors rounded-none placeholder:text-charcoal/20"
                placeholder="JOHN.DOE@EXAMPLE.COM"
              />
            </div>

            {(activeTab === "register" || signinStage === "password") && (
              <div className="space-y-1">
                <label className="font-mono text-[10px] uppercase tracking-wider block opacity-60">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-charcoal/20 py-2 font-mono text-sm focus:outline-none focus:border-charcoal transition-colors rounded-none"
                />
              </div>
            )}

            {error && (
              <p className="font-mono text-[10px] tracking-widest text-red-600/80">
                {error}
              </p>
            )}

            <button 
              onClick={handleAuth}
              disabled={isSubmitting}
              className="w-full bg-charcoal text-alabaster py-3 font-mono text-xs tracking-widest mt-8 hover:bg-black transition-colors disabled:opacity-50"
            >
              {isSubmitting
                ? "PLEASE WAIT"
                : activeTab === "signin"
                  ? signinStage === "email"
                    ? "CONTINUE"
                    : "ENTER"
                  : "JOIN"}
            </button>

            <div className="relative flex py-4 items-center">
              <div className="grow border-t border-charcoal/10"></div>
              <span className="shrink mx-4 text-charcoal/30 font-mono text-[10px]">OR</span>
              <div className="grow border-t border-charcoal/10"></div>
            </div>

            <button 
              onClick={handleGuest}
              disabled={isSubmitting}
              className="w-full border border-charcoal/20 py-3 font-mono text-xs tracking-widest hover:border-charcoal transition-colors disabled:opacity-50"
            >
              CONTINUE AS GUEST
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
