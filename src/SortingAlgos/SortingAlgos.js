//Returns sorted array using merge sort O(nlogn) time and O(n) space
//Merge Sort function with parameters for array and boolean to determine ascending or descending order 
//Animations list is a list of triplets [(index, index), (index, index), (index, value)] for indicies that were compared and value that was used to overwrite the index
export function mergeSort(arr, animations=[], ascending=true){
    return mergeSortHelper(arr.slice(), 0, arr.length-1, animations, ascending);
}

function mergeSortHelper(arr, start, end, animations, ascending=true) {
    let middle = Math.floor((start+end)/2); //split the array in half
    
    //Start and end indicies of the two half-arrays
    const first_half_start = start;
    const first_half_end = middle;
    const second_half_start = middle+1;
    const second_half_end = end;
    
    //Shallow copy of original array for first half
    let sorted_first_half = arr.slice()
    let sorted_second_half = arr.slice();
    if(first_half_end - first_half_start > 0){
        sorted_first_half = mergeSortHelper(arr, first_half_start, first_half_end, animations, ascending); //sort the first half recursively and update first half
    }
    if(second_half_end - second_half_start > 0){
        sorted_second_half = mergeSortHelper(arr, second_half_start, second_half_end, animations, ascending); //sort the second half recursively and update second half
    }
    
    const sorted = arr.slice(); //Sorted Array
    let i = first_half_start; //Pointers to compare each element in sorted half-arrays
    let j = second_half_start;
    let k = i; //Pointer to update correct position in sorted array

    while(i<=first_half_end && j<=second_half_end){
        animations.push([i,j]); //push once to change colour
        animations.push([i,j]); //push second time to revert colour
        if((sorted_first_half[i] > sorted_second_half[j] && ascending) || (sorted_first_half[i] <= sorted_second_half[j] && !ascending)) { //push back values into sorted array as appropriate and increment pointers
            animations.push([k, sorted_second_half[j]]); 
            sorted[k++] = sorted_second_half[j++]; //update sorted array and increment k and j
        }
        else{
            animations.push([k, sorted_first_half[i]]); //update the value at k in sorted array with value at i
            sorted[k++] = sorted_first_half[i++]; 
        }
    }
    
    while(j <= second_half_end) { //add remaining elements from second half
        animations.push([j, j]);    //push once to change colour
        animations.push([j, j]);    //push second time to revert colour
        animations.push([k, sorted_second_half[j]]);
        sorted[k++] = sorted_second_half[j++];
    }
    while(i <= first_half_end) { //add remaining elements from first half
        animations.push([i, i]);    //push once to change colour
        animations.push([i, i]);    //push second time to revert colour
        animations.push([k, sorted_first_half[i]]);
        sorted[k++] = sorted_first_half[i++];
    }
    return sorted;
}


/*
Quick Sort Implementation:
-choose middle element as pivot and swap with first
for ascending order (same algorithm for descending, but high and low are reversed):
-low starts at beginning and high starts at end
-move low pointer first
-swap with high pointer after cross
*/
//Quicksort function O(nlogn) time and O(logn) space
export function quickSort(unsorted, animations = [], ascending = true) {
    const sorted = unsorted.slice();
	quickSortHelper(sorted, 0, sorted.length, animations, ascending);
	return sorted;
}

//quick sort helper functions:
const swap = ( (arr, i, j, animations) => {
    if (i === j && i < arr.length) return;

    animations.push([i,j]); //push once to change colour
    animations.push([i,j]); //push second time to revert colour
    animations.push([i, arr[j], j, arr[i]]);

    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
});

const quickSortHelper = ( (unsorted, start, end, animations, ascending) => {
    //start is (start index) of subsection and end is (end index + 1)
    const size = end - start;
	if (size > 1) {
        const middle = Math.floor((start + end) / 2);
		const pivot = unsorted[middle]; //select pivot
		swap(unsorted, start, middle, animations); //move pivot to front
        animations.push([start, 'green', true]); //Set pivot to green
		let i = start + 1; //select low pointer (ascending) / high (descending)
		let j = end-1; //select high pointer (ascending) / low (descending)
		while (true) { //cross eventually happens, so we don't ever have to change this boolean
            while(i<=j && ((ascending && unsorted[i]<=pivot) || (!ascending && unsorted[i] >= pivot))){ //increment i 
                animations.push([i,i]);     //push once to change colour
                animations.push([i,i]);     //push second time to revert colour
                ++i;
            }
            while(i<=j && ((ascending && unsorted[j] >= pivot) || (!ascending && unsorted[j] <= pivot))){ //if no cross, decrement j
                animations.push([j,j]);     //push once to change colour
                animations.push([j,j]);     //push second time to revert colour
                --j;
            }
			if (i > j) { //a cross happened
                animations.push([start, 'green', false]); //Reset pivot from green
                swap(unsorted, start, j, animations); //swap pivot with j
                quickSortHelper(unsorted, start, j, animations, ascending); //recursive call to sort subcollections in 0(1) memory
				quickSortHelper(unsorted, j + 1, end, animations, ascending);
				return; //exit the function to not loop infinitely
			}
			else { //swap high and low if no cross 
				swap(unsorted, i, j, animations);
                i++;
                j--;
			}
		}
	}
});



