"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";
import { toast } from "sonner";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const CancelBookingButton = ({ id }: { id: string }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleCancel = async () => {
        try {
            setLoading(true);
            const token = await getTokenFromClient()

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_URL}/bookings/${id}/cancel`,
                {
                    method: "PATCH",
                    headers:{
                        authorization: `Bearer ${token}`,
                    }
                }
            );

            const data = await res.json();

            if (res.ok && data.modifiedCount > 0) {
                toast.success("Booking cancelled successfully!");
                setOpen(false);
                router.refresh();
            } else {
                toast.error("Failed to cancel booking!");
            }
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
            >
                <XCircle size={14} />
                Cancel
            </AlertDialogTrigger>

            <AlertDialogContent className="max-w-[calc(100%-2rem)] rounded-2xl border-[#EAE5DF] bg-white sm:max-w-md">
                <AlertDialogHeader>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                        <XCircle size={24} className="text-red-500" />
                    </div>

                    <AlertDialogTitle className="text-xl font-bold text-[#242321]">
                        Cancel Booking?
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-sm leading-6 text-[#77736F]">
                        Are you sure you want to cancel this booking?
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="mt-4 gap-2">
                    <AlertDialogCancel
                        disabled={loading}
                        className="rounded-xl border-[#EAE5DF]"
                    >
                        Keep Booking
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            handleCancel();
                        }}
                        disabled={loading}
                        className="rounded-xl bg-red-500 text-white hover:bg-red-600"
                    >
                        {loading ? "Cancelling..." : "Yes, Cancel Booking"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default CancelBookingButton;