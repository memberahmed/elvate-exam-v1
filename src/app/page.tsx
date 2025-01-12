import { authOption } from "@/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOption)
  
  console.log('session form home' ,
    
    session
    
  )
  return (
    <div>

      <h1>home page</h1>
    </div>
  );
}
