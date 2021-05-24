import { useEffect, useState } from "react";
import "./SortingVisualizer.css";
import {mergeSort, quickSort, insertionSort, selectionSort, bubbleSort, heapSort} from '../SortingAlgos/SortingAlgos';
import {Popup} from './Popup';
import {ProgressBar} from './ProgressBar';

//Animation speed
//const ANIMATION_SPEED_MS = 0.01; 

//Max and min values in array
const MAX = 1000;
const MIN = 10;
//Number of values in array
const MIN_LEN = 15;
const MAX_LEN = 1500;

//Main colour of array bars
const PRIMARY_COLOR = 'white';

//Colour of array bars being compared in animation
const SECONDARY_COLOR = 'red';

//Third colour for pivot, insertion sort, etc.
const TERTIARY_COLOR = 'green';

const delay = 2000;

export function SortingVisualizer() {

    //Array to be sorted
    const [arr, setArr] = useState([]);
    const [unsortedArr, setUnsortedArr] = useState([]);
    const [ascending, setAscending] = useState(true);
    const [curAnimation, setCurAnimations] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [resetArray, setResetArray] = useState(false);
    
    const [numElements, setNumElements] = useState(300);
    const numElementsColour = `rgb(${17 / 99 * numElements - 85 / 33},${-2 / 3645 * Math.pow(numElements - 825, 2) + 250},${-17 / 90 * numElements + 850 / 3})` //`rgb(${17/99*numElements-85/33},${Math.exp(-4/33*numElements+2000/11)},${-17/99*numElements+8500/33})`
    const [displayedNumElements, setDisplayedNumElements] = useState(300);
    const [displayedElementsColour, setDisplayedElementsColour] = useState(numElementsColour);
    
    const [animationSpeed, setAnimationSpeed] = useState("slow"); //0.01, 0.1, 1, 2?
    const button_colour = animationSpeed === "slow" ? "#fa8072" : animationSpeed === "medium" ? "#ffa500" : "#3cb371";
    const [displayedAnimationSpeed, setDisplayedAnimationSpeed] = useState("Slow");
    const [displayedAnimationSpeedColour, setDisplayedAnimationSpeedColour] = useState(button_colour);
    
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
    const [doneButtonColour, setDoneButtonColour] = useState("white");

    //const [progress, setProgress] = useState(0);

    //const ANIMATION_SPEED_MS = animationSpeed === "slow" ? 1 : animationSpeed === "medium" ? 0.1 : 0.01;

    const determineAnimationSpeedMS = (algorithm) => {
        if(algorithm === "merge" || algorithm === "quick" || algorithm === "heap"){
            return animationSpeed === "slow" ? 1 : animationSpeed === "medium" ? 0.5 : 0.1;
        }
        else{
            return animationSpeed === "slow" ? 0.1 : animationSpeed === "medium" ? 0.05 : 0.01;
        }
    }

    //Generate array on load
    useEffect( () => {
        newArray();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //Generate new array
    const newArray = () => {
        handleResetArray(true);
        const arr = [];
        for(let i = 0; i < numElements; ++i){
            //arr.push(randomIntFromInterval(MAX, MIN)); 
            arr.push(Math.floor(Math.random() * (MAX-MIN+1) + MIN)); //Random number from range MIN to MAX
            //arr.push(2*LEN-i);
        }
        setSelectedAlgorithm("");
        setArr(arr);
        setUnsortedArr(arr);
    }

    //Change colour of array bar
    const changeColour = (animations, arrayBars, setColPrimary, i, animation_speed_ms, extra_delay=0) => {
        const [i_barOne, i_barTwo] = animations[i];
        const barOneStyle = arrayBars[i_barOne].style;
        const barTwoStyle = arrayBars[i_barTwo].style;
        const color = setColPrimary ?  PRIMARY_COLOR : SECONDARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * animation_speed_ms + extra_delay + delay);
    }

    //change height of array bar
    const changeBarHeight = (i_bar, newHeight, arrayBars) => {
        const barOneStyle = arrayBars[i_bar].style;
        barOneStyle.height = `${newHeight/10}%`
    }

    const swapBars = (animations, arrayBars, i, animation_speed_ms, extra_delay=0) => {
        setTimeout( () => {
            const [i_barOne, newHeightOne, i_barTwo, newHeightTwo] = animations[i];
            changeBarHeight(i_barOne, newHeightOne, arrayBars);
            changeBarHeight(i_barTwo, newHeightTwo, arrayBars);
        }, i* animation_speed_ms + extra_delay + delay);
    }

    const handleTriColourChange = (animations, arrayBars, i, animation_speed_ms, extra_delay=0) => {
        const [i_barOne, colour, set] = animations[i];
        const barOneStyle = arrayBars[i_barOne].style;
        if(colour === 'green'){ //change pivot to green 
            setTimeout(() => { 
                barOneStyle.backgroundColor = set ? TERTIARY_COLOR : PRIMARY_COLOR; //check if we are setting or resetting bar
            }, i * animation_speed_ms + extra_delay + delay);
        }
        else{ //change to red
            setTimeout(() => {
                barOneStyle.backgroundColor = set ? SECONDARY_COLOR : PRIMARY_COLOR; //check if we are setting or resetting bar
            }, i * animation_speed_ms + extra_delay + delay);
        }
    }

    //Set array to sorted state
    const setArraySorted = (sorted, time, animation_speed_ms, extra_delay=0) => {
        const arrayBars = document.getElementsByClassName('array-bar');
        const final_animation_speed = 2; //ms

        sorted.forEach((_, index) => {
            setTimeout(() => {
                const barStyle = arrayBars[index].style;
                barStyle.backgroundColor = TERTIARY_COLOR;
            }, time*animation_speed_ms + index*final_animation_speed + extra_delay + delay);
        });

        setTimeout( () => { //set state array to sorted array
            setArr(sorted);
            setCurAnimations(false);
            console.log(isSorted(sorted, unsortedArr));
        }, time*animation_speed_ms + sorted.length*final_animation_speed + extra_delay + delay);
    }

    //Merge Sort Function
    const handleMergeSort = () => {
        const animations = [];
        const start = new Date();
        const sorted = mergeSort(arr, animations, ascending);
        setCurAnimations(true);
        setSelectedAlgorithm("merge");
        const ANIMATION_SPEED_MS = determineAnimationSpeedMS("merge");

        //animations -- animations is grouped into trios of ([i,j], [i,j], [k, value])
        for(let i = 0; i<animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColourChange = i%3 !== 2; //Don't change colour for every third entry (index 2)
            const cur = new Date() - start;
            if(isColourChange) { //check to change colour
                const setColPrimary = i % 3 === 0 ? false : true; //Change colour to secondary if first element in trio else primary colour
                changeColour(animations, arrayBars, setColPrimary, i, ANIMATION_SPEED_MS, cur);
            }
            else { //change height
                setTimeout( () => {
                    const [i_barOne, newHeight] = animations[i];
                    changeBarHeight(i_barOne, newHeight, arrayBars);
                }, i* ANIMATION_SPEED_MS + cur + delay);
            }
        }
        setArraySorted(sorted, animations.length, ANIMATION_SPEED_MS, new Date()-start);
    }
    
    //Quick Sort Function
    const handleQuickSort = () => {
        const animations = [];
        const start = new Date();
        const sorted = quickSort(arr, animations, ascending);
        setCurAnimations(true);
        setSelectedAlgorithm("quick");
        const ANIMATION_SPEED_MS = determineAnimationSpeedMS("quick");

        //animations
        let setColPrimary = true; //switch between primary and secondary colour
        for(let i = 0; i<animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColourChange = animations[i].length === 2;
            const cur = new Date() - start;
            if(isColourChange) { //change colour of bar
                setColPrimary = !setColPrimary;
                changeColour(animations, arrayBars, setColPrimary, i, ANIMATION_SPEED_MS, cur);
            }
            else if(animations[i].length===3){ //set / reset colour of pivot
                handleTriColourChange(animations, arrayBars, i, ANIMATION_SPEED_MS, cur);
            }
            else { //swap bars
                swapBars(animations, arrayBars, i, ANIMATION_SPEED_MS, cur);
            }
        }
        setArraySorted(sorted, animations.length, ANIMATION_SPEED_MS, new Date() - start);
    }
    
    //Heap Sort Function
    const handleHeapSort = () => {
        const animations = [];
        const start = new Date();
        const sorted = heapSort(arr, animations, ascending);
        setCurAnimations(true);
        setSelectedAlgorithm("heap");

        const ANIMATION_SPEED_MS = determineAnimationSpeedMS("heap");

        //animations
        let setColPrimary = true; //switch between primary and secondary colour
        for(let i = 0; i<animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColourChange = animations[i].length === 2;
            const cur = new Date() - start;
            if(isColourChange) { //change colour of bar
                setColPrimary = !setColPrimary;
                changeColour(animations, arrayBars, setColPrimary, i, ANIMATION_SPEED_MS, cur);
            }
            else { //swap bars
                swapBars(animations, arrayBars, i, ANIMATION_SPEED_MS, cur);
            }
        }
        setArraySorted(sorted, animations.length, ANIMATION_SPEED_MS, new Date() - start);
    }
    
    //Insertion Sort Function
    const handleInsertionSort = async () => {
        const animations = [];
        const start = new Date();
        const sorted = insertionSort(arr, animations, ascending);
        setCurAnimations(true);
        setSelectedAlgorithm("insertion");
        const ANIMATION_SPEED_MS = determineAnimationSpeedMS("insertion");
        
        //animations
        for(let i = 0; i<animations.length; i++) {
            const cur = new Date() - start;
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColourChange = typeof animations[i][1] === 'string';
            if(isColourChange) { //change colour to green or red
                handleTriColourChange(animations, arrayBars, i, ANIMATION_SPEED_MS, cur);
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
                }, i* ANIMATION_SPEED_MS + cur + delay);
            }
        }

        /*
        for(let i = 0; i<animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColourChange = typeof animations[i][1] === 'string';
            
            new Promise(resolve => {
                //setTimeout(()=> updateProgress(animations.length, i), 0);
            }).then(() => {
                const cur = new Date() - start;
                if(isColourChange) { //change colour to green or red
                    handleTriColourChange(animations, arrayBars, i, ANIMATION_SPEED_MS, cur);
                }
                else {
                    setTimeout( () => {
                        for(let j=0; j<animations[i].length-1; j+=2){ //insert pivot in correct location of array and shift over all other elements 
                            const i_bar = animations[i][j];
                            const newHeight = animations[i][j+1];
                            changeBarHeight(i_bar, newHeight, arrayBars + delay);
                        }
                        /*
                        while(i < animations.length && typeof animations[i][1] !== 'string'){ //alternate method to above (more messy so not used)
                            const [i_bar, newHeight] = animations[i];
                            changeBarHeight(i_bar, newHeight, arrayBars);
                            i++;
                        }
                        i--;
                        /
                    }, i* ANIMATION_SPEED_MS + cur);
                }
            });
        }
        */
        setArraySorted(sorted, animations.length, ANIMATION_SPEED_MS, new Date() - start);
    }

    const updateProgress = (len, i) => {
        const value = Math.round(i/len*100);
        const progressBar = document.querySelector(".progress");
        progressBar.querySelector(".progress__fill").style.width = `${value}%`;
        progressBar.querySelector(".progress__text").textContent = `${value}%`;
    }

    //Selection Sort Function
    const handleSelectionSort = () => {
        const animations = [];
        const start = new Date();
        const sorted = selectionSort(arr, animations, ascending);
        setCurAnimations(true);
        setSelectedAlgorithm("selection");
        const ANIMATION_SPEED_MS = determineAnimationSpeedMS("selection");

        //animations
        for(let i = 0; i<animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColourChange = animations[i].length === 3;
            const cur = new Date() - start;
            if(isColourChange) { //change colour to green or red
                handleTriColourChange(animations, arrayBars, i, ANIMATION_SPEED_MS, cur);
            }
            else {
                swapBars(animations, arrayBars, i, ANIMATION_SPEED_MS, cur);
            }
        }

        setArraySorted(sorted, animations.length, ANIMATION_SPEED_MS, new Date() - start);
    }

    //Bubble Sort Function
    const handleBubbleSort = () => {
        const animations = [];
        const start = new Date();
        const sorted = bubbleSort(arr, animations, ascending);
        setCurAnimations(true);
        setSelectedAlgorithm("bubble");
        const ANIMATION_SPEED_MS = determineAnimationSpeedMS("bubble");

        //animations
        let setColPrimary = true; //switch between primary and secondary colour
        for(let i = 0; i<animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColourChange = animations[i].length === 2;
            const cur = new Date() - start;
            if(isColourChange) { //change colour of bar
                setColPrimary = !setColPrimary;
                changeColour(animations, arrayBars, setColPrimary, i, ANIMATION_SPEED_MS, cur);
            }
            else { //swap bars
                swapBars(animations, arrayBars, i, ANIMATION_SPEED_MS, cur);
            }
        }

        setArraySorted(sorted, animations.length, ANIMATION_SPEED_MS, new Date() - start);
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

            const merge_sorted = mergeSort(array.slice(), [], ascending); 
            sorted.push(merge_sorted);
    
            const quick_sorted = quickSort(array.slice(), [], ascending);
            sorted.push(quick_sorted);

            const insertion_sorted = insertionSort(array.slice(), [], ascending);
            sorted.push(insertion_sorted);

            const selection_sorted = selectionSort(array.slice(), [], ascending);
            sorted.push(selection_sorted);

            const bubble_sorted = bubbleSort(array.slice(), [], ascending);
            sorted.push(bubble_sorted);

            const heap_sorted = heapSort(array.slice(), [], ascending);
            sorted.push(heap_sorted);

            for (let k = 0; k < sorted.length; k++) {
                if(!isSorted(sorted[k], array)) return false;
            }
          }

        return true;
    }

    //Checks if individual array is sorted correcty
    const isSorted = (sorted, unsorted) => {
        const js_sorted = ascending ? unsorted.slice().sort((a,b) => a - b) : unsorted.slice().sort((a,b) => b - a); //sort using js sorting function
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

    const toggleAscending = () => {
        setAscending(!ascending);
    }

    const toggleSettings = () => {
        setDoneButtonColour("white");
        if(!curAnimation) {
            if(resetArray && numElements>=MIN_LEN && numElements<=MAX_LEN) {
                newArray();
                setResetArray(false);
            }
            else if (numElements<MIN_LEN || numElements>MAX_LEN){
                alert("Please ensure number of elements is between 150 and 1500");
                return;
            }
            if (settingsOpen) {
                handleResetArray(resetArray);
                setDisplayedAnimationSpeed(animationSpeed === "slow" ? "Slow" : animationSpeed === "medium" ? "Medium" : "Fast");
                setDisplayedNumElements(numElements);
                setDisplayedElementsColour(numElementsColour);
                setDisplayedAnimationSpeedColour(button_colour);
            }
            setSettingsOpen(!settingsOpen);
        }
    }

    const updateNumElements = (e) => {
        const new_len = e.target.value;
        if(new_len <= MAX_LEN && new_len !== numElements) {
            setNumElements(new_len);
            setResetArray(true);
        }
    }

    const updateAnimationSpeed = (new_speed) => {
        setAnimationSpeed(new_speed);
    }

    const toggleDoneButtonColour = (hover, colour) => {
        if (hover) {
            setDoneButtonColour(colour);
        }
        else {   
            setDoneButtonColour("white");
        }
    }

    const handleResetArray = (set=false) => {
        if(!set){
            setArr(unsortedArr); 
        }
        setSelectedAlgorithm("");
        const arrayBars = document.getElementsByClassName('array-bar');
        arr.forEach((_, index) => {
            const barStyle = arrayBars[index].style;
            barStyle.backgroundColor = PRIMARY_COLOR;
        })
    }

    const handleTestSorting = () => {
        //add loading screen
        if(testSorting()){
            alert("Testing Passed");
        }
        else{
            alert("Testing Failed");
        }
    }

    const buttonsClickable = curAnimation || unsortedArr !== arr ? "unclickable" : "";
    const resetControls = curAnimation ? "unclickable" : "";
    const selectedButtonStyle = {color:"white",backgroundColor:"#4caf50", pointerEvents:"none"};

    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <div className = 'array-container'>
                {
                arr.map((value, i) => (<div className='array-bar' key = {i} style={{backgroundColor: PRIMARY_COLOR, height:`${value/10}%`}}></div>))
                }
            </div>
            <br></br>
            <div className='button-container'>
                <div className="button-set control">
                    <h3 className="header">Controls</h3>
                    <span className={resetControls==="unclickable" ? "not-allowed-cursor" : ""}>
                        <button className={`button control-button ${resetControls}`} onClick = {() => newArray()}>New Array</button>
                        <button className={`button control-button ${resetControls}`} onClick={() => handleResetArray()}>Reset Array</button>
                        <button className={`button control-button ${resetControls}`} onClick={() => handleTestSorting()}>Test Sorting Algorithms</button>
                    </span>
                </div>
                <div className="button-set sorting">
                    <h3 className="header">Algorithms</h3>
                    <span className={buttonsClickable==="unclickable" ? "not-allowed-cursor" : ""}>
                        <button 
                            className={`button sorting-button ${selectedAlgorithm !== "merge" && buttonsClickable}`} 
                            style={selectedAlgorithm==="merge" ? selectedButtonStyle : null} 
                            onClick={() => handleMergeSort()}
                        >
                            Merge Sort
                        </button>
                        <button 
                            className={`button sorting-button ${selectedAlgorithm !== "quick" && buttonsClickable}`} 
                            style={selectedAlgorithm==="quick" ? selectedButtonStyle : null} 
                            onClick={() => handleQuickSort()}
                        >
                            Quick Sort
                        </button>
                        <button 
                            className={`button sorting-button ${selectedAlgorithm !== "heap" && buttonsClickable}`} 
                            style={selectedAlgorithm==="heap" ? selectedButtonStyle : null} 
                            onClick={() => handleHeapSort()}
                        >
                            Heap Sort
                        </button>
                        <button 
                            className={`button sorting-button ${selectedAlgorithm !== "bubble" && buttonsClickable}`} 
                            style={selectedAlgorithm==="bubble" ? selectedButtonStyle : null} 
                            onClick={() => handleBubbleSort()}
                        >
                            Bubble Sort
                        </button>
                        <button 
                            className={`button sorting-button ${selectedAlgorithm !== "selection" && buttonsClickable}`} 
                            style={selectedAlgorithm==="selection" ? selectedButtonStyle : null} 
                            onClick={() => handleSelectionSort()}
                        >
                            Selection Sort
                        </button>
                        <button 
                            className={`button sorting-button ${selectedAlgorithm !== "insertion" && buttonsClickable}`} 
                            style={selectedAlgorithm==="insertion" ? selectedButtonStyle : null} 
                            onClick={() => handleInsertionSort()}
                        >
                            Insertion Sort
                        </button>
                    </span>
                </div>
                <div className="button-set ascending-control" style={{borderColor: ascending ? "#ff00ff": "#ff00a1"}}> 
                    <h3 className="header">Sort: {ascending ? <i style={{color:"#BA55D3"}}>Ascending</i> : <i style={{color:"#C71585"}}>Descending</i>}</h3>
                    <label className="switch">
                        <input type="checkbox" onClick={()=>toggleAscending()}/>
                        <span className="slider-sortOrder round"></span>
                    </label>
                </div>
                <div className="button-set speed-elements" style={{borderImage: `linear-gradient(45deg, ${displayedElementsColour}, ${displayedAnimationSpeedColour}) 1`}}>
                    <h3 className="header">Speed: <i style={{color:displayedAnimationSpeedColour}}>{displayedAnimationSpeed}</i></h3>
                    <h3 className="header">Elements: <i style={{color:displayedElementsColour}}>{displayedNumElements}</i></h3>
                </div>
                <div className="button-set settings">
                    <h3 className="header">Settings</h3>
                    <button onClick={()=>toggleSettings()} className="cog"><span className="fa fa-gears fa-2x"></span></button>
                </div>
            </div>
            {settingsOpen && <Popup
                border_colour = {button_colour}
                content={<div>
                            <h3>Animation Speed</h3>
                            <div className="popup-row">
                                <div className="popup-column column-triple">
                                    <button 
                                        className='button slow-button'
                                        onClick={() => updateAnimationSpeed("slow")}
                                        style={animationSpeed === "slow" ? { backgroundColor: "#fa8072", color: "white", pointerEvents: "none" } : null}
                                    >
                                        Slow
                                    </button>
                                </div>
                                <div className="popup-column column-triple">
                                    <button 
                                        className='button medium-button'
                                        onClick={() => updateAnimationSpeed("medium")}
                                        style={animationSpeed === "medium" ? { backgroundColor: "#ffa500", color: "white", pointerEvents: "none" } : null}
                                    >
                                        Medium
                                    </button>
                                </div>
                                <div className="popup-column column-triple">
                                    <button 
                                        className='button fast-button' 
                                        onClick={() => updateAnimationSpeed("fast")}
                                        style={animationSpeed === "fast" ? { backgroundColor: "#3cb371", color: "white", pointerEvents: "none"} : null}
                                    >
                                        Fast
                                    </button>
                                </div>
                            </div>
                            <br></br>
                            <h3>Number of Elements</h3>
                            <div className="popup-row">
                                <div className="popup-column column-double">
                                    <div className="slidecontainer">
                                        <input type="range" min="15" max="1500" value={numElements} className="slider" id="myRange" onChange={(e) => updateNumElements(e)}/>
                                    </div>
                                </div>
                                <div className="popup-column column-double">
                                    <span>
                                        Value: 
                                        <input  className="numElements-input" 
                                                type="number" 
                                                min="15" 
                                                max="1500" 
                                                style={{color:numElementsColour}} 
                                                value={numElements} 
                                                onChange={(e)=>updateNumElements(e)}
                                        />
                                    </span>
                                </div>
                            </div>
                            <div className="popup-row">
                                <div className="popup-column">
                                    <div>150</div>
                                </div>
                                <div className="popup-column fifty">
                                    <div>1500</div>
                                </div>
                            </div>
                            <br></br>
                            <div>
                            <button className="button done-button"
                                    onClick={() => toggleSettings()}
                                    style={{border: `2px solid ${button_colour}`, backgroundColor:doneButtonColour}}
                                    onMouseEnter={() => toggleDoneButtonColour(true, button_colour)}
                                    onMouseLeave={() => toggleDoneButtonColour(false, button_colour)}>
                                Done
                            </button>
                            </div>
                    </div>}
            />}
            {/*progress >= 0 && progress < 1000 && <ProgressBar progress={progress}/>*/}
        </div>
    );
}

