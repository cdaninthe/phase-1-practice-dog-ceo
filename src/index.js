console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", function() {

    const images = document.getElementById('dog-image-container');
    const breeds = document.getElementById('dog-breeds')
    let allBreedsObj = {}
    const dropdown = document.getElementById('breed-dropdown')
    dropdown.addEventListener("change", filterBreeds)

    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetchImages();

    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetchBreeds();


    //Challenge 1
    //Fetch images
    function fetchImages(){
        fetch(imgUrl)
        .then(response => response.json())
        .then((data) => renderUrl(data.message));
    }
    
    //Add images to the DOM
    function renderUrl(urlList) {
        urlList.forEach(url => {
          const img = document.createElement('img');
          img.src = url;
          images.appendChild(img);
        });
    }

    //Challenge 2
    //Fetch dog breeds
    function fetchBreeds(){
        fetch(breedUrl)
        .then(resp => resp.json())
        .then(data => {
            allBreedsObj = {... data.message}
            addBreeds(allBreedsObj)
        })
    }

    //Add breeds to the page
    function addBreeds(obj){
        const allBreeds = Object.keys(obj)
        allBreeds.forEach((breed, index) => {
            const li = document.createElement('li')
            li.innerText = `${breed}: ${obj[breed]} `
            breeds.appendChild(li);
            li.addEventListener('click', changeColor)
        });
    }

    //Challenge 3
    //when the user clicks on any one of the <li>s, the font color of that <li> changes. 
    function changeColor(event){
        event.target.style.color = "purple"
    }

    //Challenge 4
    //the user can filter breeds that start with a particular letter using a dropdown.
    function filterBreeds(event){
        const letter = event.target.value
        const allBreeds = Object.keys(allBreedsObj)
        breeds.innerText =''
        allBreeds.forEach((breed) => {
            if (breed.startsWith(letter)){
                const li = document.createElement('li')
                li.innerText = `${breed}: ${allBreedsObj[breed]} `
                breeds.appendChild(li)
            }
        })
        
    }

})