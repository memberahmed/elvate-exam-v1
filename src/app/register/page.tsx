import AuthNavLinks from "@/components/common/auth-nav-links";
import Image from "next/image";
import RegisterForm from "./_components/register-form";

const Register = ()=>{
    return <>
      <main>
          <section className=" grid grid-cols-1 md:h-screen gap-x-28  md:grid-cols-2 ">
            {/* welcome-section  */}
            <div className="welcom-section bg-[#F0F4FC]  p-6 md:pb-28 md:pt-20 md:pl-20 md:pe-40  shadow-lg  rounded-br-[100px] rounded-tr-[100px]">
              <h1 className="text-5xl font-bold  text-[#1E2A47] ">
                Welcome to <br />{" "}
                <span className="text-[#122D9C] text-6xl block pt-5">Elvate</span>{" "}
              </h1>
              <p className="text-xl pt-5 pb-6 font-normal">
                Quidem autem voluptatibus qui quaerat aspernatur architecto
                natus
              </p>
              
              <div className="  hidden md:block">
                <Image
                  alt="paner"
                  width={410}
                  height={0}
                  src={"/assests/images/authImage.png"}
                  
                  priority={true}
                />
              </div>
            </div>
            {/* auth-section */}
            <div className="pt-10 ">
              <AuthNavLinks />
              <div className=" pt-10">
                <RegisterForm/>
              </div>
            </div>
          </section>
        </main>
    
    </>
}

export default Register 