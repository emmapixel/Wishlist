import { Outlet, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { useAppContext } from "~/context/app";
import logo from "~/images/logo.png";
import title from "~/images/title.png";

export default function Layout() {
    const { loggedInUser } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedInUser) {
            navigate("/login");
        }
    }, [])

    return (
        <div className="flex flex-col h-screen justify-between">
            <header className="flex py-2 bg-slate-300">
                <img src={logo} alt="Logo" width={100} height={100} onClick={() => navigate("/")} className="cursor-pointer"/>
                <img src={title} alt="Title" width={400} height={100}/>
            </header>

            <main className="h-full">
                <Outlet />
            </main>

            <footer className="flex py-2 bg-slate-300 justify-center">Copyright 2024 Önskelistan</footer>
        </div>
    );
}