import Banner from "@/components/home/Banner";
import FeaturedStudios from "@/components/home/FeaturedStudios";
import HostGuarantee from "@/components/home/HostGuarantee";
import HowBookingWorks from "@/components/home/HowBookingWorks";
import StudioCategories from "@/components/home/StudioCategories";

export default function Home() {
  return (
    <div>
      <main>
        <Banner/>
        <FeaturedStudios/>
        <StudioCategories/>
        <HowBookingWorks/>
        <HostGuarantee/>
      </main>
    </div>
  );
}
