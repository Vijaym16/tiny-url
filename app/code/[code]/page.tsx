"use client";

import { useEffect, useState } from "react";

export default function StatsPage({ params }: { params: { code: string } }) {
  const { code } = params;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStats = async () => {
    const res = await fetch(`/api/links/${code}`);

    if (!res.ok) {
      setError("Shortcode not found");
      setLoading(false);
      return;
    }

    const json = await res.json();
    setData(json);
    setLoading(false);
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) {
    return <p className="p-4">Loading stats...</p>;
  }

  if (error) {
    return <p className="text-red-500 p-4">{error}</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">Stats for: {data.code}</h1>

      <div className="bg-white shadow p-4 rounded space-y-3">
        <p>
          <b>Target URL:</b>{" "}
          <a href={data.targetUrl} className="text-blue-600 underline">
            {data.targetUrl}
          </a>
        </p>

        <p>
          <b>Total Clicks:</b> {data.totalClicks}
        </p>

        <p>
          <b>Last Clicked:</b>{" "}
          {data.lastClicked
            ? new Date(data.lastClicked).toLocaleString()
            : "Never"}
        </p>

        <p>
          <b>Created At:</b>{" "}
          {data.createdAt
            ? new Date(data.createdAt).toLocaleString()
            : "Unknown"}
        </p>
      </div>
    </div>
  );
}
