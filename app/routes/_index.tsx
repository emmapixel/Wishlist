import { LoginSignup } from "Components/LoginSignup/LoginSignup";

export default function Index() {
  return (
    <>
      <head>
        <title>Wishlist</title>
      </head>
      <body className="flex flex-col h-screen justify-center items-center bg-slate-200">
        <h1 className="flex justify-center items-center text-3xl font-bold underline bg-white">
          Welcome to the Wishlist!
        </h1>
        <section>
          <LoginSignup/>
        </section>
      </body>
    </>
  );
}
