"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load all links on page load
  const loadLinks = async () => {
    const res = await fetch("/api/links");
    const data = await res.json();
    setLinks(data);
  };

  useEffect(() => {
    loadLinks();
  }, []);

  // Create new short URL
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const res = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, code }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Failed to create link");
    } else {
      setSuccess("Short URL created!");
      setUrl("");
      setCode("");
      loadLinks();
    }

    setLoading(false);
  };

  // Delete a shortcode
  const deleteLink = async (shortcode: string) => {
    await fetch(`/api/links/${shortcode}`, {
      method: "DELETE",
    });
    loadLinks();
  };
  
  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">TinyLink Dashboard</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6 space-y-3"
      >
        <input
          type="text"
          placeholder="Enter long URL..."
          className="w-full p-3 border-2 border-blue-500 rounded font-semibold text-black"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Custom shortcode (optional)"
          className="w-full p-3 border-2 border-green-500 rounded font-semibold text-black"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-40"
        >
          {loading ? "Creating..." : "Create Short URL"}
        </button>
      </form>

      {/* Links Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-900 text-white text-lg font-bold">
            <th className="border p-3 text-yellow-400">Shortcode</th>
            <th className="border p-3 text-blue-400">Target URL</th>
            <th className="border p-3 text-green-400">Clicks</th>
            <th className="border p-3 text-pink-400">Last Clicked</th>
            <th className="border p-3 text-red-400">Action</th>
          </tr>
        </thead>
        <tbody>
  {links.map((l) => (
    <tr key={l.code} className="hover:bg-gray-800">
      <td className="border p-3 font-bold text-yellow-300 text-lg">
        {l.code}
      </td>

      <td className="border p-3 max-w-xs">
        <a
          href={l.targetUrl}
          target="_blank"
          className="text-blue-400 underline font-semibold text-lg"
        >
          {l.targetUrl}
        </a>
      </td>

      <td className="border p-3 font-bold text-green-300 text-lg">
        {l.totalClicks}
      </td>

      <td className="border p-3 font-bold text-pink-300 text-lg">
        {l.lastClicked
          ? new Date(l.lastClicked).toLocaleString()
          : "-"}
      </td>

      <td className="border p-3">
        <button
          onClick={() => deleteLink(l.code)}
          className="bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
}
