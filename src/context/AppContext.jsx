import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import Cross from "./../images/x-mark.png";
import Check from "./../images/check-mark.png";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [jwt, setJwt] = useState(() => {
    return localStorage.getItem('jwt') || "";
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClass, setAlertClass] = useState("d-none");
  const [iconSrc, setIconSrc] = useState("");
  const [alertTimeout, setAlertTimeout] = useState(null);
  const [tickInterval, setTickInterval] = useState("");

  useEffect(() => {
    if (jwt) {
      localStorage.setItem('jwt', jwt);
    } else {
      localStorage.removeItem('jwt');
    }
  }, [jwt]);

  useEffect(() => {
    return () => {
      if (alertTimeout) {
        clearTimeout(alertTimeout);
      }
    };
  }, [alertTimeout]);

  const navigate = useNavigate();

  const Logout = () => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    }

    fetch(`${process.env.REACT_APP_BACKEND}/logout`, requestOptions)
        .catch(error => {
          setAlert("Error logging out" + toString(error), "alert-danger", Cross)
        })
        .finally(() => {
          setJwt("");
          navigate("/login");
          setTimeout(() => {
            setAlert("Logged out successfully!", "alert-success", Check);
          }, 100)
        })
  }

  const ToggleRefresh = useCallback((status) => {
    if (status) {
      let i = setInterval(() => {
        const requestOptions = {
          method: "GET",
          credentials: "include",
        }
        fetch(`${process.env.REACT_APP_BACKEND}/refresh`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              if (data.access_token) {
                setJwt(data.access_token);
              }
            })
            .catch(error => {
              setAlert(error, "alert-error", Cross)
            })      }, 600000);
      setTickInterval(i);
    } else {
      setTickInterval(null);
      clearInterval(tickInterval);
    }
  }, [tickInterval])

  const setAlert = useCallback((message, className, icon) => {
    if (alertTimeout) {
      clearTimeout(alertTimeout);
    }

    setAlertMessage(message);
    setAlertClass(className);
    setIconSrc(icon);

    const timeout = setTimeout(() => {
      setAlertMessage("");
      setAlertClass("d-none");
      setIconSrc("");
    }, 6000);

    setAlertTimeout(timeout);
  }, [alertTimeout]);

  const contextValue = {
    jwt, setJwt,
    alertMessage, setAlertMessage,
    alertClass, setAlertClass,
    iconSrc, setIconSrc,
    setAlert,
    setTickInterval,
    tickInterval,
    Logout,
    ToggleRefresh,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};