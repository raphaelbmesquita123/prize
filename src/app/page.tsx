import { useSession } from "next-auth/react";
//components
import NameDraw from "../components/nameDraw";

export default function Home() {

  return (
    <main className='flex-col-container items-center p-4'>
      <h1 className='text-7xl font-bold py-16 font-mono'>Good Luck!</h1>
      <NameDraw />
    </main>
  );
}
