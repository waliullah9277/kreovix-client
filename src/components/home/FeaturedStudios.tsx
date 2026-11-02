"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
    ArrowRight,
    ArrowUpRight,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Star,
} from "lucide-react";

import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

interface Studio {
    _id: string;
    title: string;
    category: string;
    location: string;
    hourlyRate: number;
    rating?: number;
    image?: string;
    imageUrl?: string;
    images?: string[];
}

const FeaturedStudios = () => {
    const [studios, setStudios] = useState<Studio[]>([]);
    const [loading, setLoading] = useState(true);
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    // Fetch Featured Studios
    useEffect(() => {
        const fetchStudios = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_URL}/studio-featured`
                );

                const data = await res.json();
                setStudios(data);
            } catch (error) {
                console.error("Failed to fetch studios:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudios();
    }, []);

    // Carousel Selection
    const onSelect = useCallback((carouselApi: CarouselApi) => {
        if (!carouselApi) return;
        setCurrent(carouselApi.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!api) return;

        onSelect(api);

        api.on("select", onSelect);
        api.on("reInit", onSelect);

        return () => {
            api.off("select", onSelect);
            api.off("reInit", onSelect);
        };
    }, [api, onSelect]);

    const total = api?.scrollSnapList().length ?? 0;

    return (
        <section className="overflow-hidden bg-[#FAF8F5] py-10 md:py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <span className="mb-3 inline-block rounded-full bg-[#FFF0E9] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#F06A3C]">
                            Explore Our Spaces
                        </span>

                        <h2 className="text-3xl font-bold tracking-tight text-[#242321] sm:text-4xl">
                            Featured Studios
                        </h2>

                        <p className="mt-3 max-w-xl text-sm leading-6 text-[#77736F] sm:text-base">
                            Discover inspiring creative spaces for your next
                            project, photoshoot, podcast, or production.
                        </p>
                    </div>

                    <Link
                        href="/studios"
                        className="hidden shrink-0 items-center gap-2 rounded-full border border-[#F06A3C] px-5 py-2.5 text-sm font-semibold text-[#F06A3C] transition hover:bg-[#F06A3C] hover:text-white sm:inline-flex"
                    >
                        Explore All Studios
                        <ArrowRight size={17} />
                    </Link>
                </div>

                {/* Loading Skeleton */}
                {loading && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="overflow-hidden rounded-2xl border border-[#EAE5DF] bg-white"
                            >
                                <div className="aspect-[4/3] animate-pulse bg-gray-200" />

                                <div className="space-y-4 p-5">
                                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                                    <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
                                    <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && studios.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-[#EAE5DF] bg-white px-6 py-16 text-center">
                        <h3 className="text-lg font-semibold text-[#242321]">
                            No Featured Studios Available
                        </h3>

                        <p className="mt-2 text-sm text-[#77736F]">
                            Check back soon for new creative spaces.
                        </p>
                    </div>
                )}

                {/* Featured Studios Carousel */}
                {!loading && studios.length > 0 && (
                    <Carousel
                        setApi={setApi}
                        opts={{
                            align: "start",
                            loop: studios.length > 3,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {studios.map((studio) => {
                                const studioImage =
                                    studio.images?.[0] ||
                                    studio.imageUrl ||
                                    studio.image ||
                                    "";

                                return (
                                    <CarouselItem
                                        key={studio._id}
                                        className="basis-[88%] pl-4 sm:basis-1/2 lg:basis-1/3"
                                    >
                                        <article className="group h-full overflow-hidden rounded-2xl border border-[#EAE5DF] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

                                            {/* Studio Image */}
                                            <Link
                                                href={`/studios/${studio._id}`}
                                                className="relative block aspect-[4/3] overflow-hidden bg-[#F0EBE6]"
                                            >
                                                {studioImage ? (
                                                    <Image
                                                        src={studioImage}
                                                        alt={studio.title}
                                                        fill
                                                        sizes="(max-width: 640px) 88vw, (max-width: 1024px) 50vw, 33vw"
                                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center text-sm text-[#77736F]">
                                                        No Image Available
                                                    </div>
                                                )}

                                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                                                {/* Category Badge */}
                                                <span className="absolute bottom-4 left-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#242321] shadow-sm">
                                                    {studio.category}
                                                </span>

                                                {/* Rating Badge */}
                                                {typeof studio.rating === "number" && (
                                                    <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#242321] shadow-sm">
                                                        <Star
                                                            size={13}
                                                            className="fill-amber-400 text-amber-400"
                                                        />
                                                        {studio.rating.toFixed(1)}
                                                    </span>
                                                )}
                                            </Link>

                                            {/* Studio Details */}
                                            <div className="flex h-[190px] flex-col p-5">

                                                {/* Location */}
                                                <div className="flex items-center gap-1.5 text-xs text-[#77736F]">
                                                    <MapPin
                                                        size={15}
                                                        className="shrink-0 text-[#F06A3C]"
                                                    />

                                                    <span className="truncate">
                                                        {studio.location}
                                                    </span>
                                                </div>

                                                {/* Title */}
                                                <Link
                                                    href={`/studios/${studio._id}`}
                                                    className="mt-3 line-clamp-1 text-lg font-bold text-[#242321] transition hover:text-[#F06A3C]"
                                                >
                                                    {studio.title}
                                                </Link>

                                                {/* Price & Button */}
                                                <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#F0EBE6] pt-4">

                                                    <div>
                                                        <span className="text-xl font-bold text-[#F06A3C]">
                                                            ${studio.hourlyRate}
                                                        </span>

                                                        <span className="ml-1 text-xs text-[#77736F]">
                                                            / hr
                                                        </span>
                                                    </div>

                                                    <Link
                                                        href={`/studios/${studio._id}`}
                                                        className="inline-flex items-center gap-1.5 rounded-full bg-[#F06A3C] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#D9562D]"
                                                    >
                                                        View Details
                                                        <ArrowUpRight size={14} />
                                                    </Link>

                                                </div>
                                            </div>
                                        </article>
                                    </CarouselItem>
                                );
                            })}
                        </CarouselContent>
                    </Carousel>
                )}

                {/* Carousel Controls */}
                {!loading && studios.length > 0 && (
                    <div className="mt-8 flex items-center gap-5">

                        {/* Current Slide */}
                        <span className="min-w-10 text-sm font-semibold text-[#242321]">
                            {current + 1} / {total || 1}
                        </span>

                        {/* Progress Bar */}
                        <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#EAE5DF]">
                            <div
                                className="h-full rounded-full bg-[#F06A3C] transition-all duration-300"
                                style={{
                                    width: `${
                                        total > 0
                                            ? ((current + 1) / total) * 100
                                            : 0
                                    }%`,
                                }}
                            />
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                aria-label="Previous studio"
                                onClick={() => api?.scrollPrev()}
                                disabled={!api?.canScrollPrev()}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EAE5DF] bg-white text-[#242321] transition hover:border-[#F06A3C] hover:text-[#F06A3C] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            <button
                                type="button"
                                aria-label="Next studio"
                                onClick={() => api?.scrollNext()}
                                disabled={!api?.canScrollNext()}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EAE5DF] bg-white text-[#242321] transition hover:border-[#F06A3C] hover:text-[#F06A3C] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Mobile Explore All Button */}
                <div className="mt-7 sm:hidden">
                    <Link
                        href="/studios"
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-[#F06A3C] px-5 py-3 text-sm font-semibold text-[#F06A3C] transition hover:bg-[#F06A3C] hover:text-white"
                    >
                        Explore All Studios
                        <ArrowRight size={17} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedStudios;