import { Link, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { PrimaryButton } from "~/components/PrimaryButton";
import { useAppContext } from "~/context/app";
import { createWishlistUser, signUp } from "~/firebase";
import { WishlistUser } from "~/types/wishlistUser";

export default function Login() {
    const navigate = useNavigate();
    const { setLoggedInUser } = useAppContext();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = await signUp(email, password);

        if (!user) {
            return;
        }

        const wishlistUser:WishlistUser = {
            id: user.uid,
            firstname,
            lastname,
            email,
            wishlist: [],
        }

        await createWishlistUser(wishlistUser);

        setLoggedInUser(user);
        navigate("/");
    }

  return (
        <main className="flex flex-col h-screen justify-center items-center bg-slate-200">
            <div className="flex flex-col w-3/12 p-4 bg-white shadow-md rounded">
            <h1 className="flex justify-center items-center text-3xl font-bold">
                Registrera
            </h1>
            <form className="flex flex-col items-stretch mt-4 space-y-4" onSubmit={onSubmit}>
                <div className="flex flex-col">
                    <label className="font-medium" htmlFor="firstname">Förnamn</label>
                    <input
                        className="border-[1px] border-black outline-none p-2"
                        id="firstname"
                        required
                        name="firstname"
                        type="text"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="font-medium" htmlFor="lastname">Efternamn</label>
                    <input
                        className="border-[1px] border-black outline-none p-2"
                        id="lastname"
                        required
                        name="lastname"
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="font-medium" htmlFor="email">Email</label>
                    <input
                        className="border-[1px] border-black outline-none p-2"
                        id="email"
                        required
                        name="email"
                        type="email"
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
        
                <div className="pt-4">
                    <PrimaryButton title="Registrera" type="submit" />
                </div>
            </form>
          <div className="flex space-x-4 mt-6">
                <h1>Redan medlem?</h1>
                <Link to="/login" className="text-blue-600">Logga in</Link>
            </div>
            </div>
      </main>
  );
}