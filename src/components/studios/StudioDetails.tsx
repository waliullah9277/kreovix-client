
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    MapPin,
    Star,
    ShieldCheck,
    Wifi,
    Wind,
    Car,
    Sun,
    Lightbulb,
    Volume2,
    Bath,
    Utensils,
    Sofa,
    Zap,
    Projector,
    Monitor,
    Users,
    Clock,
    CalendarDays,
    CheckCircle2,
    ChevronRight,
    Heart,
} from "lucide-react";
import type { ElementType } from "react";

interface Studio {
    _id: string;
    title: string;
    category: string;
    hourlyRate: number;
    securityDeposit: number;
    maxCapacity: number;
    location: string;
    imageUrl?: string;
    images?: string[];
    amenities: string[];
    description: string;
    ownerName: string;
    ownerEmail: string;
    rating?: number;
    totalReviews?: number;
}

interface Props {
    studio: Studio;
}

const amenityIcons: Record<string, ElementType> = {
    "Free Wi-Fi": Wifi,
    "Air Conditioning": Wind,
    Parking: Car,
    "Natural Lighting": Sun,
    "Lighting Equipment": Lightbulb,
    "Soundproof Room": Volume2,
    Restroom: Bath,
    Kitchen: Utensils,
    Furniture: Sofa,
    "Power Backup": Zap,
    Projector,
    "Green Screen": Monitor,
};

