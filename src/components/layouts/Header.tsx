import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white py-4 border-b border-gray-200 min-h-16">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-3 items-center">
        <div className="flex justify-start">
          <Image
            className="cursor-pointer"
            src="/logo-BlDffz2O.png"
            alt="logo"
            width={128}
            height={28}
          />
        </div>
        <div className="flex justify-center">
          <Image
            className="cursor-pointer"
            src="/logo_job_sim-DwZEtEPa.png"
            alt="logo"
            width={164}
            height={32}
          />
        </div>
      </div>
    </header>
  );
}
