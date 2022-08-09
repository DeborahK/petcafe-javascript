// Find the elements
// Set up event listeners 
const petForm = document.getElementById('pet-form');
const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', saveData);

window.addEventListener('load', populateForm);

function clearStorage() {
  localStorage.clear();
}

function populateForm() {
  let retrievedPet = readData();
  if (petForm) {
    // petForm.elements["pet-name"].value = retrievedPet["pet-name"];
    // petForm.elements["pet-adoption-date"].value = retrievedPet["pet-adoption-date"];

    for (const eleName in retrievedPet) {
      if (petForm.elements[eleName].type === "checkbox") {
        petForm.elements[eleName].checked = retrievedPet[eleName];
      } else {
        petForm.elements[eleName].value = retrievedPet[eleName];
      }
      console.log(eleName, petForm.elements[eleName].value);
    }
  }
}

// Read data from local storage
// Map it from a string to an object
function readData() {
  const data = localStorage.getItem('customPet');
  console.log('retrieved pet', data);

  const retrievedPet = JSON.parse(data);
  return retrievedPet;
}

// Save the data to local storage
function saveData(e) {
  e.preventDefault();

  // Create a FormData object containing all the data
  // from the form.
  const petData = new FormData(petForm);
  // Spread syntax to view the individual items
  console.log('FormData:', ...petData);
  const pet = Object.fromEntries(petData);
  console.log('Pet object:', pet);

  localStorage.setItem('customPet', JSON.stringify(pet));
  console.log('saved pet', JSON.stringify(pet));
}
