let colors = ["Any Color","grayscale", "transparent", "red", "orange", "yellow", "green", "turquoise", "blue", "lilac", "pink", "white", "gray", "black", "brown"];
let selector = document.querySelector("#category")
let pictures = document.querySelector(".Pictures")
let pageNow = 1
let numbersOfPictures = 10
let form = document.querySelector("#search-form")
let oldSearchInput = ""
let userInput = document.querySelector("#search");
let oldColor = ""
let totalHitsVar;

let nextPage = document.querySelector("#nextButton")
nextPage.addEventListener("click", LoadNextPage)

let prevPage = document.querySelector("#prevButton")
prevPage.addEventListener("click", loadPrevPage)

/**
 * skapar dropdown alternativen från våran colors
*/
FilldropDown()
function FilldropDown() {
    for (let color of colors) {
        let option = document.createElement("option");
        option.value = color;
        option.innerText = color;
        selector.appendChild(option);
    }
}

form.addEventListener("submit", event => {
    event.preventDefault()
    oldSearchInput = userInput.value
    oldColor = selector.value
    pageNow = 1
    fetchingApi()
});

/**
 * hämtar api:n, selected color är från dropdownen, iserInput är texten man skriver
 * pageNow e för att vi ska kunna hantera nästa sida funktionen osv
 * numbersOfPictures e hur många bilder vi vill visa per sida
*/

/**
 * fixa bildens taggar samt fotografens namn
*/
async function fetchingApi() {
    
    
    var API_KEY = '42114230-518f9984a7b51cfb128a38f28';
    var URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(`${oldSearchInput}`)}&colors=${oldColor}&page=${pageNow}&per_page=${numbersOfPictures}`;
    try {
        const response = await fetch(URL);
        const data = await response.json();
        totalHitsVar = data.totalHits

        if (parseInt(data.totalHits) > 0) {
            displayPictures(data.hits);
        } else {
            console.log('No hits');
            clearPictures();
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

/**
 * skapar img och lägger den i pictures diven som ligger i HTML
 * innerText för att rensa de gamla bilderna
 * skapar en div för varje bild för att texten ska ligga rätt för varje bild
 * hämtar tags och user från data.hit
*/
function displayPictures(pictures) {
    const picturesContainer = document.querySelector(".Pictures");
    picturesContainer.innerText = '';
    if (pageNow > 1) {
        prevPage.disabled = false
    }
    if (pageNow <= 1) {
        prevPage.disabled = true
    }

    if (pageNow * numbersOfPictures >= totalHitsVar) {
        nextPage.disabled = true;
    } else {
        nextPage.disabled = false;
    }

    pictures.forEach((hit) => {
        const imageDiv = document.createElement("div");
        imageDiv.classList.add("picDiv");
        const imgElement = document.createElement("img");

        const tagsParagraph = document.createElement("p");
        const userParagraph = document.createElement("p")
        tagsParagraph.innerText = hit.tags;
        userParagraph.innerText = hit.user

        
        
        imgElement.src = hit.previewURL;
        imageDiv.appendChild(imgElement);
        imageDiv.appendChild(tagsParagraph);
        imageDiv.appendChild(userParagraph)

        picturesContainer.appendChild(imageDiv);
    });
}
/**
 * Kallas på om det inte blir några resultat "hits" från api:n
*/
function clearPictures() {
    const picturesContainer = document.querySelector(".Pictures");
    picturesContainer.innerText = '';
    nextPage.disabled = true
}

function LoadNextPage() {
    pageNow++
    fetchingApi()
}

function loadPrevPage() {
    if (pageNow > 1) {
        pageNow--
        fetchingApi()
    }
}