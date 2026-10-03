import type { Movie } from "../../types/movie"
import "./index.css"

type MovieCardProps = {
  movie: Movie
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image"

  return (
    <article className="movie-card">
      <img
        src={posterUrl}
        alt={movie.title}
        className="movie-poster"
      />

      <div className="movie-info">
        <h2>{movie.title}</h2>

        <p>
          <strong>RELEASE DATE:</strong>{" "}
          {movie.release_date || "N/A"}
        </p>

        <p>
          <strong>RATING:</strong>{" "}
          {movie.vote_average.toFixed(1)}
        </p>

        <p className="overview">
          {movie.overview || "No description available."}
        </p>
      </div>
    </article>
  )
}

export default MovieCard