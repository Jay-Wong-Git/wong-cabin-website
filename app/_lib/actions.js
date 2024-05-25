"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "@/app/_lib/data-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export async function deleteReservationAction(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this reservation");

  await deleteBooking(bookingId);
}

export async function updateReservationAction(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  const bookingId = formData.get("bookingId");
  if (!guestBookingIds.includes(parseInt(bookingId)))
    throw new Error("You are not allowed to update the reservation");

  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  await updateBooking(bookingId, { numGuests, observations });

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  redirect("/account/reservations");
}

export async function createReservationAction(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // const test = Object.entries(formData.entries());
  // console.log(test);
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  const guestId = session.user.guestId;
  await createBooking({
    guestId,
    ...bookingData,
    numGuests,
    observations: observations.slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  });

  revalidatePath("/account/reservations");
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thanks");
}
