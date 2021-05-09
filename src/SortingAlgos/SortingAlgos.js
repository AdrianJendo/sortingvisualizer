//Returns sorted array using merge sort O(nlogn) time and O(n) space
//Merge Sort function with parameters for array and boolean to determine ascending or descending order 
//Animations list is a list of triplets [(index, index), (index, index), (index, value)] for indicies that were compared and value that was used to overwrite the index
export function mergeSort(arr, start, end, animations = [], ascending=true) {
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
        sorted_first_half = mergeSort(arr, first_half_start, first_half_end, animations, ascending); //sort the first half recursively and update first half
    }
    if(second_half_end - second_half_start > 0){
        sorted_second_half = mergeSort(arr, second_half_start, second_half_end, animations, ascending); //sort the second half recursively and update second half
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



//quick sort helper functions:
const swap = ( (arr, i, j) => {
    if (i === j && i < arr.length) return;

    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
});

const quickSortHelper = ( (unsorted, start, end, ascending) => {
    //start is (start index) of subsection and end is (end index + 1)
    const size = end - start;
	if (size > 1) {
        const middle = Math.floor((start + end) / 2)
		const pivot = unsorted[middle]; //select pivot
		swap(unsorted, start, middle); //move pivot to front
		let i = start + 1; //select low (ascending) / high (descending)
		let j = end - 1; //select high (ascending) / low (descending)
		while (true) { //cross eventually happens, so we don't ever have to change this boolean

			if (ascending)
				while (i <= j && unsorted[i] <= pivot) //increment i ////////////!!! make this more efficient by only having one while loop for increment & decrement
					++i;
			else
				while (i <= j && unsorted[i] >= pivot)
					++i;
			if (i <= j) { // no cross
				if (ascending)
					while (i <= j && unsorted[j] > pivot) //if no cross, decrement j
						--j;
				else
					while (i <= j && unsorted[j] < pivot)
						--j;
			}
			if (i > j) { //a cross happened
				swap(unsorted, start, j); //swap pivot with j
				if (j != 0)
                    quickSortHelper(unsorted, start, j, ascending); //recursive call to sort subcollections in 0(1) memory
				if (j + 1 != size)
                    quickSortHelper(unsorted, j + 1, end, ascending);
				return; //exit the function to not loop infinitely
			}
			else { //swap high and low if no cross 
				swap(unsorted, i, j);
			}
		}
	}
});



/*
Quick Sort Implementation:
-choose middle element as pivot and swap with first
for ascending order (same algorithm for descending, but high and low are reversed):
-low starts at beginning and high starts at end
-move low pointer first
-swap with high pointer after cross
*/
//Quicksort function
export function quickSort(unsorted, ascending = true) {
	quickSortHelper(unsorted, 0, unsorted.length, ascending);
	return unsorted;
}