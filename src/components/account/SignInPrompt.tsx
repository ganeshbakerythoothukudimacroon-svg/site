import { UserCircle2 } from "lucide-react";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

export function SignInPrompt() {
  return (
    <div className="glass-card flex flex-col items-center gap-4 rounded-[var(--radius-card)] p-10 text-center">
      <span className="glass-subtle flex h-14 w-14 items-center justify-center rounded-full text-[color:var(--gold-400)]">
        <UserCircle2 className="h-7 w-7" />
      </span>
      <div>
        <p className="font-display text-lg text-[color:var(--text-primary)]">Sign in to your account</p>
        <p className="mt-1 max-w-xs text-sm text-[color:var(--text-muted)]">
          Save your delivery address for faster checkout and see your order history.
        </p>
      </div>
      <GoogleSignInButton />
    </div>
  );
}
