"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthNavLinks() {
  // variable to get the current path
  const pathName = usePathname();

  return (
    <main >
     <section>
     <nav className="px-3 pt-3  md:px-20 md:pt-20">
        <ul className="flex justify-end space-x-4">
          <li>
            <Link className={`px-4 text-mainColor py-2 shadow-lg rounded-lg ${pathName === '/login'  ? 'active ' : 'bg-transparent'}`} href={"/login"}>Login</Link>
          </li>
          <li>
            <Link className={`px-4 py-2 text-mainColor shadow-lg rounded-lg ${pathName === '/register'  ? 'active ':'bg-transparent'}`} href={"/register"}>Register</Link>
          </li>
        </ul>
      </nav>
     </section>
    </main>
  );
}
