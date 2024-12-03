import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DetailScreen from "../pages/DetailScreen";
import { Book } from "../models/Book";

const mockBook: Book = {
  id: "book1",
  title: "Test Book",
  authorName: "Test Author",
  firstPublishYear: 2020,
  coverId: "12345",
};

describe("DetailScreen", () => {
  test("renders book details when book is provided", () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/book/12345", state: mockBook }]}
      >
        <Routes>
          <Route path="/book/:id" element={<DetailScreen />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Test Book")).toBeInTheDocument();
    expect(screen.getByText("Author: Test Author")).toBeInTheDocument();
    expect(screen.getByText("First Published: 2020")).toBeInTheDocument();
    expect(screen.getByAltText("Test Book")).toBeInTheDocument();
  });

  test("renders fallback when no book details are available", () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: "/book/12345", state: null }]}>
        <Routes>
          <Route path="/book/:id" element={<DetailScreen />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("No book details available.")).toBeInTheDocument();
  });
});
