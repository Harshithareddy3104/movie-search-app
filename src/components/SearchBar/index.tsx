import "./index.css";
type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
}

const SearchBar = ({
  value,
  onChange,
  onSearch,
}: SearchBarProps) => {
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      onSearch()
    }
  }

  return (
    <div className="search-container">
      <label>MOVIE NAME</label>

      <input
        type="text"
        placeholder="Search movies..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button onClick={onSearch}>
        Search!
      </button>
    </div>
  )
}

export default SearchBar