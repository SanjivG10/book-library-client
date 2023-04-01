import { AuthContext } from "@context/AuthContext";
import { useContext } from "react";

export const useAuth = () => {
    const { user, loading, setUser } = useContext(AuthContext);

    return {
        user, loading, setUser
    }
};