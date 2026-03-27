"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

const USERS_ENDPOINT = "http://localhost:8000/api/v1/users/";

export function SyncClerkUser() {
  const { isLoaded: isAuthLoaded, isSignedIn, getToken } = useAuth();
  const { isLoaded: isUserLoaded, user } = useUser();
  const syncedForUserRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isAuthLoaded || !isUserLoaded || !isSignedIn || !user) {
      return;
    }

    if (syncedForUserRef.current === user.id) {
      return;
    }

    const primaryEmail =
      user.emailAddresses.find((email) => email.id === user.primaryEmailAddressId)
        ?.emailAddress ?? null;
    const primaryPhone =
      user.phoneNumbers.find((phone) => phone.id === user.primaryPhoneNumberId)
        ?.phoneNumber ?? null;

    const payload = {
      clerk_user_id: user.id,
      primary_email: primaryEmail,
      first_name: user.firstName ?? null,
      last_name: user.lastName ?? null,
      image_url: user.imageUrl ?? null,
      phone_number: primaryPhone,
    };

    const syncUser = async () => {
      try {
        const token = await getToken();
        const response = await fetch(USERS_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          console.error("Failed to sync Clerk user", response.status);
          return;
        }

        syncedForUserRef.current = user.id;
      } catch (error) {
        console.error("Error syncing Clerk user", error);
      }
    };

    void syncUser();
  }, [getToken, isAuthLoaded, isSignedIn, isUserLoaded, user]);

  return null;
}
