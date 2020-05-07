import React from 'react';
import axios from 'axios';
import Movie from "./Movie";
/*parametr name must be the same and you can directly  */

//class does not have return
//react will automatically execute the rende method
//of your clss component
//setSate calls ernder method with new state

//update only happens when setState is called
class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };

  getMovies = async() => {
    //wait for axiso to complete
    //await can be used within async
    //const movies = await axios.get("https://yts-proxy.now.sh/list_movies.json")
    const {
      //data
      data: {
        //inside of prev data
        //movies
        data: { movies }
      }
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating")
    console.log(movies);
    this.setState({movies: movies, isLoading: false})
  }

  componentDidMount() {
    this.getMovies();
  }

  render() {
    //get me this.state.isLoading and store it in to const
    const {isLoading, movies} = this.state;
    //this.state.isLoading
    return (
    <section className="container">
      {isLoading?( 
        <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
      ) : 
      (
        <div className="movies">
          {movies.map(movie => (
            <Movie key={movie.id} id={movie.id} year={movie.year} title={movie.title} summary={movie.summary} poster ={movie.medium_cover_image} genres={movie.genres}/>
          ))}
        </div>
      )}
    </section>   
   )
  }
}

export default App;
