import Image from "next/image";
import React from "react";

type Props = {};

function Header({}: Props) {
  return (
    <div className="relative flex flex-col items-center text-center mt-10 md:mt-48 mb-16 md:mb-36">
      <Image
        src="/play.png"
        className="absolute hidden lg:block w-40 h-20 left-10 -top-20"
        width={200}
        height={100}
        alt="youtube icon"
      ></Image>
      <Image
        src="/instagram.png"
        className="absolute hidden lg:block w-32 h-32 right-10 -top-32"
        width={200}
        height={100}
        alt="youtube icon"
      ></Image>
      {/* <Image
        src="/music.png"
        className="absolute hidden lg:block w-20 h-20 right-32 -bottom-20"
        width={200}
        height={100}
        alt="youtube icon"
      ></Image> */}
      <Image
        src="/wavyarrow.svg"
        className="absolute hidden lg:block w-40 h-40 left-32 -bottom-28 scale-x-[-1]"
        width={400}
        height={400}
        alt="youtube icon"
      ></Image>
      <h1 className="flex justify-between text-5xl md:text-7xl font-semibold">
        <span>
          Instagram Reel
          <span className="inline-block relative">
            <span className="-rotate-3 z-20 border-b-8 rounded-3xl border-insta absolute bottom-0 left-0 right-0 -translate-y-2"></span>
            <span className="relative z-30 ml-4">Downloa</span>
            <span className="relative z-10">der</span>
          </span>
        </span>
      </h1>
      <p className="flex justify-center text-gray-600 text-lg md:text-2xl md:leading-9 mt-10 md:tracking-wide dark:text-gray-300">
        <span>
          Try this unique tool for quick, hassle-free downloads from
          <br className="hidden md:block" />
          Instagram. Transform your offline video collection with this
          <br className="hidden md:block" />
          reliable and efficient downloader.
        </span>
      </p>
    </div>
  );
}

export default Header;
