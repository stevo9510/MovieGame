import { Fragment } from 'react';
import GenericTypeahead from "./GenericTypeahead";
const SEARCH_URI = `${process.env.REACT_APP_API_URL}/api/actors`;

const ActorTypeahead = () => {
    const getActors = async (query) => {
        const resp = await fetch(`${SEARCH_URI}?query=${query}`);
        const data = await resp.json();
        return data;
    };

    const renderChildren = (option, props) => {
        return (
            <Fragment>
                <img
                    alt={option.name}
                    src={
                        option.image_url ??
                        "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                    }
                    style={{
                        marginRight: "10px",
                        width: "48px",
                    }}
                />
                <span>{option.name}</span>
            </Fragment>
        );
    };

    return (
        <GenericTypeahead
            renderChildrenFunction={renderChildren}
            getData={getActors}
            labelKey="name"
            control="actor-search"
            placeholderText="Search for an Actor..."
        ></GenericTypeahead>
    );
};

export default ActorTypeahead;
