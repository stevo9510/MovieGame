import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { useState, Fragment } from "react";
const SEARCH_URI = "http://localhost:3000/api/movie";

const SelectionScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);

    const handleSearch = (query) => {
        setIsLoading(true);

        fetch(`${SEARCH_URI}?query=${query}`)
            .then((resp) => resp.json())
            .then((data) => {
                const options = data.map((i) => ({
                    image_url:
                        i.poster_path !== null
                            ? `https://image.tmdb.org/t/p/w92/${i.poster_path}` // TODO: Move this to backend
                            : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=", // fallback image
                    id: i.id,
                    title: i.title,
                }));

                setOptions(options);
                setIsLoading(false);
            });
    };

    // Bypass client-side filtering by returning `true`. Results are already
    // filtered by the search endpoint, so no need to do it again.
    const filterBy = () => true;

    return (
        <AsyncTypeahead
            filterBy={filterBy}
            id="movie-search"
            isLoading={isLoading}
            labelKey="title"
            minLength={3}
            onSearch={handleSearch}
            options={options}
            placeholder="Search for a Movie..."
            renderMenuItemChildren={(option, props) => (
                <Fragment>
                    <img
                        alt={option.title}
                        src={option.image_url}
                        style={{
                            height: "24px",
                            marginRight: "10px",
                            width: "24px",
                        }}
                    />
                    <span>{option.title}</span>
                </Fragment>
            )}
        />
    );
};

export default SelectionScreen;
