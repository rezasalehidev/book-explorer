/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Book } from "../models/Book";

const apiClient = axios.create({
  baseURL: "https://openlibrary.org",
  timeout: 5000,
});

apiClient.interceptors.request.use((config) => {
  console.log("Starting Request", config);
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Request Failed", error.message);
    return Promise.reject(error);
  }
);

// fetch books
export const fetchBooks = async (query: string): Promise<Book[]> => {
  try {
    const response = await apiClient.get(`/search.json?title=${query}`);
    const books: Book[] = response.data.docs.map((doc: any): Book => ({
      id: doc.key,
      title: doc.title,
      authorName: doc.author_name?.[0] || "Unknown Author",
      firstPublishYear: doc.first_publish_year || 0,
      coverId: doc.cover_i || null,
    }));

    if (books.length === 0) {
      throw new Error("No books found for your search.");
    }

    return books;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(`API Error: ${error.response.data?.message || error.message}`);
      } else if (error.request) {
        throw new Error("Network error. Please check your connection.");
      } else {
        throw new Error(`Error: ${error.message}`);
      }
    } else {
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};
