import "./index.css"
type FiltersProps = {
  sortBy: string
  rating: number
  onSortChange: (value: string) => void
  onRatingChange: (value: number) => void
}

const Filters = ({
  sortBy,
  rating,
  onSortChange,
  onRatingChange,
}: FiltersProps) => {
  return (
    <div className="filters">
      <select
        value={sortBy}
        onChange={(event) =>
          onSortChange(event.target.value)
        }
      >
        <option value="default">Sort By</option>
        <option value="rating-desc">
          Rating: High to Low
        </option>
        <option value="rating-asc">
          Rating: Low to High
        </option>
        <option value="date-desc">
          Release Date: Newest
        </option>
        <option value="date-asc">
          Release Date: Oldest
        </option>
      </select>

      <select
        value={rating}
        onChange={(event) =>
          onRatingChange(Number(event.target.value))
        }
      >
        <option value={0}>All Ratings</option>
        <option value={5}>5+</option>
        <option value={6}>6+</option>
        <option value={7}>7+</option>
        <option value={8}>8+</option>
      </select>
    </div>
  )
}

export default Filters