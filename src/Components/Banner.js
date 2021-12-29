import React, { Component } from 'react'
import {movies} from './getMovies'
import Spinner from './Spinner';
export default class Banner extends Component {
    render() {
        let movie = movies.results[0];
        return (
            <div>
                {
                movie.length === 0?<Spinner/>:
                <div className="card card-container" >
                    <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="card-img-top" alt="..." />
                    <div className="card-body description-container">
                        <h1 className="card-title">{movie.title}</h1>
                        <p className="card-text">{movie.overview}</p>
                        {/* <a href="/" className="btn btn-primary">Go somewhere</a> */}
                    </div>
                </div>
                }
            </div>
        )
    }
}
