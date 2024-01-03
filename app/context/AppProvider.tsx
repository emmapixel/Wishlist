import { PropsWithChildren, useState } from "react";
import { AppContext, AppContextType } from "./app";

export const AppProvider = (props: PropsWithChildren) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    const value: AppContextType = {
        loggedInUser,
        setLoggedInUser,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}