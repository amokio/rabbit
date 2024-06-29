import Link from "next/link";
import { FiDatabase, FiZap } from "react-icons/fi";
import { GrGraphQl } from "react-icons/gr";

export const Sidebar = () => {
  return (
    <section className="flex-col px-4 space-y-8 h-full">
      <Link href="/api" className="flex flex-col gap-2 items-center cursor-pointer">
        <FiDatabase fontSize={24} />
        <span className="text-xs">Collection</span>
      </Link>
      <Link href="/graphql" className="flex flex-col gap-2 items-center cursor-pointer">
        <GrGraphQl fontSize={24} />
        <span className="text-xs">GraphQL</span>
      </Link>
      <Link href="/test" className="flex flex-col gap-2 items-center cursor-pointer">
        <FiZap fontSize={24} />
        <span className="text-xs">Test</span>
      </Link>
    </section>
  );
};
