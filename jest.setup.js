// Learn more: https://github.com/testing-library/jest-dom
import { QueryClient } from "@tanstack/react-query";
import "@testing-library/jest-dom";

import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, retryDelay: 100 } },
});

afterEach(() => {
  queryClient.clear();
});

global.queryClient = queryClient;
