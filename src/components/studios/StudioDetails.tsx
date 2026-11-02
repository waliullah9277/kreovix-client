
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
import BookingCard from "../my-bookings/BookingCard";
import SaveStudioButton from "./SaveStudioButton";

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
    const [showAllAmenities, setShowAllAmenities] = useState(false);

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
        <main className="min-h-screen bg-[#FAF8F5] dark:bg-[#111827] pb-20">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Breadcrumb */}
                <div className="mb-6 flex items-center gap-2 text-sm text-[#77736F] dark:text-[#CBD5E1]">
                    <Link href="/" className="transition hover:text-[#F06A3C]">
                        Home
                    </Link>

                    <ChevronRight size={14} />

                    <Link href="/studios" className="transition hover:text-[#F06A3C]">
                        Studios
                    </Link>

                    <ChevronRight size={14} />

                    <span className="truncate text-[#242321] dark:text-[#F9FAFB]">
                        {studio.title}
                    </span>
                </div>

                {/* Studio Header */}
                <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <span className="mb-3 inline-flex rounded-full bg-[#F06A3C]/10 px-3 py-1 text-xs font-semibold text-[#F06A3C]">
                            {studio.category}
                        </span>

                        <h1 className="text-3xl font-bold tracking-tight text-[#242321] dark:text-[#F9FAFB] sm:text-4xl">
                            {studio.title}
                        </h1>

                        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[#77736F] dark:text-[#CBD5E1]">
                            <span className="flex items-center gap-1.5">
                                <MapPin size={16} />
                                {studio.location}
                            </span>

                            {studio.rating ? (
                                <span className="flex items-center gap-1.5 text-[#242321] dark:text-[#F9FAFB]">
                                    <Star
                                        size={16}
                                        className="fill-[#F59E0B] text-[#F59E0B]"
                                    />

                                    {studio.rating}

                                    <span className="text-[#77736F] dark:text-[#CBD5E1]">
                                        ({studio.totalReviews || 0} reviews)
                                    </span>
                                </span>
                            ) : (
                                <span className="text-[#77736F] dark:text-[#CBD5E1]">
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
                    <SaveStudioButton studioId={studio._id} />
                </div>

                {/* Image Gallery */}
                <section className="mb-12">
                    {images.length > 0 ? (
                        <>
                            <div className="grid gap-3 lg:grid-cols-[2.8fr_0.7fr]">
                                {/* Main Image */}
                                <div className="group relative h-[300px] overflow-hidden rounded-2xl bg-[#EAE5DF] dark:bg-[#374151] sm:h-[460px]">
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
                                                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#242321] dark:bg-[#1F2937]/90 dark:text-[#F9FAFB] shadow-md transition hover:bg-white dark:hover:bg-[#374151]"
                                            >
                                                <ArrowLeft size={19} />
                                            </button>

                                            <button
                                                onClick={nextImage}
                                                aria-label="Next image"
                                                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#242321] dark:bg-[#1F2937]/90 dark:text-[#F9FAFB] shadow-md transition hover:bg-white dark:hover:bg-[#374151]"
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
                                            className={`group relative h-[110px] overflow-hidden rounded-xl bg-[#EAE5DF] dark:bg-[#374151] sm:h-[170px] lg:h-full ${activeImage === index
                                                ? "ring-2 ring-[#F06A3C] ring-offset-2 dark:ring-offset-[#111827]"
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
                                                ? "ring-2 ring-[#F06A3C] ring-offset-1 dark:ring-offset-[#111827]"
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
                        <div className="flex h-[350px] items-center justify-center rounded-2xl bg-[#EAE5DF] dark:bg-[#374151] text-[#77736F] dark:text-[#CBD5E1]">
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
                            <h2 className="text-xl font-bold text-[#242321] dark:text-[#F9FAFB]">
                                About This Workspace
                            </h2>

                            <p className="mt-4 text-[15px] leading-7 text-[#77736F] dark:text-[#CBD5E1]">
                                {studio.description}
                            </p>
                        </section>

                        <div className="h-px bg-[#EAE5DF] dark:bg-[#374151]" />

                        {/* Specifications */}
                        <section>
                            <h2 className="text-xl font-bold text-[#242321] dark:text-[#F9FAFB]">
                                Workspace Specifications
                            </h2>

                            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">

                                <div className="rounded-xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] p-4">
                                    <Users size={20} className="text-[#F06A3C]" />

                                    <p className="mt-3 text-xs text-[#77736F] dark:text-[#CBD5E1]">
                                        Max Capacity
                                    </p>

                                    <p className="mt-1 font-semibold text-[#242321] dark:text-[#F9FAFB]">
                                        {studio.maxCapacity} People
                                    </p>
                                </div>

                                <div className="rounded-xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] p-4">
                                    <Clock size={20} className="text-[#F06A3C]" />

                                    <p className="mt-3 text-xs text-[#77736F] dark:text-[#CBD5E1]">
                                        Booking Type
                                    </p>

                                    <p className="mt-1 font-semibold text-[#242321] dark:text-[#F9FAFB]">
                                        Hourly Booking
                                    </p>
                                </div>

                                <div className="rounded-xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] p-4">
                                    <ShieldCheck size={20} className="text-[#F06A3C]" />

                                    <p className="mt-3 text-xs text-[#77736F] dark:text-[#CBD5E1]">
                                        Security Deposit
                                    </p>

                                    <p className="mt-1 font-semibold text-[#242321] dark:text-[#F9FAFB]">
                                        ${studio.securityDeposit}
                                    </p>
                                </div>
                            </div>
                        </section>

                        <div className="h-px bg-[#EAE5DF] dark:bg-[#374151]" />

                        {/* Amenities */}
                        <section>
                            <h2 className="text-xl font-bold text-[#242321] dark:text-[#F9FAFB]">
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
                                                    className="flex items-center gap-3 text-sm text-[#55514D] dark:text-[#CBD5E1]"
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
                                <p className="mt-4 text-sm text-[#77736F] dark:text-[#CBD5E1]">
                                    No amenities information available.
                                </p>
                            )}
                        </section>

                        <div className="h-px bg-[#EAE5DF] dark:bg-[#374151]" />

                        {/* Host Details */}
                        <section>
                            <h2 className="text-xl font-bold text-[#242321] dark:text-[#F9FAFB]">
                                Meet Your Host
                            </h2>

                            <div className="mt-5 flex items-center gap-4 rounded-xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] p-5">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F06A3C]/10 text-xl font-bold text-[#F06A3C]">
                                    {studio.ownerName?.charAt(0)?.toUpperCase() || "H"}
                                </div>

                                <div className="min-w-0">
                                    <h3 className="font-semibold text-[#242321] dark:text-[#F9FAFB]">
                                        {studio.ownerName || "Studio Host"}
                                    </h3>

                                    <p className="mt-1 truncate text-sm text-[#77736F] dark:text-[#CBD5E1]">
                                        {studio.ownerEmail}
                                    </p>

                                    <span className="mt-2 inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                                        <ShieldCheck size={14} />
                                        Workspace Host
                                    </span>
                                </div>
                            </div>
                        </section>

                        <div className="h-px bg-[#EAE5DF] dark:bg-[#374151]" />

                        {/* Reviews */}
                        <section>
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-[#242321] dark:text-[#F9FAFB]">
                                    Guest Reviews
                                </h2>

                                <span className="text-sm text-[#77736F] dark:text-[#CBD5E1]">
                                    {studio.totalReviews || 0} reviews
                                </span>
                            </div>

                            {studio.totalReviews ? (
                                <div className="mt-5 rounded-xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] p-5">
                                    <div className="flex items-center gap-2">
                                        <Star
                                            size={20}
                                            className="fill-[#F59E0B] text-[#F59E0B]"
                                        />

                                        <span className="text-xl font-bold text-[#242321] dark:text-[#F9FAFB]">
                                            {studio.rating}
                                        </span>
                                    </div>

                                    <p className="mt-2 text-sm text-[#77736F] dark:text-[#CBD5E1]">
                                        Based on {studio.totalReviews} guest reviews.
                                    </p>
                                </div>
                            ) : (
                                <div className="mt-5 rounded-xl border border-dashed border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] p-8 text-center">
                                    <Star
                                        size={25}
                                        className="mx-auto text-[#C8C1B9] dark:text-[#94A3B8]"
                                    />

                                    <p className="mt-3 font-medium text-[#242321] dark:text-[#F9FAFB]">
                                        No reviews yet
                                    </p>

                                    <p className="mt-1 text-sm text-[#77736F] dark:text-[#CBD5E1]">
                                        Be the first to share your experience!
                                    </p>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Booking Card */}
                    <BookingCard studio={studio} />
                </div>
            </div>

        </main>
    );
};

export default StudioDetails;
