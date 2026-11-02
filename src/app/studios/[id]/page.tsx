
import StudioDetails from "@/components/studios/StudioDetails";

interface StudioDetailsPageProps {
  params: Promise<{ id: string }>;
}

const StudioDetailsPage = async ({ params }: StudioDetailsPageProps) => {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/studios/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">Studio not found.</p>
      </div>
    );
  }

  const data = await res.json();

  return <StudioDetails studio={data} />;
};

export default StudioDetailsPage;
