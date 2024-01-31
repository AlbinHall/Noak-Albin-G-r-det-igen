let colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'black', 'white'];
let selector = document.querySelector("#category")
let pictures = document.querySelector(".Pictures")
let pageNow = 1
let numbersOfPictures = 10

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

document.getElementById("searchButton").addEventListener("click", fetchingApi);

/**
 * hämtar api:n, selected color är från dropdownen, iserInput är texten man skriver
 * pageNow e för att vi ska kunna hantera nästa sida funktionen osv
 * numbersOfPictures e hur många bilder vi vill visa per sida
*/
async function fetchingApi() {
    let userInput = document.getElementById("search").value;
    let selectedColor = selector.value;
    
    var API_KEY = '42114230-518f9984a7b51cfb128a38f28';
    var URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(`${userInput}`)}&colors=${selectedColor}&page=${pageNow}&per_page=${numbersOfPictures}`;
    
    try {
        const response = await fetch(URL);
        const data = await response.json();
        
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
    
    pictures.forEach((hit) => {
        
        const imgElement = document.createElement('img');
        imgElement.src = hit.previewURL;
        picturesContainer.appendChild(imgElement);
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

function loadPrevPage() 
{
    if (pageNow > 1) {
        pageNow--
        fetchingApi()
    }
}