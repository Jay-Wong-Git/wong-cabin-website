import logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* <Image
        src="/logo.png"
        height="60"
        width="60"
        alt="Wong cabin website logo"
      /> */}
      <Image
        src={logo}
        height="60"
        width="60"
        quality={100}
        alt="Wong cabin website logo"
      />
      <span className="text-xl font-semibold text-primary-100">Wong Cabin</span>
    </Link>
  );
}

export default Logo;
