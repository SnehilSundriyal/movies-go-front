import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import Cross from "./../images/x-mark.png";
import Check from "./../images/check-mark.png";

// Create a context for the app
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [jwt, setJwt] = useState(() => {
    return localStorage.getItem('jwt') || "";
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClass, setAlertClass] = useState("d-none");
  const [iconSrc, setIconSrc] = useState("");
  const [alertTimeout, setAlertTimeout] = useState(null);

  const [ticking, setTicking] = useState(false);
  const [tickInterval, setTickInterval] = useState("");

  const navigate = useNavigate();

  // Update localStorage when jwt changes
  useEffect(() => {
    if (jwt) {
      localStorage.setItem('jwt', jwt);
    } else {
      localStorage.removeItem('jwt');
    }
  }, [jwt]);

  const Logout = () => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    }

    fetch(`http://localhost:8080/logout`, requestOptions)
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

  // Clear any existing timeout when component unmounts
  useEffect(() => {
    return () => {
      if (alertTimeout) {
        clearTimeout(alertTimeout);
      }
    };
  }, [alertTimeout]);

  // Function to set alert and automatically clear it after 3 seconds
  const setAlert = useCallback((message, className, icon) => {
    // Clear any existing timeout
    if (alertTimeout) {
      clearTimeout(alertTimeout);
    }

    // Set the alert
    setAlertMessage(message);
    setAlertClass(className);
    setIconSrc(icon);

    // Set a timeout to clear the alert after 6 seconds
    const timeout = setTimeout(() => {
      setAlertMessage("");
      setAlertClass("d-none");
      setIconSrc("");
    }, 6000);

    setAlertTimeout(timeout);
  }, [alertTimeout]);

  // Values to be provided to consuming components
  const contextValue = {
    jwt, setJwt,
    alertMessage, setAlertMessage,
    alertClass, setAlertClass,
    iconSrc, setIconSrc,
    setAlert,
    Logout,
    ticking,
    setTicking,
    setTickInterval,
    tickInterval
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the app context
export const useAppContext = () => {
  return useContext(AppContext);
};
