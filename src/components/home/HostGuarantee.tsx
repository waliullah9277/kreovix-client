import {
  ShieldCheck,
  BadgeCheck,
  Wrench,
  Headset,
  ArrowUpRight,
  Check,
} from "lucide-react";

const guarantees = [
  {
    number: "01",
    title: "Liability Protection",
    description:
      "Clear booking policies and protection guidelines help keep every booking transparent and secure.",
    icon: ShieldCheck,
  },
  {
    number: "02",
    title: "Verified Profiles",
    description:
      "Connect with verified space hosts and creators for a more trusted booking experience.",
    icon: BadgeCheck,
  },
  {
    number: "03",
    title: "Equipment Safety",
    description:
      "Find spaces with clearly listed equipment details and safety guidelines before you book.",
    icon: Wrench,
  },
  {
    number: "04",
    title: "24/7 Host Support",
    description:
      "Get assistance whenever you need help with your booking, studio access, or hosting experience.",
    icon: Headset,
  },
];

const HostGuarantee = () => {
  return (
    <section id="become-a-host" className="scroll-mt-24 relative overflow-hidden bg-[#242321] py-12 md:py-16">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#F06A3C]/10 blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#F06A3C]">
              <ShieldCheck size={16} />
              Trust Comes First
            </span>

            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Create with confidence.
              <br />
              <span className="text-[#F06A3C]">
                We've got your back.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/50">
            Great creative experiences start with peace of mind. We bring
            together trusted hosts, safer spaces, and reliable support.
          </p>
        </div>

        {/* Guarantee Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {guarantees.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.number}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#F06A3C]/50 hover:bg-white/[0.07] sm:p-7"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F06A3C]/10 text-[#F06A3C] transition-all duration-300 group-hover:bg-[#F06A3C] group-hover:text-white">
                    <Icon size={23} strokeWidth={1.7} />
                  </div>

                  <span className="text-xs font-medium tracking-widest text-white/30">
                    {item.number}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="text-sm leading-7 text-white/45">
                  {item.description}
                </p>

                <div className="mt-7 flex items-center gap-2 text-xs font-medium text-[#F06A3C]">
                  <Check size={15} />
                  <span>Creator-first experience</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Support Banner */}
        <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.06] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F06A3C] text-white">
              <Headset size={22} />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Need a helping hand?
              </h3>

              <p className="mt-1 text-sm text-white/45">
                Our support team is here for you, anytime.
              </p>
            </div>
          </div>

          <a
            href="/contact"
            className="group inline-flex items-center gap-2 self-start rounded-full bg-[#F06A3C] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#E65B30] sm:self-auto"
          >
            Get Support
            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HostGuarantee;