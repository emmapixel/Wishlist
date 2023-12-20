export const LoginSignup = () => {
  return (
    <body>
        <section className="flex flex-col">
            <h2>Sign Up</h2>
            <form className="flex flex-col">
                <label htmlFor="firstname">Firstname</label>
                <input type="text" id="firstname" name="firstname" />
                <label htmlFor="lastname">Lastname</label>
                <input type="text" id="lastname" name="lastname" />
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />
                <button type="submit">Sign Up</button>
            </form>
        </section> 
    </body>
  )
}
