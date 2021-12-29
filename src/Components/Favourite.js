import React, { Component } from 'react'

let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
export default class Favourite extends Component {
    constructor(){
        super();
        this.state = {
            genres:[],
            currGenre:"All Genres",
            movies:[],
            currMovies:[],
            currText:""
        }
    }
    componentDidMount(){
        let data = JSON.parse(localStorage.getItem("movies")) || [];
        
        let tempGenre = [];
        tempGenre.push("All Genres")
        data.forEach((movieObj) => {
            if(!tempGenre.includes(genreids[movieObj.genre_ids[0]])){
                tempGenre.push(genreids[movieObj.genre_ids[0]]);
            }
        })
        this.setState({movies:[...data], genres:[...tempGenre]})
    }
    handleGenreChange = (genre) => {
        this.setState({currGenre:genre})
    }
    handleDelete = (movieID, e) => {
        let data = JSON.parse(localStorage.getItem("movies")) || [];
        data = data.filter((movieObj) => movieID!==movieObj.id);
        localStorage.setItem("movies", JSON.stringify(data));
        e.target.parentElement.parentElement.remove();
    }
    handleSearching = (movies)=>{
        let filterMovies = [];
        if(this.state.currText === ''){
            filterMovies = this.state.movies;
        }
        else{
            filterMovies = movies.filter((movieObj) => {
                let title = movieObj.title.toLowerCase();
                return title.includes(this.state.currText.toLocaleLowerCase());
            })
        }
        return filterMovies
    }

    sortPopularityDes=()=>{
        let temp = this.state.movies;
        temp.sort((objA, objB)=>{
            return objB.popularity - objA.popularity
        })
        this.setState({movies:[...temp]})
    }
    sortPopularityAsc=()=>{
        let temp = this.state.movies;
        temp.sort((objA, objB)=>{
            return objA.popularity - objB.popularity
        })
        this.setState({movies:[...temp]})
    }
    sortRatingDes=()=>{
        let temp = this.state.movies;
        temp.sort((objA, objB)=>{
            return objB.vote_average - objA.vote_average
        })
        this.setState({movies:[...temp]})
    }
    sortRatingAs=()=>{
        let temp = this.state.movies;
        temp.sort((objA, objB)=>{
            return objA.vote_average - objB.vote_average
        })
        this.setState({movies:[...temp]})
    }

    
    render() {
        let filterMovies = [];
        // if(this.state.currText === ''){
        //     filterMovies = this.state.movies;
        // }
        // else{
        //     filterMovies = this.state.movies.filter((movieObj) => {
        //         let title = movieObj.title.toLowerCase();
        //         return title.includes(this.state.currText.toLocaleLowerCase());
        //     })
        // }
        filterMovies =  this.handleSearching(this.state.movies);
        if(this.state.currGenre!=="All Genres"){
            filterMovies = this.state.movies.filter((movieObj) => this.state.currGenre===genreids[movieObj.genre_ids[0]]);
            if(this.state.currText!==""){
                filterMovies = this.handleSearching(filterMovies);
            }
        }
        
        return (
            <div>
                <>
                    <div className="main">
                        <div className="row">
                            <div className="col-3 favourite-genres p-5">
                                <ul class="list-group">
                                    {
                                        this.state.genres.map((genre) => (
                                            genre===this.state.currGenre?<li class="list-group-item" style={{backgroundColor:"#09116e", color:"white", fontWeight:"bold"}}>{genre}</li>:
                                            <li class="list-group-item" style={{backgroundColor:"white", color:"#09116e"}} onClick={()=>this.handleGenreChange(genre)}>{genre}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="col-9 favourite-table p-5">
                                <div className="row">
                                    <input type="text" placeholder = "Search" className = "form-control col" value={this.state.currText} onChange={(e) => {this.setState({currText:e.target.value})}}/>
                                    <input type="number" className = "form-control col" />
                                </div>
                                <div className="row">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Title</th>
                                                <th scope="col">Genre</th>
                                                <th scope="col" style={{position:"relative"}}>
                                                    <span class="material-icons" style={{position:"absolute",left:"-0.7rem"}} onClick={this.sortPopularityDes}>arrow_drop_up</span>
                                                    Popularity
                                                    <span class="material-icons" style={{position:"absolute",top:"1rem",right:"1rem"}} onClick={this.sortPopularityAsc}>arrow_drop_down</span></th>
                                                <th scope="col" style={{position:"relative"}}><span class="material-icons" style={{position:"absolute",left:"-0.7rem"}}     onClick={this.sortRatingDes}>arrow_drop_up</span>
                                                    Rating
                                                    <span class="material-icons" style={{position:"absolute",top:"1rem",right:"0.4rem"}} onClick={this.sortRatingAs}>arrow_drop_down</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                    filterMovies.map((movieObj) => (
                                                    <tr>
                                                        <th scope="row"><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="table-img" alt="pic" />{movieObj.title}</th>
                                                        <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                        <td>{movieObj.popularity}</td>
                                                        <td>{movieObj.vote_average}</td>
                                                        <td><button type="button" class="btn btn-danger" onClick={(e)=>this.handleDelete(movieObj.id,e)}>Delete</button></td>
                                                    </tr>
                                                ))
                                            }
                                            
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row ">
                                    <nav aria-label="Page navigation example">
                                        <ul class="pagination justify-content-center">
                                            <li class="page-item">
                                                <a class="page-link" href="#" aria-label="Previous">
                                                    <span aria-hidden="true">&laquo;</span>
                                                </a>
                                            </li>
                                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                                            <li class="page-item">
                                                <a class="page-link" href="#" aria-label="Next">
                                                    <span aria-hidden="true">&raquo;</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        )
    }
}
