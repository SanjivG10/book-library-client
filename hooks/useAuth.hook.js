import { AuthContext } from "@context/AuthContext";
import { useContext } from "react";

export const useAuth = () => {
    const { user, loading } = useContext(AuthContext);

    return {
        user, loading
    }
};