const StudioDetails = ({ studio }: Props) => {
    // Images: Always returns a string array
    const images: string[] = studio.images?.length
        ? studio.images
        : studio.imageUrl
            ? [studio.imageUrl]
            : [];

    const amenities = studio.amenities || [];

    const [activeImage, setActiveImage] = useState(0);
    const [showBooking, setShowBooking] = useState(false);
    const [showAllAmenities, setShowAllAmenities] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    // Next image
    const nextImage = () => {
        setActiveImage((prev) => (prev + 1) % images.length);
    };

    // Previous image
    const previousImage = () => {
        setActiveImage((prev) => (prev - 1 + images.length) % images.length);
    };

    // Show amenities
    const displayedAmenities = showAllAmenities
        ? amenities
        : amenities.slice(0, 8);

    return (
        <main className="min-h-screen bg-[#FAF8F5] pb-20">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Breadcrumb */}
                <div className="mb-6 flex items-center gap-2 text-sm text-[#77736F]">
                    <Link href="/" className="transition hover:text-[#F06A3C]">
                        Home
                    </Link>

                    <ChevronRight size={14} />

                    <Link href="/studios" className="transition hover:text-[#F06A3C]">
                        Studios
                    </Link>

                    <ChevronRight size={14} />

                    <span className="truncate text-[#242321]">
                        {studio.title}
                    </span>
                </div>

                {/* Studio Header */}
                <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <span className="mb-3 inline-flex rounded-full bg-[#F06A3C]/10 px-3 py-1 text-xs font-semibold text-[#F06A3C]">
                            {studio.category}
                        </span>

                        <h1 className="text-3xl font-bold tracking-tight text-[#242321] sm:text-4xl">
                            {studio.title}
                        </h1>

                        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[#77736F]">
                            <span className="flex items-center gap-1.5">
                                <MapPin size={16} />
                                {studio.location}
                            </span>

                            {studio.rating ? (
                                <span className="flex items-center gap-1.5 text-[#242321]">
                                    <Star
                                        size={16}
                                        className="fill-[#F59E0B] text-[#F59E0B]"
                                    />

                                    {studio.rating}

                                    <span className="text-[#77736F]">
                                        ({studio.totalReviews || 0} reviews)
                                    </span>
                                </span>
                            ) : (
                                <span className="text-[#77736F]">
                                    New listing
                                </span>
                            )}

                            <span className="flex items-center gap-1.5">
                                <Users size={16} />
                                Up to {studio.maxCapacity} guests
                            </span>
                        </div>
                    </div>

                    {/* Save Studio */}
                    <button
                        onClick={() => setIsSaved(!isSaved)}
                        className={`flex items-center gap-2 self-start rounded-full border px-4 py-2.5 text-sm font-medium transition sm:self-auto ${isSaved
                                ? "border-[#F06A3C] bg-[#F06A3C]/10 text-[#F06A3C]"
                                : "border-[#EAE5DF] text-[#242321] hover:border-[#F06A3C] hover:text-[#F06A3C]"
                            }`}
                    >
                        <Heart
                            size={17}
                            className={isSaved ? "fill-current" : ""}
                        />
                        {isSaved ? "Saved" : "Save Studio"}
                    </button>
                </div>

                {/* Image Gallery */}
                <section className="mb-12">
                    {images.length > 0 ? (
                        <>
                            <div className="grid gap-3 lg:grid-cols-[2.8fr_0.7fr]">
                                {/* Main Image */}
                                <div className="group relative h-[300px] overflow-hidden rounded-2xl bg-[#EAE5DF] sm:h-[460px]">
                                    <Image
                                        src={images[activeImage]}
                                        alt={studio.title}
                                        fill
                                        priority
                                        unoptimized
                                        className="object-cover transition duration-500 group-hover:scale-[1.02]"
                                    />

                                    {images.length > 1 && (
                                        <>
                                            <button
                                                onClick={previousImage}
                                                aria-label="Previous image"
                                                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#242321] shadow-md transition hover:bg-white"
                                            >
                                                <ArrowLeft size={19} />
                                            </button>

                                            <button
                                                onClick={nextImage}
                                                aria-label="Next image"
                                                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#242321] shadow-md transition hover:bg-white"
                                            >
                                                <ArrowRight size={19} />
                                            </button>
                                        </>
                                    )}

                                    <span className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white">
                                        {activeImage + 1} / {images.length}
                                    </span>
                                </div>

                                {/* Side Images */}
                                <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:grid-rows-2">
                                    {images.slice(0, 2).map((image, index) => (
                                        <button
                                            key={image + index}
                                            onClick={() => setActiveImage(index)}
                                            className={`group relative h-[110px] overflow-hidden rounded-xl bg-[#EAE5DF] sm:h-[170px] lg:h-full ${activeImage === index
                                                    ? "ring-2 ring-[#F06A3C] ring-offset-2"
                                                    : ""
                                                }`}
                                        >
                                            <Image
                                                src={image}
                                                alt={`${studio.title} ${index + 1}`}
                                                fill
                                                unoptimized
                                                className="object-cover transition duration-300 group-hover:scale-105"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* All Image Thumbnails */}
                            {images.length > 2 && (
                                <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                                    {images.map((image, index) => (
                                        <button
                                            key={image + index}
                                            onClick={() => setActiveImage(index)}
                                            className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg transition ${activeImage === index
                                                    ? "ring-2 ring-[#F06A3C] ring-offset-1"
                                                    : "opacity-70 hover:opacity-100"
                                                }`}
                                        >
                                            <Image
                                                src={image}
                                                alt={`Thumbnail ${index + 1}`}
                                                fill
                                                unoptimized
                                                className="object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex h-[350px] items-center justify-center rounded-2xl bg-[#EAE5DF] text-[#77736F]">
                            No studio images available
                        </div>
                    )}
                </section>

                {/* Main Content */}
                <div className="grid gap-10 lg:grid-cols-[1fr_350px]">

                    {/* Left Content */}
                    <div className="space-y-10">

                        {/* Overview */}
                        <section>
                            <h2 className="text-xl font-bold text-[#242321]">
                                About This Workspace
                            </h2>

                            <p className="mt-4 text-[15px] leading-7 text-[#77736F]">
                                {studio.description}
                            </p>
                        </section>

                        <div className="h-px bg-[#EAE5DF]" />

                        {/* Specifications */}
                        <section>
                            <h2 className="text-xl font-bold text-[#242321]">
                                Workspace Specifications
                            </h2>

                            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">

                                <div className="rounded-xl border border-[#EAE5DF] bg-white p-4">
                                    <Users size={20} className="text-[#F06A3C]" />

                                    <p className="mt-3 text-xs text-[#77736F]">
                                        Max Capacity
                                    </p>

                                    <p className="mt-1 font-semibold text-[#242321]">
                                        {studio.maxCapacity} People
                                    </p>
                                </div>

                                <div className="rounded-xl border border-[#EAE5DF] bg-white p-4">
                                    <Clock size={20} className="text-[#F06A3C]" />

                                    <p className="mt-3 text-xs text-[#77736F]">
                                        Booking Type
                                    </p>

                                    <p className="mt-1 font-semibold text-[#242321]">
                                        Hourly Booking
                                    </p>
                                </div>

                                <div className="rounded-xl border border-[#EAE5DF] bg-white p-4">
                                    <ShieldCheck size={20} className="text-[#F06A3C]" />

                                    <p className="mt-3 text-xs text-[#77736F]">
                                        Security Deposit
                                    </p>

                                    <p className="mt-1 font-semibold text-[#242321]">
                                        ${studio.securityDeposit}
                                    </p>
                                </div>
                            </div>
                        </section>

                        <div className="h-px bg-[#EAE5DF]" />

                        {/* Amenities */}
                        <section>
                            <h2 className="text-xl font-bold text-[#242321]">
                                What This Studio Offers
                            </h2>

                            {amenities.length > 0 ? (
                                <>
                                    <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                                        {displayedAmenities.map((amenity) => {
                                            const Icon = amenityIcons[amenity] || CheckCircle2;

                                            return (
                                                <div
                                                    key={amenity}
                                                    className="flex items-center gap-3 text-sm text-[#55514D]"
                                                >
                                                    <Icon
                                                        size={19}
                                                        className="shrink-0 text-[#F06A3C]"
                                                    />

                                                    {amenity}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {amenities.length > 8 && (
                                        <button
                                            onClick={() =>
                                                setShowAllAmenities(!showAllAmenities)
                                            }
                                            className="mt-5 text-sm font-semibold text-[#F06A3C] transition hover:text-[#D9562D]"
                                        >
                                            {showAllAmenities
                                                ? "Show Less"
                                                : "Show All Amenities"}
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p className="mt-4 text-sm text-[#77736F]">
                                    No amenities information available.
                                </p>
                            )}
                        </section>

                        <div className="h-px bg-[#EAE5DF]" />

                        {/* Host Details */}
                        <section>
                            <h2 className="text-xl font-bold text-[#242321]">
                                Meet Your Host
                            </h2>

                            <div className="mt-5 flex items-center gap-4 rounded-xl border border-[#EAE5DF] bg-white p-5">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F06A3C]/10 text-xl font-bold text-[#F06A3C]">
                                    {studio.ownerName?.charAt(0)?.toUpperCase() || "H"}
                                </div>

                                <div className="min-w-0">
                                    <h3 className="font-semibold text-[#242321]">
                                        {studio.ownerName || "Studio Host"}
                                    </h3>

                                    <p className="mt-1 truncate text-sm text-[#77736F]">
                                        {studio.ownerEmail}
                                    </p>

                                    <span className="mt-2 inline-flex items-center gap-1 text-xs text-green-600">
                                        <ShieldCheck size={14} />
                                        Workspace Host
                                    </span>
                                </div>
                            </div>
                        </section>

                        <div className="h-px bg-[#EAE5DF]" />

                        {/* Reviews */}
                        <section>
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-[#242321]">
                                    Guest Reviews
                                </h2>

                                <span className="text-sm text-[#77736F]">
                                    {studio.totalReviews || 0} reviews
                                </span>
                            </div>

                            {studio.totalReviews ? (
                                <div className="mt-5 rounded-xl border border-[#EAE5DF] bg-white p-5">
                                    <div className="flex items-center gap-2">
                                        <Star
                                            size={20}
                                            className="fill-[#F59E0B] text-[#F59E0B]"
                                        />

                                        <span className="text-xl font-bold text-[#242321]">
                                            {studio.rating}
                                        </span>
                                    </div>

                                    <p className="mt-2 text-sm text-[#77736F]">
                                        Based on {studio.totalReviews} guest reviews.
                                    </p>
                                </div>
                            ) : (
                                <div className="mt-5 rounded-xl border border-dashed border-[#EAE5DF] bg-white p-8 text-center">
                                    <Star
                                        size={25}
                                        className="mx-auto text-[#C8C1B9]"
                                    />

                                    <p className="mt-3 font-medium text-[#242321]">
                                        No reviews yet
                                    </p>

                                    <p className="mt-1 text-sm text-[#77736F]">
                                        Be the first to share your experience!
                                    </p>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Booking Card */}
                    <aside className="lg:sticky lg:top-24 lg:h-fit">
                        <div className="rounded-2xl border border-[#EAE5DF] bg-white p-6 shadow-sm">

                            <div className="flex items-end gap-1">
                                <span className="text-3xl font-bold text-[#242321]">
                                    ${studio.hourlyRate}
                                </span>

                                <span className="pb-1 text-sm text-[#77736F]">
                                    / hour
                                </span>
                            </div>

                            <div className="my-5 h-px bg-[#EAE5DF]" />

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

                            <button
                                onClick={() => setShowBooking(true)}
                                className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[#F06A3C] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#D9562D]"
                            >
                                <CalendarDays size={18} />
                                Book Workspace Now
                            </button>

                            <p className="mt-4 text-center text-xs text-[#77736F]">
                                {`You ${`won't`} be charged yet.`}
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
                </div>
            </div>

            {/* Booking Modal Placeholder */}
            {showBooking && (
                <div
                    onClick={() => setShowBooking(false)}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-[#242321]">
                                Book This Workspace
                            </h2>

                            <button
                                onClick={() => setShowBooking(false)}
                                aria-label="Close booking modal"
                                className="text-2xl text-[#77736F] transition hover:text-[#242321]"
                            >
                                ×
                            </button>
                        </div>

                        <p className="mt-3 text-sm text-[#77736F]">
                            You are booking{" "}
                            <strong>{studio.title}</strong>.
                        </p>

                        <div className="mt-5 rounded-xl bg-[#FAF8F5] p-4">
                            <p className="text-sm text-[#77736F]">
                                Hourly rate
                            </p>

                            <p className="mt-1 text-xl font-bold text-[#242321]">
                                ${studio.hourlyRate} / hour
                            </p>
                        </div>

                        <p className="mt-5 text-sm text-[#77736F]">
                            Booking date, time, duration and confirmation will be added
                            in the booking workflow.
                        </p>

                        <button
                            onClick={() => setShowBooking(false)}
                            className="mt-6 w-full rounded-full bg-[#F06A3C] px-5 py-3 font-semibold text-white transition hover:bg-[#D9562D]"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default StudioDetails;
