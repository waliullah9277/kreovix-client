
import StudioDetails from "@/components/studios/StudioDetails";
import { notFound } from "next/navigation";

interface StudioDetailsPageProps {
  params: Promise<{ id: string }>;
}

const StudioDetailsPage = async ({
  params,
}: StudioDetailsPageProps) => {
  const { id } = await params;

  // Validate Studio ID
  if (!/^[a-fA-F0-9]{24}$/.test(id)) {
    notFound();
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/studios/${id}`,
    {
      cache: "no-store",
    }
  );

  // Studio Not Found
  if (res.status === 404) {
    notFound();
  }

  // Other API Errors
  if (!res.ok) {
    console.error(
      "Studio API Error:",
      res.status,
      await res.text()
    );

    throw new Error("Failed to load studio details.");
  }

  const data = await res.json();

  if (!data) {
    notFound();
  }

  return <StudioDetails studio={data} />;
};

export default StudioDetailsPage;
