/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */
// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
const addGamesToPage = (filteredGames) => {
  deleteChildElements(gamesContainer);
  // loop over each item in the data
  for (let i = 0; i < filteredGames.length; i++) {
    // create a new div element, which will become the game card
    const game = document.createElement("div");
    // add the class game-card to the list
    game.classList.add("game-card");
    // set the inner HTML using a template literal to display some info
    // about each game
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")
    game.innerHTML = `
    <img alt="Picture of Game" class="game-img" src="${filteredGames[i].img} "  />
    <h1>${filteredGames[i].name}</h1>
    <p>${filteredGames[i].description}</p>
    <h2> Backers: ${filteredGames[i].backers}</h2>
    `;
    // append the game to the games-container
    gamesContainer.appendChild(game);
  }
};
// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games
/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => {
  return total + game.backers;
}, 0);
// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = ` ${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((total, game) => {
  return total + game.pledged;
}, 0);
// set the inner HTML using a template literal and toLocaleString to get a number with commas
raisedCard.innerHTML = ` $${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

// Display the total number of games in the gamesCard
gamesCard.innerHTML = ` ${GAMES_JSON.length}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
const filterUnfundedOnly = () => {
  deleteChildElements(gamesContainer);
  // use filter() to get a list of games that have not yet met their goal
  const unfundedGames = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
  });
  console.log(unfundedGames);
  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(unfundedGames);
};
filterUnfundedOnly();

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);
  // use filter() to get a list of games that have met or exceeded their goal
  const fundedGames = GAMES_JSON.filter((game) => {
    return game.pledged >= game.goal;
  });
  console.log(fundedGames);
  // use the function we previously created to add unfunded games to the DOM
  addGamesToPage(fundedGames);
}
filterFundedOnly();

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);
  // add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);
}
showAllGames();

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to sum the number of unfunded games
const unfundedGames = GAMES_JSON.filter((game) => {
  return game.pledged < game.goal;
});

// create a string that explains the number of unfunded games using the ternary operator
// Use a template string to display how much money has been raised and for how many games, as well as explaining how many games currently remain unfunded
// Use the ternary operatory (?) to make sure the statement is grammatically correct regardless of the number of unfunded games.
const descriptionString = `A total of $${totalRaised.toLocaleString()} has been raised for ${
  GAMES_JSON.length
} games. ${
  unfundedGames.length > 0
    ? `Currently, ${unfundedGames.length} game${
        unfundedGames.length !== 1 ? "s are" : " is"
      } still unfunded. Come back soon to see if they get funded!`
    : "All games have been funded!"
}`;

// create a new DOM element containing the template string and append it to the descriptionContainer
const unfundedGamesElement = document.createElement("p");
unfundedGamesElement.innerHTML = descriptionString;
descriptionContainer.appendChild(unfundedGamesElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// Use destructuring and the spread operator to grab the first and second games from the sortedGames list.
// These games will be the top two most funded games in the list.
const [topGame, secondGame] = sortedGames;
console.log(topGame, secondGame);
// Create a new element that contains the name of the top funded game and appends it to the firstGameContainer.
// Do the same for the second most funded game, appending it to the secondGameContainer.
const topGameElement = document.createElement("p");
topGameElement.innerHTML = `${topGame.name}`;
firstGameContainer.appendChild(topGameElement);

const secondGameElement = document.createElement("p");
secondGameElement.innerHTML = `${secondGame.name}`;
secondGameContainer.appendChild(secondGameElement);

// My Optional Challenge 1: Add a search bar that allows users to search for a game by name.

// Challenge 1:
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");

const search = () => {
  const query = searchInput.value.toLowerCase();
  const filteredGames = GAMES_JSON.filter((game) => {
    const gameName = game.name.toLowerCase();
    return gameName.includes(query);
  });
  addGamesToPage(filteredGames);
};

searchButton.addEventListener("click", search);
// event listener for enter key
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    search();
  }
});
