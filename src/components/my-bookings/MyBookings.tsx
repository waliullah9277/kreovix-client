import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import { CalendarDays, ArrowUpRight } from "lucide-react";
import MyBookingCard from "./MyBookingCard";

export interface Booking {
    _id: string;
    studioId: string;
    studioTitle: string;
    userId: string;
    userName: string;
    userEmail: string;
    bookingDate: string;
    startTime: string;
    endTime: string;
    duration: number;
    hourlyRate: number;
    rentalPrice: number;
    securityDeposit: number;
    totalPrice: number;
    status: string;
}

const MyBookings = async () => {
    // Get logged-in user
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    if (!user) {
        redirect("/login");
    }

    // Fetch bookings using logged-in user's email
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/my-bookings/${encodeURIComponent(user.email)}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch bookings");
    }

    const data = await res.json();

    const bookings: Booking[] = Array.isArray(data) ? data : [];

    console.log("Logged-in Email:", user.email);
    console.log("My Bookings:", bookings);

    return (
        <main className="min-h-screen bg-[#FAF8F5]">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

                {/* ================= HEADER ================= */}
                <div className="mb-8 flex flex-col justify-between gap-5 sm:mb-10 sm:flex-row sm:items-end">

                    <div>
                        <span className="mb-3 inline-block rounded-full bg-[#FFF0E9] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#F06A3C]">
                            My Reservations
                        </span>

                        <h1 className="text-3xl font-bold text-[#242321] sm:text-4xl">
                            My Bookings
                        </h1>

                        <p className="mt-3 text-sm text-[#77736F]">
                            View all your studio reservations in one place.
                        </p>
                    </div>

                    <Link
                        href="/studios"
                        className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-[#F06A3C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D9562D] sm:self-auto"
                    >
                        Explore Studios
                        <ArrowUpRight size={17} />
                    </Link>
                </div>

                {/* ================= TOTAL BOOKINGS ================= */}
                <div className="mb-6 flex items-center gap-4 rounded-2xl border border-[#EAE5DF] bg-white p-4 sm:mb-8 sm:p-6">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF0E9]">
                        <CalendarDays
                            size={23}
                            className="text-[#F06A3C]"
                        />
                    </div>

                    <div>
                        <p className="text-sm text-[#77736F]">
                            Total Reservations
                        </p>

                        <h2 className="text-2xl font-bold text-[#242321]">
                            {bookings.length}
                        </h2>
                    </div>
                </div>

                {/* ================= BOOKINGS ================= */}
                {bookings.length > 0 ? (
                    <>
                        {/* MOBILE CARDS */}
                        <div className="space-y-4 md:hidden">
                            {bookings.map((booking) => (
                                <MyBookingCard
                                    key={booking._id}
                                    booking={booking}
                                    variant="mobile"
                                />
                            ))}
                        </div>

                        {/* DESKTOP TABLE */}
                        <div className="hidden overflow-hidden rounded-2xl border border-[#EAE5DF] bg-white shadow-sm md:block">

                            <table className="w-full text-left">

                                {/* Table Header */}
                                <thead className="border-b border-[#EAE5DF] bg-[#FFF7F2]">
                                    <tr>
                                        {[
                                            "Studio",
                                            "Booking Date",
                                            "Time",
                                            "Duration",
                                            "Total Price",
                                            "Status",
                                            "Actions",
                                        ].map((heading) => (
                                            <th
                                                key={heading}
                                                scope="col"
                                                className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-[#77736F] lg:px-5"
                                            >
                                                {heading}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody className="divide-y divide-[#EAE5DF]">
                                    {bookings.map((booking) => (
                                        <MyBookingCard
                                            key={booking._id}
                                            booking={booking}
                                            variant="desktop"
                                        />
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    </>
                ) : (
                    /* ================= EMPTY STATE ================= */
                    <div className="rounded-2xl border border-[#EAE5DF] bg-white px-6 py-16 text-center sm:py-20">

                        <CalendarDays
                            size={45}
                            className="mx-auto mb-4 text-[#F06A3C]"
                        />

                        <h2 className="text-xl font-bold text-[#242321]">
                            No Bookings Yet
                        </h2>

                        <p className="mt-3 text-sm text-[#77736F]">
                            You haven&apos;t booked any studios yet.
                        </p>

                        <Link
                            href="/studios"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F06A3C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D9562D]"
                        >
                            Browse Studios
                            <ArrowUpRight size={17} />
                        </Link>

                    </div>
                )}

            </div>
        </main>
    );
};

export default MyBookings;