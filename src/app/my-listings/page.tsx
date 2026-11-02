"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import type { Studio } from "@/types/studio";
import MyListings from "@/components/studios/MyListings";

const MyListingsPage = () => {
    const { data: session, isPending } = authClient.useSession();

    const [listings, setListings] = useState<Studio[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!session?.user.email) {
            return;
        }

        const fetchMyListings = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_URL}/my-listings?email=${encodeURIComponent(session.user.email)}`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch listings");
                }

                const data: Studio[] = await res.json();
                setListings(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMyListings();
    }, [session, isPending]);

    if (isPending || (session?.user.email && isLoading)) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <p className="text-[#77736F]">Loading your listings...</p>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <p className="text-[#77736F]">
                    Please login to view your listings.
                </p>
            </div>
        );
    }

    return <MyListings listings={listings} />;
};

export default MyListingsPage;