function OptionBorder(props) {
    return (
        <div className="OptionBorderStyle">
            <h4 style={{ margin: "15px" }}>{props.title}</h4>
            {props.children}
        </div>
    );
}

export default OptionBorder;
