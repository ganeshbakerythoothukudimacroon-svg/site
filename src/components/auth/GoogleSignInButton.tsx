"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (parent: HTMLElement, options: Record<string, string>) => void;
        };
      };
    };
  }
}

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export function GoogleSignInButton() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleCredential(response: { credential: string }) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || "Sign-in failed — please try again.");
        setLoading(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Sign-in failed — please check your connection and try again.");
      setLoading(false);
    }
  }

  function onScriptLoad() {
    if (!window.google || !containerRef.current || !CLIENT_ID) return;
    window.google.accounts.id.initialize({ client_id: CLIENT_ID, callback: handleCredential });
    window.google.accounts.id.renderButton(containerRef.current, {
      theme: "filled_black",
      shape: "pill",
      size: "large",
      text: "signin_with",
    });
  }

  if (!CLIENT_ID) {
    return <p className="text-sm text-[color:var(--text-muted)]">Sign-in isn&apos;t configured yet.</p>;
  }

  return (
    <div>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onLoad={onScriptLoad} />
      <div ref={containerRef} className={loading ? "pointer-events-none opacity-60" : ""} />
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </div>
  );
}
