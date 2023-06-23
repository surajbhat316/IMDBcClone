/***
 * 
 * Created by : Avineet Bhat
 * Created Date : 23th June 2023
 */





let favMovies = "";
let movieObjects = [];

/**
 * Everytime the window loads 
 * it checks for the favourite movies in the localStorage and renders
 * the movies on the screen
 */
window.onload = () => {
    if(localStorage.getItem("favourites")){
        favMovies = localStorage.getItem("favourites");

        if(favMovies !== undefined){
            getMovieObjects(favMovies);
            renderFavMovies(movieObjects);
        }
        
    }
}

/**
 * Get the movie objects and store the same in the 
 * movieObjects array
 */
function getMovieObjects(movies){
    let favMovObj = movies.split(";");
    for(let mov of favMovObj){
        if(mov !== ""){
            movieObjects.push(mov);
        }
    }
}

/**
 * To render the favourite movies
 */
function renderFavMovies(movies){
    const movieContainer = document.getElementById("movie-container");
    movieContainer.innerHTML = "";
    for(let movie of movies){
        if(movie !== undefined && movie !== ""){
            let mov = JSON.parse(movie);
            const div = document.createElement("div");
            div.innerHTML = `
            
                <div id="fav-movie" class="fav-movie">
                    <div class="image-container">
                        <img src="${mov.Poster}" alt="" width="100%" height="100%" >
                    </div>
                    <div class="movie-description">
                        <p>${mov.Title}</p>
                        <p>${mov.Year}</p>
                        <button id="remBtn" data-id= "${mov.Title}" class="btn btn-danger">Remove From Favorites</button>
                    </div>
                </div>
            `;
            movieContainer.appendChild(div);
        }
        
    }
    
    
}

/**
 * Event handler for removing the selted movie from the favorites list
 */
document.addEventListener('click', function (e) {
    if(e.target.id === "remBtn"){
        let movieName = e.target.dataset.id;
        removeFromFav(movieName);

    }
})


function removeFromFav(movieName) {
    let newMovieObjects = [];
    for(movie of movieObjects){
        let movieObj  = JSON.parse(movie);
        if(movieObj.Title !== movieName){
            newMovieObjects.push(movie);
        }
    }
    movieObjects = newMovieObjects;
    let favMovStr = "";
    for(let i=0;i< movieObjects.length-1; i++){
        favMovStr += movieObjects[i] + ";";
    }
    if(movieObjects[movieObjects.length-1] !== undefined){
        favMovStr+= movieObjects[movieObjects.length-1];
    }
    if(favMovStr !== undefined){
        updateLocalStorage(favMovStr);
        re_renderFavMovies();
    }
    

}

function updateLocalStorage(movieString){
    if(localStorage.getItem("favourites")){
        let str = localStorage.getItem("favourites");
        str = "";
        str+=movieString;
        localStorage.setItem("favourites", str); 
    }else{
        localStorage.setItem("favourites", movieString); 
    }
    
}

function re_renderFavMovies(){
    if(localStorage.getItem("favourites")){
        favMovies = localStorage.getItem("favourites");
        let newFavoriteMov = favMovies.split(";");
        movieObjects=[];
        for(let mov of newFavoriteMov){
            if(mov !== ""){
                movieObjects.push(mov);
            }
        }
        renderFavMovies(movieObjects);
    }
    else{
        movieObjects = [];
        renderFavMovies(movieObjects);
    }
}

