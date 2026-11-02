"use client";

import { useState } from "react";
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
    const [showBooking, setShowBooking] = useState(false);
    const [showSummary, setShowSummary] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [bookingDate, setBookingDate] = useState(getToday);
    const [startTime, setStartTime] = useState("10:00");
    const [endTime, setEndTime] = useState("12:00");

    const hourlyRate = Number(studio.hourlyRate) || 0;
    const securityDeposit = Number(studio.securityDeposit) || 0;

    // Convert HH:mm into minutes
    const convertToMinutes = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number);

        return hours * 60 + minutes;
    };

    // Calculate Duration
    const startMinutes = convertToMinutes(startTime);
    const endMinutes = convertToMinutes(endTime);

    const durationMinutes = Math.max(0, endMinutes - startMinutes);
    const durationHours = durationMinutes / 60;

    // Price Calculation
    const rentalPrice = durationHours * hourlyRate;
    const totalPrice = rentalPrice + securityDeposit;

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

    const { data: session } = authClient.useSession();

    const user = session?.user;

    if (!user) {
        toast.error("Please login to book a studio.");
        return;
    }

    const handleBooking = () => {
        if (!bookingDate) {
            toast.error("Please select a booking date.");
            return;
        }

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

    const closeBooking = () => {
        setShowBooking(false);
        setShowSummary(false);
    };

    const handleConfirmBooking = async () => {
        if (!isValidBooking) {
            toast.error("Please select a valid booking date and time.");
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

        try {
            setIsSubmitting(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL}/booking`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bookingData),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                toast.error(
                    result?.message || "Booking failed. Please try again."
                );
                return;
            }

            toast.success(`${studio.title} Booking created successfully!`);

            closeBooking();

        } catch (error) {
            console.error("Booking Error:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong while booking."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Booking Card */}
            <aside className="lg:sticky lg:top-24 lg:h-fit">
                <div className="rounded-2xl border border-[#EAE5DF] bg-white p-6 shadow-sm">

                    {/* Hourly Rate */}
                    <div className="flex items-end gap-1">
                        <span className="text-3xl font-bold text-[#242321]">
                            ${studio.hourlyRate}
                        </span>

                        <span className="pb-1 text-sm text-[#77736F]">
                            / hour
                        </span>
                    </div>

                    <div className="my-5 h-px bg-[#EAE5DF]" />

                    {/* Studio Information */}
                    <div className="space-y-4 text-sm">

                        <div className="flex items-center justify-between">
                            <span className="text-[#77736F]">
                                Hourly Rate
                            </span>

                            <span className="font-semibold text-[#242321]">
                                ${studio.hourlyRate}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-[#77736F]">
                                Security Deposit
                            </span>

                            <span className="font-semibold text-[#242321]">
                                ${studio.securityDeposit}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-[#77736F]">
                                Max Guests
                            </span>

                            <span className="font-semibold text-[#242321]">
                                {studio.maxCapacity} People
                            </span>
                        </div>

                    </div>

                    {/* Booking Button */}
                    <button
                        type="button"
                        onClick={() => {
                            setShowSummary(false);
                            setShowBooking(true);
                        }}
                        className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[#F06A3C] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#D9562D]"
                    >
                        <CalendarDays size={18} />
                        Book Workspace Now
                    </button>

                    <p className="mt-4 text-center text-xs text-[#77736F]">
                        {`You won't be charged yet.`}
                    </p>

                    <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#77736F]">
                        <ShieldCheck
                            size={15}
                            className="text-green-600"
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
                        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#EAE5DF] bg-[#FAF8F5] p-5 shadow-2xl sm:p-7"
                    >

                        {/* Modal Header */}
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2
                                    id="booking-modal-title"
                                    className="text-2xl font-bold text-[#242321]"
                                >
                                    {showSummary
                                        ? "Booking Summary"
                                        : "Book This Workspace"}
                                </h2>

                                <p className="mt-2 text-sm text-[#77736F]">
                                    {studio.title}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeBooking}
                                aria-label="Close booking popup"
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#EAE5DF] bg-white text-[#77736F] transition hover:bg-[#FCE4DB] hover:text-[#F06A3C]"
                            >
                                <X size={19} />
                            </button>
                        </div>

                        <div className="my-6 h-px bg-[#EAE5DF]" />

                        {!showSummary ? (
                            <>
                                {/* Booking Date */}
                                <div className="rounded-xl border border-[#EAE5DF] bg-white p-5">

                                    <h3 className="mb-5 flex items-center gap-2 text-base font-bold text-[#242321]">
                                        <CalendarDays
                                            size={19}
                                            className="text-[#F06A3C]"
                                        />
                                        Select Booking Date
                                    </h3>

                                    <label
                                        htmlFor="bookingDate"
                                        className="mb-2 block text-sm font-semibold text-[#34312E]"
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
                                        className="w-full rounded-xl border border-[#EAE5DF] bg-white px-4 py-3 text-sm text-[#242321] outline-none transition focus:border-[#F06A3C] focus:ring-2 focus:ring-[#F06A3C]/10"
                                    />
                                </div>

                                {/* Time Selection */}
                                <div className="mt-5 rounded-xl border border-[#EAE5DF] bg-white p-5">

                                    <h3 className="mb-5 flex items-center gap-2 text-base font-bold text-[#242321]">
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
                                                className="mb-2 block text-sm font-semibold text-[#34312E]"
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
                                                className="w-full rounded-xl border border-[#EAE5DF] bg-white px-4 py-3 text-sm text-[#242321] outline-none transition focus:border-[#F06A3C] focus:ring-2 focus:ring-[#F06A3C]/10"
                                            />
                                        </div>

                                        {/* End Time */}
                                        <div>
                                            <label
                                                htmlFor="endTime"
                                                className="mb-2 block text-sm font-semibold text-[#34312E]"
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
                                                className="w-full rounded-xl border border-[#EAE5DF] bg-white px-4 py-3 text-sm text-[#242321] outline-none transition focus:border-[#F06A3C] focus:ring-2 focus:ring-[#F06A3C]/10"
                                            />
                                        </div>

                                    </div>

                                    {/* Duration */}
                                    <div className="mt-5 flex items-center justify-between rounded-xl bg-[#FFF4EF] px-4 py-3">
                                        <span className="text-sm font-medium text-[#77736F]">
                                            Booking Duration
                                        </span>

                                        <span className="font-bold text-[#D9562D]">
                                            {formatDuration(durationMinutes)}
                                        </span>
                                    </div>

                                    {!isValidTime && (
                                        <p className="mt-3 text-xs text-red-500">
                                            End time must be later than start time.
                                        </p>
                                    )}

                                    {isPastTime && (
                                        <p className="mt-3 text-xs text-red-500">
                                            Please select a future start time.
                                        </p>
                                    )}

                                </div>

                                {/* Price Breakdown */}
                                <div className="mt-5 rounded-xl border border-[#EAE5DF] bg-white p-5">

                                    <h3 className="mb-5 text-base font-bold text-[#242321]">
                                        Price Breakdown
                                    </h3>

                                    <div className="space-y-4 text-sm">

                                        <div className="flex items-center justify-between">
                                            <span className="text-[#77736F]">
                                                Hourly Rate
                                            </span>

                                            <span className="font-semibold text-[#242321]">
                                                ${formatPrice(hourlyRate)}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-[#77736F]">
                                                Duration
                                            </span>

                                            <span className="font-semibold text-[#242321]">
                                                {formatDuration(durationMinutes)}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-[#77736F]">
                                                Studio Rental
                                            </span>

                                            <span className="font-semibold text-[#242321]">
                                                ${formatPrice(rentalPrice)}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-[#77736F]">
                                                Security Deposit
                                            </span>

                                            <span className="font-semibold text-[#242321]">
                                                ${formatPrice(securityDeposit)}
                                            </span>
                                        </div>

                                        <div className="h-px bg-[#EAE5DF]" />

                                        <div className="flex items-center justify-between">
                                            <span className="text-base font-bold text-[#242321]">
                                                Estimated Total
                                            </span>

                                            <span className="text-2xl font-bold text-[#F06A3C]">
                                                ${formatPrice(totalPrice)}
                                            </span>
                                        </div>

                                    </div>
                                </div>

                                {/* Continue Button */}
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
                                <div className="rounded-xl border border-[#EAE5DF] bg-white p-5">

                                    <div className="mb-5 flex items-center gap-3">
                                        <CheckCircle2
                                            size={25}
                                            className="text-green-600"
                                        />

                                        <h3 className="text-lg font-bold text-[#242321]">
                                            Review Your Booking Details
                                        </h3>
                                    </div>

                                    <div className="space-y-4 text-sm">

                                        <div className="flex items-center justify-between gap-4">
                                            <span className="text-[#77736F]">
                                                Studio
                                            </span>

                                            <span className="text-right font-semibold text-[#242321]">
                                                {studio.title}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-[#77736F]">
                                                Booking Date
                                            </span>

                                            <span className="font-semibold text-[#242321]">
                                                {bookingDate}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-[#77736F]">
                                                Start Time
                                            </span>

                                            <span className="font-semibold text-[#242321]">
                                                {formatTime(startTime)}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-[#77736F]">
                                                End Time
                                            </span>

                                            <span className="font-semibold text-[#242321]">
                                                {formatTime(endTime)}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-[#77736F]">
                                                Duration
                                            </span>

                                            <span className="font-semibold text-[#242321]">
                                                {formatDuration(durationMinutes)}
                                            </span>
                                        </div>

                                        <div className="h-px bg-[#EAE5DF]" />

                                        <div className="flex items-center justify-between">
                                            <span className="text-[#77736F]">
                                                Studio Rental
                                            </span>

                                            <span className="font-semibold text-[#242321]">
                                                ${formatPrice(rentalPrice)}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-[#77736F]">
                                                Security Deposit
                                            </span>

                                            <span className="font-semibold text-[#242321]">
                                                ${formatPrice(securityDeposit)}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-base font-bold text-[#242321]">
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
                                        className="flex-1 rounded-xl border border-[#EAE5DF] bg-white px-5 py-3 text-sm font-semibold text-[#77736F] transition hover:bg-[#F5F2EE]"
                                    >
                                        Edit Booking
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleConfirmBooking}
                                        disabled={isSubmitting}
                                        className="flex-1 rounded-xl bg-[#F06A3C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D9562D] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {isSubmitting ? "Booking..." : "Confirm Booking"}
                                    </button>

                                </div>

                                <p className="mt-4 text-center text-xs text-[#77736F]">
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