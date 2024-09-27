/***
 * 
 * Created by : Avineet Bhat
 * Created Date : 23th June 2023
 */



const API_KEY = "362ac240";
/**
 * Everytime the window loads for the movies page
 * fetch the query parameter present in the url
 * The url contains the movie name  which is being used to get the movie
 * information and render the same
 */
window.onload = () =>{
    var params = {};
    location.search.slice(1).split("&").forEach(function(pair) {
        pair = pair.split("=");
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    });
    fetchMovieData1(params["name"]);

}


/**
 * Method that performs the actual fetch
 */
function fetchMovieData1(movieName){
    fetch("https://www.omdbapi.com/?apikey="+API_KEY+"&t="+ movieName)
    .then(
        function (response){
            return response.json();
        }
    ).then(
        function (data){
            renderMovie(data);
            return data;
        }
    )
    .catch(
        function (error){
            console.log(error);
        }
    )
}

/**
 * Method for rendering the movie information
 */
function renderMovie(movie){
    const movieContainer = document.getElementById("movie-cpntainer");
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="row">
        <div class="col-12">
            <h2 style="text-align: center; color: white;">${movie.Title}</h2>
        </div>
        <div class="col-12">
            <div id="image-container" style="width: 50%; height: 50%; background-color: antiquewhite; margin: auto;">
                <img src="${movie.Poster}" alt="" width="100%" height="100%">
            </div>

            <div id="movie-info" style="width: 50%; margin: auto; color: white;">
                <p>Year : ${movie.Year}</p>
                <p>Plot : ${movie.Plot}</p>
                <p>Actors : ${movie.Actors}</p>
            </div>
        </div>
    </div>
    `;
    movieContainer.appendChild(div);
}
