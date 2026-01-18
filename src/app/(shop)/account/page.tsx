"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useUIStore } from "@/store/useUIStore";
import type { UserAddress, UserSettings } from "@/types/auth";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "wishlist" | "addresses" | "settings">("orders");
  const { user, isGuest, logout, setUser } = useAuthStore();
  const { openAuth } = useUIStore();

  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressDraft, setAddressDraft] = useState<UserAddress | null>(null);

  const [profileName, setProfileName] = useState("");
  const [settingsDraft, setSettingsDraft] = useState<UserSettings>({});
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (user) return;
    if (isGuest) {
      openAuth({ intent: "account", returnTo: "/shop/all" });
      return;
    }
    openAuth({ intent: "account", returnTo: "/shop/all" });
  }, [openAuth, user, isGuest]);

  useEffect(() => {
    if (!user) return;
    setProfileName(user.name ?? "");
    setSettingsDraft(user.settings ?? {});
  }, [user]);

  const memberSinceLabel = useMemo(() => {
    if (!user?.createdAt) return "";
    const d = new Date(user.createdAt);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short" });
  }, [user?.createdAt]);

  const displayName = useMemo(() => {
    if (!user) return "";
    if (user.name && user.name.trim().length > 0) return user.name.trim();
    return user.email.split("@")[0]?.toUpperCase() ?? "MEMBER";
  }, [user]);

  const orders = useMemo(() => {
    return [
      {
        id: "#1234",
        placedAt: "2026-01-08",
        status: "DELIVERED" as const,
        total: 450,
        items: [
          { name: "Structural Hoodie", qty: 1, price: 450, size: "M" },
        ],
      },
      {
        id: "#1230",
        placedAt: "2026-01-05",
        status: "SHIPPED" as const,
        total: 320,
        items: [
          { name: "Contour Tee", qty: 2, price: 160, size: "L" },
        ],
      },
      {
        id: "#1102",
        placedAt: "2025-12-28",
        status: "PROCESSING" as const,
        total: 210,
        items: [
          { name: "Utility Cap", qty: 1, price: 90, size: "OS" },
          { name: "Studio Shorts", qty: 1, price: 120, size: "M" },
        ],
      },
    ];
  }, []);

  const statusPill = (status: string) => {
    const base = "inline-flex items-center px-2 py-1 border font-mono text-[10px] tracking-widest";
    switch (status) {
      case "DELIVERED":
        return `${base} border-charcoal/20 text-charcoal`;
      case "SHIPPED":
        return `${base} border-charcoal/20 text-charcoal/80`;
      case "PROCESSING":
        return `${base} border-charcoal/20 text-charcoal/70`;
      case "CANCELLED":
        return `${base} border-charcoal/20 text-charcoal/60`;
      default:
        return `${base} border-charcoal/20 text-charcoal/70`;
    }
  };

  const addresses = user?.addresses ?? [];

  const saveUserPatch = async (patch: {
    name?: string;
    addresses?: UserAddress[];
    settings?: UserSettings;
    newPassword?: string;
  }) => {
    if (!user) return;
    setSaveError(null);
    setIsSaving(true);
    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, ...patch }),
      });
      if (!res.ok) {
        setSaveError("Could not save changes.");
        return;
      }
      const data = (await res.json()) as { user: import("@/types/auth").AuthUser };
      setUser(data.user);
    } catch {
      setSaveError("Network error. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const startEditAddress = (addr: UserAddress) => {
    setEditingAddressId(addr.id);
    setAddressDraft({ ...addr });
    setSaveError(null);
  };

  const startAddAddress = () => {
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `addr_${Date.now()}`;

    const draft: UserAddress = {
      id,
      label: "Home",
      fullName: user?.name ?? "",
      line1: "",
      city: "",
      postalCode: "",
      country: "",
      isDefaultShipping: addresses.length === 0,
      isDefaultBilling: addresses.length === 0,
    };
    setEditingAddressId(id);
    setAddressDraft(draft);
    setSaveError(null);
  };

  const normalizeDefaults = (list: UserAddress[]) => {
    const hasShip = list.some((a) => a.isDefaultShipping);
    const hasBill = list.some((a) => a.isDefaultBilling);
    return list.map((a, i) => ({
      ...a,
      isDefaultShipping: hasShip ? a.isDefaultShipping : i === 0,
      isDefaultBilling: hasBill ? a.isDefaultBilling : i === 0,
    }));
  };

  const setDefault = (id: string, field: "isDefaultShipping" | "isDefaultBilling") => {
    const next = addresses.map((a) => ({
      ...a,
      [field]: a.id === id,
    }));
    void saveUserPatch({ addresses: normalizeDefaults(next) });
  };

  const deleteAddress = (id: string) => {
    const next = addresses.filter((a) => a.id !== id);
    void saveUserPatch({ addresses: normalizeDefaults(next) });
  };

  const saveAddressDraft = () => {
    if (!addressDraft) return;
    if (!addressDraft.label.trim() || !addressDraft.fullName.trim() || !addressDraft.line1.trim() || !addressDraft.city.trim() || !addressDraft.postalCode.trim() || !addressDraft.country.trim()) {
      setSaveError("Please complete required address fields.");
      return;
    }

    const exists = addresses.some((a) => a.id === addressDraft.id);
    const next = exists
      ? addresses.map((a) => (a.id === addressDraft.id ? addressDraft : a))
      : [...addresses, addressDraft];

    void saveUserPatch({ addresses: normalizeDefaults(next) });
    setEditingAddressId(null);
    setAddressDraft(null);
  };

  const saveSettings = () => {
    void saveUserPatch({ name: profileName.trim() || undefined, settings: settingsDraft });
  };

  const savePassword = () => {
    if (!newPassword.trim() || newPassword.trim().length < 6) {
      setSaveError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setSaveError("Passwords do not match.");
      return;
    }
    void saveUserPatch({ newPassword });
    setNewPassword("");
    setConfirmPassword("");
  };

  if (!user) {
    return (
      <main className="min-h-screen pt-32 px-6 md:px-12 bg-alabaster">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-sans text-3xl md:text-4xl text-charcoal tracking-wide mb-2">
            ACCOUNT
          </h1>
          <p className="font-mono text-xs tracking-widest text-charcoal/40">
            PLEASE SIGN IN OR CONTINUE AS GUEST
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 px-6 md:px-12 bg-alabaster">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 animate-fade-in-slow">
          <div>
            <h1 className="font-sans text-3xl md:text-4xl text-charcoal tracking-wide mb-2">
              WELCOME BACK, {displayName.toUpperCase()}
            </h1>
            <p className="font-mono text-xs tracking-widest text-charcoal/40">
              MEMBER SINCE {memberSinceLabel || "2026"}
            </p>
          </div>
          <button
            onClick={logout}
            className="mt-4 md:mt-0 font-mono text-xs underline decoration-charcoal/20 hover:decoration-charcoal"
          >
            LOG OUT
          </button>
        </div>

        {saveError && (
          <div className="mb-10 border border-charcoal/10 bg-white/40 p-4">
            <p className="font-mono text-[10px] tracking-widest text-charcoal/70">{saveError}</p>
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Sidebar Nav */}
          <nav className="space-y-6">
            <button 
              onClick={() => setActiveTab("orders")}
              className={`block font-mono text-xs tracking-widest transition-opacity ${activeTab === "orders" ? "opacity-100" : "opacity-40"}`}
            >
              ORDER HISTORY
            </button>
            <button 
              onClick={() => setActiveTab("wishlist")}
              className={`block font-mono text-xs tracking-widest transition-opacity ${activeTab === "wishlist" ? "opacity-100" : "opacity-40"}`}
            >
              WISHLIST
            </button>
             <button 
              onClick={() => setActiveTab("addresses")}
              className={`block font-mono text-xs tracking-widest transition-opacity ${activeTab === "addresses" ? "opacity-100" : "opacity-40"}`}
            >
              ADDRESSES
            </button>
             <button 
              onClick={() => setActiveTab("settings")}
              className={`block font-mono text-xs tracking-widest transition-opacity ${activeTab === "settings" ? "opacity-100" : "opacity-40"}`}
            >
              SETTINGS
            </button>
          </nav>

          {/* Content Area */}
          <div className="md:col-span-3 min-h-[50vh]">
            
            {activeTab === "orders" && (
              <div className="space-y-6 animate-slide-up">
                {orders.map((order) => {
                  const isOpen = expandedOrderId === order.id;
                  return (
                    <div key={order.id} className="border border-charcoal/10 hover:bg-white/40 transition-colors">
                      <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="space-y-2 mb-4 md:mb-0">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs tracking-widest text-charcoal/60 block">ORDER {order.id}</span>
                            <span className={statusPill(order.status)}>{order.status}</span>
                          </div>
                          <span className="font-sans text-sm block">Placed on {order.placedAt}</span>
                        </div>
                        <div className="flex items-center gap-8">
                          <span className="font-mono text-sm">${order.total.toFixed(2)}</span>
                          <button
                            onClick={() => setExpandedOrderId(isOpen ? null : order.id)}
                            className="font-mono text-[10px] underline decoration-charcoal/20 hover:decoration-charcoal"
                          >
                            {isOpen ? "HIDE DETAILS" : "VIEW DETAILS"}
                          </button>
                        </div>
                      </div>

                      {isOpen && (
                        <div className="px-6 pb-6">
                          <div className="border-t border-charcoal/10 pt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                              <p className="font-mono text-[10px] tracking-widest text-charcoal/40 mb-3">ITEMS</p>
                              <div className="space-y-3">
                                {order.items.map((it, idx) => (
                                  <div key={`${order.id}_${idx}`} className="flex justify-between font-mono text-xs">
                                    <span className="text-charcoal/70">
                                      {it.name} · {it.size} · x{it.qty}
                                    </span>
                                    <span>${(it.price * it.qty).toFixed(2)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="font-mono text-[10px] tracking-widest text-charcoal/40 mb-3">SUMMARY</p>
                              <div className="space-y-2 font-mono text-xs text-charcoal/70">
                                <div className="flex justify-between"><span>Subtotal</span><span>${order.total.toFixed(2)}</span></div>
                                <div className="flex justify-between"><span>Shipping</span><span>Calculated</span></div>
                                <div className="flex justify-between border-t border-charcoal/10 pt-2 mt-2"><span>Total</span><span className="text-charcoal">${order.total.toFixed(2)}</span></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
                 <div className="aspect-4/5 bg-[#e5e5e5] flex items-center justify-center text-charcoal/20 font-mono text-xs">
                   [ WISHLIST ITEM PREVIEW ]
                 </div>
                 <div className="aspect-4/5 bg-[#e5e5e5] flex items-center justify-center text-charcoal/20 font-mono text-xs">
                   [ WISHLIST ITEM PREVIEW ]
                 </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="animate-slide-up space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="font-sans text-xl tracking-wide">ADDRESS BOOK</h2>
                  <button
                    onClick={startAddAddress}
                    className="font-mono text-xs underline decoration-charcoal/20 hover:decoration-charcoal"
                  >
                    ADD ADDRESS
                  </button>
                </div>

                {addresses.length === 0 && !addressDraft && (
                  <div className="border border-charcoal/10 p-6 bg-white/40">
                    <p className="font-mono text-xs tracking-widest text-charcoal/50">NO SAVED ADDRESSES</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="border border-charcoal/10 p-6 bg-white/30">
                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-mono text-xs tracking-widest text-charcoal/70">{addr.label.toUpperCase()}</span>
                            {addr.isDefaultShipping && (
                              <span className="font-mono text-[10px] tracking-widest text-charcoal/50">DEFAULT SHIPPING</span>
                            )}
                            {addr.isDefaultBilling && (
                              <span className="font-mono text-[10px] tracking-widest text-charcoal/50">DEFAULT BILLING</span>
                            )}
                          </div>
                          <p className="font-mono text-sm leading-relaxed">
                            {addr.fullName}<br />
                            {addr.line1}<br />
                            {addr.line2 ? (<>{addr.line2}<br /></>) : null}
                            {addr.city}{addr.region ? `, ${addr.region}` : ""} {addr.postalCode}<br />
                            {addr.country}
                            {addr.phone ? (<><br />{addr.phone}</>) : null}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                          <button
                            onClick={() => startEditAddress(addr)}
                            className="font-mono text-[10px] underline decoration-charcoal/20 hover:decoration-charcoal"
                          >
                            EDIT
                          </button>
                          <button
                            onClick={() => deleteAddress(addr.id)}
                            className="font-mono text-[10px] underline decoration-charcoal/20 hover:decoration-charcoal"
                          >
                            REMOVE
                          </button>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-charcoal/10 flex items-center justify-between">
                        <button
                          onClick={() => setDefault(addr.id, "isDefaultShipping")}
                          className="font-mono text-[10px] underline decoration-charcoal/20 hover:decoration-charcoal"
                        >
                          SET AS SHIPPING
                        </button>
                        <button
                          onClick={() => setDefault(addr.id, "isDefaultBilling")}
                          className="font-mono text-[10px] underline decoration-charcoal/20 hover:decoration-charcoal"
                        >
                          SET AS BILLING
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {addressDraft && editingAddressId === addressDraft.id && (
                  <div className="border border-charcoal/10 p-8 bg-white/40">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-sans text-lg tracking-wide">{addresses.some((a) => a.id === addressDraft.id) ? "EDIT ADDRESS" : "NEW ADDRESS"}</h3>
                      <button
                        onClick={() => {
                          setEditingAddressId(null);
                          setAddressDraft(null);
                          setSaveError(null);
                        }}
                        className="font-mono text-xs underline decoration-charcoal/20 hover:decoration-charcoal"
                      >
                        CANCEL
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        placeholder="Label (Home, Work...)"
                        value={addressDraft.label}
                        onChange={(e) => setAddressDraft({ ...addressDraft, label: e.target.value })}
                        className="bg-transparent border-b border-charcoal/20 py-2 font-mono text-sm focus:outline-none focus:border-charcoal placeholder:text-charcoal/30"
                      />
                      <input
                        placeholder="Full Name"
                        value={addressDraft.fullName}
                        onChange={(e) => setAddressDraft({ ...addressDraft, fullName: e.target.value })}
                        className="bg-transparent border-b border-charcoal/20 py-2 font-mono text-sm focus:outline-none focus:border-charcoal placeholder:text-charcoal/30"
                      />
                      <input
                        placeholder="Address Line 1"
                        value={addressDraft.line1}
                        onChange={(e) => setAddressDraft({ ...addressDraft, line1: e.target.value })}
                        className="md:col-span-2 bg-transparent border-b border-charcoal/20 py-2 font-mono text-sm focus:outline-none focus:border-charcoal placeholder:text-charcoal/30"
                      />
                      <input
                        placeholder="Address Line 2 (optional)"
                        value={addressDraft.line2 ?? ""}
                        onChange={(e) => setAddressDraft({ ...addressDraft, line2: e.target.value })}
                        className="md:col-span-2 bg-transparent border-b border-charcoal/20 py-2 font-mono text-sm focus:outline-none focus:border-charcoal placeholder:text-charcoal/30"
                      />
                      <input
                        placeholder="City"
                        value={addressDraft.city}
                        onChange={(e) => setAddressDraft({ ...addressDraft, city: e.target.value })}
                        className="bg-transparent border-b border-charcoal/20 py-2 font-mono text-sm focus:outline-none focus:border-charcoal placeholder:text-charcoal/30"
                      />
                      <input
                        placeholder="Region/State (optional)"
                        value={addressDraft.region ?? ""}
                        onChange={(e) => setAddressDraft({ ...addressDraft, region: e.target.value })}
                        className="bg-transparent border-b border-charcoal/20 py-2 font-mono text-sm focus:outline-none focus:border-charcoal placeholder:text-charcoal/30"
                      />
                      <input
                        placeholder="Postal Code"
                        value={addressDraft.postalCode}
                        onChange={(e) => setAddressDraft({ ...addressDraft, postalCode: e.target.value })}
                        className="bg-transparent border-b border-charcoal/20 py-2 font-mono text-sm focus:outline-none focus:border-charcoal placeholder:text-charcoal/30"
                      />
                      <input
                        placeholder="Country"
                        value={addressDraft.country}
                        onChange={(e) => setAddressDraft({ ...addressDraft, country: e.target.value })}
                        className="bg-transparent border-b border-charcoal/20 py-2 font-mono text-sm focus:outline-none focus:border-charcoal placeholder:text-charcoal/30"
                      />
                      <input
                        placeholder="Phone (optional)"
                        value={addressDraft.phone ?? ""}
                        onChange={(e) => setAddressDraft({ ...addressDraft, phone: e.target.value })}
                        className="md:col-span-2 bg-transparent border-b border-charcoal/20 py-2 font-mono text-sm focus:outline-none focus:border-charcoal placeholder:text-charcoal/30"
                      />
                    </div>

                    <button
                      onClick={saveAddressDraft}
                      disabled={isSaving}
                      className="mt-8 w-full bg-charcoal text-alabaster py-3 font-mono text-xs tracking-widest hover:bg-black transition-colors disabled:opacity-50"
                    >
                      {isSaving ? "SAVING" : "SAVE ADDRESS"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="animate-slide-up space-y-10">
                <div>
                  <h2 className="font-sans text-xl tracking-wide mb-4">PROFILE</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-mono text-[10px] tracking-widest text-charcoal/40">NAME</label>
                      <input
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        placeholder="Your name"
                        className="w-full bg-transparent border-b border-charcoal/20 py-2 font-mono text-sm focus:outline-none focus:border-charcoal placeholder:text-charcoal/30"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono text-[10px] tracking-widest text-charcoal/40">EMAIL</label>
                      <input
                        value={user.email}
                        readOnly
                        className="w-full bg-transparent border-b border-charcoal/10 py-2 font-mono text-sm opacity-60 focus:outline-none"
                      />
                    </div>
                  </div>
                  <button
                    onClick={saveSettings}
                    disabled={isSaving}
                    className="mt-6 bg-charcoal text-alabaster px-6 py-3 font-mono text-xs tracking-widest hover:bg-black transition-colors disabled:opacity-50"
                  >
                    {isSaving ? "SAVING" : "SAVE PROFILE"}
                  </button>
                </div>

                <div>
                  <h2 className="font-sans text-xl tracking-wide mb-4">PREFERENCES</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-mono text-[10px] tracking-widest text-charcoal/40">LANGUAGE</label>
                      <select
                        value={settingsDraft.language ?? "en"}
                        onChange={(e) => setSettingsDraft({ ...settingsDraft, language: e.target.value })}
                        className="w-full bg-transparent border-b border-charcoal/20 py-2 font-mono text-sm focus:outline-none"
                      >
                        <option value="en">English</option>
                        <option value="ms">Malay</option>
                        <option value="fr">French</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono text-[10px] tracking-widest text-charcoal/40">CURRENCY</label>
                      <select
                        value={settingsDraft.currency ?? "USD"}
                        onChange={(e) => setSettingsDraft({ ...settingsDraft, currency: e.target.value })}
                        className="w-full bg-transparent border-b border-charcoal/20 py-2 font-mono text-sm focus:outline-none"
                      >
                        <option value="USD">USD</option>
                        <option value="MYR">MYR</option>
                        <option value="EUR">EUR</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={saveSettings}
                    disabled={isSaving}
                    className="mt-6 bg-charcoal text-alabaster px-6 py-3 font-mono text-xs tracking-widest hover:bg-black transition-colors disabled:opacity-50"
                  >
                    {isSaving ? "SAVING" : "SAVE PREFERENCES"}
                  </button>
                </div>

                <div>
                  <h2 className="font-sans text-xl tracking-wide mb-4">NOTIFICATIONS</h2>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between gap-6 border border-charcoal/10 p-4 bg-white/30">
                      <span className="font-mono text-xs tracking-widest text-charcoal/70">ORDER UPDATES</span>
                      <input
                        type="checkbox"
                        checked={settingsDraft.orderUpdates ?? true}
                        onChange={(e) => setSettingsDraft({ ...settingsDraft, orderUpdates: e.target.checked })}
                      />
                    </label>
                    <label className="flex items-center justify-between gap-6 border border-charcoal/10 p-4 bg-white/30">
                      <span className="font-mono text-xs tracking-widest text-charcoal/70">MARKETING EMAILS</span>
                      <input
                        type="checkbox"
                        checked={settingsDraft.marketingEmails ?? false}
                        onChange={(e) => setSettingsDraft({ ...settingsDraft, marketingEmails: e.target.checked })}
                      />
                    </label>
                    <label className="flex items-center justify-between gap-6 border border-charcoal/10 p-4 bg-white/30">
                      <span className="font-mono text-xs tracking-widest text-charcoal/70">PRODUCT DROPS</span>
                      <input
                        type="checkbox"
                        checked={settingsDraft.productDrops ?? false}
                        onChange={(e) => setSettingsDraft({ ...settingsDraft, productDrops: e.target.checked })}
                      />
                    </label>
                  </div>
                  <button
                    onClick={saveSettings}
                    disabled={isSaving}
                    className="mt-6 bg-charcoal text-alabaster px-6 py-3 font-mono text-xs tracking-widest hover:bg-black transition-colors disabled:opacity-50"
                  >
                    {isSaving ? "SAVING" : "SAVE NOTIFICATIONS"}
                  </button>
                </div>

                <div>
                  <h2 className="font-sans text-xl tracking-wide mb-4">PRIVACY</h2>
                  <label className="flex items-center justify-between gap-6 border border-charcoal/10 p-4 bg-white/30">
                    <span className="font-mono text-xs tracking-widest text-charcoal/70">DATA SHARING</span>
                    <input
                      type="checkbox"
                      checked={settingsDraft.dataSharing ?? false}
                      onChange={(e) => setSettingsDraft({ ...settingsDraft, dataSharing: e.target.checked })}
                    />
                  </label>
                  <button
                    onClick={saveSettings}
                    disabled={isSaving}
                    className="mt-6 bg-charcoal text-alabaster px-6 py-3 font-mono text-xs tracking-widest hover:bg-black transition-colors disabled:opacity-50"
                  >
                    {isSaving ? "SAVING" : "SAVE PRIVACY"}
                  </button>
                </div>

                <div>
                  <h2 className="font-sans text-xl tracking-wide mb-4">SECURITY</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-mono text-[10px] tracking-widest text-charcoal/40">NEW PASSWORD</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••"
                        className="w-full bg-transparent border-b border-charcoal/20 py-2 font-mono text-sm focus:outline-none focus:border-charcoal placeholder:text-charcoal/30"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono text-[10px] tracking-widest text-charcoal/40">CONFIRM</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••"
                        className="w-full bg-transparent border-b border-charcoal/20 py-2 font-mono text-sm focus:outline-none focus:border-charcoal placeholder:text-charcoal/30"
                      />
                    </div>
                  </div>
                  <button
                    onClick={savePassword}
                    disabled={isSaving}
                    className="mt-6 bg-charcoal text-alabaster px-6 py-3 font-mono text-xs tracking-widest hover:bg-black transition-colors disabled:opacity-50"
                  >
                    {isSaving ? "SAVING" : "UPDATE PASSWORD"}
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </main>
  );
}
