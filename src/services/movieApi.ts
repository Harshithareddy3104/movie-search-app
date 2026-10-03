import type { MovieResponse } from "../types/movie"

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN

const BASE_URL = "https://api.themoviedb.org/3"

export const searchMovies = async (
  query: string,
  page: number = 1
): Promise<MovieResponse> => {
  const url = `${BASE_URL}/search/movie?query=${encodeURIComponent(
    query
  )}&page=${page}`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      accept: "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`TMDB Error: ${response.status}`)
  }

  return response.json()
}