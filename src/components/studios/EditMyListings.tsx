"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
    Pencil,
    ArrowRight,
    Check,
    Image as ImageIcon,
    Loader2,
    MapPin,
} from "lucide-react";

import { toast } from "sonner";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

// Categories
const categories = [
    "Photo Studios",
    "Sound Stages",
    "Podcast Rooms",
    "Music Suites",
    "Art Workshops",
];

// Available Amenities
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

// Listing Type
interface Listing {
    _id?: string;
    id?: string;
    title?: string;
    category?: string;
    hourlyRate?: number | string;
    securityDeposit?: number | string;
    maxCapacity?: number | string;
    location?: string;
    imageUrl?: string;
    description?: string;
    amenities?: string[];
    ownerName?: string;
    ownerEmail?: string;
}

interface EditMyListingsProps {
    listings: Listing;
    onUpdated?: () => void | Promise<void>;
}

// Form Type
interface StudioFormData {
    title: string;
    category: string;
    hourlyRate: string;
    securityDeposit: string;
    maxCapacity: string;
    location: string;
    imageUrl: string;
    description: string;
}

// Convert Listing Data to Form Data
const getFormData = (listing: Listing): StudioFormData => ({
    title: listing?.title ?? "",
    category: listing?.category ?? "",
    hourlyRate: String(listing?.hourlyRate ?? ""),
    securityDeposit: String(listing?.securityDeposit ?? ""),
    maxCapacity: String(listing?.maxCapacity ?? ""),
    location: listing?.location ?? "",
    imageUrl: listing?.imageUrl ?? "",
    description: listing?.description ?? "",
});

