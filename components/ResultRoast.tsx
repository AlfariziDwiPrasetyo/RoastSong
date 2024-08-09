"use client";

import { result } from "@/app/type/SongType";
import React from "react";

export default function ResultRoast({
  result,
  image,
}: {
  result: result;
  image: string;
}) {
  return (
    <section>
      <div className="min-w-72 max-w-5xl antialiased flex flex-col items-center justify-center p-3 mt-12">
        {image == "" ? (
          ""
        ) : (
          <img className="w-72 h-72" src={image ? image : ""} alt="" />
        )}
        <p className="mt-5 text-xl font-bold text-center">
          {result.name} - {result.artist}
        </p>
        <h1 className="mt-5 px-5 tracking-tight">{result.text}</h1>
      </div>
    </section>
  );
}
