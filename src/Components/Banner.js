import React, { Component } from 'react'
import { movies } from './GetMovies'
export default class Banner extends Component {
  render() {
    console.log(movies)
    let movie=movies.results[0]
    return (
      <div>
        
        <div class="card" className="CardBanner" >
          <img class="card-img-top CardImg" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="Card image cap"/>
          <div class="card-body CardBody">
            <h5 class="card-title CardTitle">{movie.original_title}</h5>
            <p class="card-text CardText">{movie.overview}</p>
          </div>
        </div>

      </div>
    )
  }
}
