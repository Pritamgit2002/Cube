"use client";
// Layout of the componets for the context
import React, { useState } from "react";
import Hero from "./Hero";
import { Navbar } from "./Navbar";

const MainView = () => {
  const [selected, setSelected] = useState<number>(1);

  const functionSelection = (id: number) => {
    setSelected(id);
  };

  return (
    <div className="w-full h-screen text-3xl font-medium text-black flex flex-col items-start justify-start overflow-y-auto  ">
      <Navbar selected={selected} functionSelection={functionSelection} />
      <Hero selected={selected} functionSelection={functionSelection} />
    </div>
  );
};

export default MainView;
