let colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'black', 'white'];
let selector = document.querySelector("#category")
let selectedColor = selector.value
let userInput = ""

var API_KEY = '42114230-518f9984a7b51cfb128a38f28';
var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+ encodeURIComponent(`${selectedColor} ${userInput}`);

FilldropDown()
function FilldropDown() {
    for (let color of colors) {
      let option = document.createElement("option");
      option.value = color;
      option.innerText = color;
      console.log(option)
      selector.appendChild(option);
    }
  }




  fetch(URL)
  .then(response => response.json())
  .then(data => {
      if (parseInt(data.totalHits) > 0) {
          data.hits.forEach(hit => console.log(hit.pageURL));
      } else {
          console.log('No hits');
      }
  })
  .catch(error => console.error('Error fetching data:', error));
