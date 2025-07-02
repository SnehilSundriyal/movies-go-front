import React from "react";

const TextArea = (props) => {
    return (
        <div className="mb-3">
            <label htmlFor={props.name} className="block text-sm/6 font-medium text-gray-400">
                {props.title}
            </label>
            <div className="mt-2">
                <textarea
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    id={props.name}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    rows={props.rows}
                />
            </div>
            <div className={props.errorDiv}>{props.errorMsg}</div>
        </div>
    )
}

export default TextArea;