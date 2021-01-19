import React from "react"
import "./index.css"
import {API_KEY_3, API_URL} from "./api";
import {MoviePagination} from "./MoviePagination";
import {MovieTabs} from "./MovieTabs";
import {MovieItem} from "./MovieItem";

class App extends React.Component{
  constructor() {
    super();

    this.state = {
      movies:[],
      moviesWillWatch:[],
      sort_by:"popularity.desc",
      page: 1,
      total_pages: 1,
      paginationDataLoaded: false
    }
  }

  componentDidMount() {
    this.getMovies()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.sort_by!==this.state.sort_by || prevState.page!==this.state.page) {
      this.getMovies()
    }
  }

  getMovies = () =>{
    this.setState({paginationDataLoaded:false})
    fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}`
        +`&sort_by=${this.state.sort_by}&page=${this.state.page}`)
        .then(resp=>{return resp.json()})
        .then(data=>{this.setState(
            {
              movies: data.results,
              page: this.state.page,
              total_pages: data.total_pages,
              paginationDataLoaded: true
            })})
  }

  setPage = page =>{
    if(page<=0)page=1
    else if(page>this.state.total_pages)page=this.state.total_pages

    this.setState({page:page})
  }

  addMovieToWillWatch = movie =>{
    if(!this.state.moviesWillWatch.find(m=>m.id===movie.id)){
      const updateMovie = [...this.state.moviesWillWatch, movie]
      this.setState({moviesWillWatch: updateMovie })
    }
  }
  removeMovieFromWillWatch = movie =>{
    const updateMovie = this.state.moviesWillWatch.filter(m=>{ return m.id!==movie.id})
    this.setState({moviesWillWatch: updateMovie})
  }
  removeMovie = movie => {
    const updateMovies = this.state.movies.filter(item=>{
      return item.id!==movie.id
    })
    this.setState({movies: updateMovies})
  }

  updateSortBy = value => {
    this.setState({sort_by: value})
  }

  render() {
    return(
      <div className={"container"}>
        <div className="row">
          <div className="col-9">
              <div className="row">
                {this.state.paginationDataLoaded ? (
                    <MoviePagination page={this.state.page}
                                   total_pages={this.state.total_pages}
                                   setPage={this.setPage}
                    />
                   )
                   :
                   (
                      <p></p>
                   )
                }
                <div className="col-12 mb-3">
                  <MovieTabs sort_by={this.state.sort_by} updateSortBy={this.updateSortBy}/>
                </div>
                <div className="row">
                  {this.state.movies.map(movie=>{
                  return (
                      <div className="col-6 mb-3" key={movie.id}>
                        <MovieItem
                            movie={movie}
                            removeMovie={this.removeMovie}
                            addMovieToWillWatch={this.addMovieToWillWatch}
                            removeMovieFromWillWatch={this.removeMovieFromWillWatch}/>
                      </div>
                      )
                })}
                </div>
              </div>

          </div>
          <div className="col-3">
            <h4>Will Watch: {this.state.moviesWillWatch.length}</h4>
            <ul className="list-group">
              {this.state.moviesWillWatch.map(movie=>{
                return(
                    <li className="list-group-item" key={movie.id}>
                      <div className="d-flex justify-content-between">
                        <span>{movie.title}</span>
                        <span>{movie.vote_average}</span>
                      </div>
                    </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }

}

export default App;

