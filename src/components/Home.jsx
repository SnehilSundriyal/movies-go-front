import React from "react";
import Ticket from "./../images/Beige and Brown Minimalist Movie Ticket.png"
import {Link} from "react-router-dom";
import './../styles/fonts.css';

const Home = () => {
  return (
    <>
      <div className="text-center font-sf">
        <h2 className="text-4xl font-medium mb-4">Click below to find a movie for tonight</h2>
          <div className="flex justify-center">
            <Link to="/movies">
              <img src={Ticket} alt="movie-tickets" className="w-250 h-auto"/>
            </Link>
          </div>
      </div>
    </>
  )
}

export default Home;