import { useEffect, useMemo, useState } from "react"

import SearchBar from "./components/SearchBar"
import MovieList from "./components/MovieList"
import Pagination from "./components/Pagination"
import Filters from "./components/Filters"

import { searchMovies } from "./services/movieApi"

import "./App.css"

function App() {
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState("Jurassic Park")

  const [movies, setMovies] = useState<any[]>([])

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [sortBy, setSortBy] = useState("default")
  const [rating, setRating] = useState(0)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const getMovies = async () => {
      if (!query.trim()) {
        return
      }

      try {
        setLoading(true)
        setError("")

        const data = await searchMovies(query, page)

        setMovies(data.results)
        setTotalPages(data.total_pages)
      } catch (error) {
        console.error(error)
        setError("Unable to load movies. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    getMovies()
  }, [query, page])

  const handleSearch = () => {
    if (!search.trim()) {
      return
    }

    setPage(1)
    setQuery(search)
  }

  const filteredAndSortedMovies = useMemo(() => {
    let result = movies.filter(
      (movie) => movie.vote_average >= rating
    )

    if (sortBy === "rating-desc") {
      result = [...result].sort(
        (a, b) => b.vote_average - a.vote_average
      )
    }

    if (sortBy === "rating-asc") {
      result = [...result].sort(
        (a, b) => a.vote_average - b.vote_average
      )
    }

    if (sortBy === "date-desc") {
      result = [...result].sort(
        (a, b) =>
          new Date(b.release_date || "1900-01-01").getTime() -
          new Date(a.release_date || "1900-01-01").getTime()
      )
    }

    if (sortBy === "date-asc") {
      result = [...result].sort(
        (a, b) =>
          new Date(a.release_date || "1900-01-01").getTime() -
          new Date(b.release_date || "1900-01-01").getTime()
      )
    }

    return result
  }, [movies, rating, sortBy])

  return (
    <div className="app">
      <header>
        <h1>🎬 Movie Search App</h1>
        <p>Search your favorite movies using TMDB</p>
      </header>

      <SearchBar
        value={search}
        onChange={setSearch}
        onSearch={handleSearch}
      />

      <Filters
        sortBy={sortBy}
        rating={rating}
        onSortChange={setSortBy}
        onRatingChange={setRating}
      />

      {loading && (
        <p className="message">
          Loading movies...
        </p>
      )}

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {!loading && !error && (
        <MovieList
          movies={filteredAndSortedMovies}
        />
      )}

      {!loading && !error && movies.length > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

      <footer>
        <p>
          This product uses the TMDB API but is not endorsed
          or certified by TMDB.
        </p>
      </footer>
    </div>
  )
}

export default App