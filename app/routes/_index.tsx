import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Collapsible } from "~/components/Collapsible";
import { PrimaryButton } from "~/components/PrimaryButton";
import { useAppContext } from "~/context/app";
import { getAllWishlistUsers } from "~/firebase";
import { WishlistUser } from "~/types/wishlistUser";

export default function Index() {
  const navigate = useNavigate();
  const { loggedInUser, setLoggedInUser } = useAppContext();
  const [wishlistUsers, setWishlistUsers] = useState<WishlistUser[]>([]);
  
  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    }
  }, [])

  useEffect(() => {
    const fetchWishlistUsers = async () => {
      const wishlistUsersFromFirestore = await getAllWishlistUsers() as WishlistUser[];
      setWishlistUsers(wishlistUsersFromFirestore);
    }

    fetchWishlistUsers();
  }, [])

  const logout = () => {
    setLoggedInUser(null);
    navigate("/login");
  }

  return (
      <main className="flex flex-col h-screen justify-center items-center bg-slate-200 space-y-4">
        <h1 className="flex justify-center items-center text-3xl font-bold">
          Önskelistor
        </h1>

        <div className="flex flex-col space-y-2">
          {
            wishlistUsers.map((wishlistUser, index) => (
              <Collapsible key={index} title={`${wishlistUser.firstname} ${wishlistUser.lastname}`}>
                <ul className="flex flex-col space-y-2">
                  {
                    wishlistUser.wishlist.map((wish, index) => (
                      <li key={index}>{wish}</li>
                    ))
                  }
                </ul>
              </Collapsible>
            ))
          }
        </div>

          <div className="flex space-x-2">
            <PrimaryButton title="Profil" onClick={() => navigate("/profile")}/>
            <PrimaryButton title="Logga ut" onClick={logout}/>
          </div>
      </main>
  );
}
