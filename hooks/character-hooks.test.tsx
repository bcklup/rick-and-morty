// hooks.test.ts
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react-hooks";

import {
  useAllCharactersPaginated,
  fetchAllCharacters,
} from "./character-hooks"; // Adjust the import path based on your project structure

describe("fetchAllCharacters", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("fetches characters successfully", async () => {
    // Mocking a successful fetch response
    fetch.mockResponseOnce(JSON.stringify({ data: "mocked data" }));

    const page = 1;
    const result = await fetchAllCharacters(page);

    expect(result).toEqual({ data: "mocked data" });

    // Check if fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );
  });

  it("handles fetch errors", async () => {
    // Mocking a failed fetch response
    fetch.mockRejectOnce(new Error("Fake fetch error"));

    const page = 1;

    // Ensure that the function throws an error
    await expect(fetchAllCharacters(page)).rejects.toThrow("Fake fetch error");

    // Check if fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );
  });
});

describe("useAllCharactersPaginated", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("returns data for the initial query", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({ results: [{ id: 1, name: "Character 1" }] })
    );

    const { result, waitFor } = renderHook(() => useAllCharactersPaginated(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() => result.current.data?.pages !== undefined);

    // Assert that the initial data is correct
    expect(result.current.data.pages[0].results[0].name).toBe("Character 1");
  });

  it("handles loading and error states", async () => {
    fetch.mockReject(() => Promise.reject("API Error"));
    const { result, waitForNextUpdate } = renderHook(
      () => useAllCharactersPaginated(),
      {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      }
    );

    expect(result.current.isLoading).toBe(true);
    await waitForNextUpdate();

    // Assert that the initial data is correct
    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBe("API Error");
  });
});

// Clear the fetch mock after all tests
afterAll(() => {
  global.fetch.mockClear();
});
