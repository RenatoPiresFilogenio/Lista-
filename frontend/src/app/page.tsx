import { api } from "./services/api";
import style from "./page.module.scss"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
export default function Login(){

    async function handleLogin(formdata:FormData){
      "use server"
      try {
         const email = formdata.get("email");
         const password = formdata.get("password");

      if(!email || !password){
       return;
      }
        const response = await api.post("/userLog", {email,password})
        
      const CookieStore = await cookies();
      const cookieTime = 60 * 60 * 24; 
      CookieStore.set("session",response.data.token ,{
         maxAge:cookieTime,
          path:"/",
          httpOnly:false,
          secure: process.env.NODE_ENV === "production"

      })

      } catch {
       
         return;
      }
       redirect("/home")
    }

  return(
    <main className={style.mainLogin}>
      
      <section className={style.loginSection}>
          <h1 className={style.logH1}>Bem vindo a lista+</h1>
          <br />
          <form action={handleLogin} className={style.loginForm}>
            <input type="email" required placeholder="Email" name="email"></input>
            <br />
            <input type="password" required placeholder="Senha" name="password"></input>
            <br />
            <button type="submit">Logar</button>
          </form>
             <Link href={"/signup"} className={style.signupLink}>
              <button>Registrar-se</button>
            </Link>
      </section>

    </main>
  );
  
}