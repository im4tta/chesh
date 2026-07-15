"use client";

import { useEffect, useState } from "react";

export function UpdateToast() {
  const [waitingWorker, setWaitingWorker] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const registerSW = async () => {
      const registration = await navigator.serviceWorker.register("/sw.js");
      if (registration.waiting) {
        setWaitingWorker(registration.waiting);
        setShow(true);
      }
      registration.addEventListener("updatefound", () => {
        const installing = registration.installing;
        if (!installing) return;
        installing.addEventListener("statechange", () => {
          if (installing.state === "installed" && navigator.serviceWorker.controller) {
            setWaitingWorker(installing);
            setShow(true);
          }
        });
      });
    };
    registerSW();

    let reloading = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (reloading) return;
      reloading = true;
      window.location.reload();
    });
  }, []);

  const handleUpdate = () => {
    if (!waitingWorker) return;
    waitingWorker.postMessage({ type: "SKIP_WAITING" });
    setShow(false);
  };

  const handleDismiss = () => setShow(false);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
      <div className="mx-auto max-w-md flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 shadow-lg">
        <span className="text-lg">🆕</span>
        <p className="flex-1 text-sm font-medium text-amber-900">
          New version available
        </p>
        <button
          onClick={handleUpdate}
          className="rounded-full bg-amber-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-amber-600 transition-colors"
        >
          Update
        </button>
        <button
          onClick={handleDismiss}
          className="text-amber-400 hover:text-amber-600 transition-colors"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
