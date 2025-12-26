import { supabase } from "@/lib/supabase";

export const useRoomAvailability = async (roomTypeId, checkIn, checkOut) => {
  if (!roomTypeId || !checkIn || !checkOut) return [];

  const { data, error } = await supabase
    .from("rooms")
    .select(`
      id,
      room_number,
      booking_rooms (
        bookings (
          check_in,
          check_out,
          status
        )
      )
    `)
    .eq("room_type_id", roomTypeId)
    .eq("status", "available");

  if (error) {
    console.error("Availability error:", error);
    return [];
  }

  return data.filter((room) => {
    const bookings = room.booking_rooms?.map(br => br.bookings) || [];

    return !bookings.some((b) =>
      ["pending", "confirmed"].includes(b.status) &&
      new Date(b.check_in) < new Date(checkOut) &&
      new Date(b.check_out) > new Date(checkIn)
    );
  });
};
