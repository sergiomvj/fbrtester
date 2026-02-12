
'use client';

import { useEffect, useState } from 'react';

interface AuditResult {
  url: string;
  status: number;
  links: string[];
  externalLinks: string[];
  brokenLinks: any[];
  assets: any[];
  interactables: any[];
  accessibility: any[];
}

export default function Home() {
  const [data, setData] = useState<AuditResult[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/report.json')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-white">Loading Report...</div>;
  if (!data) return <div className="p-8 text-white">No report found. Run the auditor first.</div>;

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8 font-sans">
      <header className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          8Tester Dashboard
        </h1>
        <p className="text-neutral-400 mt-2">Quality Assurance Overview</p>
      </header>

      <div className="grid gap-6">
        {data.map((page, i) => (
          <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-neutral-700 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-white">{page.url}</h2>
                <div className="flex gap-2 mt-2">
                  <span className={`px-2 py-1 rounded text-xs font-mono ${page.status === 200 ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                    Status: {page.status}
                  </span>
                  <span className="px-2 py-1 rounded text-xs font-mono bg-blue-900 text-blue-300">
                    Links: {page.links.length}
                  </span>
                  <span className="px-2 py-1 rounded text-xs font-mono bg-purple-900 text-purple-300">
                    Assets: {page.assets?.length || 0}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Interactables */}
              <div className="bg-neutral-950 p-4 rounded border border-neutral-800">
                <h3 className="font-semibold mb-2 text-neutral-300">Interactables</h3>
                {page.interactables?.length ? (
                  <ul className="space-y-1">
                    {page.interactables.slice(0, 5).map((el: any, j: number) => (
                      <li key={j} className="text-sm text-neutral-400 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        {el.type}: {el.text || el.selector}
                      </li>
                    ))}
                    {page.interactables.length > 5 && <li className="text-xs text-neutral-500">...and {page.interactables.length - 5} more</li>}
                  </ul>
                ) : <p className="text-sm text-neutral-500">None found</p>}
              </div>

              {/* Accessibility */}
              <div className="bg-neutral-950 p-4 rounded border border-neutral-800">
                <h3 className="font-semibold mb-2 text-neutral-300">Accessibility</h3>
                {page.accessibility?.length ? (
                  <div className="space-y-2">
                    {page.accessibility.map((a: any, k: number) => (
                      <div key={k} className="text-sm text-red-300 bg-red-900/20 p-2 rounded">
                        {a.id}: {a.help}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-green-400 text-sm flex items-center gap-2">
                    <span>✅</span> No violations found (Axe)
                  </div>
                )}
              </div>
            </div>

            {/* Broken Links */}
            {page.brokenLinks?.length > 0 && (
              <div className="mt-4 bg-red-950/30 p-4 rounded border border-red-900/50">
                <h3 className="font-semibold mb-2 text-red-400">Broken Links</h3>
                <ul className="space-y-1">
                  {page.brokenLinks.map((l: any, m: number) => (
                    <li key={m} className="text-sm text-red-300">{l.url} ({l.status})</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
