import { TrashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "@remix-run/react";
import { log } from "console";
import { set } from "firebase/database";
import { useEffect, useState } from "react";
import { useAppContext } from "~/context/app";
import { getWishlistUser, updateWishlistUser } from '~/firebase';
import { WishlistUser } from "~/types/wishlistUser";

export default function Profile() {
    const navigate = useNavigate();
    const { loggedInUser } = useAppContext();
    const [wishlistUser, setWishlistUser] = useState<WishlistUser | null>(null);
    const [newWish, setNewWish] = useState("");

    useEffect(() => {
        if (!loggedInUser) {
          navigate("/login");
        }

        const fetchWishlistUser = async () => {
            const userId = loggedInUser?.uid;
            const wishlistUser = await getWishlistUser(userId) as WishlistUser;
            setWishlistUser(wishlistUser);
        }

        fetchWishlistUser();
      }, [])

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!loggedInUser) {
            return;
        }
        
        const updatedWishlistUser = {
            id: loggedInUser.uid,
            firstname: wishlistUser?.firstname || "",
            lastname: wishlistUser?.lastname || "",
            email: wishlistUser?.email || "",
            wishlist: [...wishlistUser?.wishlist || [], newWish]
        };

        setWishlistUser(updatedWishlistUser);
        updateWishlistUser(updatedWishlistUser);
        setNewWish("");
    }

    const deleteWishlistItem = (item: string) => {
        if (!loggedInUser) {
            return;
        }

        const updatedWishlistUser = {
            id: loggedInUser.uid,
            firstname: wishlistUser?.firstname || "",
            lastname: wishlistUser?.lastname || "",
            email: wishlistUser?.email || "",
            wishlist: wishlistUser?.wishlist.filter(wish => wish !== item) || []
        };

        setWishlistUser(updatedWishlistUser);
        updateWishlistUser(updatedWishlistUser);
    }

  return (
    <div className="flex flex-col w-2/5 space-y-4 p-4">
        <h1 className="text-xl font-bold">Min önskelista</h1>
        <div className="space-y-2">
            {
                wishlistUser?.wishlist?.map((item, index) => {
                return (
                    <div key={index} className="flex justify-between items-center w-full">
                        <h2>{item}</h2>
                        <TrashIcon className="w-4 h-4 cursor-pointer" onClick={() => deleteWishlistItem(item)} />
                    </div>
                )
                })
            }
        </div>
        <form onSubmit={onSubmit} className="flex flex-col">
            <label className="font-medium" htmlFor="newWish">Ny önskning</label>
            <div className="flex space-x-2 items-center">
                <input
                        className="border-[1px] border-black outline-none p-2"
                        id="newWish"
                        required
                        name="newWish"
                        type="text"
                        value={newWish}
                        onChange={(e) => setNewWish(e.target.value)}
                    />
                <div>
                    <button className="flex font-medium bg-blue-400 rounded-full px-4 py-2" type="submit">Lägg till</button>
                </div>
            </div>
        </form>
    </div>
  );
}