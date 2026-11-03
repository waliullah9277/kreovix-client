"use client";

import { useState } from "react";
import type { Studio } from "@/types/studio";
import Link from "next/link";
import { MapPin, Plus, Pencil, Eye } from "lucide-react";
import Image from "next/image";
import DeleteMyListings from "./DeleteMyListings";

interface MyListingsProps {
    listings: Studio[];
}

const MyListings = ({ listings }: MyListingsProps) => {

    // Store listings in state
    const [studioListings, setListings] = useState<Studio[]>(listings);

    // Remove deleted listing from UI
    const handleListingDeleted = (deletedId: string) => {
        setListings((prev) =>
            prev.filter((listing) => listing._id !== deletedId)
        );
    };

    return (
        <section className="min-h-screen bg-[#FAF8F5] dark:bg-[#111827] py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Page Header */}
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-[#242321] dark:text-[#F9FAFB]">
                            My Studio Listings
                        </h1>
                        <p className="mt-2 text-sm text-[#77736F] dark:text-[#CBD5E1]">
                            Manage your creative spaces and studio listings.
                        </p>
                    </div>

                    <Link
                        href="/add-new-studio"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#F06A3C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D9562D]"
                    >
                        <Plus size={18} />
                        Add New Studio
                    </Link>
                </div>

                {/* Listings Count */}
                <div className="mb-6">
                    <p className="text-sm text-[#77736F] dark:text-[#CBD5E1]">
                        Total Listings:{" "}
                        <span className="font-semibold text-[#242321] dark:text-[#F9FAFB]">
                            {studioListings.length}
                        </span>
                    </p>
                </div>

                {/* Listings Table */}
                {studioListings.length > 0 ? (
                    <div className="space-y-3">

                        {/* Table Header */}
                        <div className="hidden grid-cols-[2.2fr_1fr_1fr_1.5fr_1fr] items-center gap-4 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#96918A] dark:text-[#94A3B8] lg:grid">
                            <span>Studio Details</span>
                            <span>Category</span>
                            <span>Hourly Rate</span>
                            <span>Location</span>
                            <span className="text-center">Actions</span>
                        </div>

                        {/* Studio Rows */}
                        {studioListings.map((item) => (
                            <div
                                key={item._id}
                                className="group grid gap-4 rounded-xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] p-4 transition-all duration-200 hover:border-[#F06A3C]/40 hover:shadow-md sm:p-5 lg:grid-cols-[2.2fr_1fr_1fr_1.5fr_1fr] lg:items-center lg:gap-4"
                            >
                                {/* Studio Details */}
                                <div className="flex min-w-0 items-center gap-4">
                                    <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-[#F0ECE6] dark:bg-[#374151]">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.title}
                                            fill
                                            sizes="80px"
                                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="truncate font-semibold text-[#242321] dark:text-[#F9FAFB] transition-colors group-hover:text-[#F06A3C]">
                                            {item.title}
                                        </h3>
                                        <p className="mt-1 text-xs text-[#96918A] dark:text-[#94A3B8]">
                                            Studio Listing
                                        </p>
                                    </div>
                                </div>

                                {/* Category */}
                                <div className="flex items-center justify-between lg:block">
                                    <span className="text-xs font-medium text-[#96918A] dark:text-[#94A3B8] lg:hidden">
                                        Category
                                    </span>
                                    <span className="inline-flex rounded-md bg-[#FCE4DB] dark:bg-[#3D2926] px-3 py-1.5 text-xs font-semibold text-[#D9562D] dark:text-[#FDBA98]">
                                        {item.category}
                                    </span>
                                </div>

                                {/* Hourly Rate */}
                                <div className="flex items-center justify-between lg:block">
                                    <span className="text-xs font-medium text-[#96918A] dark:text-[#94A3B8] lg:hidden">
                                        Hourly Rate
                                    </span>
                                    <p className="font-bold text-[#242321] dark:text-[#F9FAFB]">
                                        ${item.hourlyRate}
                                        <span className="ml-1 text-xs font-normal text-[#96918A] dark:text-[#94A3B8]">
                                            /hr
                                        </span>
                                    </p>
                                </div>

                                {/* Location */}
                                <div className="flex min-w-0 items-center justify-between lg:justify-start">
                                    <span className="text-xs font-medium text-[#96918A] dark:text-[#94A3B8] lg:hidden">
                                        Location
                                    </span>
                                    <span className="flex min-w-0 items-center gap-1.5 text-sm text-[#77736F] dark:text-[#CBD5E1]">
                                        <MapPin size={15} className="shrink-0 text-[#F06A3C]" />
                                        <span className="truncate">{item.location}</span>
                                    </span>
                                </div>

                                {/* Actions */}
                                {/* Actions */}
                                <div className="flex items-center justify-end gap-2 border-t border-[#F0ECE6] dark:border-[#374151] pt-3 lg:justify-center lg:border-0 lg:pt-0">

                                    {/* View Details */}
                                    <Link
                                        href={`/studios/${item._id}`}
                                        title="View Studio Details"
                                        aria-label={`View details of ${item.title}`}
                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-100 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 transition-all duration-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                                    >
                                        <Eye size={17} />
                                    </Link>

                                    {/* Update Studio */}
                                    <Link
                                        href={`/studios/edit/${item._id}`}
                                        title="Update Studio"
                                        aria-label={`Update ${item.title}`}
                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#F06A3C]/20 dark:border-[#F06A3C]/40 bg-[#FCE4DB]/40 dark:bg-[#3D2926] text-[#D9562D] dark:text-[#FDBA98] transition-all duration-200 hover:border-[#F06A3C] hover:bg-[#F06A3C] hover:text-white"
                                    >
                                        <Pencil size={16} />
                                    </Link>

                                    {/* Delete Studio */}
                                    <DeleteMyListings
                                        listings={item}
                                        onDeleted={handleListingDeleted}
                                    />

                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] px-6 py-20 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F06A3C]/10">
                            <Plus size={26} className="text-[#F06A3C]" />
                        </div>

                        <h2 className="text-xl font-semibold text-[#242321] dark:text-[#F9FAFB]">
                            No Studio Listings Found
                        </h2>

                        <p className="mt-2 text-sm text-[#77736F] dark:text-[#CBD5E1]">
                            {`You haven't added any studios yet.`}
                        </p>

                        <Link
                            href="/add-new-studio"
                            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#F06A3C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D9562D]"
                        >
                            <Plus size={18} />
                            Add Your First Studio
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MyListings;