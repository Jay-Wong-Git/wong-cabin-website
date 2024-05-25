"use client";

import { updateReservationAction } from "@/app/_lib/actions";
import SubmitButton from "./SubmitButton";

function UpdateReservationForm({ maxCapacity, booking }) {
  return (
    <form
      action={updateReservationAction}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <input name="bookingId" value={booking.id} type="hidden" />
      <div className="space-y-2">
        <label htmlFor="numGuests">How many guests?</label>
        <select
          name="numGuests"
          id="numGuests"
          defaultValue={booking.numGuests}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          required
        >
          <option value="" key="">
            Select number of guests...
          </option>
          {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
            <option value={x} key={x}>
              {x} {x === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          name="observations"
          defaultValue={booking.observations}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingLabel="Updating...">
          Update reservation
        </SubmitButton>
      </div>
    </form>
  );
}

export default UpdateReservationForm;
