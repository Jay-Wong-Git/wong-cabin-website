"use server";

import { signIn } from "@/app/_lib/auth";

export async function signInViaGoogleAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signInViaGithubAction() {
  await signIn("github", { redirectTo: "/account" });
}
