const FileInput = (props) => {
    return (
        <fieldset className="fieldset">
            <legend className="text-base font-semibold text-gray-400">{props.title}</legend>
            <input type="file" className="file-input"/>
        </fieldset>
    )
}

export default FileInput