//Insertion Sort O(n^2) time and O(1) space complexity
export function insertionSort(unsorted, animations=[], ascending=true){
    const sorted = [];
    if(unsorted.length){ //check if unsorted list empty
        sorted.push(unsorted[0]); //start sorted with single value
        for(let i=1; i<unsorted.length; ++i) { //traverse through array left to right
            animations.push([i, 'green', true]); //Set green
            let j=0;
            while(j<sorted.length && ((unsorted[i] > sorted[j] && ascending) || (unsorted[i] < sorted[j] && !ascending))) { //Find location in previous values to insert i
                animations.push([j, 'red', true]); //Set red
                animations.push([j, 'red', false]); //Reset red
                ++j;
            }

            sorted.splice(j, 0, unsorted[i]); //insert i in correct location
            animations.push([j, sorted[j]]);
            for(let k=j+1; k<sorted.length; ++k){ //add the position of remaining bars to shift the greater bars right
                animations[animations.length-1].push(k);
                animations[animations.length-1].push(sorted[k]);
            }
            animations.push([i, 'green', false]); //Reset green
        }
    }
    return sorted;
}

//Selection Sort O(n^2) time and O(1) space complexity
export function selectionSort(unsorted, animations=[], ascending=true) {
    const sorted = unsorted.slice();
    if(sorted.length) {
        let min = Infinity, indexMin = 0;
        const startIndex = ascending ? 0 : sorted.length - 1;
        const counter = ascending ? 1 : -1;
        const jMin = ascending ? 0 : sorted.length + 1;

        for(let i = startIndex; i !== sorted.length - startIndex - 1; i += counter) {
            animations.push([i, 'green', true]); //Change to green
            min = Infinity;
            indexMin = startIndex;
            for(let j=i; j !== sorted.length - jMin; j += counter) {
                if(j!== i){
                    animations.push([j, 'red', true]);
                    animations.push([j, 'red', false]);
                }
                if (sorted[j] < min) {
                    min = sorted[j]; 
                    indexMin = j;
                }
            }
            animations.push([i, 'green', false]); //Revert from green
            if (indexMin !== i) {
                sorted[indexMin] = sorted[i];
                sorted[i] = min;
                animations.push([indexMin, sorted[indexMin], i, min]);
            }
            
        }
    }
    return sorted;
}

//https://www.geeksforgeeks.org/bubble-sort/
//Bubble Sort O(n^2) time and O(1) space complexity
export function bubbleSort(unsorted, animations=[], ascending=true) {
    const sorted = unsorted.slice();
    const end = sorted.length-1; 
    for(let i=0; i < end; i++){
        for(let j=0; j < end-i; j++){
            const expression = ascending ? sorted[j] > sorted[j+1] : sorted[j] < sorted[j+1];
            if(expression){
                swap(sorted, j, j+1, animations);
            }
        }
    }
    return sorted;
}


//https://big-o.io/algorithms/comparison/heapsort/
//Heap Sort (improved selection sort) O(n logn) time and O(1) space complexity <- algorithm can be done in O(1) space complexity but need O(n) space complexity to build heap
export function heapSort(unsorted, animations=[], ascending=true){
    const sorted = unsorted.slice();
    let size = sorted.length;

    // build heapSort (rearrange array)
    for (let i = Math.floor(size / 2 - 1); i >= 0; i--) {
        animations.push([i,i]);
        animations.push([i,i]);
        heapify(sorted, size, i, animations, ascending);
    }

    // one by one extract an element from heapSort
    for (let i = size - 1; i >= 0; i--) {
        animations.push([i,i]);
        animations.push([i,i]);
        // move current root to end
        swap(sorted, 0, i, animations);

        // call max heapify on the reduced heapSort
        heapify(sorted, i, 0, animations, ascending);
    }

    return sorted;
}

// to heapify a subtree rooted with node i which is an index in array
// O(n) space complexity to build heap
// min heap
const heapify = (array, size, i, animations, ascending) => {

    let max_min = i;
    let left = 2*i + 1;
    let right = 2*i + 2;
    
    let expression = ascending ? array[left] > array[max_min] : array[left] < array[max_min];
    
    // if left child is larger than root and ascending or...
    if(left < size && expression) max_min = left;
    
    expression = ascending ? array[right] > array[max_min] : array[right] < array[max_min];
    
    // if right child is larger than max_min and ascending or...
    if (right < size && expression) max_min = right;
    
    // if max_min is not root
    if (max_min !== i) {
        swap(array, i, max_min, animations);
        // recursively heapify the affected sub-tree
        heapify(array, size, max_min, animations, ascending);
    }
}