import { useEffect, useState } from "react";
import "./SortingVisualizer.css";
import {mergeSort, quickSort} from '../SortingAlgos/SortingAlgos';

//Animation speed
const ANIMATION_SPEED_MS = 1;

//Max and min values in array
const MAX = 1000;
const MIN = 100;
//Number of values in array
const LEN = 300;

//Main colour of array bars
const PRIMARY_COLOR = 'black';

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

    //Reset array
    let newArray = () => {
        const arr = [];
        for(let i = 0; i < LEN; ++i){
            arr.push(Math.floor(Math.random() * (MAX-MIN+1) + MIN)); //Random number from range MIN to MAX
            //arr.push(2*LEN-i);
        }
        setArr(arr);
        setUnsortedArr(arr);
    }

    const handleMergeSort = () => {
        const animations = [];
        const sorted = mergeSort(arr, animations);

        for(let i = 0; i<animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColourChange = i%3 !== 2; //Don't change colour for second entry
            if(isColourChange) {
                const [i_barOne, i_barTwo] = animations[i];
                const barOneStyle = arrayBars[i_barOne].style;
                const barTwoStyle = arrayBars[i_barTwo].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR; //Change colour to secondary if first element else primary colour
                setTimeout(() => {
                  barOneStyle.backgroundColor = color;
                  barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                setTimeout( () => {
                    const [i_barOne, newHeight] = animations[i];
                    const barOneStyle = arrayBars[i_barOne].style;
                    barOneStyle.height = `${newHeight/2}px`;
                }, i* ANIMATION_SPEED_MS);
            }
        }

        setTimeout( () => {
            setArr(sorted);
        }, animations.length*ANIMATION_SPEED_MS);

    }
    
    const handleQuickSort = () => {
        const animations = [];
        const sorted = quickSort(arr, animations);


        console.log(sorted, arr);
    }
    
    const heapSort = () => {
    }
    
    const insertionSort = () => {
    }

    const selectionSort = () => {

    }

    const bubbleSort = () => {

    }

    const testSorting = (arr) => {
        const js_sorted = arr.slice().sort((a, b) => a - b);

        const sorted = [];
        
        const merge_sorted = mergeSort(arr);
        sorted.push(merge_sorted);

        const quick_sorted = quickSort(arr);
        sorted.push(quick_sorted);

        for (let i = 0; i < sorted.length; i++) {
            if (js_sorted.length !== sorted[i].length) return false;
            for(let j = 0; j < js_sorted.length; j++){
                if (js_sorted[j] !== sorted[i][j]) {
                    return false;
                }
            }

        }

        return true;
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
                <button onClick={() => console.log(testSorting(unsortedArr))}>Test Sorting</button>
            </div>
        </div>
    );
}

