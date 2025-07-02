import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAppContext} from "../context/AppContext.jsx";
import Input from "./form/Input.jsx";
import Select from "./form/Select.jsx";
import TextArea from "./form/TextArea.jsx";
import FileInput from "./form/FileInput.jsx";
import Checkbox from "./form/Checkbox.jsx";

const EditMovie = () => {
    const navigate = useNavigate();
    const {
        jwtToken
    } = useAppContext();

    const [error, setError] = useState(null);
    const [errors, setErrors] = useState([]);
    const [posterFile, setPosterFile] = useState(null);

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
        genres_array: [Array(13).fill(false)],
    })

    // get id from URL
    let {id} = useParams();
    if (id === undefined) {
        id = 0;
    }
    useEffect(() => {
        if (jwtToken === "") {
            navigate("/login");
            return;
        }
        if (id === 0 ) {
            //adding a movie
            setMovie({
                id: 0,
                title: "",
                release: "",
                runtime: "",
                imdb: "",
                imdb_link: "",
                mpaa_rating: "",
                description: "",
                genres_array: [Array(13).fill(false)],
            })

            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            const requestOptions = {
                method: "GET",
                headers: headers,
            }

            fetch(`http://localhost:8080/genres`, requestOptions)
              .then((response) => response.json())
              .then((data) => {
                  const checks = [];
                  data.forEach(g => {
                      checks.push({id: g.id, checked: false, genre: g.genre});
                  })
                  setMovie(m => ({
                      ...movie,
                      genres: checks,
                      genres_array: [],
                  }))
              })
              .catch(err => {
                  console.log(err);
              })
        } else {

        }

    }, [id, jwtToken, navigate])

    const handleChange = () => (event) => {
        let value = event.target.value;
        let name = event.target.name;
        setMovie({
            ...movie,
            [name]: value,
        })
    }

    const handleCheck = (event, position) => {
        console.log("handlecheckcalled");
        console.log("value in handlecheck: ", event.target.value);
        console.log("checked is", event.target.checked);
        console.log("position is", position);
    }

    const handleFileChange = (file) => {
        setPosterFile(file);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create FormData object to handle file upload
        const formData = new FormData();

        // Append movie data
        Object.keys(movie).forEach(key => {
            formData.append(key, movie[key]);
        });

        // Append poster file if selected
        if (posterFile) {
            formData.append('poster', posterFile);
        }

        try {
            // Example API call - adjust URL and headers as needed
            const response = await fetch('/api/movies', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    // Don't set Content-Type header - let browser set it with boundary for FormData
                },
                body: formData
            });

            if (response.ok) {
                // Handle success
                navigate('/movies'); // or wherever you want to redirect
            } else {
                // Handle error
                const errorData = await response.json();
                setErrors(errorData.errors || []);
                setError(errorData.message || 'An error occurred');
            }
        } catch (err) {
            setError('Failed to save movie');
            console.error('Error saving movie:', err);
        }
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
                            className={"block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"}
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
                            className={"block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"}
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
                            placeHolder={"Choose MPAA Rating"}
                            onChange={handleChange("mpaa_rating")}
                            errorMsg={"Please choose."}
                            errorDiv={hasError("mpaa_rating") ? "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" : "d-none"}
                          />
                      </div>
                      <div>
                          <Input
                            title={"IMDB Rating"}
                            className={"block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"}
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
                    name="poster"
                    onChange={handleFileChange}
                    errorDiv={hasError("poster") ? "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" : "d-none"}
                    errorMsg={"Please select a poster image."}
                  />

                  {movie.genres && movie.genres.length > 0 ? (
                    <div className="rounded-lg border border-gray-300 p-6">
                        <fieldset>
                            <legend className="text-base font-semibold text-gray-400">Check relevant genres</legend>
                            <div className="mt-4 space-y-2">
                                {movie.genres.map((g, index) => (
                                  <Checkbox
                                    key={`genre-${g.id}`}
                                    title={g.genre}
                                    name={"genre"}
                                    id={`genre-${g.id}`}
                                    onChange={(event) => handleCheck(event, index)}
                                    value={g.id}
                                    checked={g.checked}
                                  />
                                ))}
                            </div>
                        </fieldset>
                    </div>
                  ) : (
                    <div className="rounded-lg border border-gray-300 p-6">
                        <h3 className="text-base font-semibold text-gray-900">Genres</h3>
                        <p className="text-gray-500 mt-2">Loading genres...</p>
                    </div>
                  )}
              </div>
          </form>
      </div>
    )
}

export default EditMovie;