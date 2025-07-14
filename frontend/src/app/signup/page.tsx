import { api } from "../services/api";
import style from "./page.module.scss"
import Link from "next/link";

export default function Signup(){

  async function teste(formData:FormData){
    "use server"
    
    try {
      const email = formData.get("email");
      const name = formData.get("name");
      const password = formData.get("password");

      await api.post("/user", {
        name,
        email,
        password
      });
      
    } catch{
      
    }
     
  }

  return(
    <div className={style.mainDivSignup}> 
      <br />
      <h1 className={style.logH1}>Cadastra-se</h1>

      <p>Apenas gmail é aceito</p>
      <p>A senha deve conter no minimo 8 caracteres</p>

      <form action={teste} className={style.FormSignup}>

        <input type="email" placeholder="Email" name="email"/>
        <br />
        <input type="text"  placeholder="Nome" name="name"/>
        <br />
        <input type="password" placeholder="Senha"  name="password"/>
        <br />
        <button type="submit">Cadastrar-se</button>

        <Link href={"/"} className={style.signupLink}>
          <button>Ir para login</button>
        </Link>
      </form>
    </div>
  );
}
