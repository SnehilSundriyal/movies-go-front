import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAppContext} from "../context/AppContext.jsx";
import Input from "./form/Input.jsx";
import Select from "./form/Select.jsx";
import TextArea from "./form/TextArea.jsx";
import FileInput from "./form/FileInput.jsx";

const EditMovie = () => {
    const navigate = useNavigate();
    const {
        jwtToken
    } = useAppContext();

    const [error, setError] = useState(null);
    const [errors, setErrors] = useState([]);

    const mpaaRatings = [
        {id: "G", value: "G"},
        {id: "PG", value: "PG"},
        {id: "PG-13", value: "PG-13"},
        {id: "R", value: "R"},
        {id: "NC-17", value: "NC-17"},
    ]

    const hasError = (key) => {
        return errors.indexOf(key) !== -1;
    }
    const [movie, setMovie] = useState({
        id: 0,
        title: "",
        release: "",
        runtime: "",
        imdb: "",
        imdb_link: "",
        mpaa_rating: "",
        description: "",
    })


    // get id from URL
    let {id} = useParams();
    useEffect(() => {
        if (jwtToken === "") {
            navigate("/login");
            return;
        }

    }, [])

    const handleChange = () => (event) => {
        let value = event.target.value;
        let name = event.target.name;
        setMovie({
            ...movie,
            [name]: value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(movie).forEach(key => {
            formData.append(key, movie[key]);
        });
    }

    return (
        <div>

            <h2 className="text-4xl font-medium mb-4">Add/Edit Movie</h2>
            <form onSubmit={handleSubmit}>

                <input type="hidden" name="id" value={movie.id} id="id"/>

                <div className="mt-2">
                    <Input
                        title={"Title"}
                        className={"block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"}
                        type={"text"}
                        name={"title"}
                        value={movie.title}
                        onChange={handleChange("title")}
                        errorDiv={hasError("title") ? "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" : "d-none"}
                        errorMsg={"Enter the movie title."}
                    />
                    <br/>
                    <div className="grid grid-cols-4 gap-4 w-full">
                        <div>
                            <Input
                                title={"Release Year"}
                                className={"block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"}
                                type={"text"}
                                name={"release"}
                                value={movie.release}
                                onChange={handleChange("release")}
                                errorDiv={hasError("release") ? "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" : "d-none"}
                                errorMsg={"Please enter the Release Year."}
                            />
                        </div>
                        <div>
                            <Input
                                title={"Runtime (minutes)"}
                                className={"block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"}
                                type={"text"}
                                name={"runtime"}
                                value={movie.runtime}
                                onChange={handleChange("runtime")}
                                errorDiv={hasError("runtime") ? "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" : "d-none"}
                                errorMsg={"Enter runtime."}
                            />
                        </div>
                        <div>
                            <Select
                                title={"MPAA Rating"}
                                name={"mpaa_rating"}
                                options={mpaaRatings}
                                value={movie.mpaa_rating}
                                placeholder={"Choose MPAA Rating"}
                                onChange={handleChange("mpaa_rating")}
                                errorMsg={"Please choose."}
                                errorDiv={hasError("mpaa_rating") ? "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" : "d-none"}
                            />
                        </div>
                        <div className="ml-8">
                            <Input
                                title={"IMDB Rating"}
                                className={"block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"}
                                type={"text"}
                                name={"imdb"}
                                value={movie.imdb}
                                onChange={handleChange("imdb")}
                                errorDiv={hasError("imdb") ? "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" : "d-none"}
                                errorMsg={"Enter IMDB Rating."}
                            />
                        </div>
                    </div>
                    <br/>

                    <Input
                        title={"IMDB Link"}
                        className={"block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"}
                        type={"text"}
                        name={"imdb_link"}
                        value={movie.imdb_link}
                        onChange={handleChange("imdb_link")}
                        errorDiv={hasError("imdb_link") ? "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" : "d-none"}
                        errorMsg={"Please paste the IMDB Link."}
                    />
                    <br/>

                    <TextArea
                        title="Description"
                        name={"description"}
                        value={movie.description}
                        rows={"3"}
                        onChange={handleChange("description")}
                        errorMsg={"Please enter a description."}
                        errorDiv={hasError("description") ? "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" : "d-none"}
                    />
                    <br/>

                    <FileInput
                        title="Upload Movie Poster"
                    />
                </div>


            </form>
        </div>
    )
}

export default EditMovie;