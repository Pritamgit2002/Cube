"use client";
import Hero from "./components/Hero";
import { Navbar } from "./components/Navbar";

export default function Home() {
  return (
    <div className=" w-full h-screen text-3xl font-medium text-black flex flex-col items-start justify-start overflow-hidden ">
      <Navbar />
      <Hero />
    </div>
  );
}
