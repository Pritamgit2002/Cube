import { data } from "@/data/data";
import { ImageTypes } from "@/types/image";
import { fetchImages } from "@/utils/fetchImages";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GoSidebarCollapse } from "react-icons/go";
type Props = {
  selected: number;
  functionSelection: (id: number) => void;
};
const Hero = ({ selected, functionSelection }: Props) => {
  const [images, setImages] = useState<ImageTypes[]>([]);
  const [displayImages, setDisplayImages] = useState<ImageTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Function to load and update images
  const loadImages = async () => {
    try {
      const fetchedImages = await fetchImages();
      setImages(fetchedImages);
      setDisplayImages(fetchedImages.slice(0, 9)); // Show the first 9 images initially
      setCurrentIndex(9);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const displayInterval = setInterval(() => {
        setDisplayImages(images.slice(currentIndex, currentIndex + 9));
        setCurrentIndex((prevIndex) => (prevIndex + 9) % images.length);
      }, 10000); // 10 seconds

      return () => clearInterval(displayInterval);
    }
  }, [images, currentIndex]);

  const handleClick = (id: number) => {
    functionSelection(id);
    loadImages();
  };

  return (
    <div className="w-full flex items-start justify-start relative">
      {/* Sidebar for larger screens */}
      <div className="w-[450px] h-screen overflow-y-auto custom-scrollbar hidden lg:block">
        <div className="flex flex-col">
          {data.map((item, index) => (
            <button
              className={`border-b-2 border-gray-200 cursor-pointer px-8 py-4 flex flex-col gap-y-2 items-start justify-start text-left active:bg-gray-200/85 transition-all duration-200
                ${
                  selected === item.id
                    ? "bg-gray-200 hover:bg-gray-200"
                    : "hover:bg-gray-100/85"
                }
              `}
              key={index}
              // onClick={() => functionSelection(item.id)}
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
      </div>

      {/* Sheet for small screens */}
      <div className="h-screen absolute top-2 sm:top-4 left-0 sm:left-4 hidden sm:block lg:hidden">
        <Sheet>
          <SheetTrigger>
            <span className="text-neutral-500 hover:text-slate-600 transition-all duration-150 cursor-pointer">
              <GoSidebarCollapse />
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
                    onClick={() => functionSelection(item.id)}
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

      {/* Main Content */}
      <div className="w-full h-screen px-0 sm:px-8 py-4 bg-slate-100/80">
        {selected && (
          <div className="flex flex-col gap-6 items-center justify-center">
            <div className="text-center text-3xl font-semibold text-black tracking-tighter sm:tracking-tight">
              {data.find((item) => item.id === selected)?.name}'s Details Here
            </div>
            <p className="text-sm font-medium w-3/4 sm:w-2/4 text-center leading-snug">
              {data.find((item) => item.id === selected)?.description}
            </p>
            <div className="w-full grid grid-cols-3 gap-2 sm:gap-12 text-center justify-items-center ">
              {loading
                ? Array.from({ length: 9 }).map((_, index) => (
                    <div
                      key={index}
                      className="w-32 sm:w-44 h-32 sm:h-44 rounded-lg bg-slate-300 animate-pulse shadow-lg shadow-slate-600/90"
                    ></div>
                  ))
                : displayImages.map((image) => (
                    <div
                      key={image.id}
                      className="w-32 sm:w-44 h-32 sm:h-44 rounded-lg overflow-hidden shadow-lg shadow-slate-600/50  "
                    >
                      <Image
                        src={image.webformatURL}
                        alt={`Image ${image.id}`}
                        width={1000}
                        height={1000}
                        className="w-36 sm:w-44 h-36 sm:h-44 object-cover"
                      />
                    </div>
                  ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
