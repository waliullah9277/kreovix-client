import Link from "next/link";

import {
    ArrowUpRight,
    CalendarDays,
    Clock3,
    Hourglass,
    Wallet,
    XCircle,
} from "lucide-react";

import type { Booking } from "./MyBookings";
import CancelBookingButton from "./CancelBookingButton";

interface MyBookingCardProps {
    booking: Booking;
    variant: "mobile" | "desktop";
}

const MyBookingCard = ({ booking, variant }: MyBookingCardProps) => {

    // Booking status
    const status = booking.status?.toLowerCase() || "pending";

    // Status badge colors
    const statusStyles: Record<string, string> = {
        pending: "bg-amber-50 text-amber-700 border-amber-200",
        confirmed: "bg-blue-50 text-blue-700 border-blue-200",
        completed: "bg-green-50 text-green-700 border-green-200",
        cancelled: "bg-red-50 text-red-700 border-red-200",
    };

    const statusStyle =
        statusStyles[status] || statusStyles.pending;

    // Format Time: 14:00 -> 2:00 PM
    const formatTime = (time: string) => {
        if (!time) return "N/A";

        const [hours, minutes] = time.split(":").map(Number);

        if (Number.isNaN(hours) || Number.isNaN(minutes)) {
            return time;
        }

        const period = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12;

        return `${formattedHours}:${String(minutes).padStart(2, "0")} ${period}`;
    };

    // Format Date: 2026-11-05 -> Nov 5, 2026
    const formatDate = (date: string) => {
        if (!date) return "N/A";

        const [year, month, day] = date.split("-").map(Number);

        const formattedDate = new Date(year, month - 1, day);

        if (Number.isNaN(formattedDate.getTime())) {
            return date;
        }

        return formattedDate.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    // ================= MOBILE CARD =================
    if (variant === "mobile") {
        return (
            <article className="min-w-0 rounded-2xl border border-[#EAE5DF] bg-white p-4 shadow-sm">

                {/* Studio Name & Status */}
                <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0 flex-1">
                        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#F06A3C]">
                            Studio Reservation
                        </p>

                        <h3 className="line-clamp-2 break-words text-base font-bold text-[#242321]">
                            {booking.studioTitle}
                        </h3>
                    </div>

                    {/* Status Badge */}
                    <span
                        className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold capitalize ${statusStyle}`}
                    >
                        {status}
                    </span>

                </div>

                {/* Divider */}
                <div className="my-4 h-px bg-[#F0EBE6]" />

                {/* Booking Details */}
                <div className="grid grid-cols-2 gap-x-3 gap-y-4">

                    {/* Booking Date */}
                    <div className="min-w-0">
                        <div className="mb-1 flex items-center gap-1.5 text-[#88817A]">
                            <CalendarDays size={13} />

                            <span className="text-[11px]">
                                Booking Date
                            </span>
                        </div>

                        <p className="text-xs font-semibold text-[#242321]">
                            {formatDate(booking.bookingDate)}
                        </p>
                    </div>

                    {/* Booking Time */}
                    <div className="min-w-0">
                        <div className="mb-1 flex items-center gap-1.5 text-[#88817A]">
                            <Clock3 size={13} />

                            <span className="text-[11px]">
                                Booking Time
                            </span>
                        </div>

                        <p className="text-xs font-semibold leading-5 text-[#242321]">
                            {formatTime(booking.startTime)}
                            <br />
                            {formatTime(booking.endTime)}
                        </p>
                    </div>

                    {/* Duration */}
                    <div className="min-w-0">
                        <div className="mb-1 flex items-center gap-1.5 text-[#88817A]">
                            <Hourglass size={13} />

                            <span className="text-[11px]">
                                Duration
                            </span>
                        </div>

                        <p className="text-xs font-semibold text-[#242321]">
                            {booking.duration} Hours
                        </p>
                    </div>

                    {/* Total Price */}
                    <div className="min-w-0">
                        <div className="mb-1 flex items-center gap-1.5 text-[#88817A]">
                            <Wallet size={13} />

                            <span className="text-[11px]">
                                Total Price
                            </span>
                        </div>

                        <p className="text-sm font-bold text-[#F06A3C]">
                            ${Number(booking.totalPrice).toFixed(2)}
                        </p>
                    </div>

                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-2 border-t border-[#F0EBE6] pt-4">

                    {/* View Studio */}
                    <Link
                        href={`/studios/${booking.studioId}`}
                        className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#EAE5DF] px-3 py-2.5 text-xs font-semibold text-[#242321] transition hover:border-[#F06A3C] hover:text-[#F06A3C]"
                    >
                        View Studio
                        <ArrowUpRight size={14} />
                    </Link>

                    {/* TODO: Implement Cancel Booking API */}
                    {status === "pending" && (
                        <CancelBookingButton id={booking._id} />
                    )}

                </div>

            </article>
        );
    }

    // ================= DESKTOP TABLE ROW =================
    return (
        <tr className="transition-colors hover:bg-[#FFF9F5]">

            {/* Studio Name */}
            <td className="px-4 py-5 lg:px-5">
                <p className="font-semibold text-[#242321]">
                    {booking.studioTitle}
                </p>
            </td>

            {/* Booking Date */}
            <td className="px-4 py-5 text-sm text-[#55514D] lg:px-5">
                {formatDate(booking.bookingDate)}
            </td>

            {/* Booking Time */}
            <td className="px-4 py-5 text-sm text-[#55514D] lg:px-5">
                <span className="whitespace-nowrap">
                    {formatTime(booking.startTime)}
                    {" - "}
                    {formatTime(booking.endTime)}
                </span>
            </td>

            {/* Duration */}
            <td className="px-4 py-5 text-sm text-[#55514D] lg:px-5">
                {booking.duration} Hours
            </td>

            {/* Total Price */}
            <td className="px-4 py-5 lg:px-5">
                <span className="font-bold text-[#F06A3C]">
                    ${Number(booking.totalPrice).toFixed(2)}
                </span>
            </td>

            {/* Status */}
            <td className="px-4 py-5 lg:px-5">
                <span
                    className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold capitalize ${statusStyle}`}
                >
                    {status}
                </span>
            </td>

            {/* Actions */}
            <td className="px-4 py-5 lg:px-5">
                <div className="flex items-center gap-2">

                    {/* View Studio */}
                    <Link
                        href={`/studios/${booking.studioId}`}
                        className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg border border-[#EAE5DF] px-3 py-2 text-xs font-semibold text-[#242321] transition hover:border-[#F06A3C] hover:text-[#F06A3C]"
                    >
                        View
                        <ArrowUpRight size={14} />
                    </Link>

                    {/* TODO: Implement Cancel Booking API */}
                    {status === "pending" && (
                        <CancelBookingButton id={booking._id} />
                    )}

                </div>
            </td>

        </tr>
    );
};

export default MyBookingCard;