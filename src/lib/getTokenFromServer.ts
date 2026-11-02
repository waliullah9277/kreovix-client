import { headers } from "next/headers";
import { auth } from "./auth";

export const getTokenFromServer = async () => {
    const jwtToken = await auth.api.getToken({
        headers: await headers(),
    });

    const token = jwtToken?.token;

    console.log("Server JWT received:", !!token);

    return token;
};