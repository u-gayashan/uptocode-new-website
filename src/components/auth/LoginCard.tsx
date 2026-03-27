import LoginForm from "@/components/auth/LoginForm";

export default function LoginCard() {
  return (
    <section className="mx-auto w-full max-w-[700px] rounded-2xl border border-white/20 bg-[rgba(18,20,24,0.82)] px-5 py-7 shadow-[0_35px_80px_rgba(0,0,0,0.55)] backdrop-blur sm:px-8 sm:py-9 md:px-10">
      <p className="mb-8 text-center text-[15px] text-[#c5ced8]">
        Login to Untocode
      </p>

      <LoginForm />

      <p className="mt-6 text-center text-[13px] leading-6 text-[#8e97a1]">
        Do not have an account?{" "}
        <a href="/signup" className="text-[#d8ff3f]">
          Sign Up
        </a>
      </p>
    </section>
  );
}

