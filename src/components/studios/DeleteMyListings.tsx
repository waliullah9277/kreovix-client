"use client";

import { useState } from "react";
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

import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getTokenFromClient } from "@/lib/getTokenFromClient";




interface DeleteMyListingsProps {
    listings: {
        _id: string;
        title: string;
    };
    onDeleted?: (deletedId: string) => void;
}

const DeleteMyListings = ({
    listings,
    onDeleted,
}: DeleteMyListingsProps) => {
    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!listings?._id) {
            toast.error("Listing ID not found!");
            return;
        }

        setIsDeleting(true);

        try {
            const token = await getTokenFromClient()
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL}/my-listings/${listings._id}`,
                {
                    method: "DELETE",
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                }
            );

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                throw new Error(data?.message || "Failed to delete listing.");
            }

            // Immediately update parent UI
            onDeleted?.(listings._id);

            toast.success(`${listings.title} deleted successfully!`);

            setOpen(false);
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong!"
            );
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog
            open={open}
            onOpenChange={(value) => {
                if (!isDeleting) setOpen(value);
            }}
        >
            <AlertDialogTrigger
                render={
                    <Button
                        type="button"
                        title="Delete Studio"
                        aria-label={`Delete ${listings.title}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 p-0 text-red-600 dark:text-red-400 transition-all duration-200 hover:border-red-600 hover:bg-red-600 hover:text-white"
                    >
                        <Trash2 size={16} />
                    </Button>
                }
            >
                <Trash2 size={16} />
            </AlertDialogTrigger>

            <AlertDialogContent className="rounded-2xl border border-[#EAE5DF] dark:border-[#374151] bg-white dark:bg-[#1F2937] p-6 sm:max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle className="dark:text-[#F9FAFB]">Delete Studio?</AlertDialogTitle>

                    <AlertDialogDescription className="dark:text-[#CBD5E1]">
                        Are you sure you want to permanently delete{" "}
                        <span className="font-semibold text-foreground dark:text-[#F9FAFB]">
                            {listings.title}
                        </span>
                        ? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting} className="dark:border-[#374151] dark:bg-[#374151] dark:text-[#F9FAFB] dark:hover:bg-[#475569]">
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        variant="destructive"
                        disabled={isDeleting}
                        onClick={(e) => {
                            e.preventDefault();
                            void handleDelete();
                        }}
                        className="cursor-pointer"
                    >
                        {isDeleting ? (
                            <>
                                <Loader2 className="mr-2 size-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 className="mr-2 size-4" />
                                Delete
                            </>
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteMyListings;