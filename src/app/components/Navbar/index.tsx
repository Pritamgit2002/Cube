import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RiInformationFill } from "react-icons/ri";

type Props = {};

export const Navbar = (props: Props) => {
  return (
    <div className=" w-full h-max border-b-2 border-slate-400  z-10 px-4 py-2 flex items-center justify-between bg-gray-800 text-neutral-50 ">
      <span>Navbar</span>
      <div>
        {/* <button className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button> */}
        <div className="flex gap-2 items-center justify-center">
          <Dialog defaultOpen>
            <DialogTrigger>
              <RiInformationFill className="text-neutral-50 hover:text-neutral-150 transition-all duration-150 cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Information about this Site.</DialogTitle>
                <DialogDescription>
                  <ol className=" list-decimal list-inside space-y-1 mt-1 ">
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
                  </ol>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Image
            src="/images/profile.jpeg"
            alt="Logo"
            width={1000}
            height={1000}
            className="w-10 h-10 rounded-full object-contain cursor-pointer "
          />
        </div>
      </div>
    </div>
  );
};
