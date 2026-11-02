
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Star,
  Clock,
  Building2,
  Search,
  X,
  SlidersHorizontal,
} from "lucide-react";
import Image from "next/image";

interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  location: string;
  imageUrl: string;
  rating?: number;
  totalReviews?: number;
}

const categories = [
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
];

const AllStudiosPage = () => {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Fetch all studios
  useEffect(() => {
    const fetchStudios = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/studios`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load studios.");
        }

        const result = await response.json();

        const studioList = Array.isArray(result)
          ? result
          : Array.isArray(result.data)
            ? result.data
            : Array.isArray(result.studios)
              ? result.studios
              : [];

        setStudios(studioList);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong!"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudios();
  }, []);

  // Category and search filtering
  const filteredStudios = useMemo(() => {
    return studios.filter((studio) => {
      const matchesCategory =
        activeCategory === "All" ||
        studio.category === activeCategory;

      const searchValue = searchTerm.trim().toLowerCase();

      const matchesSearch =
        !searchValue ||
        studio.title?.toLowerCase().includes(searchValue) ||
        studio.category?.toLowerCase().includes(searchValue) ||
        studio.location?.toLowerCase().includes(searchValue);

      return matchesCategory && matchesSearch;
    });
  }, [studios, activeCategory, searchTerm]);

  // Category count
  const getCategoryCount = (category: string) => {
    if (category === "All") return studios.length;

    return studios.filter(
      (studio) => studio.category === category
    ).length;
  };

  // Clear search and category filters
  const clearFilters = () => {
    setSearchTerm("");
    setActiveCategory("All");
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] dark:bg-[#111827]  py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-2 text-[#F06A3C]">
            <Building2 size={19} />
            <span className="text-xs font-bold uppercase tracking-[0.18em]">
              Explore Workspaces
            </span>
          </div>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#242321] dark:text-[#F9FAFB] sm:text-4xl lg:text-5xl">
                Find Your Perfect
                <span className="text-[#F06A3C]"> Studio.</span>
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#77736F] dark:text-[#CBD5E1] sm:text-base">
                Discover creative spaces designed to bring your ideas
                to life. Find the perfect place for your next project.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#77736F] dark:text-[#CBD5E1]">
              <Building2 size={17} />
              <span>
                <span className="font-bold text-[#242321] dark:text-[#F9FAFB]">
                  {filteredStudios.length}
                </span>{" "}
                {filteredStudios.length === 1 ? "Studio" : "Studios"} Found
              </span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8 rounded-2xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] p-3 shadow-sm sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A5A09A] dark:text-[#9CA3AF]"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search studios by name, category or location..."
                className="w-full rounded-xl border border-[#EAE5DF] dark:border-[#374151] bg-[#FAF8F5] dark:bg-[#111827] py-3.5 pl-11 pr-11 text-sm text-[#242321] dark:text-[#F9FAFB] outline-none transition placeholder:text-[#A5A09A] dark:placeholder:text-[#9CA3AF] focus:border-[#F06A3C] focus:ring-2 focus:ring-[#F06A3C]/10"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#77736F] dark:text-[#CBD5E1] transition hover:text-[#F06A3C]"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {(searchTerm || activeCategory !== "All") && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#EAE5DF] dark:border-[#374151] px-5 py-3 text-sm font-semibold text-[#77736F] dark:text-[#CBD5E1] transition hover:border-[#F06A3C] hover:text-[#F06A3C]"
              >
                <X size={16} />
                Clear Search
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-9">
          <div className="mb-4 flex items-center gap-2">
            <SlidersHorizontal size={17} className="text-[#F06A3C]" />
            <h2 className="text-sm font-bold text-[#242321] dark:text-[#F9FAFB]">
              Browse by Category
            </h2>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-3">
            {["All", ...categories].map((category) => {
              const isActive = activeCategory === category;
              const count = getCategoryCount(category);

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "border-[#F06A3C] bg-[#F06A3C] text-white shadow-sm"
                      : "border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] text-[#77736F] dark:text-[#CBD5E1] hover:border-[#F06A3C]/50 hover:text-[#F06A3C]"
                  }`}
                >
                  {category}

                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#F5F2EE] dark:bg-[#374151] text-[#77736F] dark:text-[#CBD5E1]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Heading */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-[#242321] dark:text-[#F9FAFB]">
              {activeCategory === "All" ? "All Studios" : activeCategory}
            </h2>

            <p className="mt-1 text-xs text-[#77736F] dark:text-[#CBD5E1]">
              Showing {filteredStudios.length} of {studios.length} studios
            </p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937]"
              >
                <div className="h-56 animate-pulse bg-[#EAE5DF] dark:bg-[#374151]" />

                <div className="space-y-4 p-5">
                  <div className="h-4 w-24 animate-pulse rounded bg-[#EAE5DF] dark:bg-[#374151]" />
                  <div className="h-6 w-3/4 animate-pulse rounded bg-[#EAE5DF] dark:bg-[#374151]" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-[#EAE5DF] dark:bg-[#374151]" />
                  <div className="h-10 animate-pulse rounded-lg bg-[#EAE5DF] dark:bg-[#374151]" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 dark:border-red-900/60 bg-white dark:bg-[#1F2937] px-5 py-16 text-center">
            <p className="font-semibold text-red-500 dark:text-red-400">{error}</p>

            <button
              onClick={() => window.location.reload()}
              className="mt-5 rounded-xl bg-[#F06A3C] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#D9562D]"
            >
              Try Again
            </button>
          </div>
        ) : filteredStudios.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] px-5 py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF0E9] dark:bg-[#3B2B26] text-[#F06A3C]">
              <Search size={28} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#242321] dark:text-[#F9FAFB]">
              {searchTerm
                ? "No Matching Studios Found"
                : `${activeCategory === "All" ? "No Studios Available" : `No ${activeCategory} Found`}`}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#77736F] dark:text-[#CBD5E1]">
              {searchTerm
                ? "We couldn't find any studios matching your search. Try another keyword or clear your search."
                : "There are currently no studios available in this category. Explore other categories to discover more spaces."}
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#F06A3C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D9562D]"
            >
              <X size={16} />
              Clear Filters
            </button>
          </div>
        ) : (
          /* Studio Grid */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStudios.map((studio) => (
              <article
                key={studio._id}
                className="group overflow-hidden rounded-2xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] transition duration-300 hover:-translate-y-1 hover:border-[#F06A3C]/40 hover:shadow-xl hover:shadow-[#242321]/5"
              >
                {/* Studio Image */}
                <div className="relative h-56 overflow-hidden bg-[#F0ECE7] dark:bg-[#374151]">
                  <Image
                    src={studio.imageUrl}
                    alt={studio.title}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-4">
                    <span className="rounded-lg border border-white/40 bg-white/95 dark:bg-[#1F2937]/95 px-3 py-1.5 text-xs font-semibold text-[#34312E] dark:text-[#F9FAFB] shadow-sm backdrop-blur">
                      {studio.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-4 rounded-lg bg-white dark:bg-[#1F2937] px-3 py-2 shadow-sm">
                    <span className="text-sm font-bold text-[#242321] dark:text-[#F9FAFB]">
                      ${studio.hourlyRate}
                    </span>
                    <span className="text-xs text-[#77736F] dark:text-[#CBD5E1]"> / hr</span>
                  </div>
                </div>

                {/* Studio Details */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="line-clamp-1 text-lg font-bold text-[#242321] dark:text-[#F9FAFB] transition group-hover:text-[#F06A3C]">
                      {studio.title}
                    </h3>

                    {typeof studio.rating === "number" ? (
                      <div className="flex shrink-0 items-center gap-1 text-sm font-semibold text-[#242321] dark:text-[#F9FAFB]">
                        <Star
                          size={15}
                          className="fill-[#F5A623] text-[#F5A623]"
                        />
                        {studio.rating.toFixed(1)}
                      </div>
                    ) : (
                      <span className="shrink-0 rounded-md bg-[#FFF4EF] dark:bg-[#3B2B26] px-2 py-1 text-[10px] font-bold text-[#D9562D] dark:text-[#FB916E]">
                        NEW LISTING
                      </span>
                    )}
                  </div>

                  {typeof studio.rating === "number" && (
                    <p className="mt-1 text-xs text-[#A5A09A] dark:text-[#9CA3AF]">
                      {studio.totalReviews ?? 0} reviews
                    </p>
                  )}

                  <div className="mt-3 flex items-center gap-2 text-sm text-[#77736F] dark:text-[#CBD5E1]">
                    <MapPin size={16} className="shrink-0 text-[#F06A3C]" />
                    <span className="line-clamp-1">
                      {studio.location}
                    </span>
                  </div>

                  <div className="my-5 border-t border-[#F0ECE7] dark:border-[#374151]" />

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#77736F] dark:text-[#CBD5E1]">
                      <Clock size={14} />
                      Flexible Booking
                    </div>

                    <Link
                      href={`/studios/${studio._id}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#F06A3C] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#D9562D]"
                    >
                      View Details
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </main>
  );
};

export default AllStudiosPage;
