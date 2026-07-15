export function isPWAInstalled() {
  return window.matchMedia("(display-mode: standalone)").matches;
}

export async function subscribeToPush() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    return { success: false, error: "Push not supported" };
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    let subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      return { success: true, alreadySubscribed: true, subscription };
    }

    const publicKey = await fetch("/api/push/vapid-public-key")
      .then((r) => r.text())
      .catch(() => null);

    if (!publicKey) {
      return { success: false, error: "No push server configured" };
    }

    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey),
    });

    await fetch("/api/push/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscription),
    });

    return { success: true, alreadySubscribed: false, subscription };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function unsubscribeFromPush() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) return false;
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      await subscription.unsubscribe();
      await fetch("/api/push/unsubscribe", { method: "POST" });
    }
    return true;
  } catch {
    return false;
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}
