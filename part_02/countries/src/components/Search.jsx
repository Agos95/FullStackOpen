const Search = ({ search, setSearch }) => {
    return (
        <div>Find Countries:
            <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
        </div>
    )
}

export default Search
