import { useEffect, useState } from "react";
import "./SortingVisualizer.css";
import {mergeSort, quickSort} from '../SortingAlgos/SortingAlgos';

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


export function SortingVisualizer() {

    //Array to be sorted
    const [arr, setArr] = useState([]);
    const [unsortedArr, setUnsortedArr] = useState([]);

    //Reset array on load
    useEffect( () => {
        newArray();
    }, []);

    //Generate new array
    let newArray = () => {
        const arr = [];
        for(let i = 0; i < LEN; ++i){
            arr.push(randomIntFromInterval(MAX, MIN)); //Random number from range MIN to MAX
            //arr.push(2*LEN-i);
        }
        setArr(arr);
        setUnsortedArr(arr);
    }

    const changeColour = (animations, arrayBars, setColPrimary, i) => {
        const [i_barOne, i_barTwo] = animations[i];
        const barOneStyle = arrayBars[i_barOne].style;
        const barTwoStyle = arrayBars[i_barTwo].style;
        const color = setColPrimary ?  PRIMARY_COLOR : SECONDARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS + 1000);
    }

    const changeBarHeight = (i_bar, newHeight, arrayBars) => {
        const barOneStyle = arrayBars[i_bar].style;
        barOneStyle.height = `${newHeight/2}px`;
    }

    const handleMergeSort = () => {
        const animations = [];
        const sorted = mergeSort(arr, animations);

        //animations
        for(let i = 0; i<animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColourChange = i%3 !== 2; //Don't change colour for every third entry (index 2)
            if(isColourChange) {
                const setColPrimary = i % 3 === 0 ? false : true; //Change colour to secondary if first element else primary colour
                changeColour(animations, arrayBars, setColPrimary, i);
            }
            else {
                setTimeout( () => {
                    const [i_barOne, newHeight] = animations[i];
                    changeBarHeight(i_barOne, newHeight, arrayBars);
                }, i* ANIMATION_SPEED_MS + 1000);
            }
        }

        setTimeout( () => {
            setArr(sorted);
            console.log(isSorted(sorted, unsortedArr));
        }, animations.length*ANIMATION_SPEED_MS + 1000);

    }
    
    const handleQuickSort = () => {
        const animations = [];
        const sorted = quickSort(arr, animations);

        //animations
        let setColPrimary = true;
        for(let i = 0; i<animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColourChange = animations[i].length !== 4;
            if(isColourChange) {
                setColPrimary = !setColPrimary;
                changeColour(animations, arrayBars, setColPrimary, i);
            }
            else {
                setTimeout( () => {
                    const [i_barOne, newHeightOne, i_barTwo, newHeightTwo] = animations[i];
                    changeBarHeight(i_barOne, newHeightOne, arrayBars);
                    changeBarHeight(i_barTwo, newHeightTwo, arrayBars);
                }, i* ANIMATION_SPEED_MS + 1000);
            }
        }

        setTimeout( () => {
            setArr(sorted);
            console.log(isSorted(sorted, unsortedArr));
        }, animations.length*ANIMATION_SPEED_MS + 1000);
    }
    
    const heapSort = () => {
    }
    
    const insertionSort = () => {
    }

    const selectionSort = () => {

    }

    const bubbleSort = () => {

    }

    const testSorting = () => {
        for (let i = 0; i < 100; i++) {
            const array = [];
            const length = randomIntFromInterval(1000, 1); //Random number from range 1000 to 1
            for (let j = 0; j < length; j++) {
              array.push(randomIntFromInterval(-1000, 1000));
            }
            const sorted = [];

            const merge_sorted = mergeSort(array.slice());
            sorted.push(merge_sorted);
    
            const quick_sorted = quickSort(array.slice());
            sorted.push(quick_sorted);

            for (let k = 0; k < sorted.length; k++) {
                if(!isSorted(sorted[k], array)) return false;
            }
          }

        return true;
    }

    const isSorted = (sorted, unsorted) => {
        
        const js_sorted = unsorted.slice().sort((a,b) => a-b);

        if (js_sorted.length !== sorted.length) return false;
            for(let i = 0; i < js_sorted.length; i++){
                if (js_sorted[i] !== sorted[i]) {
                    return false;
            }
        }


        return true;
    }

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
                <button onClick={() => heapSort()}>Heap Sort</button>
                <button onClick={() => bubbleSort()}>Bubble Sort</button>
                <button onClick={() => selectionSort()}>Selection Sort</button>
                <button onClick={() => insertionSort()}>Insertion Sort</button>
                <button onClick={() => console.log(testSorting())}>Test Sorting</button>
            </div>
        </div>
    );
}

