"use client";

import { Character } from "@/types/character";
import { useAllCharactersPaginated } from "@/hooks/character-hooks";
import React, { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import _ from "lodash";
import Link from "next/link";

export default function Page() {
  const { fetchNextPage, hasNextPage, refetch, data } =
    useAllCharactersPaginated();

  const charactersList = useMemo(
    () =>
      !data || _.isEmpty(data?.pages)
        ? []
        : _.reduce(
            data.pages,
            (prev: any, curr: any) =>
              _.isEmpty(prev) ? curr.results : prev.concat(curr.results),
            []
          ),
    [data]
  );

  return (
    <div className="flex w-full flex-col justify-normal">
      <div className="flex justify-center mb-4 mt-3">
        <h1 className="font-bold text-2xl text-primary">CHARACTERS</h1>
      </div>
      <div>
        <InfiniteScroll
          dataLength={data?.pages.length || 0}
          next={fetchNextPage}
          hasMore={hasNextPage ? true : false}
          scrollableTarget="scrollableSidebar"
          loader={
            <div className="flex w-full justify-center items-center">
              <p className="text-gray-400">Loading...</p>
            </div>
          }
          endMessage="No more results"
          refreshFunction={refetch}
        >
          <CharactersList characters={charactersList} />
        </InfiniteScroll>
      </div>
    </div>
  );
}

export const CharactersList = ({ characters }: { characters: Character[] }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {characters.map((character: Character) => (
        <Link
          href={`/${character.id}`}
          className="flex flex-col group text-center items-center bg-primary border-2 border-primary max-w-[202px] hover:bg-yellow-400 hover:border-yellow-400 transition duration-120 ease-in-out"
          key={`character-item-${character.id}`}
          data-testid="character-card"
          type="button"
        >
          <Image
            src={character.image || ""}
            alt={character.name}
            width={204}
            height={204}
          />
          <div className="flex flex-1 items-center justify-center">
            <p className="font-semibold text-white flex-wrap group-hover:text-green-700 group-hover:underline">
              {character.name}
            </p>
          </div>
        </Link>
      ))}
      ;
    </div>
  );
};
