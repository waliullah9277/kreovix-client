"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    CalendarDays,
    ShieldCheck,
    Clock3,
    X,
    ArrowRight,
    CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

interface Studio {
    _id: string;
    title: string;
    hourlyRate: number;
    securityDeposit: number;
    maxCapacity: number;
}

interface BookingCardProps {
    studio: Studio;
}

const getToday = () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const BookingCard = ({ studio }: BookingCardProps) => {
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [showBooking, setShowBooking] = useState(false);
    const [showSummary, setShowSummary] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [bookingDate, setBookingDate] = useState(getToday);
    const [startTime, setStartTime] = useState("10:00");
    const [endTime, setEndTime] = useState("12:00");

    const hourlyRate = Number(studio.hourlyRate) || 0;
    const securityDeposit = Number(studio.securityDeposit) || 0;

    // Convert time into minutes
    const convertToMinutes = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    };

    const startMinutes = convertToMinutes(startTime);
    const endMinutes = convertToMinutes(endTime);

    // Duration calculation
    const durationMinutes = Math.max(0, endMinutes - startMinutes);
    const durationHours = durationMinutes / 60;

    // Price calculation
    const rentalPrice = durationHours * hourlyRate;
    const totalPrice = rentalPrice + securityDeposit;

    // Booking validation
    const isValidTime = durationMinutes > 0;

    const isPastDate = bookingDate < getToday();

    const isPastTime =
        bookingDate === getToday() &&
        startMinutes <=
            new Date().getHours() * 60 + new Date().getMinutes();

    const isValidBooking =
        bookingDate !== "" &&
        isValidTime &&
        !isPastDate &&
        !isPastTime;

    const formatPrice = (price: number) => {
        return price.toFixed(2);
    };

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        if (hours === 0) {
            return `${remainingMinutes} min`;
        }

        if (remainingMinutes === 0) {
            return `${hours} hr`;
        }

        return `${hours} hr ${remainingMinutes} min`;
    };

    const formatTime = (time: string) => {
        return new Date(`2000-01-01T${time}:00`).toLocaleTimeString(
            "en-US",
            {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            }
        );
    };

    // Redirect to login with current page URL
    const redirectToLogin = () => {
        toast.error("Please login first!");

        const currentPath =
            window.location.pathname + window.location.search;

        router.push(
            `/login?callbackUrl=${encodeURIComponent(currentPath)}`
        );
    };

    // Booking button click
    const handleBookingClick = () => {
        if (isPending) return;

        if (!user) {
            redirectToLogin();
            return;
        }

        setShowSummary(false);
        setShowBooking(true);
    };

    // Review booking
    const handleBooking = () => {
        if (isPastDate) {
            toast.error("You cannot book a past date.");
            return;
        }

        if (!isValidTime) {
            toast.error("End time must be later than start time.");
            return;
        }

        if (isPastTime) {
            toast.error("Please select a future time.");
            return;
        }

        setShowSummary(true);
    };

    // Close booking popup
    const closeBooking = () => {
        setShowBooking(false);
        setShowSummary(false);
    };

    // Confirm booking
    const handleConfirmBooking = async () => {
        if (!user) {
            redirectToLogin();
            return;
        }

        if (!isValidBooking) {
            toast.error("Please select a valid date and time.");
            return;
        }

        const bookingData = {
            studioId: studio._id,
            studioTitle: studio.title,
            bookingDate,
            startTime,
            endTime,
            duration: durationHours,
            hourlyRate,
            rentalPrice,
            securityDeposit,
            totalPrice,
            status: "pending",
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
        };

        setIsSubmitting(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_URL}/booking`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bookingData),
                }
            );

            const data = await res.json();

            if (res.ok) {
                toast.success(`${studio.title} Booking successful!`);

                closeBooking();

                router.push("/my-bookings");
            } else {
                toast.error(data.message || "Booking failed!");
            }
        } catch {
            toast.error("Something went wrong!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Booking Card */}
            <aside className="lg:sticky lg:top-24 lg:h-fit">
                <div className="rounded-2xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] p-6 shadow-sm">
                    {/* Hourly Rate */}
                    <div className="flex items-end gap-1">
                        <span className="text-3xl font-bold text-[#242321] dark:text-[#F9FAFB]">
                            ${studio.hourlyRate}
                        </span>

                        <span className="pb-1 text-sm text-[#77736F] dark:text-[#CBD5E1]">
                            / hour
                        </span>
                    </div>

                    <div className="my-5 h-px bg-[#EAE5DF] dark:bg-[#374151]" />

                    {/* Studio Information */}
                    <div className="space-y-4 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-[#77736F] dark:text-[#CBD5E1]">
                                Hourly Rate
                            </span>

                            <span className="font-semibold text-[#242321] dark:text-[#F9FAFB]">
                                ${studio.hourlyRate}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-[#77736F] dark:text-[#CBD5E1]">
                                Security Deposit
                            </span>

                            <span className="font-semibold text-[#242321] dark:text-[#F9FAFB]">
                                ${studio.securityDeposit}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-[#77736F] dark:text-[#CBD5E1]">
                                Max Guests
                            </span>

                            <span className="font-semibold text-[#242321] dark:text-[#F9FAFB]">
                                {studio.maxCapacity} People
                            </span>
                        </div>
                    </div>

                    {/* Booking Button */}
                    <button
                        type="button"
                        onClick={handleBookingClick}
                        disabled={isPending}
                        className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[#F06A3C] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#D9562D] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <CalendarDays size={18} />

                        {isPending
                            ? "Loading..."
                            : "Book Workspace Now"}
                    </button>

                    <p className="mt-4 text-center text-xs text-[#77736F] dark:text-[#CBD5E1]">
                        You won&apos;t be charged yet.
                    </p>

                    <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#77736F] dark:text-[#CBD5E1]">
                        <ShieldCheck
                            size={15}
                            className="text-green-600 dark:text-green-400"
                        />
                        Secure workspace booking
                    </div>
                </div>
            </aside>

            {/* Booking Popup */}
            {showBooking && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                    onClick={closeBooking}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="booking-modal-title"
                        onClick={(e) => e.stopPropagation()}
                        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#EAE5DF] dark:border-[#374151] bg-[#FAF8F5] dark:bg-[#111827] p-5 shadow-2xl sm:p-7"
                    >
                        {/* Modal Header */}
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2
                                    id="booking-modal-title"
                                    className="text-2xl font-bold text-[#242321] dark:text-[#F9FAFB]"
                                >
                                    {showSummary
                                        ? "Booking Summary"
                                        : "Book This Workspace"}
                                </h2>

                                <p className="mt-2 text-sm text-[#77736F] dark:text-[#CBD5E1]">
                                    {studio.title}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeBooking}
                                aria-label="Close booking popup"
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] text-[#77736F] dark:text-[#CBD5E1] transition hover:bg-[#FCE4DB] dark:hover:bg-[#3B2B26] hover:text-[#F06A3C]"
                            >
                                <X size={19} />
                            </button>
                        </div>

                        <div className="my-6 h-px bg-[#EAE5DF] dark:bg-[#374151]" />

                        {!showSummary ? (
                            <>
                                {/* Booking Date */}
                                <div className="rounded-xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] p-5">
                                    <h3 className="mb-5 flex items-center gap-2 text-base font-bold text-[#242321] dark:text-[#F9FAFB]">
                                        <CalendarDays
                                            size={19}
                                            className="text-[#F06A3C]"
                                        />
                                        Select Booking Date
                                    </h3>

                                    <label
                                        htmlFor="bookingDate"
                                        className="mb-2 block text-sm font-semibold text-[#34312E] dark:text-[#F9FAFB]"
                                    >
                                        Booking Date
                                    </label>

                                    <input
                                        id="bookingDate"
                                        type="date"
                                        value={bookingDate}
                                        min={getToday()}
                                        onChange={(e) =>
                                            setBookingDate(e.target.value)
                                        }
                                        className="w-full rounded-xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] px-4 py-3 text-sm text-[#242321] dark:text-[#F9FAFB] outline-none transition focus:border-[#F06A3C] focus:ring-2 focus:ring-[#F06A3C]/10"
                                    />
                                </div>

                                {/* Time Selection */}
                                <div className="mt-5 rounded-xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] p-5">
                                    <h3 className="mb-5 flex items-center gap-2 text-base font-bold text-[#242321] dark:text-[#F9FAFB]">
                                        <Clock3
                                            size={19}
                                            className="text-[#F06A3C]"
                                        />
                                        Select Time Slot
                                    </h3>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {/* Start Time */}
                                        <div>
                                            <label
                                                htmlFor="startTime"
                                                className="mb-2 block text-sm font-semibold text-[#34312E] dark:text-[#F9FAFB]"
                                            >
                                                Start Time
                                            </label>

                                            <input
                                                id="startTime"
                                                type="time"
                                                value={startTime}
                                                onChange={(e) =>
                                                    setStartTime(e.target.value)
                                                }
                                                className="w-full rounded-xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] px-4 py-3 text-sm text-[#242321] dark:text-[#F9FAFB] outline-none transition focus:border-[#F06A3C] focus:ring-2 focus:ring-[#F06A3C]/10"
                                            />
                                        </div>

                                        {/* End Time */}
                                        <div>
                                            <label
                                                htmlFor="endTime"
                                                className="mb-2 block text-sm font-semibold text-[#34312E] dark:text-[#F9FAFB]"
                                            >
                                                End Time
                                            </label>

                                            <input
                                                id="endTime"
                                                type="time"
                                                value={endTime}
                                                onChange={(e) =>
                                                    setEndTime(e.target.value)
                                                }
                                                className="w-full rounded-xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] px-4 py-3 text-sm text-[#242321] dark:text-[#F9FAFB] outline-none transition focus:border-[#F06A3C] focus:ring-2 focus:ring-[#F06A3C]/10"
                                            />
                                        </div>
                                    </div>

                                    {/* Duration */}
                                    <div className="mt-5 flex items-center justify-between rounded-xl bg-[#FFF4EF] dark:bg-[#3B2B26] px-4 py-3">
                                        <span className="text-sm font-medium text-[#77736F] dark:text-[#CBD5E1]">
                                            Booking Duration
                                        </span>

                                        <span className="font-bold text-[#D9562D] dark:text-[#FB916E]">
                                            {formatDuration(durationMinutes)}
                                        </span>
                                    </div>

                                    {!isValidTime && (
                                        <p className="mt-3 text-xs text-red-500 dark:text-red-400">
                                            End time must be later than start time.
                                        </p>
                                    )}

                                    {isPastTime && (
                                        <p className="mt-3 text-xs text-red-500 dark:text-red-400">
                                            Please select a future start time.
                                        </p>
                                    )}
                                </div>

                                {/* Price Breakdown */}
                                <div className="mt-5 rounded-xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] p-5">
                                    <h3 className="mb-5 text-base font-bold text-[#242321] dark:text-[#F9FAFB]">
                                        Price Breakdown
                                    </h3>

                                    <div className="space-y-4 text-sm">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[#77736F] dark:text-[#CBD5E1]">
                                                Hourly Rate
                                            </span>

                                            <span className="font-semibold text-[#242321] dark:text-[#F9FAFB]">
                                                ${formatPrice(hourlyRate)}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-[#77736F] dark:text-[#CBD5E1]">
                                                Duration
                                            </span>

                                            <span className="font-semibold text-[#242321] dark:text-[#F9FAFB]">
                                                {formatDuration(durationMinutes)}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-[#77736F] dark:text-[#CBD5E1]">
                                                Studio Rental
                                            </span>

                                            <span className="font-semibold text-[#242321] dark:text-[#F9FAFB]">
                                                ${formatPrice(rentalPrice)}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-[#77736F] dark:text-[#CBD5E1]">
                                                Security Deposit
                                            </span>

                                            <span className="font-semibold text-[#242321] dark:text-[#F9FAFB]">
                                                ${formatPrice(securityDeposit)}
                                            </span>
                                        </div>

                                        <div className="h-px bg-[#EAE5DF] dark:bg-[#374151]" />

                                        <div className="flex items-center justify-between">
                                            <span className="text-base font-bold text-[#242321] dark:text-[#F9FAFB]">
                                                Estimated Total
                                            </span>

                                            <span className="text-2xl font-bold text-[#F06A3C]">
                                                ${formatPrice(totalPrice)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Review Button */}
                                <button
                                    type="button"
                                    onClick={handleBooking}
                                    disabled={!isValidBooking}
                                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F06A3C] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#D9562D] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Review Booking
                                    <ArrowRight size={18} />
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Booking Summary */}
                                <div className="rounded-xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] p-5">
                                    <div className="mb-5 flex items-center gap-3">
                                        <CheckCircle2
                                            size={25}
                                            className="text-green-600 dark:text-green-400"
                                        />

                                        <h3 className="text-lg font-bold text-[#242321] dark:text-[#F9FAFB]">
                                            Review Your Booking Details
                                        </h3>
                                    </div>

                                    <div className="space-y-4 text-sm">
                                        <div className="flex items-center justify-between gap-4">
                                            <span className="text-[#77736F] dark:text-[#CBD5E1]">
                                                Studio
                                            </span>

                                            <span className="text-right font-semibold text-[#242321] dark:text-[#F9FAFB]">
                                                {studio.title}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-[#77736F] dark:text-[#CBD5E1]">
                                                Booking Date
                                            </span>

                                            <span className="font-semibold text-[#242321] dark:text-[#F9FAFB]">
                                                {bookingDate}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-[#77736F] dark:text-[#CBD5E1]">
                                                Start Time
                                            </span>

                                            <span className="font-semibold text-[#242321] dark:text-[#F9FAFB]">
                                                {formatTime(startTime)}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-[#77736F] dark:text-[#CBD5E1]">
                                                End Time
                                            </span>

                                            <span className="font-semibold text-[#242321] dark:text-[#F9FAFB]">
                                                {formatTime(endTime)}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-[#77736F] dark:text-[#CBD5E1]">
                                                Duration
                                            </span>

                                            <span className="font-semibold text-[#242321] dark:text-[#F9FAFB]">
                                                {formatDuration(durationMinutes)}
                                            </span>
                                        </div>

                                        <div className="h-px bg-[#EAE5DF] dark:bg-[#374151]" />

                                        <div className="flex items-center justify-between">
                                            <span className="text-[#77736F] dark:text-[#CBD5E1]">
                                                Studio Rental
                                            </span>

                                            <span className="font-semibold text-[#242321] dark:text-[#F9FAFB]">
                                                ${formatPrice(rentalPrice)}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-[#77736F] dark:text-[#CBD5E1]">
                                                Security Deposit
                                            </span>

                                            <span className="font-semibold text-[#242321] dark:text-[#F9FAFB]">
                                                ${formatPrice(securityDeposit)}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-base font-bold text-[#242321] dark:text-[#F9FAFB]">
                                                Estimated Total
                                            </span>

                                            <span className="text-xl font-bold text-[#F06A3C]">
                                                ${formatPrice(totalPrice)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Summary Buttons */}
                                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                    <button
                                        type="button"
                                        onClick={() => setShowSummary(false)}
                                        disabled={isSubmitting}
                                        className="flex-1 rounded-xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] px-5 py-3 text-sm font-semibold text-[#77736F] dark:text-[#CBD5E1] transition hover:bg-[#F5F2EE] dark:hover:bg-[#374151] disabled:opacity-60"
                                    >
                                        Edit Booking
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleConfirmBooking}
                                        disabled={isSubmitting}
                                        className="flex-1 rounded-xl bg-[#F06A3C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D9562D] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {isSubmitting
                                            ? "Booking..."
                                            : "Confirm Booking"}
                                    </button>
                                </div>

                                <p className="mt-4 text-center text-xs text-[#77736F] dark:text-[#CBD5E1]">
                                    This is a booking preview. No reservation
                                    has been submitted yet.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default BookingCard;