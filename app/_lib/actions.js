"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export default async function updateGuest(formdata) {

    // console.log(formdata);
    const session = await auth();
    if (!session) {
        throw new Error("You must be log in");
    }

    const nationalID = formdata.get("nationalID");
    const [nationality, countryFlag] = formdata.get("nationality").split("%");

    if (!/^[a-zA-z0-9]{6,12}$/.test(nationalID)) {
        throw new Error("Please provide valid nationalID");
    }

    const updateData = { nationality, countryFlag, nationalID };

    const { data, error } = await supabase
        .from('guests')
        .update(updateData)
        .eq('id', session.user.guestId);
    if (error) {
        console.error(error);
        throw new Error('Guest could not be updated');
    }

    revalidatePath('/account/profile')
    console.log(updateData);
}

export async function createBooking(bookingData, formData) {
    // console.log(formData);
    // console.log(bookingData);

    const session = await auth();
    if (!session) {
        throw new Error("You must be logg in")
    }

    const newBooking = {
        ...bookingData,
        guestId:session.user.guestId,
        numGuests:Number(formData.get("numGuests")),
        observations:formData.get("observations").slice(0,1000),
        extraPrice:0,
        totalPrice:bookingData.cabinPrice,
        isPaid:false,
        hasBreakfast:false,
        status:"unconfirmed"


    };
    // console.log(newBooking);

    const { error } = await supabase
        .from('bookings')
        .insert([newBooking])
  
      if (error) {
        // console.error(error);
        throw new Error('Booking could not be created');
      }

      revalidatePath(`/cabins/${bookingData.cabinId}`)
      redirect('/cabins/thankyou');
}


export async function deleteReservation(bookingId) {
    const session = await auth();
    if (!session) {
        throw new Error("You must be logg in")
    }

    const guestBookings = await getBookings(session.user.guestId);
    const guestBookingsIds = guestBookings.map((booking) => booking.id);

    if (!guestBookingsIds.includes(bookingId)) {
        throw new Error("You are not allow to do this");
    }

    const { error } = await supabase.from('bookings').delete().eq('id', bookingId);

    if (error) {
        console.error(error);
        throw new Error('Booking could not be deleted');
    }

    revalidatePath("/account/reservations")
}
export async function signInAction() {
    await signIn("google", { redirectTo: "/account" })
}

export async function updateReservation(formData) {
    const bookingId = Number(formData.get("bookingId"));
    const numGuests = formData.get("numGuests");
    let observations = formData.get("observations");
    console.log(bookingId, numGuests, observations)
    const session = await auth();
    if (!session) {
        throw new Error("You must be logg in")
    }

    const guestBookings = await getBookings(session.user.guestId);
    const guestBookingsIds = guestBookings.map((booking) => booking.id);

    if (!guestBookingsIds.includes(bookingId)) {
        throw new Error("You are not allow to do this");
    }

    observations = observations.slice(0, 1000)
    const updateData = { numGuests, observations };
    const { error } = await supabase
        .from('bookings')
        .update(updateData)
        .eq('id', bookingId)

    if (error) {
        // console.error(error);
        throw new Error('Booking could not be updated');
    }
    revalidatePath(`/account/reservations/edit/${bookingId}`);
    revalidatePath("/account/reservations");

    redirect("/account/reservations");
}


export async function signOutAction() {
    await signOut({ redirectTo: "/" })
}