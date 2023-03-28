document.addEventListener("DOMContentLoaded", () => {
  getJsonObject("./../data.json")
    .then((jsonObj) => {
      arrayOfKittens = jsonObj;
      let stringOfAllCards = loadCards(arrayOfKittens, 0, cardIncrease);
      let layoutPlaceholder = document.getElementById("card-placeholder");
      layoutPlaceholder.innerHTML = stringOfAllCards;
      if (arrayOfCards.length <= cardLimit) {
        document.getElementById("load-more-button").style.display = "none";
      }
    })
    .then(() => setLikeListener())
    .catch((error) => console.error(error));
});

var arrayOfKittens = null;
var currentPage = 1;
var cardIncrease = 4;
var cardLimit = 0;

function setLikeListener() {
  const hearts = document.querySelectorAll(".like-icon");
  const likeCounts = document.querySelectorAll(".like-count");
  // console.log('hearts',hearts);
  // console.log('likeCounts',likeCounts);

  hearts.forEach((heart, index) => {
    let isLiked = false;
    let count = parseInt(likeCounts[index].innerHTML);

    heart.addEventListener("click", function () {
      if (isLiked) {
        heart.src = "./../icons/heart.svg";
        count--;
        likeCounts[index].innerHTML = count;
        isLiked = false;
      } else {
        heart.src = "./../icons/heart-red.svg";
        count++;
        likeCounts[index].innerHTML = count;
        isLiked = true;
      }
    });
  });
}

async function getJsonObject(path) {
  let response = await fetch(path);
  let jsonObj = await response.json();
  return jsonObj;
}

function loadSingleCard(cardObj, i) {
  var stringCard = ` <div class="card">
    <div class="card-header">
      <div class="header-container">
          <div class="profile-left-side">
        <img
          class="profile-photo"
          src="${cardObj.profile_image}"
        />

        <div class="profile-data">
          <h5 class="profile-name">${cardObj.name}</h5>
          <div class="profile-date">${cardObj.date}</div>
        </div>
      </div>

        <div class="profile-social-icon">
          <a href=""${cardObj.source_link}">
            <img
                class="social-icon"
              src="../icons/${getSocialIconType(cardObj.source_type)}.svg"
              alt="${cardObj.source_type}"
              
            />
          </a>
        </div>
      </div>

    </div>
    <div class="image-container">
      <img class="main-photo" src="${cardObj.image}" />
      <div class="card-caption">
      <p>
      ${cardObj.caption}
      </p>
    </div>
    </div>
   
    <hr />
    <div class="likes">
    <img id="heart-${i}" class="like-icon" src="../icons/heart.svg" />
    <span id="like-${i}" class="like-count">
     ${cardObj.likes}
     </span>
     </div>
  </div>         
 `;
  return stringCard;
}

function getSocialIconType(source_type) {
  if (source_type == "instagram") {
    return source_type + "-logo";
  } else {
    return source_type;
  }
}

function loadCards(arrayOfCards, start, end) {
  let concatCards = "";
  for (let i = start; i < end && i < arrayOfCards.length; i++) {
    concatCards += loadSingleCard(arrayOfCards[i], i);
  }
  cardLimit = end;
  return concatCards;
}

let stringOfAllCards = loadCards(arrayOfKittens, 0, cardLimit);

function loadMoreCards() {
  let currentCount = document.querySelectorAll(".card").length;
  let newCards = "";
  let remainingCards = arrayOfKittens.length - currentCount;
  let cardsToLoad =
    remainingCards >= cardIncrease ? cardIncrease : remainingCards;
  for (let i = currentCount; i < currentCount + cardsToLoad; i++) {
    newCards += loadSingleCard(arrayOfKittens[i], i);
  }

  let layoutPlaceholder = document.getElementById("card-placeholder");
  layoutPlaceholder.innerHTML += newCards;

  if (cardLimit >= arrayOfKittens.length) {
    document.getElementById("load-more-button").style.display = "none";
  }
  setLikeListener();
}

const loadMoreButton = document.getElementById("load-more-button");

loadMoreButton.addEventListener("click", function () {
  loadMoreCards();
});

function toggleTheme() {
  var elements = document.querySelectorAll(".card");
  var themeToggle = document.querySelector('input[name="theme"]:checked').value;

  if (themeToggle === "darkTheme") {
    elements.forEach(function (element) {
      element.style.background = "black";
      element.style.color = "white";
    });
  } else {
    elements.forEach(function (element) {
      element.style.background = "white";
      element.style.color = "black";
    });
  }
}

var themeRadios = document.querySelectorAll('input[name="theme"]');
themeRadios.forEach(function (radio) {
  radio.addEventListener("change", toggleTheme);
});
