import CountryInfo from "./CountryInfo"

const CountryList = ({ countries, search, setSearch }) => {
    const selectedCountries = countries.filter(
        (c) => c.name.common.toLowerCase().includes(search.toLowerCase())
    )
    const len = selectedCountries.length
    // console.log("len", len)

    if (len === 1) {

        return (
            <>
                <CountryInfo country={selectedCountries[0]} />
            </>
        )
    }

    else if (len < 10) {
        return (
            <>
                {selectedCountries.map(
                    (c) =>
                        <p key={c.name.common}>
                            <span>{c.name.common}</span>
                            <span><button onClick={
                                () => setSearch(c.name.common)}>show</button></span>
                        </p>
                )}
            </>
        )
    }
    else {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }
}

export default CountryList
