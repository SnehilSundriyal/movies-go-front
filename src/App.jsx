import React, {useEffect} from 'react';
import "./app.css";
import {Link, Outlet} from "react-router-dom";
import Alert from "./components/Alert.jsx";
import { useAppContext } from './context/AppContext';
import Logo from "./../public/vite.svg";
import Cross from "./images/x-mark.png";
import Button from "daisyui/components/button/index.js";

function App() {
  const {
    jwt,
    alertMessage,
    alertClass,
    iconSrc,
    setJwt,
    Logout,
    setAlert,
    ticking,
    setTickInterval,
    tickInterval,
    setTicking,
  } = useAppContext();

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    }

    fetch(`http://localhost:8080/refresh`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            setJwt(data.access_token);
          }
        })
        .catch(error => {
          setAlert(error, "alert-error", Cross)
        })
  })

  const toggleRefresh = () => {
    console.log("clicked");
    if (!ticking) {
      console.log("turning on ticking");
      let i = setInterval(() => {
        console.log("this will run every second");

      }, 1000);
      setTickInterval(i);
      console.log("setting tick interval to", i);
      setTicking(true);
    } else {
      console.log("turning off ticking")
      console.log("turning off tickInterval", tickInterval);
      setTickInterval(null);
      clearInterval(tickInterval);
      setTicking(false);
    }
}

  return (
      <>
        <div className="max-w-7xl mx-auto px-4 mt-3">

          <div className="flex flex-nowrap items-center justify-between">
            <Link to="/">
              <div className="flex items-center gap-3">
                <img src={Logo} alt="Movies Go" className="h-20"/>
                <h1 className="text-[50px] font-extrabold font-sans">Movies Go</h1>
              </div>
            </Link>

            <div className="flex flex-col">
              <div className="w-full md:w-auto text-right">
                {jwt === ""
                    ? <Link to="/login">
                      <button className="btn btn-sm btn-soft btn-success font-sans">Login</button>
                    </Link>
                    : <a href="#!" onClick={Logout} className="btn btn-sm btn-soft btn-error font-sans">Logout</a>
                }
              </div>
            </div>
          </div>

          <hr/>

          <div className="flex gap-6 mt-5">
            <div className="w-56 flex-shrink-0">
              <ul className="menu bg-base-200 rounded-box w-full">
                <li>
                  <Link to="/">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </svg>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/movies">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"/>
                    </svg>
                    Movies
                  </Link>
                </li>
                <li>
                  <Link to="/genres">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
                    </svg>

                    Genres
                  </Link>
                </li>
                {jwt !== "" &&
                    <>
                      <li>
                        <Link to="/admin/movie/0">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                               stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                          </svg>

                          Add Movies
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/manage-catalogue">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                               stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/>
                          </svg>


                          Manage Catalogue
                        </Link>
                      </li>
                      <li>
                        <Link to="/graphQL">
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 400 400"
                              className="h-6 w-6"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="20"
                          >
                            <circle cx="200" cy="40" r="20"/>
                            <circle cx="340" cy="120" r="20"/>
                            <circle cx="340" cy="280" r="20"/>
                            <circle cx="200" cy="360" r="20"/>
                            <circle cx="60" cy="280" r="20"/>
                            <circle cx="60" cy="120" r="20"/>
                            <line x1="200" y1="60" x2="200" y2="340"/>
                            <line x1="80" y1="120" x2="320" y2="280"/>
                            <line x1="80" y1="280" x2="320" y2="120"/>
                            <line x1="72" y1="132" x2="328" y2="132"/>
                            <line x1="72" y1="268" x2="328" y2="268"/>
                            <line x1="68" y1="128" x2="200" y2="360"/>
                            <line x1="332" y1="128" x2="200" y2="360"/>
                          </svg>
                          GraphQL
                        </Link>
                      </li>
                    </>
                }
              </ul>
            </div>

            <div className="flex-1">
              <button className="btn btn-soft btn-warning" href="#!" onClick={toggleRefresh}>Toggle ticking</button>
              <Alert message={alertMessage} class={alertClass} iconSrc={iconSrc} />
              <Outlet />
            </div>
          </div>

        </div>
      </>
  )
}

export default App