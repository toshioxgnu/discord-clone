import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { ModeToggle } from '../../components/ui/mode-toggle';

export default function Home() {
  return (
    <>
      <UserButton afterSignOutUrl="/"/>      
      <ModeToggle /> 
    </>
  );
};