const EditMyListings = ({
    listings,
    onUpdated,
}: EditMyListingsProps) => {
    const router = useRouter();

    // Authentication
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    // States
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState<StudioFormData>(() =>
        getFormData(listings)
    );

    const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
        () => [...(listings?.amenities ?? [])]
    );

    // Open Dialog and Load Existing Data
    const handleEdit = () => {
        if (!listings) {
            toast.error("Studio data not found.");
            return;
        }

        console.log("Selected Studio:", listings);

        setFormData(getFormData(listings));

        setSelectedAmenities(
            Array.isArray(listings.amenities)
                ? [...listings.amenities]
                : []
        );

        setOpen(true);
    };

    // Handle Dialog Close
    const handleDialogChange = (isOpen: boolean) => {
        if (isSubmitting) return;

        setOpen(isOpen);
    };

    // Handle Input Change
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

    // Toggle Amenity
    const toggleAmenity = (amenity: string) => {
        setSelectedAmenities((prev) =>
            prev.includes(amenity)
                ? prev.filter((item) => item !== amenity)
                : [...prev, amenity]
        );
    };

    // PATCH API - Update Studio
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user) {
            toast.error("Please login to update your studio.");
            return;
        }

        const studioId = listings?._id || listings?.id;

        if (!studioId) {
            toast.error("Studio ID not found.");
            return;
        }

        if (selectedAmenities.length === 0) {
            toast.error("Please select at least one amenity.");
            return;
        }

        if (!process.env.NEXT_PUBLIC_URL) {
            toast.error("API URL is not configured.");
            return;
        }

        setIsSubmitting(true);

        // Updated Studio Data
        const updatedData = {
            ...formData,
            hourlyRate: Number(formData.hourlyRate),
            securityDeposit: Number(formData.securityDeposit),
            maxCapacity: Number(formData.maxCapacity),
            amenities: selectedAmenities,
        };

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL}/my-listings/${studioId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedData),
                }
            );

            const result = await response.json().catch(() => null);

            if (!response.ok) {
                throw new Error(
                    result?.message || "Failed to update studio."
                );
            }

            toast.success(`${listings.title} Updated Successfully!`);

            // Close Dialog
            setOpen(false);

            // Refresh Server Component Data
            router.refresh();

            // Refresh Client Component Data if Callback Provided
            if (onUpdated) {
                await onUpdated();
            }
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

    // Input Styling
    const inputClass =
        "w-full rounded-xl border border-[#EAE5DF] bg-white px-4 py-3 text-sm text-[#242321] outline-none transition placeholder:text-[#A5A09A] focus:border-[#F06A3C] focus:ring-2 focus:ring-[#F06A3C]/10";

    const labelClass =
        "mb-2 block text-sm font-semibold text-[#34312E]";

    // Loading
    if (isPending) {
        return (
            <div className="flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-[#F06A3C]" />
            </div>
        );
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={handleDialogChange}>

                {/* Update Button */}
                <Button
                    type="button"
                    onClick={handleEdit}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#F06A3C]/20 bg-[#FCE4DB]/40 px-3 py-2 text-xs font-semibold text-[#D9562D] transition hover:border-[#F06A3C] hover:bg-[#F06A3C] hover:text-white"
                >
                    <Pencil size={14} />
                    Update
                </Button>

                {/* Dialog Content */}
                <DialogContent
                    className="!w-[95vw] !max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#EAE5DF] bg-[#FAF8F5] p-4 sm:p-6"
                >
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-[#242321]">
                            Update Studio
                        </DialogTitle>

                        <DialogDescription className="text-sm text-[#77736F]">
                            Update your studio information. Your existing details
                            are already filled in.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Basic Information */}
                        <section className="rounded-2xl border border-[#EAE5DF] bg-white p-5 shadow-sm sm:p-8">
                            <div className="mb-6">
                                <h2 className="text-lg font-bold text-[#242321]">
                                    Basic Information
                                </h2>

                                <p className="mt-1 text-sm text-[#77736F]">
                                    Provide the basic details of your studio.
                                </p>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">

                                {/* Studio Title */}
                                <div className="sm:col-span-2">
                                    <label htmlFor="title" className={labelClass}>
                                        Studio Title
                                        <span className="text-[#F06A3C]"> *</span>
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

                                {/* Category */}
                                <div className="sm:col-span-2">
                                    <label htmlFor="category" className={labelClass}>
                                        Category
                                        <span className="text-[#F06A3C]"> *</span>
                                    </label>

                                    <select
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className={`${inputClass} ${!formData.category
                                                ? "text-[#A5A09A]"
                                                : ""
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

                                {/* Hourly Rate */}
                                <div>
                                    <label htmlFor="hourlyRate" className={labelClass}>
                                        Hourly Rate ($)
                                        <span className="text-[#F06A3C]"> *</span>
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

                                {/* Security Deposit */}
                                <div>
                                    <label
                                        htmlFor="securityDeposit"
                                        className={labelClass}
                                    >
                                        Security Deposit ($)
                                        <span className="text-[#F06A3C]"> *</span>
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

                                {/* Maximum Capacity */}
                                <div className="sm:col-span-2">
                                    <label htmlFor="maxCapacity" className={labelClass}>
                                        Maximum Capacity
                                        <span className="text-[#F06A3C]"> *</span>
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
                        <section className="rounded-2xl border border-[#EAE5DF] bg-white p-5 shadow-sm sm:p-8">
                            <div className="mb-6">
                                <h2 className="text-lg font-bold text-[#242321]">
                                    Location & Media
                                </h2>

                                <p className="mt-1 text-sm text-[#77736F]">
                                    Help people find and visualize your studio.
                                </p>
                            </div>

                            <div className="space-y-5">

                                {/* Location */}
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

                                {/* Image URL */}
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

                                {/* Image Preview */}
                                {formData.imageUrl && (
                                    <div className="overflow-hidden rounded-xl border border-[#EAE5DF]">
                                        <Image
                                            key={formData.imageUrl}
                                            src={formData.imageUrl}
                                            alt="Studio preview"
                                            width={200}
                                            height={200}
                                            className="h-52 w-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none";
                                            }}
                                        />
                                    </div>
                                )}

                            </div>
                        </section>

                        {/* Amenities */}
                        <section className="rounded-2xl border border-[#EAE5DF] bg-white p-5 shadow-sm sm:p-8">
                            <div className="mb-6">
                                <h2 className="text-lg font-bold text-[#242321]">
                                    Studio Amenities
                                </h2>

                                <p className="mt-1 text-sm text-[#77736F]">
                                    Select the facilities available in your studio.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {availableAmenities.map((amenity) => {
                                    const isSelected =
                                        selectedAmenities.includes(amenity);

                                    return (
                                        <button
                                            key={amenity}
                                            type="button"
                                            onClick={() => toggleAmenity(amenity)}
                                            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${isSelected
                                                    ? "border-[#F06A3C] bg-[#FFF4EF] text-[#D9562D]"
                                                    : "border-[#EAE5DF] bg-white text-[#77736F] hover:border-[#F06A3C]/50"
                                                }`}
                                        >
                                            <span
                                                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${isSelected
                                                        ? "border-[#F06A3C] bg-[#F06A3C] text-white"
                                                        : "border-[#D8D2CB]"
                                                    }`}
                                            >
                                                {isSelected && <Check size={13} />}
                                            </span>

                                            {amenity}
                                        </button>
                                    );
                                })}
                            </div>

                            <p className="mt-4 text-xs text-[#A5A09A]">
                                {selectedAmenities.length} amenities selected
                            </p>
                        </section>

                        {/* Description */}
                        <section className="rounded-2xl border border-[#EAE5DF] bg-white p-5 shadow-sm sm:p-8">
                            <div className="mb-6">
                                <h2 className="text-lg font-bold text-[#242321]">
                                    Studio Overview
                                </h2>

                                <p className="mt-1 text-sm text-[#77736F]">
                                    Tell visitors what makes your studio special.
                                </p>
                            </div>

                            <div>
                                <label htmlFor="description" className={labelClass}>
                                    Detailed Overview
                                    <span className="text-[#F06A3C]"> *</span>
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

                                <p className="mt-2 text-xs text-[#A5A09A]">
                                    Minimum 20 characters.
                                </p>
                            </div>
                        </section>

                        {/* Owner Information */}
                        <section className="rounded-2xl border border-[#EAE5DF] bg-white p-5 shadow-sm sm:p-8">
                            <div className="mb-6">
                                <h2 className="text-lg font-bold text-[#242321]">
                                    Owner Information
                                </h2>

                                <p className="mt-1 text-sm text-[#77736F]">
                                    Your account information is automatically added.
                                </p>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">

                                {/* Owner Name */}
                                <div>
                                    <label htmlFor="ownerName" className={labelClass}>
                                        Owner Name
                                    </label>

                                    <input
                                        id="ownerName"
                                        type="text"
                                        value={listings?.ownerName || user?.name || ""}
                                        readOnly
                                        className={`${inputClass} cursor-not-allowed bg-[#FAF8F5] text-[#77736F]`}
                                    />
                                </div>

                                {/* Owner Email */}
                                <div>
                                    <label htmlFor="ownerEmail" className={labelClass}>
                                        Owner Email
                                    </label>

                                    <input
                                        id="ownerEmail"
                                        type="email"
                                        value={listings?.ownerEmail || user?.email || ""}
                                        readOnly
                                        className={`${inputClass} cursor-not-allowed bg-[#FAF8F5] text-[#77736F]`}
                                    />
                                </div>

                            </div>
                        </section>

                        {/* Submit Buttons */}
                        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                            {/* Cancel Button */}
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isSubmitting}
                                onClick={() => setOpen(false)}
                                className="h-11 min-w-[150px] rounded-xl border border-[#EAE5DF] bg-white px-6 text-sm font-semibold text-[#77736F] transition hover:bg-[#F5F2EE]"
                            >
                                Cancel
                            </Button>

                            {/* Update Button */}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="h-11 min-w-[150px] gap-2 rounded-xl bg-[#F06A3C] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#D9562D] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={17} className="animate-spin" />
                                        Updating Studio...
                                    </>
                                ) : (
                                    <>
                                        <Pencil size={17} />
                                        Update Studio
                                        <ArrowRight size={17} />
                                    </>
                                )}
                            </Button>

                        </div>

                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EditMyListings;