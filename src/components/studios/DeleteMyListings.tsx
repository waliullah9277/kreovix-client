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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/my-listings/${listings._id}`,
        {
          method: "DELETE",
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
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:border-red-600 hover:bg-red-600 hover:text-white"
          >
            <Trash2 size={14} />
            Delete
          </Button>
        }
      >
        Delete
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-2xl border border-[#EAE5DF] bg-white p-6 sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Studio?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to permanently delete{" "}
            <span className="font-semibold text-foreground">
              {listings.title}
            </span>
            ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
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