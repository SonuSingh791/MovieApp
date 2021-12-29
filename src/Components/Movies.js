import React, { Component } from 'react'
// import { movies } from './getMovies'
import Spinner from './Spinner';
import axios from 'axios';
export default class Movies extends Component {
    constructor(){
        super();
        this.state = {
            hover:"",
            parr:[1],
            movies:[],
            currPage:1,
            favourites:[]
        }
    }
    updateMovies = async() => {
        // console.log(this.state.currPage)
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
        let data = res.data;
        this.setState({
            movies:[...data.results]
        })
    }
    async componentDidMount(){
        this.updateMovies();
        this.handleFavouriteState();
    }
    changeMovies = async() => {
        this.updateMovies();
        console.log(this.state.currPage)
    }
    handleRight = () => {
        let tempArr = [];
        for(let i =1 ;i <= this.state.parr.length + 1; i++) {
            tempArr.push(i);
        }
        this.setState({parr:[...tempArr], currPage:this.state.currPage+1},this.changeMovies);
        // console.log(this.state.parr)
    }
    handleLeft = () => {
        if(this.state.currPage>1)
            this.setState({currPage:this.state.currPage - 1},this.changeMovies);
    }

    handleClick = (value) => {
        if(this.state.currPage !== value){
            this.setState({currPage:value}, this.changeMoviehandleClick)
        }
    }
    
    handleFavourite = (movie,e) => {
        let oldData = JSON.parse(localStorage.getItem("movies")) || [];
        if(this.state.favourites.includes(movie.id)){
            oldData = oldData.filter((m) => m.id!==movie.id);
        }
        else{
            oldData.push(movie)
        }
        localStorage.setItem("movies",JSON.stringify(oldData))
        this.handleFavouriteState();
    }

    handleFavouriteState = () => {
        let oldData = JSON.parse(localStorage.getItem("movies")) || [];
        let temp = oldData.map((movie) => movie.id)
        this.setState({favourites:[...temp]});
    }
    render() {
        
        
        return (
            <>  
                {
                    this.state.movies.length === 0?<Spinner/>:
                    <div className="text-center">
                        <h1>Popular</h1>
                    <div className="d-flex justify-content-center flex-wrap">
                    {this.state.movies.map((movieObj) => (
                        <>
                        {/* <div className="cards m-1 "> */}
                            <div className="card movies-card m-1 " onMouseEnter = {() => {this.setState({hover:movieObj.id})}} onMouseLeave = {() => {this.setState({hover:""})}}>
                                <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top" alt="..." />
                                <div className="card-body p-0">
                                    {/* <h3 className="card-title movie-title">{movieObj.title}</h3> */}
                                    {/* <p className="card-text">{movieObj.overview}</p> */}
                                    {
                                        this.state.hover === movieObj.id && <div className="card inner-card" >
                                        {/* <img src="" className="card-img-top" alt="..." /> */}
                                        <div className="card-body p-0">
                                            <h3 className="card-title p-1" style={{color:"blue"}}>{(movieObj.title)}</h3>
                                            <p className="card-text p-1" style={{color:"#4d4c4c"}}>{(movieObj.overview.length>=200?movieObj.overview.slice(0,200)+"....":movieObj.overview)}</p>
                                            <a className="btn btn-primary movie-btn material-icons" onClick = {(e)=>this.handleFavourite(movieObj,e)}>{this.state.favourites.includes(movieObj.id)?"turned_int":"turned_in_not"}</a>
                                        </div>
                                    </div>         
                                    }
                                    
                                </div>
                            </div>
                            
                        {/* </div> */}
                            
                        </>
                    ))}
                    </div>
                    </div>
                }
                    <nav aria-label="Page navigation example ">
                        <ul className="pagination justify-content-center my-3">
                            <li className="page-item" onClick = {this.handleLeft}>
                            <a className="page-link" aria-label="Previous" >
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                            </li>
                            {
                                this.state.parr.map((value) => (
                                    <li className="page-item"><a className="page-link" onClick = {() => this.handleClick(value)} >{value}</a></li>
                                ))
                            }
                            {/* <li className="page-item"><a className="page-link" href="/">2</a></li>
                            <li className="page-item"><a className="page-link" href="/">3</a></li> */}
                            <li className="page-item" onClick = {this.handleRight}>
                                <a className="page-link"  aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
            </>
        )
    }
}
