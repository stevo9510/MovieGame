import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { useState } from "react";

const GenericTypeahead = ({
    getData,
    controlId,
    labelKey,
    placeholderText,
    renderChildrenFunction,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);

    const handleSearch = async (query) => {
        setIsLoading(true);
        const options = await getData(query);
        setOptions(options);
        setIsLoading(false);
    };

    const filterBy = () => true;

    return (
        <AsyncTypeahead
            filterBy={filterBy}
            id={controlId}
            isLoading={isLoading}
            labelKey={labelKey}
            minLength={3}
            onSearch={handleSearch}
            options={options}
            placeholder={placeholderText}
            renderMenuItemChildren={renderChildrenFunction}
        ></AsyncTypeahead>
    );
};

export default GenericTypeahead;
