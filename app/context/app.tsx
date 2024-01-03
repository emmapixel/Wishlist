import { User } from "firebase/auth";
import { createContext, useContext } from "react";

export type AppContextType = {
    loggedInUser: User | null;
    setLoggedInUser: (user: User | null) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
}