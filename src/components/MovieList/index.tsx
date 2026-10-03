import type { Movie } from "../../types/movie"
import MovieCard from "../MovieCard"

type MovieListProps = {
  movies: Movie[]
}

const MovieList = ({ movies }: MovieListProps) => {
  if (movies.length === 0) {
    return <p className="no-results">No movies found.</p>
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
        />
      ))}
    </div>
  )
}

export default MovieList