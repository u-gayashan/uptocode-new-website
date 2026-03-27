"use client";

import { useClerk, useSignIn, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function SsoCallbackPage() {
  const clerk = useClerk();
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const router = useRouter();
  const hasRun = useRef(false);

  const navigateToSignIn = () => {
    router.push("/sign-in");
  };

  const navigateToSignUp = () => {
    router.push("/sign-up");
  };

  useEffect(() => {
    (async () => {
      if (!clerk.loaded || hasRun.current) {
        return;
      }

      hasRun.current = true;

      // If this was a sign-in, and it's complete, there's nothing else to do.
      if (signIn.status === "complete") {
        await signIn.finalize({
          navigate: async ({ session, decorateUrl }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask);
              return;
            }

            const url = decorateUrl("/");
            if (url.startsWith("http")) {
              window.location.href = url;
            } else {
              router.push(url);
            }
          },
        });
        return;
      }

      // If the sign-up used an existing account, transfer it to a sign-in.
      if (signUp.isTransferable) {
        await signIn.create({ transfer: true });
        const signInStatus = signIn.status as typeof signIn.status | "complete";
        if (signInStatus === "complete") {
          await signIn.finalize({
            navigate: async ({ session, decorateUrl }) => {
              if (session?.currentTask) {
                console.log(session?.currentTask);
                return;
              }

              const url = decorateUrl("/");
              if (url.startsWith("http")) {
                window.location.href = url;
              } else {
                router.push(url);
              }
            },
          });
          return;
        }

        // The sign-in requires additional verification.
        return navigateToSignIn();
      }

      if (
        signIn.status === "needs_first_factor" &&
        !signIn.supportedFirstFactors?.every(
          (f) => f.strategy === "enterprise_sso",
        )
      ) {
        // The sign-in requires a configured first factor, so navigate to sign-in page.
        return navigateToSignIn();
      }

      // If the sign-in used an external account not associated with an existing user, create a sign-up.
      if (signIn.isTransferable) {
        await signUp.create({ transfer: true });
        if (signUp.status === "complete") {
          await signUp.finalize({
            navigate: async ({ session, decorateUrl }) => {
              if (session?.currentTask) {
                console.log(session?.currentTask);
                return;
              }

              const url = decorateUrl("/");
              if (url.startsWith("http")) {
                window.location.href = url;
              } else {
                router.push(url);
              }
            },
          });
          return;
        }

        return navigateToSignUp();
      }

      if (signUp.status === "complete") {
        await signUp.finalize({
          navigate: async ({ session, decorateUrl }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask);
              return;
            }

            const url = decorateUrl("/");
            if (url.startsWith("http")) {
              window.location.href = url;
            } else {
              router.push(url);
            }
          },
        });
        return;
      }

      if (
        signIn.status === "needs_second_factor" ||
        signIn.status === "needs_new_password"
      ) {
        return navigateToSignIn();
      }

      // The external account used to sign-in or sign-up was already associated with an existing user and
      // active session on this client, so activate the session and navigate to the application.
      if (signIn.existingSession || signUp.existingSession) {
        const sessionId =
          signIn.existingSession?.sessionId || signUp.existingSession?.sessionId;

        if (sessionId) {
          await clerk.setActive({
            session: sessionId,
            navigate: async ({ session, decorateUrl }) => {
              if (session?.currentTask) {
                console.log(session?.currentTask);
                return;
              }

              const url = decorateUrl("/");
              if (url.startsWith("http")) {
                window.location.href = url;
              } else {
                router.push(url);
              }
            },
          });
          return;
        }
      }
    })();
  }, [clerk, signIn, signUp, router]);

  return (
    <div>
      {/* Required for sign-up flows / bot protection when Clerk needs it */}
      <div id="clerk-captcha"></div>
    </div>
  );
}

