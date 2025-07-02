import React, { useState } from "react";

const FileInput = (props) => {
    const [preview, setPreview] = useState(null);
    const [fileName, setFileName] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setFileName(file.name);

            // Create preview URL for images
            if (file.type.startsWith('image/')) {
                const previewUrl = URL.createObjectURL(file);
                setPreview(previewUrl);
            }

            // Call parent onChange handler
            if (props.onChange) {
                props.onChange(file);
            }
        } else {
            setFileName("");
            setPreview(null);
            if (props.onChange) {
                props.onChange(null);
            }
        }
    };

    return (
        <div className="mb-3">
            <fieldset className="border border-gray-300 rounded-md p-4">
                <legend className="text-base font-semibold text-gray-400 px-2">{props.title}</legend>

                <div className="mt-2">
                    <input
                        type="file"
                        name={props.name}
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />

                    {fileName && (
                        <p className="mt-2 text-sm text-gray-600">
                            Selected: {fileName}
                        </p>
                    )}

                    {preview && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-600 mb-2">Preview:</p>
                            <img
                                src={preview}
                                alt="Preview"
                                className="max-w-xs max-h-48 object-contain border border-gray-300 rounded"
                            />
                        </div>
                    )}
                </div>

                <div className={props.errorDiv}>{props.errorMsg}</div>
            </fieldset>
        </div>
    );
};

export default FileInput;