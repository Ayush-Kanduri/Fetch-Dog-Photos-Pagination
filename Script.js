const dropdown = document.getElementById("dog-breeds");
const breedImageDiv = document.getElementById("breed-image");
const submit = document.getElementsByTagName("button")[0];
const next = document.querySelector("#next a");
let dropDownValueChanged = false;
let value = "";

//--------------------------------------------------------------
//FUNCTION: Fetch All Breeds List using Async-Await Fetch() API//
const fetchBreeds = async () => {
	const response = await fetch("https://dog.ceo/api/breeds/list/all");
	const data = await response.json();
	const dogBreeds = data.message;
	//Appends the dog breeds to the dropdown
	for (let breed in dogBreeds) {
		const option = document.createElement("option");
		option.value = breed;
		option.textContent = breed;
		dropdown.appendChild(option);
	}
};
//--------------------------------------------------------------
//FUNCTION: It is called when a value is picked in the Dropdown//
const changeValue = () => {
	if (dropdown.value !== "select") {
		//Value is picked in the dropdown
		dropDownValueChanged = true;
		//Previous Images removed
		breedImageDiv.querySelector("img").src = "";
		//To disable the Next Button Click
		value = "";
	} else {
		dropDownValueChanged = false;
	}
};
//--------------------------------------------------------------
//FUNCTION: When the Submit Button is clicked//
const submitClick = (event) => {
	event.preventDefault();
	event.stopPropagation();
	console.log("submit clicked");
	//If the value is picked in the dropdown
	if (dropDownValueChanged) {
		//Choose dropdown value
		value = dropdown.value;
		//Display the dog image
		displayDog(value);
		//To disable the Submit Button Click
		dropDownValueChanged = false;
	}
};
//--------------------------------------------------------------
//FUNCTION: Fetches the Dog Images using Async-Await Fetch() API, based on the Breed selected//
const displayDog = async (value) => {
	//Loading GIF
	breedImageDiv.querySelector("img").src =
		"https://media.giphy.com/media/y1ZBcOGOOtlpC/giphy.gif";
	//Fetch Images
	const response = await fetch(
		`https://dog.ceo/api/breed/${value}/images/random`
	);
	const data = await response.json();
	const imageUrl = data.message;
	/*SetTimeout is used so that the loading animation is removed and 
	dog image is displayed after the dog images are fetched in the 
	above Fetch() API using async-await.
	SetTimeout will execute after 400ms after the the images are fetched above.*/
	//Loading GIF removed & Dog Image is displayed
	setTimeout(() => {
		breedImageDiv.querySelector("img").remove();
		const img = document.createElement("img");
		img.src = imageUrl;
		breedImageDiv.appendChild(img);
	}, 400);
};
//--------------------------------------------------------------
//FUNCTION: Displays next random Dog Image of same breed//
const nextClick = (event) => {
	event.stopPropagation();
	event.preventDefault();
	console.log("next clicked");
	//If the value is picked in the dropdown
	if (value !== "") {
		displayDog(value);
	}
};
//--------------------------------------------------------------
//FUNCTION: Event Listeners//
//Window loads when the DOM is ready.
//Document loads before the DOM is ready.
document.onload = fetchBreeds();
//Dropdown value is picked
dropdown.onchange = changeValue;
//Submit Button is clicked
submit.onclick = submitClick;
//Next Button is clicked
next.onclick = nextClick;
//--------------------------------------------------------------
