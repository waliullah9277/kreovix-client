
import Link from "next/link";
import {
  Camera,
  Clapperboard,
  Mic2,
  Music2,
  Palette,
  ArrowUpRight,
} from "lucide-react";

const categories = [
  {
    name: "Photo Studios",
    description: "Capture your vision",
    icon: Camera,
  },
  {
    name: "Sound Stages",
    description: "Bring productions to life",
    icon: Clapperboard,
  },
  {
    name: "Podcast Rooms",
    description: "Share your voice",
    icon: Mic2,
  },
  {
    name: "Music Suites",
    description: "Make something memorable",
    icon: Music2,
  },
  {
    name: "Art Workshops",
    description: "Create without limits",
    icon: Palette,
  },
];

export default function StudioCategories() {
  return (
    <section className="bg-[#FAF8F5] py-10 md:py-14 dark:bg-[#111827]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#F06A3C]">
              Explore Spaces
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-[#242321] md:text-3xl dark:text-[#F9FAFB]">
              Browse by Studio Categories
            </h2>

            <p className="mt-2 text-sm text-[#77736F] dark:text-[#CBD5E1]">
              Find the right space for your next creative project.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center gap-1 text-sm font-medium text-[#F06A3C] transition hover:text-[#D9562D]"
          >
            View all studios
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href={`/studios?category=${encodeURIComponent(category.name)}`}
                className="group flex items-center gap-3 rounded-xl border border-[#EAE5DF] bg-white px-4 py-4 transition-colors duration-200 hover:border-[#F06A3C]/50 hover:bg-[#FFFDFC] dark:border-[#374151] dark:bg-[#1F2937] dark:hover:bg-[#263244]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFF0EA] text-[#F06A3C] transition-colors group-hover:bg-[#F06A3C] group-hover:text-white dark:bg-[#392B2A] dark:group-hover:bg-[#F06A3C] dark:group-hover:text-white">
                  <Icon size={19} strokeWidth={1.8} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-[#242321] dark:text-[#F9FAFB]">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-xs text-[#77736F] dark:text-[#CBD5E1]">
                    {category.description}
                  </p>
                </div>

                <ArrowUpRight
                  size={15}
                  className="shrink-0 text-[#B8B1AA] transition-colors group-hover:text-[#F06A3C] dark:text-[#94A3B8] dark:group-hover:text-[#F06A3C]"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
