import React from "react";

type Props = {};

function Banner({}: Props) {
  return (
    <>
      <div className="banner bg-gray-800 rounded-2xl py-10 text-center my-20">
        <p className="text-white text-md md:text-xl ">
          WE DO NOT ALLOW/SUPPORT THE DOWNLOAD OF COPYRIGHTED MATERIAL!
        </p>
      </div>
    </>
  );
}

export default Banner;
