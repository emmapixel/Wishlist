import { Link, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { useAppContext } from "~/context/app";
import { login } from "~/firebase";

export default function Login() {
    const navigate = useNavigate();
    const { setLoggedInUser } = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = await login(email, password);

        if (!user) {
            return;
        }

        console.log("Inloggad!", user);

        setLoggedInUser(user);
        navigate("/");
    }

    return (
        <main className="flex flex-col h-screen justify-center items-center bg-slate-200">
            <div className="flex flex-col w-3/12 p-4 bg-white shadow-md rounded">
                <h1 className="flex justify-center items-center text-3xl font-bold">
                    Logga in
                </h1>
                <form className="flex flex-col items-stretch mt-4 space-y-4" onSubmit={onSubmit}>
                    <div className="flex flex-col">
                        <label className="font-medium" htmlFor="email">Email</label>
                        <input
                            className="border-[1px] border-black outline-none p-2"
                            id="email"
                            required
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium" htmlFor="password">Lösenord</label>
                        <input
                            className="border-[1px] border-black outline-none p-2"
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="pt-4">
                        <button className="flex font-medium bg-blue-400 rounded-full px-4 py-2" type="submit">Logga in</button>
                    </div>
                </form>
            <div className="flex space-x-4 mt-6">
                <h1>Inte medlem?</h1>
                <Link to="/signup" className="text-blue-600">Registrera dig här</Link>
            </div>
            </div>
        </main>
    );
}
