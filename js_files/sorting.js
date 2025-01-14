// swap function util for sorting algorithms takes input of 2 DOM elements with .style.height feature
function swap(el1, el2) {
    console.log('In swap()');
    
    let temp = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = temp;
    
}
function swapnum(el1, el2) {
    console.log('In swap()');
    
    let temp = el1.innerHTML;
    el1.innerHTML = el2.innerHTML;
    el2.innerHTML = temp;
    
}


// Disables sorting buttons used in conjunction with enable, so that we can disable during sorting and enable buttons after it
function disableSortingBtn(){
    document.querySelector(".bubbleSort").disabled = true;
    document.querySelector(".insertionSort").disabled = true;
    document.querySelector(".mergeSort").disabled = true;
    document.querySelector(".quickSort").disabled = true;
    document.querySelector(".selectionSort").disabled = true;
    document.querySelector(".shellSort").disabled = true;
}

// Enables sorting buttons used in conjunction with disable
function enableSortingBtn(){
    document.querySelector(".bubbleSort").disabled = false;
    document.querySelector(".insertionSort").disabled = false;
    document.querySelector(".mergeSort").disabled = false;
    document.querySelector(".quickSort").disabled = false;
    document.querySelector(".selectionSort").disabled = false;
    document.querySelector(".shellSort").disabled = false;
}

// Disables size slider used in conjunction with enable, so that we can disable during sorting and enable buttons after it
function disableSizeSlider(){
    document.querySelector("#arr_sz").disabled = true;
}

// Enables size slider used in conjunction with disable
function enableSizeSlider(){
    document.querySelector("#arr_sz").disabled = false;
}

// Disables newArray buttons used in conjunction with enable, so that we can disable during sorting and enable buttons after it
function disableNewArrayBtn(){
    document.querySelector(".newArray").disabled = true;
}

// Enables newArray buttons used in conjunction with disable
function enableNewArrayBtn(){
    document.querySelector(".newArray").disabled = false;
}

// Selecting size slider from DOM
let arraySize = document.querySelector('#arr_sz');

// Event listener to update the bars on the UI
arraySize.addEventListener('input', function(){
    console.log(arraySize.value, typeof(arraySize.value));
    createNewArray(parseInt(arraySize.value));
});

// Default input for waitforme function (260ms)
let delay = 260;

// Selecting speed slider from DOM
let delayElement = document.querySelector('#speed_input');

// Event listener to update delay time 
delayElement.addEventListener('input', function(){
    console.log(delayElement.value, typeof(delayElement.value));
    delay = 320 - parseInt(delayElement.value);
});


// Creating array to store randomly generated numbers
let array = [];

// Call to display bars right when you visit the site
createNewArray();

// To create new array input size of array
function createNewArray(noOfBars = 20) {
    // calling helper function to delete old bars from dom
    deleteChild();

    // creating an array of random numbers 
    array = [];
    for (let i = 0; i < noOfBars; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    console.log(array);

    // select the div #bars element
    const bars = document.querySelector("#bars");

    // create multiple element div using loop and adding class 'bar col'
    for (let i = 0; i < noOfBars; i++) {
        const bar = document.createElement("div");
        bar.style.height = `${array[i]*2}px`;
        bar.classList.add('bar');
        // bar.classList.add("bar-label")
        bar.classList.add('flex-item');
        bar.classList.add(`barNo${i}`);
        const label=document.createElement("div");
        label.classList.add("bar-label");
        label.innerText=array[i]
        bar.append(label);
        bars.appendChild(bar);
    }
}

// Helper function to delete all the previous bars so that new can be added
function deleteChild() {
    const bar = document.querySelector("#bars");
    bar.innerHTML = '';
}

// Selecting newarray button from DOM and adding eventlistener
const newArray = document.querySelector(".newArray");
newArray.addEventListener("click", function(){
    console.log("From newArray " + arraySize.value);
    console.log("From newArray " + delay);
    enableSortingBtn();
    enableSizeSlider();
    createNewArray(arraySize.value);
});

// Function to update the max attribute of the input element based on screen size
function updateMaxAttributeValue() {
    const arrSizeInput = document.getElementById("arr_sz");
    if (window.innerWidth < 769) {
        arrSizeInput.setAttribute("max", "35");
    } else {
        arrSizeInput.setAttribute("max", "50");
    }
}

// Call the function initially to set the correct max value
updateMaxAttributeValue();

// Event listener to update max value when window is resized
window.addEventListener("resize", updateMaxAttributeValue);



let isPaused;
let pauseElement = document.querySelector('.pause');
pauseElement.addEventListener("click",function(){
    if(isPaused) {
        isPaused=false;
    } else {
        isPaused=true;
    }
});
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function performAction() {
    if (isPaused){
        await waitForResume();
    }
    await wait(delay);
    console.log('Action completed');
}

function pauseAction() {
  isPaused = true;
  console.log('Action paused');
}

function resumeAction() {
  isPaused = false;
  console.log('Action resumed');
}

function waitForResume() {
  return new Promise(resolve => {
    const checkPause = () => {
      if (!isPaused) {
        resolve();
      } else {
        setTimeout(checkPause, 0); // Check every 100 milliseconds for resume
      }
    };
    checkPause();
  });
}
