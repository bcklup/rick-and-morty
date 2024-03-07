"use client";

import { useCharacter } from "@/hooks/character-hooks";
import { Character } from "@/types/character";
import Image from "next/image";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

type Params = {
  params: {
    slug: string;
  };
};

export default function Page({ params }: Params) {
  const slug = useMemo(() => params?.slug, [params]);

  const { data, isError, isLoading } = useCharacter(Number(slug));

  if (isError || isLoading) {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-gray-500">Loading...</h1>
      </div>
    );
  }

  return <CharacterCard character={data as Character} />;
}

export const CharacterCard = ({ character }: { character: Character }) => (
  <div className="flex flex-col sm:flex-row">
    <div className="flex justify-center items-center">
      <Image
        src={character?.image}
        alt={character?.name}
        height={440}
        width={300}
        className="border-2 border-primary max-w-[200px] md:max-w-[300px]"
      />
    </div>
    <div className="flex flex-1 flex-col items-center">
      <h1 className="text-primary font-bold text-2xl">{character?.name}</h1>
      <div className="flex w-full flex-row divide-x mt-4 divide-gray-300">
        <div className="flex flex-1 gap-3 px-5 flex-col">
          <p>
            <span className="font-semibold text-pink-500">Species:</span>{" "}
            {character?.species}
          </p>
          <p>
            <span className="font-semibold text-pink-500">Status:</span>{" "}
            <span
              className={twMerge(
                character?.status === "Dead" && "text-red-600",
                character?.status === "Alive" && "text-green-500"
              )}
            >
              {character?.status}
            </span>
          </p>
          <p>
            <span className="font-semibold text-pink-500">Origin:</span>{" "}
            {character?.origin?.name || "Unknown"}
          </p>
        </div>
        <div className="flex gap-3 px-5 flex-1 flex-col">
          <p>
            <span className="font-semibold text-pink-500">Gender:</span>{" "}
            {character?.gender}
          </p>
          <p>
            <span className="font-semibold text-pink-500">Type:</span>{" "}
            {character?.type || "N/A"}
          </p>
          <p>
            <span className="font-semibold text-pink-500">
              Last known location:
            </span>{" "}
            {character?.location?.name || "Unknown"}
          </p>
        </div>
      </div>
    </div>
  </div>
);
