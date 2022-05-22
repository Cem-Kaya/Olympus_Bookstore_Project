import React from 'react'
import "./ErrorPageStyles.css"

const ErrorPage = () => {
  return (
    <div>
      	<div id="notfound">
          <div class="notfound-bg"></div>
          <div class="notfound">
            <div class="notfound-404">
              <h1>404</h1>
            </div>
            <h2>Oops! Page Not Found</h2>
            {/* <form class="notfound-search">
              <input type="text" placeholder="Search..."/>
              <button type="button">Search</button>
            </form>
            <div class="notfound-social">
              <a href="#"><i class="fa fa-facebook"></i></a>
              <a href="#"><i class="fa fa-twitter"></i></a>
              <a href="#"><i class="fa fa-pinterest"></i></a>
              <a href="#"><i class="fa fa-google-plus"></i></a>
            </div> */}
            <a href="/">Back To Homepage</a>
          </div>
        </div>
    </div>
  )
}

export default ErrorPage