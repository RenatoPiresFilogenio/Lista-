import { api } from "../services/api";
import style from "./page.module.scss"
import Link from "next/link";
export default function Signup(){

    async function teste(formData:FormData){
      "use server"
      
      try {
        
          const email = formData.get("email")
          const name = formData.get("name")
          const password = formData.get("password")

        const userCreated = await api.post("/user", {
          name: name,
          email: email,
          password: password
        })
      
        console.log(userCreated.data)
        

      } catch (error) {
        
      }
       
    }

  return(
    <div className={style.mainDivSignup}> 
      <br />
      <form action={teste}>

      <input type="email" placeholder="email" name="email"/>
      <br />
      <input type="text"  placeholder="name" name="name"/>
      <br />
      <input type="password" placeholder="password"  name="password"/>

      <button type="submit">Enviar</button>
      </form>

            <Link href={"/"} className={style.signupLink}>
              <button>Logar</button>
            </Link>
    </div>
  );
}