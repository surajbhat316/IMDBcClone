/***
 * 
 * Created by : Avineet Bhat
 * Created Date : 23th June 2023
 */
const API_KEY = "362ac240";

const search =  document.getElementById("search");
let movies = [];
let newMovies = [];
var favourites = "";


//Checks if in the localStorage a value for favourite movies is preset or not
window.onload = () => {
    if(localStorage.getItem("favourites")){
        let favMovies = localStorage.getItem("favourites").split("\n");
        for(let val of favMovies){
            if(val !== ""){
                favourites += val;
            }
        }
    }
    else{
        favourites = "";
    }
}

/**
 * OnInpput event for whenever the user
 * searches for a movie from the sarch bar
 */
search.addEventListener("input",function (e) {
    let movieName = e.target.value;
    if(movieName.length === 0){
        clearScreen();
    }
    fetchMovieData(movieName);

})

/**OnClick Event Listner for handling Add to Favourites 
 * and opening the movie page for a particular movie
 */
document.addEventListener('click' , function (e) {

    if(e.target.id == "img"){
        return;
    }
    if(e.target.id.startsWith("fav-button")){
        let movieTitle = e.target.dataset.id;
        addToFavourites(movieTitle);
        return;
    }
    
})

/**
 * Iterates over all the movies that are currently present in the movies list
 * and stores the corresponding JSON in the local Storage
 * 
 * Also, After clicking on the add to favourites btn the button is disabled
 */
function addToFavourites(movieTitle){
    for(let movie of movies){
        if(movie !== null && movie.Response !== "False"&& movie.Title === movieTitle){
            favourites +=JSON.stringify(movie) + ";";
            disableButton(movieTitle);
            updateLocalStorage(favourites);
        }
    }
    
}

// Function to disable the add to favourites btn
function disableButton(movieTitle){
    if(movieTitle){
        const btn = document.getElementById("fav-button"+movieTitle);
        btn.disabled = true;
        btn.textContent="Added to favorites";
    }
    
}

// Updates the local Storage everytime a new movie is added to the favorites list
function updateLocalStorage(favourites){
    if(localStorage.getItem("favourites")){
        let storage = localStorage.getItem("favourites");
        storage = "";
        storage += favourites;
        localStorage.setItem("favourites", storage);
    }else{
        localStorage.setItem("favourites", favourites);
    }
}

/**
 * function that hits the OMDB API and returns the relevant information for the searched 
 */
function fetchMovieData(movieName){
    fetch("http://www.omdbapi.com/?apikey="+API_KEY+"&t="+ movieName)
    .then(
        function (response){
            return response.json();
        }
    ).then(
        function (data){
            createMovieList(data);
            renderMovies(movies);
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
 * Checks and adds only unique movies to the list of movies
*/
function createMovieList(data){
    if(movies.length == 0){
        movies.push(data);
        return;
    }
    else{
        let isPresent = false;
        for(let movie of movies){
            if(movie.Title === data.Title){
                isPresent = true;
            }
        }
        if(!isPresent){
            movies.push(data);
        }
    }
}

/**
 * Function that renders the movies on the screen
 */
function renderMovies(movies){
    if(movies.length == 0){
        let ul = document.getElementById("movies");
        ul.innerHTML = "";
        return;
    }
    let ul = document.getElementById("movies");
    ul.innerHTML = "";
    movies.slice().reverse().forEach(function (movie){
        if(movie.Response !== "False"){
            let li = document.createElement("li");
            li.style.color = "white";
            li.style.listStyle = "none";

            li.innerHTML = `
                <div id="mov-box-container" class="container-fluid">
                    <div id="mov-box" class="row mx-1 my-4">
                        <div class="col-12 col-sm-4 ">
                            <div class="img-container">
                                <a href="./movies.html?name=${movie.Title}">
                                    <img id="img" data-id="${movie.Title}" src="${movie.Poster}" alt="${movie.Title}" width="100%" height="100%">
                                </a>
                            </div>
                        </div>
                        <div class="col-12 col-sm-8 movie-info">
                            <h2>${movie.Title}</h2>
                            <p>Year - ${movie.Year}</p>
                            <p>Rated - ${movie.Rated}</p>
                            <button id="fav-button${movie.Title}" data-id ="${movie.Title}" class="btn btn-primary">Add to Favourites</button>
                        </div>
                    </div>                
                </div>

            `;
            ul.appendChild(li);
            checkIfMovieIsPresentInFavourites(movie);
        }
        
    })

    
}

/** 
 * Checks if the movie is already in the favorites list
 * and disables the add to favourites button if true
 */
function checkIfMovieIsPresentInFavourites(movie){

    let fav = favourites.split(";");
    for(let f of fav){
        if(f !== ""){
            let favObj  = JSON.parse(f);
            if(movie.Title === favObj.Title){
                disableButton(movie.Title);
            }
        }
    }
}

// To Clear the screen when nothing is 
// present in the search bar
function clearScreen(){
    movies = [];
    renderMovies(movies);
}