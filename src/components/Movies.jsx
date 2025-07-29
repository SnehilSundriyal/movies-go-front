import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json")

    const requestOptions = {
      method: "GET",
      headers: headers,
    }

      fetch(`${process.env.REACT_APP_BACKEND}/movies`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
              setMovies(data);
          })
          .catch((error) => console.log(error));
  }, []);


    return (
      <div>
        <h2 className="text-4xl font-medium mb-5">Movie List</h2>
        <hr/>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Runtime</th>
              <th>IMDb Rating</th>
              <th>Rated</th>
              <th>Description</th>
            </tr>
            </thead>
            <tbody>
            {/* row 1 */}
            {movies.map((m) => (
              <tr key={m.id}>
                <td>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="h-20 w-15">
                        <Link to={`/movie/${m.id}`}>
                          <img src={m.poster} alt="movie-poster"/>
                        </Link>
                      </div>
                    </div>
                    <div>
                      <Link to={`/movie/${m.id}`}>
                        <div className="font-bold">{m.title}</div>
                      </Link>
                      <div className="text-sm opacity-50">{m.release}</div>
                    </div>
                  </div>
                </td>
                <td>{m.runtime} hours {m.runtime_minutes} minutes</td>
                <td>{m.imdb}</td>
                <td>{m.mpaa}</td>
                <td>
                  {m.description.length > 40 ? m.description.substring(0, 40) + "..." : m.description}
                  <br/>
                  <a className="text-s hover:cursor-pointer text-gray-400 hover:underline" onClick={()=>document.getElementById(`modal_${m.id}`).showModal()}>
                    read more
                  </a>
                  <dialog id={`modal_${m.id}`} className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                      </form>
                      <h3 className="font-bold text-xl">Description for {m.title}</h3>
                      <p className="py-4 text-md">{m.description}</p>
                    </div>
                  </dialog>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  )
}

export default Movies;