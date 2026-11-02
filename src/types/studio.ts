export interface Studio {
    _id: string;
    title: string;
    category: string;
    hourlyRate: number;
    securityDeposit: number;
    maxCapacity: number;
    location: string;
    imageUrl: string;
    images?: string[];
    amenities: string[];
    description: string;
    ownerName: string;
    ownerEmail: string;
}