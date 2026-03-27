import { SocialButton } from "@/components/auth/SocialButton";
import OrDivider from "@/components/auth/OrDivider";
import SignupForm from "@/components/auth/SignupForm";
import type { AuthProvider } from "@/types/auth";

const providers: AuthProvider[] = ["google", "outlook", "apple"];

export default function SignupCard() {
  return (
    <section className="w-full rounded-2xl border border-white/20 bg-[rgba(18,20,24,0.82)] px-5 py-5 shadow-[0_35px_80px_rgba(0,0,0,0.55)] backdrop-blur sm:px-8 sm:py-6 xl:px-10 xl:py-8">
      <p className="mb-3 text-center text-[15px] text-[#c5ced8]">
        Signup with:
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {providers.map((provider) => (
          <SocialButton key={provider} provider={provider} />
        ))}
      </div>

      <OrDivider />

      {/* Required for sign-up flows using Clerk's bot protection */}
      <div id="clerk-captcha" />

      <SignupForm />

      <p className="mt-5 text-sm leading-6 text-[#8e97a1]">
        By creating an account, you agree to the{" "}
        <span className="font-medium text-[#f2f4f7]">Terms of Service</span>.{" "}
        <span>
          We&apos;ll occasionally send you account-related emails.
        </span>
      </p>

      <p className="mt-5 text-center text-base sm:text-[17px] text-[#c4ccd6]">
        Already have an account?{" "}
        <a href="/login" className="text-[#d8ff3f]">
          Login
        </a>
      </p>
    </section>
  );
}

