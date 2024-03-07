/**
 * @jest-environment jsdom
 */
import { getAllByTestId, render, screen } from "@testing-library/react";
import Page, { CharactersList } from "./page";
import { QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-hooks";
import { useAllCharactersPaginated } from "@/hooks/character-hooks";

describe("Home Page", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("Initial home page state renders as expected ", () => {
    render(<Page />, {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "CHARACTERS"
    );
  });

  it("Character list empty state is handled", () => {
    fetch.mockResponseOnce(JSON.stringify({ results: [] }));

    const { getByText } = render(<Page />, {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    // Assert that the initial data is correct
    expect(getByText("No more results")).toBeInTheDocument();
  });
});

describe("Characters List", () => {
  it("renders a list of characters from mock", () => {
    const mockData = [
      {
        id: 1,
        name: "Character 1",
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      },
      {
        id: 2,
        name: "Character 2",
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      },
      // ... add more items as needed
    ];

    const { getByText } = render(<CharactersList characters={mockData} />);

    expect(getByText("Character 1")).toBeInTheDocument();
    expect(getByText("Character 2")).toBeInTheDocument();
  });
});
