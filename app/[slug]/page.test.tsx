/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page, { CharacterCard } from "./page";
import { QueryClientProvider } from "@tanstack/react-query";
import { Character } from "@/types/character";

it("App Router: Works with dynamic route segments", async () => {
  const mockSlug = 2;
  fetch.mockResponseOnce(JSON.stringify(mockCharacterData));

  render(<Page params={{ slug: mockSlug + "" }} />, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  expect(fetch).toHaveBeenCalledWith(
    `https://rickandmortyapi.com/api/character/${mockSlug}`
  );
});

describe("Character card", () => {
  it("renders default and complete character details", async () => {
    const { getByText } = render(
      <CharacterCard character={mockCharacterData} />
    );
    expect(getByText("Morty Smith")).toBeInTheDocument();
    expect(getByText("Alive")).toBeInTheDocument();
    expect(getByText("Human")).toBeInTheDocument();
  });

  it("show altered text when character status is 'Dead'", async () => {
    const alteredMockData = {
      ...mockCharacterData,
      status: "Dead",
    } as Character;
    const { getByText } = render(<CharacterCard character={alteredMockData} />);
    expect(getByText("Dead")).toBeInTheDocument();
    expect(getByText("Dead")).toHaveStyle(
      "color: rgb(220 38 38 / var(--tw-text-opacity))"
    );
  });

  it("show default fallback text when character type is blank", async () => {
    const alteredMockData = {
      ...mockCharacterData,
      type: "",
    } as Character;
    const { getByText } = render(<CharacterCard character={alteredMockData} />);
    expect(getByText("N/A")).toBeInTheDocument();
  });

  it("show default fallback text when character origin is unknown", async () => {
    const alteredMockData = {
      ...mockCharacterData,
      origin: {},
    } as Character;
    const { getByText } = render(<CharacterCard character={alteredMockData} />);
    expect(getByText("Unknown")).toBeInTheDocument();
  });

  it("show default fallback text when character location is unknown", async () => {
    const alteredMockData = {
      ...mockCharacterData,
      location: {},
    } as Character;
    const { getByText } = render(<CharacterCard character={alteredMockData} />);
    expect(getByText("Unknown")).toBeInTheDocument();
  });
});

const mockCharacterData: Character = {
  id: 2,
  name: "Morty Smith",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: {
    name: "Earth",
    url: "https://rickandmortyapi.com/api/location/1",
  },
  location: {
    name: "Earth",
    url: "https://rickandmortyapi.com/api/location/20",
  },
  image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  episode: [
    "https://rickandmortyapi.com/api/episode/1",
    "https://rickandmortyapi.com/api/episode/2",
    // ...
  ],
  url: "https://rickandmortyapi.com/api/character/2",
  created: "2017-11-04T18:50:21.651Z",
};
