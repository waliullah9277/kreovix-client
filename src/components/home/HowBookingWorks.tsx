import {
  Search,
  Clock3,
  CalendarCheck2,
  Clapperboard,
  ArrowUpRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover Spaces",
    description:
      "Explore unique photography studios, creative spaces, and production-ready locations.",
    icon: Search,
  },
  {
    number: "02",
    title: "Select Shoot Hours",
    description:
      "Choose your preferred date, available time slots, and the hours that fit your project.",
    icon: Clock3,
  },
  {
    number: "03",
    title: "Book Instantly",
    description:
      "Confirm your reservation with a simple and secure booking experience.",
    icon: CalendarCheck2,
  },
  {
    number: "04",
    title: "Create & Produce",
    description:
      "Show up, bring your creative vision, and turn your ideas into something amazing.",
    icon: Clapperboard,
  },
];

const HowBookingWorks = () => {
  return (
    <section className="bg-[#FAF8F5] py-10 md:py-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-8 flex flex-col justify-between gap-6 md:mb-10 md:flex-row md:items-end">
          <div className="max-w-xl mb-6">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#F06A3C]">
              Simple Process
            </span>

            <h2 className="text-3xl font-semibold tracking-tight text-[#242321] sm:text-4xl lg:text-5xl">
              From finding a space
              <br />
              to <span className="text-[#F06A3C]">creating magic.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-[#77736D]">
            Your next creative project starts here. Discover, book, and create
            without the unnecessary hassle.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative overflow-hidden rounded-2xl border border-[#EAE5DF] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#F06A3C]/40 hover:shadow-xl hover:shadow-[#242321]/5 sm:p-7"
              >
                {/* Number */}
                <div className="mb-9 flex items-center justify-between">
                  <span className="text-sm font-semibold tracking-widest text-[#F06A3C]">
                    {step.number}
                  </span>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FAF8F5] text-[#242321] transition-colors duration-300 group-hover:bg-[#F06A3C] group-hover:text-white">
                    <Icon size={22} strokeWidth={1.7} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-semibold text-[#242321]">
                  {step.title}
                </h3>

                <p className="text-sm leading-7 text-[#858079]">
                  {step.description}
                </p>

                {/* Bottom indicator */}
                <div className="mt-8 flex items-center justify-between border-t border-[#EAE5DF] pt-5">
                  <span className="text-xs font-medium text-[#A09A92]">
                    STEP {step.number}
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="text-[#B9B3AC] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#F06A3C]"
                  />
                </div>

                {/* Decorative background number */}
                <span className="pointer-events-none absolute -bottom-8 -right-2 text-8xl font-bold text-[#242321]/[0.025]">
                  {index + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowBookingWorks;