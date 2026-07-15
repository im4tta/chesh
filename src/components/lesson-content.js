"use client";

import { useState } from "react";

export function LessonContent({ sections, titleKhmer }) {
  const [open, setOpen] = useState(false);

  if (!sections || sections.length === 0) return null;

  return (
    <div className="w-full max-w-lg mx-auto">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 py-3 px-5 rounded-2xl bg-primary/5 hover:bg-primary/10 border-2 border-primary/20 transition-all active:scale-[0.98]"
      >
        <span className="font-bold text-sm">
          {open ? "📖 Hide Lesson" : "📖 Show Lesson"}
        </span>
        <span className={`text-lg transition-transform ${open ? "rotate-180" : ""}`}>▼</span>
      </button>

      {open && (
        <div className="mt-3 p-5 rounded-2xl bg-card border-4 border-muted animate-slide-up space-y-5 text-left">
          {sections.map((section, idx) => (
            <div key={idx}>
              {section.title && (
                <h3 className="khmer-text text-lg font-bold mb-3 text-foreground">{section.title}</h3>
              )}

              {section.paragraphs?.map((p, i) => (
                <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-2">{p}</p>
              ))}

              {section.vowelList && (
                <div className="flex flex-wrap gap-2 justify-center my-3">
                  {section.vowelList.map((v, i) => (
                    <span
                      key={i}
                      className="khmer-text text-3xl font-bold bg-primary/5 rounded-xl px-3 py-1.5 border border-primary/20"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              )}

              {section.tableHeaders && section.tableRows && (
                <div className="overflow-x-auto rounded-xl border border-muted">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-primary/10">
                        {section.tableHeaders.map((h, i) => (
                          <th key={i} className="khmer-text px-3 py-2 text-left font-bold whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.tableRows.map((row, ri) => (
                        <tr key={ri} className="border-t border-muted even:bg-muted/30">
                          {row.map((cell, ci) => (
                            <td key={ci} className={`khmer-text px-3 py-2 whitespace-nowrap ${ci === 1 ? "text-lg font-bold" : ""}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
