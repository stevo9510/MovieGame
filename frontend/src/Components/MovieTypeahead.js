import { Fragment } from "react";
import GenericTypeahead from "./GenericTypeahead";
const SEARCH_URI = `${process.env.REACT_APP_API_URL}/api/movie`;

const MovieTypeahead = () => {
    const getMovies = async (query) => {
        const resp = await fetch(`${SEARCH_URI}?query=${query}`);
        const data = await resp.json();
        return data;
    };

    const renderChildren = (option, props) => {
        return (
            <Fragment>
                <img
                    alt={option.title}
                    src={
                        option.image_url ??
                        "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                    }
                    style={{
                        height: "24px",
                        marginRight: "10px",
                        width: "24px",
                    }}
                />
                <span>
                    {option.title} ({new Date(option.release_date).getFullYear()})
                </span>
            </Fragment>
        );
    };

    return (
        <GenericTypeahead
            renderChildrenFunction={renderChildren}
            labelKey="title"
            controlId="movie-search"
            getData={getMovies}
            placeholderText="Search for a Movie..."
        ></GenericTypeahead>
    );
};

export default MovieTypeahead;
