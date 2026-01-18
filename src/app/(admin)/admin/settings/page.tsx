"use client";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-sans text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="font-mono text-xs text-charcoal/50 mt-1">Store and admin preferences</p>
      </div>

      <div className="bg-white border border-charcoal/5 rounded-xl p-6">
        <div className="space-y-4 max-w-xl">
          <div>
            <label className="block text-sm font-medium text-charcoal/70">Store name</label>
            <input
              defaultValue="VEPHYR"
              className="mt-2 w-full px-3 py-2 border border-charcoal/10 rounded-md focus:outline-none focus:ring-1 focus:ring-charcoal"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal/70">Support email</label>
            <input
              defaultValue="support@vephyr.com"
              className="mt-2 w-full px-3 py-2 border border-charcoal/10 rounded-md focus:outline-none focus:ring-1 focus:ring-charcoal font-mono"
            />
          </div>
          <button className="mt-2 px-4 py-2 bg-charcoal text-white text-sm font-medium rounded-md hover:bg-black transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
