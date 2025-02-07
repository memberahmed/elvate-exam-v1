"use client";
type props = {
  children: React.ReactNode;
};
const Button = ({ children }: props) => {
  return (
    <button className="bg-mainColor block px-4 py-3 transition rounded-full  text-white hover:bg-[#2b4bec]">
      {children}
    </button>
  );
};

export default Button;
