document.addEventListener("DOMContentLoaded", () => {
  getJsonObject("./../data.json")
    .then((jsonObj) => {
      arrayOfKittens = jsonObj;
      let stringOfAllCards = loadAllCards(arrayOfKittens);
      // console.log(stringOfAllCards);
      let layoutPlaceholder = document.getElementById("card-placeholder");
      layoutPlaceholder.innerHTML = stringOfAllCards;
    })
    .then(() => setLikeListener())
    .catch((error) => console.error(error));
});

var arrayOfKittens = null;

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

function loadSingleCard(cardObj,i) {
  var stringCard = `          
    <div class="card-container">
      <div class="card-header">
        <div class="profile-container">
          <img
            class="profile-photo"
            src="${cardObj.profile_image}"
          />

          <div class="profile-data">
            <p class="name">${cardObj.name}</p>
            <p class="date">${cardObj.date}</p>
          </div>
        
        </div>
        <div class="profile-icon">
          <a href="${cardObj.source_link}">
            <img
              src="../icons/${getSocialIconType(cardObj.source_type)}.svg"
              alt="${cardObj.source_type}"
              class="social-icon"
            />
          </a>
        </div>
      
      </div>
      <div class="image-container">
				<img class="main-photo" src="${cardObj.image}"/>
			  </div>
            <div class="caption">
              <p>
               ${cardObj.caption}
              </p>
            </div>
            <hr />
            <div class="likes">
            <img id="heart-${i}" class="like-icon" src="./../icons/heart.svg" />
            <span id="like-${i}" class="like-count">${cardObj.likes}</span>
            </div>
          </div>`;
  return stringCard;
}

function getSocialIconType(source_type) {
  if (source_type == "instagram") {
    return source_type + "-logo";
  } else {
    return source_type;
  }
}

function loadAllCards(arrayOfCards) {
  let concatCards = "";
  for (let i = 0; i < arrayOfCards.length; i++) {
    concatCards += loadSingleCard(arrayOfCards[i],i);
  }
  return concatCards;
}


function toggleTheme() {
  var elements = document.querySelectorAll('.card-container');
  var themeToggle = document.querySelector('input[name="theme"]:checked').value;

  if (themeToggle === 'darkTheme') {
    elements.forEach(function(element) {
      element.style.background = 'black';
      element.style.color = 'white';
    });
  } else {
    elements.forEach(function(element) {
      element.style.background = 'white';
      element.style.color = 'black';
    });
  }
}

var themeRadios = document.querySelectorAll('input[name="theme"]');
themeRadios.forEach(function(radio) {
  radio.addEventListener('change', toggleTheme);
});

// const loadMoreButton = document.getElementById("load-button");
// const cardLimit=20;
// const cardIncrease=4;
// const pageCount = Math.ceil(cardLimit / cardIncrease);
// let currentPage = 1;

// cardTotalElem.innerHTML = cardLimit;

// const handleButtonStatus = () => {
//   if (pageCount === currentPage) {
//     loadMoreButton.classList.add("disabled");
//     loadMoreButton.setAttribute("disabled", true);
//   }
// };

// const addCards = (pageIndex) => {
//   currentPage = pageIndex;

//   handleButtonStatus();

//   const startRange = (pageIndex - 1) * cardIncrease;
//   const endRange =
//     pageIndex * cardIncrease > cardLimit ? cardLimit : pageIndex * cardIncrease;
  
//   cardCountElem.innerHTML = endRange;

//   for (let i = startRange + 1; i <= endRange; i++) {
//     createCard(i);
//   }
// };

// loadMoreButton.addEventListener("click", () => {
//   addCards(currentPage + 1);
// });
