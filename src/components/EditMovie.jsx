import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAppContext} from "../context/AppContext.jsx";
import Input from "./form/Input.jsx";
import Select from "./form/Select.jsx";
import TextArea from "./form/TextArea.jsx";
import Checkbox from "./form/Checkbox.jsx";
import Cross from "./../images/x-mark.png"

const EditMovie = () => {
    const navigate = useNavigate();
    const {
        jwt,
        setAlert,
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
        release: null,
        runtime: null,
        imdb: null,
        IMDbID: "",
        mpaa: "",
        description: "",
        genres_array: [Array(13).fill(false)],
    })

    // get id from URL
    let {id} = useParams();
    if (id === undefined) {
        id = 0;
    }
    useEffect(() => {
        if (jwt === "") {
            navigate("/login");
            return;
        }
        if (id === 0 ) {
            //adding a movie
            setMovie({
                id: 0,
                title: "",
                release: null,
                runtime: null,
                imdb: null,
                IMDbID: "",
                mpaa: "",
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
                      ...m,
                      genres: checks,
                      genres_array: [],
                  }))
              })
              .catch(err => {
                  console.log(err);
              })
        } else {

        }

    }, [id, jwt, navigate])

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

        let tmpArr = movie.genres;
        tmpArr[position].checked = !tmpArr[position].checked;

        let tmpIDs = movie.genres_array;
        if (!event.target.checked) {
            tmpIDs.splice(tmpIDs.indexOf(event.target.value));
        } else {
            tmpIDs.push(parseInt(event.target.value, 10));
        }

        setMovie({
            ...movie,
            genres_array: tmpIDs,
        })

    }

    const handleFileChange = (file) => {
        setPosterFile(file);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let errors = [];
        let required = [
            {field: movie.title, name: "title"},
            {field: movie.release, name: "release"},
            {field: movie.runtime, name: "runtime"},
            {field: movie.imdb, name: "imdb"},
            {field: movie.IMDbID, name: "IMDbID"},
            {field: movie.description, name: "description"},
            {field: movie.mpaa, name: "mpaa"},
            {field: movie.poster, name: "movie_poster"}
        ]

        required.forEach(function(obj) {
            if (obj.field === "" || obj.field === null) {
                errors.push(obj.name);
            }
        })

        if (movie.genres_array.length === 0) {
            setAlert("You need to select atleast one genre.", "alert-error", Cross)
            errors.push("genres");
            navigate("/admin/movie/0");
        }

        setErrors(errors);
        if (errors.length > 0) {
            return false;
        }

        // Create a copy of movie with converted numeric fields
        const movieData = {
            ...movie,
            release: parseInt(movie.release, 10),
            runtime: parseInt(movie.runtime, 10),
            imdb: parseFloat(movie.imdb)
        };

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + jwt);

        let method = "PUT";
        if (movie.id > 0) {
            method = "PATCH";
        }

        let requestOptions = {
            body: JSON.stringify(movieData), // Use movieData instead of movie
            method: method,
            headers: headers,
            credentials: "include",
        }

        fetch(`http://localhost:8080/admin/movies/${movie.id}`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
              if (data.error) {
                  console.log(data.error)
              } else {
                  navigate("/admin/manage-catalogue");
              }
          })
          .catch(err => {
              console.log(err);
          })
    }




        //
        // Object.keys(movie).forEach(key => {
        //     formData.append(key, movie[key]);
        // });
        //
        // if (posterFile) {
        //     formData.append('poster', posterFile);
        // }
        //
        // try {
        //     const response = await fetch('/api/movies', {
        //         method: 'POST',
        //         headers: {
        //             'Authorization': `Bearer ${jwt}`,
        //         },
        //         body: formData
        //     });
        //
        //     if (response.ok) {
        //         // Handle success
        //         navigate('/movies'); // or wherever you want to redirect
        //     } else {
        //         // Handle error
        //         const errorData = await response.json();
        //         setErrors(errorData.errors || []);
        //         setError(errorData.message || 'An error occurred');
        //     }
        // } catch (err) {
        //     setError('Failed to save movie');
        //     console.error('Error saving movie:', err);
        // }


    return (
      <div>
          <h2 className="text-4xl font-medium mb-4">Add/Edit Movie</h2>
          {/*<pre>{JSON.stringify(movie, null, 3)}</pre>*/}
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
                            name={"mpaa"}
                            options={mpaaRatings}
                            value={movie.mpaa}
                            placeHolder={"Choose MPAA Rating"}
                            onChange={handleChange("mpaa")}
                            errorMsg={"Please choose."}
                            errorDiv={hasError("mpaa") ? "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" : "d-none"}
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
                    name={"IMDbID"}
                    value={movie.IMDbID}
                    onChange={handleChange("IMDbID")}
                    errorDiv={hasError("IMDbID") ? "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" : "d-none"}
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

                  {/*<FileInput*/}
                  {/*  title="Upload Movie Poster"*/}
                  {/*  name="poster"*/}
                  {/*  onChange={handleFileChange}*/}
                  {/*  errorDiv={hasError("movie_poster") ? "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" : "d-none"}*/}
                  {/*  errorMsg={"Please select a poster image."}*/}
                  {/*/>*/}

                  {movie.genres && movie.genres.length > 0 ? (
                    <div className="rounded-lg border border-gray-300 p-6 mb-4">
                        <fieldset>
                            <legend className="text-base font-semibold text-gray-400">Check relevant genres</legend>
                            <div className="mt-4 space-y-2 grid grid-cols-4">
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
              <button className="btn btn-soft btn-success mt-4 mb-20 justify-center">Upload Movie</button>
          </form>
      </div>
    )
}

export default EditMovie;