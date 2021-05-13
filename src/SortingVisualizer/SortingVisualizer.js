import { useEffect, useState } from "react";
import "./SortingVisualizer.css";
import {mergeSort, quickSort, insertionSort, selectionSort, bubbleSort, heapSort} from '../SortingAlgos/SortingAlgos';

//Animation speed
const ANIMATION_SPEED_MS = 1; 

//Max and min values in array
const MAX = 1000;
const MIN = 10;
//Number of values in array
const LEN = 300 //1500;

//Main colour of array bars
const PRIMARY_COLOR = 'white';

//Colour of array bars being compared in animation
const SECONDARY_COLOR = 'red';

//Third colour for pivot, insertion sort, etc.
const TERTIARY_COLOR = 'green';

//Delay to start animations
const delay = 3000;


export function SortingVisualizer() {

    //Array to be sorted
    const [arr, setArr] = useState([]);
    const [unsortedArr, setUnsortedArr] = useState([]);

    //Generate array on load
    useEffect( () => {
        newArray();
    }, []);

    //Generate new array
    const newArray = () => {
        const arr = [];
        for(let i = 0; i < LEN; ++i){
            //arr.push(randomIntFromInterval(MAX, MIN)); 
            arr.push(Math.floor(Math.random() * (MAX-MIN+1) + MIN)); //Random number from range MIN to MAX
            
            //arr.push(2*LEN-i);
        }
        setArr(arr);
        setUnsortedArr(arr);
    }

    //Change colour of array bar
    const changeColour = (animations, arrayBars, setColPrimary, i) => {
        const [i_barOne, i_barTwo] = animations[i];
        const barOneStyle = arrayBars[i_barOne].style;
        const barTwoStyle = arrayBars[i_barTwo].style;
        const color = setColPrimary ?  PRIMARY_COLOR : SECONDARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS + delay);
    }

    //change height of array bar
    const changeBarHeight = (i_bar, newHeight, arrayBars) => {
        const barOneStyle = arrayBars[i_bar].style;
        barOneStyle.height = `${newHeight/2}px`;
    }

    const swapBars = (animations, arrayBars, i) => {
        setTimeout( () => {
            const [i_barOne, newHeightOne, i_barTwo, newHeightTwo] = animations[i];
            changeBarHeight(i_barOne, newHeightOne, arrayBars);
            changeBarHeight(i_barTwo, newHeightTwo, arrayBars);
        }, i* ANIMATION_SPEED_MS + delay);
    }

    //Set array to sorted state
    const setArraySorted = (sorted, time) => {
        setTimeout( () => { //set state array to sorted array
            setArr(sorted);
            console.log(isSorted(sorted, unsortedArr));
        }, time*ANIMATION_SPEED_MS + delay);
    }

    //Merge Sort Function
    const handleMergeSort = () => {
        const animations = [];
        const sorted = mergeSort(arr, animations);

        //animations -- animations is grouped into trios of ([i,j], [i,j], [k, value])
        for(let i = 0; i<animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColourChange = i%3 !== 2; //Don't change colour for every third entry (index 2)
            if(isColourChange) { //check to change colour
                const setColPrimary = i % 3 === 0 ? false : true; //Change colour to secondary if first element in trio else primary colour
                changeColour(animations, arrayBars, setColPrimary, i);
            }
            else { //change height
                setTimeout( () => {
                    const [i_barOne, newHeight] = animations[i];
                    changeBarHeight(i_barOne, newHeight, arrayBars);
                }, i* ANIMATION_SPEED_MS + delay);
            }
        }
        setArraySorted(sorted, animations.length);
    }
    
    //Quick Sort Function
    const handleQuickSort = () => {
        const animations = [];
        const sorted = quickSort(arr, animations);

        //animations
        let setColPrimary = true; //switch between primary and secondary colour
        for(let i = 0; i<animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColourChange = animations[i].length === 2;
            if(isColourChange) { //change colour of bar
                setColPrimary = !setColPrimary;
                changeColour(animations, arrayBars, setColPrimary, i);
            }
            else if(animations[i].length===3){ //set / reset colour of pivot
                handleTriColourChange(animations, arrayBars, i);
            }
            else { //swap bars
                swapBars(animations, arrayBars, i);
            }
        }
        setArraySorted(sorted, animations.length);
    }
    
    //Heap Sort Function
    const handleHeapSort = () => {
        const animations = [];
        const sorted = heapSort(arr, animations);

        //animations
        let setColPrimary = true; //switch between primary and secondary colour
        for(let i = 0; i<animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColourChange = animations[i].length === 2;
            if(isColourChange) { //change colour of bar
                setColPrimary = !setColPrimary;
                changeColour(animations, arrayBars, setColPrimary, i);
            }
            else { //swap bars
                swapBars(animations, arrayBars, i);
            }
        }
        setArraySorted(sorted, animations.length);
    }

    const handleTriColourChange = (animations, arrayBars, i) => {
        const [i_barOne, colour, set] = animations[i];
        const barOneStyle = arrayBars[i_barOne].style;
        if(colour === 'green'){ //change pivot to green 
            setTimeout(() => { 
                barOneStyle.backgroundColor = set ? TERTIARY_COLOR : PRIMARY_COLOR; //check if we are setting or resetting bar
            }, i * ANIMATION_SPEED_MS + delay);
        }
        else{ //change to red
            setTimeout(() => {
                barOneStyle.backgroundColor = set ? SECONDARY_COLOR : PRIMARY_COLOR; //check if we are setting or resetting bar
            }, i * ANIMATION_SPEED_MS + delay);
        }
    }
    
    //Insertion Sort Function
    const handleInsertionSort = () => {
        const animations = [];
        const sorted = insertionSort(arr, animations);

        //animations
        for(let i = 0; i<animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColourChange = typeof animations[i][1] === 'string';
            if(isColourChange) { //change colour to green or red
                handleTriColourChange(animations, arrayBars, i);
            }
            else {
                setTimeout( () => {
                    for(let j=0; j<animations[i].length-1; j+=2){ //insert pivot in correct location of array and shift over all other elements 
                        const i_bar = animations[i][j];
                        const newHeight = animations[i][j+1];
                        changeBarHeight(i_bar, newHeight, arrayBars);
                    }
                    /*
                    while(i < animations.length && typeof animations[i][1] !== 'string'){ //alternate method to above (more messy so not used)
                        const [i_bar, newHeight] = animations[i];
                        changeBarHeight(i_bar, newHeight, arrayBars);
                        i++;
                    }
                    i--;
                    */
                }, i* ANIMATION_SPEED_MS + delay);
            }
        }
        setArraySorted(sorted, animations.length);
    }

    //Selection Sort Function
    const handleSelectionSort = () => {
        const animations = [];
        const sorted = selectionSort(arr, animations);

        //animations
        for(let i = 0; i<animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColourChange = animations[i].length === 3;
            if(isColourChange) { //change colour to green or red
                handleTriColourChange(animations, arrayBars, i);
            }
            else {
                swapBars(animations, arrayBars, i);
            }
        }

        setArraySorted(sorted, animations.length);
    }

    //Bubble Sort Function
    const handleBubbleSort = () => {
        const animations = [];
        const sorted = bubbleSort(arr, animations);

        //animations
        let setColPrimary = true; //switch between primary and secondary colour
        for(let i = 0; i<animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColourChange = animations[i].length === 2;
            if(isColourChange) { //change colour of bar
                setColPrimary = !setColPrimary;
                changeColour(animations, arrayBars, setColPrimary, i);
            }
            else { //swap bars
                swapBars(animations, arrayBars, i);
            }
        }

        setArraySorted(sorted, animations.length);
    }

    //Tests sorting algorithms
    const testSorting = () => {
        for (let i = 0; i < 100; i++) { //generate 100 array
            const array = [];
            const length = randomIntFromInterval(1000, 1); //Random length between 1000 and 1
            for (let j = 0; j < length; j++) {
              array.push(randomIntFromInterval(-1000, 1000)); //Random value between -1000 and 1000
            }

            //Append all sorting functions and compare them to the correct sorted array using the js sort function individually
            const sorted = [];

            const merge_sorted = mergeSort(array.slice()); 
            sorted.push(merge_sorted);
    
            const quick_sorted = quickSort(array.slice());
            sorted.push(quick_sorted);

            const insertion_sorted = insertionSort(array.slice());
            sorted.push(insertion_sorted);

            const selection_sorted = selectionSort(array.slice());
            sorted.push(selection_sorted);

            const bubble_sorted = bubbleSort(array.slice());
            sorted.push(bubble_sorted);

            const heap_sorted = heapSort(array.slice());
            sorted.push(heap_sorted);

            for (let k = 0; k < sorted.length; k++) {
                if(!isSorted(sorted[k], array)) return false;
            }
          }

        return true;
    }

    //Checks if individual array is sorted correcty
    const isSorted = (sorted, unsorted) => {
        const js_sorted = unsorted.slice().sort((a,b) => a - b); //sort using js sorting function
        if (js_sorted.length !== sorted.length) return false;
            for(let i = 0; i < js_sorted.length; i++){
                if (js_sorted[i] !== sorted[i]) {
                    return false;
            }
        }

        return true;
    }

    //Returns random integer from range (min, max)
    const randomIntFromInterval = (max, min) => {
        return Math.floor(Math.random() * (max-min+1) + min);
    }

    return (
        <div>
            <div className = 'array-container'>
                {
                arr.map((value, i) => (<div className='array-bar' key = {i} style={{backgroundColor: PRIMARY_COLOR, height:`${value/2}px`}}></div>))
                }
            </div>
            <br></br>
            <div className='button-container'>
                <button onClick = {() => newArray()}>New Array</button>
                <button onClick={() => setArr(unsortedArr)}>Reset Array</button>
                <button onClick={() => handleMergeSort()}>Merge Sort</button>
                <button onClick={() => handleQuickSort()}>Quick Sort</button>
                <button onClick={() => handleHeapSort()}>Heap Sort</button>
                <button onClick={() => handleBubbleSort()}>Bubble Sort</button>
                <button onClick={() => handleSelectionSort()}>Selection Sort</button>
                <button onClick={() => handleInsertionSort()}>Insertion Sort</button>
                <button onClick={() => console.log(testSorting())}>Test Sorting</button>
            </div>
        </div>
    );
}

