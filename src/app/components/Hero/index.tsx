import { data } from "@/data/data";
import { ImageTypes } from "@/types/image";
import { fetchImages } from "@/utils/fetchImages";
import Image from "next/image";
import { useState, useEffect } from "react";

const Hero = () => {
  const [selected, setSelected] = useState<number>(1);
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
    // Load images after an initial delay
    const initialTimeout = setTimeout(() => {
      loadImages();

      // Set up an interval to keep fetching images every 30 seconds
      const intervalId = setInterval(() => {
        loadImages();
      }, 60000); // 60 seconds

      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }, 2500); // Initial delay of 2.5 seconds

    // Cleanup timeout if the component unmounts before the delay is over
    return () => clearTimeout(initialTimeout);
  }, []);
  useEffect(() => {
    loadImages();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      // Update the displayed images every 10 seconds
      const displayInterval = setInterval(() => {
        setDisplayImages(images.slice(currentIndex, currentIndex + 9));
        setCurrentIndex((prevIndex) => (prevIndex + 9) % images.length);
        console.log("Displaying images:", displayImages);
      }, 10000); // 10 seconds

      // Cleanup interval on component unmount
      return () => clearInterval(displayInterval);
    }
  }, [images, currentIndex]);

  const functionSelection = (id: number) => {
    setSelected(id);
    loadImages();
  };

  return (
    <div className="w-full flex items-start justify-start  ">
      <div className="w-[450px] h-screen overflow-y-auto custom-scrollbar ">
        <div className="flex flex-col ">
          {data.map((item, index) => (
            <button
              className={` border-b-2 border-gray-200 cursor-pointer px-8 py-4 flex flex-col gap-y-2 items-start justify-start text-left active:bg-gray-200/85 transition-all duration-200
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
                <div className="text-sm font-medium leading-snug line-clamp-4 opacity-80  ">
                  {item.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="w-full h-screen px-8 py-4 bg-slate-100/80 ">
        {selected && (
          <div className="flex flex-col gap-6 items-center justify-center">
            <div className="text-center text-3xl font-semibold text-black tracking-tight">
              {data.find((item) => item.id === selected)?.name}'s Details Here
            </div>
            <p className="text-sm font-medium w-2/4 text-center leading-snug ">
              {data.find((item) => item.id === selected)?.description}
            </p>
            <div className="grid grid-cols-3 gap-12 text-center">
              {loading
                ? Array.from({ length: 9 }).map((_, index) => (
                    <div
                      key={index}
                      className="w-40 h-40 rounded-lg bg-slate-300 animate-pulse shadow-lg shadow-slate-600/90 "
                    ></div>
                  ))
                : displayImages.map((image) => (
                    <div
                      key={image.id}
                      className="w-40 h-40 rounded-lg overflow-hidden shadow-lg shadow-slate-600/50"
                    >
                      <Image
                        src={image.webformatURL}
                        alt={`Image ${image.id}`}
                        width={1000}
                        height={1000}
                        className="w-44 h-44 object-cover"
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
