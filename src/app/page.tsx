import Banner from "@/components/home/Banner";
import HostGuarantee from "@/components/home/HostGuarantee";
import HowBookingWorks from "@/components/home/HowBookingWorks";
import StudioCategories from "@/components/home/StudioCategories";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main>
        <Banner/>
        <StudioCategories/>
        <HowBookingWorks/>
        <HostGuarantee/>
      </main>
    </div>
  );
}
