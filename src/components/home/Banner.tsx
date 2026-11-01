
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Mic2,
  Clapperboard,
} from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    category: "Premium Photography Studios",
    title: "Find the Perfect Studio for Your Creative Vision",
    description:
      "Discover and book premium studios for photography, filmmaking, events and more — all in one place.",
    image: "/images/banner/photography.jpg",
    icon: Camera,
    highlight: ["Studio"],
  },
  {
    id: 2,
    category: "Professional Podcast Studios",
    title: "Record, Create & Inspire Your Next Big Idea",
    description:
      "Find professional podcast spaces equipped with everything you need to bring your voice to life.",
    image: "/images/banner/podcast.jpg",
    icon: Mic2,
    highlight: ["Create", "Inspire"],
  },
  {
    id: 3,
    category: "Film & Video Production",
    title: "Bring Your Creative Stories to Life",
    description:
      "Explore professional production spaces designed for filmmakers, creators and visual storytellers.",
    image: "/images/banner/film-production.jpg",
    icon: Clapperboard,
    highlight: ["Stories"],
  },
];

const Banner = () => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  return (
    <section className="relative h-[calc(100svh-4rem)] min-h-[560px] w-full overflow-hidden bg-[#171614]">

      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        onSwiper={setSwiper}
        loop
        speed={900}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        className="kreovix-banner h-full w-full"
      >
        {slides.map((slide) => {
          const Icon = slide.icon;

          return (
            <SwiperSlide key={slide.id}>
              <div className="relative flex h-full min-h-[560px] w-full items-center overflow-hidden">

                {/* Background Image */}
                <Image
                  src={slide.image}
                  alt={slide.category}
                  fill
                  priority={slide.id === 1}
                  sizes="100vw"
                  className="object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#171614] via-[#171614]/80 to-[#171614]/15" />

                {/* Content */}
                <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12 py-16">

                  {/* Category */}
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F06A3C]/50 bg-black/30 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md sm:text-sm">
                    <Icon size={17} className="text-[#F06A3C]" />
                    {slide.category}
                  </div>

                  {/* Heading */}
                  <h1 className="max-w-3xl text-4xl leading-[1.12] font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl">
                    {slide.title.split(" ").map((word, index) => {
                      const cleanWord = word.replace(/[.,!?]/g, "");

                      return slide.highlight.includes(cleanWord) ? (
                        <span key={index} className="text-[#F06A3C]">
                          {word}{" "}
                        </span>
                      ) : (
                        <span key={index}>{word} </span>
                      );
                    })}
                  </h1>

                  {/* Description */}
                  <p className="mt-6 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
                    {slide.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      href="/studios"
                      className="inline-flex items-center gap-2 rounded-lg bg-[#F06A3C] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D9562D]"
                    >
                      Explore Studios
                      <ArrowRight size={17} />
                    </Link>

                    <Link
                      href="/studios"
                      className="rounded-lg border border-white/50 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#F06A3C] hover:bg-[#F06A3C]"
                    >
                      Host Your Space
                    </Link>
                  </div>
                </div>

                {/* Decorative Shape */}
                <div className="pointer-events-none absolute -right-24 -bottom-40 h-80 w-80 rounded-full border-[40px] border-[#F06A3C]/20" />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Previous Button */}
      <button
        onClick={() => swiper?.slidePrev()}
        aria-label="Previous slide"
        className="absolute top-1/2 left-5 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:border-[#F06A3C] hover:bg-[#F06A3C] sm:flex"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Next Button */}
      <button
        onClick={() => swiper?.slideNext()}
        aria-label="Next slide"
        className="absolute top-1/2 right-5 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:border-[#F06A3C] hover:bg-[#F06A3C] sm:flex"
      >
        <ArrowRight size={20} />
      </button>
    </section>
  );
};

export default Banner;
