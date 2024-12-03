import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchScreen from "../pages/SearchScreen";
import { fetchBooks } from "../services/api";
import { MemoryRouter } from "react-router-dom";

jest.mock("../services/api");

describe("SearchScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders search input and handles search", async () => {
    const mockBooks = [
      {
        id: "1",
        title: "Book One",
        authorName: "Author One",
        firstPublishYear: 2000,
        coverId: "1001",
      },
      {
        id: "2",
        title: "Book Two",
        authorName: "Author Two",
        firstPublishYear: 2001,
        coverId: null,
      },
    ];

    (fetchBooks as jest.Mock).mockResolvedValueOnce(mockBooks);

    render(
      <MemoryRouter>
        <SearchScreen />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Search for books...");
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(fetchBooks).toHaveBeenCalledWith("test");
      expect(screen.getByText("Book One")).toBeInTheDocument();
      expect(screen.getByText("Book Two")).toBeInTheDocument();
    });
  });

  test("handles API error", async () => {
    (fetchBooks as jest.Mock).mockRejectedValueOnce(new Error("API error"));

    render(
      <MemoryRouter>
        <SearchScreen />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Search for books...");
    fireEvent.change(input, { target: { value: "error" } });

    await waitFor(() => {
      expect(
        screen.getByText("Failed to fetch books. Please try again.")
      ).toBeInTheDocument();
    });
  });
});
