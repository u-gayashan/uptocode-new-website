import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordCard() {
  return (
    <section className="mx-auto w-full max-w-[700px] rounded-2xl border border-white/20 bg-[rgba(18,20,24,0.82)] px-5 py-7 shadow-[0_35px_80px_rgba(0,0,0,0.55)] backdrop-blur sm:px-8 sm:py-9 md:px-10">
      <p className="mb-5 text-center text-[13px] text-[#cfd6e0]">
        Forgotten your password?
      </p>

      <ForgotPasswordForm />

      <p className="mt-6 text-center text-[13px] leading-6 text-[#8e97a1]">
        Do not have an account?{" "}
        <a href="/signup" className="text-[#d8ff3f]">
          Sign Up
        </a>
      </p>
    </section>
  );
}

