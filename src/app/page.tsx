import { useSession } from "next-auth/react";
//components
import NameDraw from "../components/nameDraw";

export default function Home() {

  return (
    <main className='flex-col-container items-center p-4'>
      <h1 className='text-7xl text-center font-bold py-10 font-mono sm:py-16'>Good Luck!</h1>
      <NameDraw />
    </main>
  );
}
