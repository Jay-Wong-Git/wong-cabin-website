"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import { updateGuest } from "@/app/_lib/data-service";

export async function signInViaGoogleAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signInViaGithubAction() {
  await signIn("github", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuestAction(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const [nationality, countryFlag] = formData.get("nationality").split("%");

  await updateGuest(session.user.guestId, {
    nationalID,
    nationality,
    countryFlag,
  });
}
