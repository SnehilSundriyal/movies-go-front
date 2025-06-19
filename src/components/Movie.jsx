import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

const Movie = () => {
  const [movie, setMovie] = useState({});
  let { id } = useParams();

    useEffect(() => {
        if (!id) {
            console.error("No movie ID found");
            return;
        }

        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({id: parseInt(id)})
        };

        fetch(`http://localhost:8080/movie`, requestOptions)
            .then((response) => {
                console.log("Response status:", response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setMovie(data);
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    }, [id]);

    // Add loading state
    if (!movie.id) {console.log('IMDB Rating:', movie.imdb);
        return <div>Loading...</div>;
    }


  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="h-[500px] w-[350px] col-end-1">
          <img src={movie.poster} alt="movie-poster"/>
        </div>
        <div className="ml-3">
          <h2 className="text-4xl font-extrabold">{movie.title}</h2>
          <p className="text-xl text-gray-400 mt-2">{movie.release} • {movie.runtime}h {movie.runtime_minutes}min • {movie.mpaa} rated</p>
          <a href={`https://www.imdb.com/title/${movie.imdbId}`} className="mt-2">
              <button className="btn btn-lg bg-[#F5C518] flex items-center justify-start gap-3 mt-4 text-black">
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 122.88 122.88"
                  style={{ enableBackground: "new 0 0 122.88 122.88" }}
                  xmlSpace="preserve"
                  width="59"
                  height="46"
                >
                  <g>
                    <path
                      fill="#F5C518"
                      d="M18.43,0h86.02c10.18,0,18.43,8.25,18.43,18.43v86.02c0,10.18-8.25,18.43-18.43,18.43H18.43 C8.25,122.88,0,114.63,0,104.45l0-86.02C0,8.25,8.25,0,18.43,0L18.43,0z"
                    />
                    <g transform="translate(61.44, 61.44) scale(1.5) translate(-61.44, -61.44)">
                      <path
                        fill="#00000"
                        d="M24.96,78.72V44.16h-9.6v34.56H24.96L24.96,78.72z M45.36,44.16L43.2,60.24L42,51.6l-1.2-7.44l-12,0v34.56h8.16v-22.8 l3.36,22.8h6l3.12-23.28v23.28h8.16V44.16H45.36L45.36,44.16z M61.44,78.72V44.16h14.88c3.6,0,6.24,2.64,6.24,6v22.56 c0,3.36-2.64,6-6.24,6H61.44L61.44,78.72z M72.72,50.4l-2.16-0.24v22.56c1.2,0,2.16-0.24,2.4-0.72c0.48-0.48,0.48-1.92,0.48-4.32 V54.24v-2.88L72.72,50.4L72.72,50.4L72.72,50.4z M100.56,52.8h0.72c3.36,0,6.24,2.64,6.24,6v13.92c0,3.36-2.88,6-6.24,6l-0.72,0 c-1.92,0-3.84-0.96-5.04-2.64l-0.48,2.16H86.4V44.16h9.12V55.2C96.72,53.76,98.64,52.8,100.56,52.8L100.56,52.8z M98.64,69.6v-8.16 L98.4,58.8c-0.24-0.48-0.96-0.72-1.44-0.72c-0.48,0-1.2,0.24-1.44,0.72v13.68c0.24,0.48,0.96,0.72,1.44,0.72 c0.48,0,1.44-0.24,1.44-0.72L98.64,69.6L98.64,69.6z"
                      />
                    </g>
                  </g>
                </svg>
                {movie.imdb}

              </button>
          </a>
        </div>
      </div>

      {/* Full-width description section spanning both columns */}
      <hr/>
      <div className="mt-4">
        <h3 className="text-2xl font-bold mb-3">Description</h3>
        <p className="text-base leading-relaxed text-gray-400">
          {movie.description}
        </p>
      </div>
    </>
)
}

export default Movie;