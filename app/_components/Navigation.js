import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth();
  console.log(session);
  return (
    <nav className="z-10 text-xl">
    <ul className="flex gap-16 items-center" >

      <li>
        <Link className="hover:text-accent-400 transition-colors" href="/cabins">Cabins</Link>
      </li>
      <li>
        <Link className="hover:text-accent-400 transition-colors" href="/about">About</Link>
      </li>
      <li>
        {
          session?.user?.image ?(
            <Link className="hover:text-accent-400 flex flex-col items-center  transition-colors" href="/account"> <p><img className=" h-10 rounded-full" src={session.user.image} alt={session.user.name}></img></p><p className=" text-sm"> {session.user.name}</p></Link>
          ):(
            <Link className="hover:text-accent-400 transition-colors" href="/account">Your account</Link>
          )
        }
      </li>
    </ul>
    </nav>
  );
}
