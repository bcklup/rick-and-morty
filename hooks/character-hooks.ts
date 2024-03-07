import { Character } from "@/types/character";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const fetchAllCharacters = async (page: number) => {
  return await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}`
  ).then((res) => res.json());
};

export const fetchCharacter = async (id: number) => {
  return await fetch(`https://rickandmortyapi.com/api/character/${id}`).then(
    (res) => res.json()
  );
};

export const useCharacter = (id: number) => {
  return useQuery({
    queryKey: ["character", id],
    queryFn: async (): Promise<Character> => fetchCharacter(id),
  });
};

export const useAllCharactersPaginated = () => {
  return useInfiniteQuery({
    queryKey: ["all-characters"],
    queryFn: async ({ pageParam }) => fetchAllCharacters(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.results?.length < 20) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
};
