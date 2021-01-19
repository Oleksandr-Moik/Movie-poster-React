import React from "react";

export class MovieItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            willWatch: false,
            imageLoaded: false,
            image: null
        }
    }

    componentDidMount() {
        this.setState({image: this.getImage()})
    }

    getImage = () => {
        const {movie} = this.props
        return fetch(`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`)
            .then(data => {
                return data.blob()
            })
            .then(img => {
                this.setState({image: URL.createObjectURL(img), imageLoaded: true})
            })
    }

    toggleWillWatch = movie => {
        if (this.state.willWatch) {
            this.props.removeMovieFromWillWatch(movie)
        } else {
            this.props.addMovieToWillWatch(movie)
        }
        this.setState({willWatch: !this.state.willWatch})
    }

    render() {
        const {movie, removeMovie, addMovieToWillWatch, removeMovieFromWillWatch} = this.props
        return (
            <div className={"card"}>
                {this.state.imageLoaded ?
                    (<img
                        className="card-img-top"
                        src={this.state.image}
                        alt={movie.title}/>)
                    :
                    (<p>
                            <div className="spinner-border" role="status">
                                {/*<span className="sr-only">Loading...</span>*/}
                            </div>
                            Loading preview image...</p>
                    )
                }

                <div className="card-body">
                    <h6 className="cart-title">{movie.title}</h6>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0">Rating: {movie.vote_average}</p>
                        {this.state.willWatch ?
                            (<button
                                type={"button"}
                                className={"btn btn-success"}
                                onClick={() => {
                                    this.setState({willWatch: false})
                                    removeMovieFromWillWatch(movie)
                                }
                                }
                            >
                                Remove Will Watch
                            </button>)
                            :
                            (<button
                                type={"button"}
                                className={"btn btn-secondary"}
                                onClick={() => {
                                    this.setState({willWatch: true})
                                    addMovieToWillWatch(movie)
                                }
                                }
                            >
                                Add Will Watch
                            </button>)}
                    </div>
                    <button
                        type={"button"}
                        className={"btn btn-danger"}
                        onClick={removeMovie.bind(null, movie)}
                    >
                        Delete
                    </button>
                </div>
            </div>);
    }
}