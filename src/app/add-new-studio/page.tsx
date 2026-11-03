"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Image as ImageIcon,
  Loader2,
  MapPin,
  Plus,
  X,
} from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import Image from "next/image";

const categories = [
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
];

const availableAmenities = [
  "Free Wi-Fi",
  "Air Conditioning",
  "Parking",
  "Natural Lighting",
  "Lighting Equipment",
  "Soundproof Room",
  "Restroom",
  "Kitchen",
  "Furniture",
  "Power Backup",
  "Projector",
  "Green Screen",
];

const AddNewStudio = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    hourlyRate: "",
    securityDeposit: "",
    maxCapacity: "",
    location: "",
    imageUrl: "",
    description: "",
  });

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to add a studio.");
      return;
    }

    if (selectedAmenities.length === 0) {
      toast.error("Please select at least one amenity.");
      return;
    }

    setIsSubmitting(true);

    const studioData = {
      ...formData,
      hourlyRate: Number(formData.hourlyRate),
      securityDeposit: Number(formData.securityDeposit),
      maxCapacity: Number(formData.maxCapacity),
      amenities: selectedAmenities,
      ownerEmail: user.email,
      ownerName: user.name,
    };

    try {
      const token = await getTokenFromClient()
      if (!token) {
        toast.error("Authentication token not found!");
        return;
      }
      console.log(token)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/add-new-studio`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(studioData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create studio.");
      }

      toast.success("New Studio Created Successfully!");

      router.push("/my-listings");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong!"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] px-4 py-3 text-sm text-[#242321] dark:text-[#F9FAFB] outline-none transition placeholder:text-[#A5A09A] dark:placeholder:text-[#9CA3AF] focus:border-[#F06A3C] focus:ring-2 focus:ring-[#F06A3C]/10";

  const labelClass =
    "mb-2 block text-sm font-semibold text-[#34312E] dark:text-[#F9FAFB]";

  if (isPending || !session) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-[#F06A3C]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#111827] px-4 py-10 sm:px-6 lg:py-14">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <Link
            href="/my-listings"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#77736F] dark:text-[#CBD5E1] transition hover:text-[#F06A3C]"
          >
            <ArrowLeft size={16} />
            Back to My Listings
          </Link>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-[#F06A3C]">
                <Building2 size={20} />
                <span className="text-xs font-bold uppercase tracking-[0.15em]">
                  Studio Management
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-[#242321] dark:text-[#F9FAFB] sm:text-4xl">
                Add New Studio
              </h1>

              <p className="mt-2 text-sm text-[#77736F] dark:text-[#CBD5E1]">
                Share your creative space with people looking for the
                perfect studio.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Basic Information */}
          <section className="rounded-2xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] p-5 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#242321] dark:text-[#F9FAFB]">
                Basic Information
              </h2>
              <p className="mt-1 text-sm text-[#77736F] dark:text-[#CBD5E1]">
                Provide the basic details of your studio.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              <div className="sm:col-span-2">
                <label htmlFor="title" className={labelClass}>
                  Studio Title <span className="text-[#F06A3C]">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="e.g. Creative Photography Studio"
                  value={formData.title}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="category" className={labelClass}>
                  Category <span className="text-[#F06A3C]">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`${inputClass} ${!formData.category ? "text-[#A5A09A] dark:text-[#9CA3AF]" : ""
                    }`}
                  required
                >
                  <option value="" disabled>
                    Select studio category
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="hourlyRate" className={labelClass}>
                  Hourly Rate ($) <span className="text-[#F06A3C]">*</span>
                </label>
                <input
                  id="hourlyRate"
                  name="hourlyRate"
                  type="number"
                  min="1"
                  placeholder="e.g. 50"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label htmlFor="securityDeposit" className={labelClass}>
                  Security Deposit ($){" "}
                  <span className="text-[#F06A3C]">*</span>
                </label>
                <input
                  id="securityDeposit"
                  name="securityDeposit"
                  type="number"
                  min="0"
                  placeholder="e.g. 100"
                  value={formData.securityDeposit}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="maxCapacity" className={labelClass}>
                  Maximum Capacity{" "}
                  <span className="text-[#F06A3C]">*</span>
                </label>
                <input
                  id="maxCapacity"
                  name="maxCapacity"
                  type="number"
                  min="1"
                  placeholder="e.g. 10 people"
                  value={formData.maxCapacity}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </section>

          {/* Location & Image */}
          <section className="rounded-2xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] p-5 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#242321] dark:text-[#F9FAFB]">
                Location & Media
              </h2>
              <p className="mt-1 text-sm text-[#77736F] dark:text-[#CBD5E1]">
                Help people find and visualize your studio.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label htmlFor="location" className={labelClass}>
                  <span className="inline-flex items-center gap-2">
                    <MapPin size={15} />
                    Location / Address
                  </span>
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="e.g. Gulshan, Dhaka, Bangladesh"
                  value={formData.location}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label htmlFor="imageUrl" className={labelClass}>
                  <span className="inline-flex items-center gap-2">
                    <ImageIcon size={15} />
                    Studio Image URL
                  </span>
                </label>
                <input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  placeholder="https://example.com/studio-image.jpg"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              {formData.imageUrl && (
                <div className="overflow-hidden rounded-xl border border-[#EAE5DF] dark:border-[#374151]">
                  <Image
                    src={formData.imageUrl}
                    alt="Studio preview"
                    className="h-52 w-full object-cover"
                    width={300}
                    height={300}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
          </section>

          {/* Amenities */}
          <section className="rounded-2xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] p-5 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#242321] dark:text-[#F9FAFB]">
                Studio Amenities
              </h2>
              <p className="mt-1 text-sm text-[#77736F] dark:text-[#CBD5E1]">
                Select the facilities available in your studio.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {availableAmenities.map((amenity) => {
                const isSelected = selectedAmenities.includes(amenity);

                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${isSelected
                        ? "border-[#F06A3C] bg-[#FFF4EF] dark:bg-[#3B2B26] text-[#D9562D] dark:text-[#FB916E]"
                        : "border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] text-[#77736F] dark:text-[#CBD5E1] hover:border-[#F06A3C]/50"
                      }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${isSelected
                          ? "border-[#F06A3C] bg-[#F06A3C] text-white"
                          : "border-[#D8D2CB] dark:border-[#4B5563]"
                        }`}
                    >
                      {isSelected && <Check size={13} />}
                    </span>
                    {amenity}
                  </button>
                );
              })}
            </div>

            <p className="mt-4 text-xs text-[#A5A09A] dark:text-[#9CA3AF]">
              {selectedAmenities.length} amenities selected
            </p>
          </section>

          {/* Description */}
          <section className="rounded-2xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] p-5 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#242321] dark:text-[#F9FAFB]">
                Studio Overview
              </h2>
              <p className="mt-1 text-sm text-[#77736F] dark:text-[#CBD5E1]">
                Tell visitors what makes your studio special.
              </p>
            </div>

            <div>
              <label htmlFor="description" className={labelClass}>
                Detailed Overview{" "}
                <span className="text-[#F06A3C]">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={6}
                placeholder="Describe your studio, its atmosphere, equipment, facilities and what visitors can expect..."
                value={formData.description}
                onChange={handleChange}
                className={`${inputClass} resize-y`}
                required
                minLength={20}
              />
              <p className="mt-2 text-xs text-[#A5A09A] dark:text-[#9CA3AF]">
                Minimum 20 characters.
              </p>
            </div>
          </section>

          {/* Owner Information */}
          <section className="rounded-2xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] p-5 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#242321] dark:text-[#F9FAFB]">
                Owner Information
              </h2>
              <p className="mt-1 text-sm text-[#77736F] dark:text-[#CBD5E1]">
                Your account information is automatically added.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="ownerName" className={labelClass}>
                  Owner Name
                </label>
                <input
                  id="ownerName"
                  type="text"
                  value={user?.name || ""}
                  readOnly
                  className={`${inputClass} cursor-not-allowed bg-[#FAF8F5] dark:bg-[#111827] text-[#77736F] dark:text-[#CBD5E1]`}
                />
              </div>

              <div>
                <label htmlFor="ownerEmail" className={labelClass}>
                  Owner Email
                </label>
                <input
                  id="ownerEmail"
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className={`${inputClass} cursor-not-allowed bg-[#FAF8F5] dark:bg-[#111827] text-[#77736F] dark:text-[#CBD5E1]`}
                />
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/my-listings"
              className="inline-flex items-center justify-center rounded-xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] px-6 py-3 text-sm font-semibold text-[#77736F] dark:text-[#CBD5E1] transition hover:bg-[#F5F2EE] dark:hover:bg-[#374151]"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F06A3C] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#D9562D] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Creating Studio...
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Create Studio
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddNewStudio;
