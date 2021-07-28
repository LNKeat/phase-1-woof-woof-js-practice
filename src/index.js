/*ADD pups to dog Bar on page load
- in div: #dog-bar on page load fetch dogs
-on each dog create a span with dog's name
-add click event to each span (see below)
*/

window.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/pups')
  .then(resp => resp.json())
  .then(dogs => {
    createDogsBar(dogs)
    const filterBtn = document.querySelector('#good-dog-filter')
    filterBtn.addEventListener('click', () => toggleFilter(dogs))
  })
})
function createDogsBar(dogs){
  const dogBar = document.querySelector('#dog-bar')
  dogs.forEach(dog => {
    let dogSpan = document.createElement('span')
    let name = dog.name
    dogSpan.id = dog.name
    dogSpan.textContent= dog.name
    dogSpan.addEventListener('click', () => showDogInfo(dog))
    dogBar.appendChild(dogSpan)
  })
}
/*ADD click event function to show each dog's info  
-on click should pass dog info (as children) to div: #dog-info
-children include img tag, h2 tag w/ name, button 
    btn: changes btn text AND dog status between good & bad
*/
function showDogInfo(dog){
  //clear previous dog into if needed #dog-info div
  document.querySelector('#dog-info').innerHTML = ''
  let name = document.createElement('h2')
  let img = document.createElement('img')
  let togBtn = document.createElement('button')
  name.textContent = dog.name
  img.src = dog.image 
  togBtn.textContent = dog.isGoodDog ? "Change to Bad Dog" : "Change to Good Dog"
  togBtn.addEventListener('click', () => {
    //fxn to change status on obj in DOM
    const toggleStatus = dog => dog.isGoodDog ? false : true
    dog.isGoodDog = toggleStatus(dog)
    //changes text on button to match obj on DOM,
    togBtn.textContent = dog.isGoodDog ? "Change to Bad Dog" : "Change to Good Dog"
    //sends PATCH request with updated obj 
    patchDogStatus(dog)
  })
  document.querySelector('#dog-info').append(img, name, togBtn)
}

function patchDogStatus(dog){
  fetch(`http://localhost:3000/pups/${dog.id}`, {
    method: 'PATCH',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dog)
  })
}


/*CREATE toggle on good/bad dog bar Filter
-create click event to toggle btwn good/bad dog status
-click event PATCHes the database to change dog's recorded status
-click event changes which dogs are shown in #dog-bar 
*/

function toggleFilter(dogs){
  const filterBtn = document.querySelector('#good-dog-filter')
  if(filterBtn.textContent === 'Filter good dogs: OFF'){
    filterBtn.textContent = 'Filter good dogs: ON';
    dogs.forEach(dog => dog.isGoodDog ? document.getElementById(dog.name).style.display = 'flex' : document.getElementById(dog.name).style.display = 'none')
  }else {
    filterBtn.textContent = 'Filter good dogs: OFF'
    dogs.forEach(dog => document.getElementById(dog.name).style.display = 'flex')
  }
}



// function displayAllDogs(dogs){

// }