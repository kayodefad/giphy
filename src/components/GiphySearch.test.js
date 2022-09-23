/* eslint-disable testing-library/no-debugging-utils */
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import GiphySearch from "./GiphySearch";
import * as APIService from "../services/apiService";
import { BrowserRouter } from "react-router-dom";

jest.mock("../services/apiService");

beforeEach(() => jest.clearAllMocks());

test("form makes an api call with proper params and returns correct result", async () => {
  APIService.getData.mockResolvedValueOnce({
    data: [
      {
        type: "gif",
        title: "Lionel Messi",
        images: {
          original: {
            url: "https://media2.giphy.com/media/TjAcxImn74uoDYVxFl/giphy.gif",
          },
        },
        slug: "fcbarcelona-goat-messi-leo-TjAcxImn74uoDYVxFl",
      },
    ],
  });

  render(
    <BrowserRouter>
      <GiphySearch />
    </BrowserRouter>
  );

  const inputField = screen.getByLabelText("Search Giphy", {
    selector: "input",
  });

  const submitButton = screen.getByText("Search");
  fireEvent.change(inputField, { target: { value: "messi" } });
  fireEvent.click(submitButton);
  expect(APIService.getData).toHaveBeenCalledTimes(1);
  expect(APIService.getData).toHaveBeenCalledWith("messi");
  await waitFor(() => {
    screen.getByAltText("Lionel Messi");
  });
});

