import Image from "next/image";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RiInformationFill } from "react-icons/ri";
import { GoSidebarCollapse } from "react-icons/go";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { data } from "@/data/data";

type Props = {
  selected: number;
  functionSelection: (id: number) => void;
};

export const Navbar = ({ selected, functionSelection }: Props) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleClick = (id: number) => {
    functionSelection(id);
    setIsSheetOpen(false);
  };

  return (
    <div className="w-full h-max border-b-2 border-slate-400 z-10 px-4 py-2 flex items-center justify-between bg-gray-800 text-neutral-50">
      <span className="text-lg font-semibold">Navbar</span>
      <div className="w-max flex gap-x-2 items-center justify-center">
        <div className="block lg:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger
              className="flex items-center justify-center"
              onClick={() => setIsSheetOpen(true)}
            >
              <span>
                <GoSidebarCollapse className="text-neutral-50 hover:text-neutral-150 transition-all duration-150 cursor-pointer" />
              </span>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="flex flex-col overflow-y-auto custom-scrollbar"
            >
              <SheetDescription>
                <div>
                  {data.map((item, index) => (
                    <button
                      className={`px-1 sm:px-8 py-2 sm:py-4 border-b-2 border-gray-200 cursor-pointer flex flex-col gap-y-2 items-start justify-start text-left active:bg-gray-200/85 transition-all duration-200
                    ${
                      selected === item.id
                        ? "bg-gray-200 hover:bg-gray-200"
                        : "hover:bg-gray-100/85"
                    }
                  `}
                      key={index}
                      onClick={() => handleClick(item.id)}
                    >
                      <div className="flex flex-col gap-y-1">
                        <div className="text-xl font-bold">{item.name}</div>
                        <div className="text-base font-semibold opacity-80">
                          {item.title}
                        </div>
                        <div className="text-sm font-medium leading-snug line-clamp-4 opacity-80">
                          {item.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </SheetDescription>
            </SheetContent>
          </Sheet>
        </div>

        {/* Information Dialog */}
        <Dialog defaultOpen>
          <DialogTrigger>
            <RiInformationFill className="text-neutral-50 hover:text-neutral-150 transition-all duration-150 cursor-pointer" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Information about this Site.</DialogTitle>
              <DialogDescription>
                <ol className="list-decimal list-inside space-y-1 mt-1">
                  <li>
                    Mostly tried to follow the given image but{" "}
                    <b>made some changes.</b>
                  </li>
                  <li>
                    Images are changing after <b>10 seconds</b> and when{" "}
                    <i>
                      {" "}
                      <b>clicked on the new card</b>{" "}
                    </i>
                    .{" "}
                  </li>
                  <li>
                    Couldn't get the font and text size from the image so done
                    it according to me.
                  </li>
                  <li>
                    To decrease the network call, I'm calling{" "}
                    <b>27 images at a time after 30 Secs.</b>
                  </li>
                </ol>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        {/* fake Profile Image */}
        <Image
          src="/images/profile.jpeg"
          alt="Logo"
          width={1000}
          height={1000}
          className="w-10 h-10 rounded-full object-contain cursor-pointer"
        />
      </div>
    </div>
  );
};
