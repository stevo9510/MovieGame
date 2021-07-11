import GenericTypeahead from "./GenericTypeahead";
const SEARCH_URI = `${process.env.REACT_APP_API_URL}/api/actor`;

// TODO: This all needs to change for the actor backend.

const ActorTypeahead = () => {
    const getActors = async (query) => {
        const resp = await fetch(`${SEARCH_URI}?query=${query}`);
        const data = await resp.json();
        const options = data.map((i) => ({
            image_url:
                i.poster_path !== null
                    ? `https://image.tmdb.org/t/p/w92/${i.poster_path}` // TODO: Move this to backend
                    : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
            id: i.id,
            title: i.title,
            release_date: new Date(i.release_date),
        }));
        return options;
    };

    const renderChildren = (option, props) => {
        return (
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
        );
    };

    return (
        <GenericTypeahead
            renderChildrenFunction={renderChildren}
            getData={getActors}
            labelKey="title"
            control="actor-search"
            placeholderText="Search for an Actor..."
        ></GenericTypeahead>
    );
};

export default ActorTypeahead;