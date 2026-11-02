import { authClient } from "./auth-client";

export const getTokenFromClient = async () => {
    const { data, error } = await authClient.token();

    if (error) {
        console.error("Client JWT Error:", error.message);
        return null;
    }

    const token = data?.token;

    console.log("Client JWT received:", !!token);

    return token;
};