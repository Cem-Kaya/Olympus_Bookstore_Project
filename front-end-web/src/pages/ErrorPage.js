import React from 'react'
import "../styles/ErrorPageStyles.css"

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
            <a href="/">Back To Homepage</a>
          </div>
        </div>
    </div>
  )
}

export default ErrorPage