import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { useAppContext } from "~/context/app";

export default function Index() {
  const navigate = useNavigate();
  const { loggedInUser, setLoggedInUser } = useAppContext();
  
  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    }
  }, [])

  const logout = () => {
    setLoggedInUser(null);
    navigate("/login");
  }

  return (
      <main className="flex flex-col h-screen justify-center items-center bg-slate-200">
          <h1 className="flex justify-center items-center text-3xl font-bold underline bg-white">
            Welcome to the Wishlist!
          </h1>
          <p>This is the home page. Have fun!</p>
          <button onClick={logout}>Logga ut</button>
          <button onClick={() => navigate("/profile")}>Profile</button>
      </main>
  );
}
