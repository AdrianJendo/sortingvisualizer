//Returns sorted array using merge sort O(nlogn) time and O(n) space
//Merge Sort function with parameters for array and boolean to determine ascending or descending order 
export function mergeSort(arr, animations = [], ascending=true) {
    let half = Math.floor(arr.length/2);
    let first_half = arr.slice(0, half); //shallow copy of first and second halves of array
    let second_half = arr.slice(half, arr.length);

    debugger;
    
    if(first_half.length && first_half.length > 1){
        first_half = mergeSort(first_half, animations, ascending); //sort the first half recursively
    }
    if(second_half.length && second_half.length > 1){
        second_half = mergeSort(second_half, animations, ascending); //sort the second half recursively
    }
    
    const sorted = []; //Sorted Array
    let i=0, j=0; //Index pointers for both sublists
    
    while(i<first_half.length && j<second_half.length){
        if((first_half[i] > second_half[j] && ascending) || (first_half[i] <= second_half[j] && !ascending)) { //push back values into sorted array as appropriate and increment pointers
            sorted.push(second_half[j]);
			++j;
        }
        else{
            sorted.push(first_half[i]);
			++i;
        }
    }
    
    if(i >= first_half.length){ //check if all elements from first half were already pushed in
        while(j < second_half.length) { //add remaining elements from second half
            sorted.push(second_half[j]);
            ++j;
        }
    }
    else{ //not all elements from first half were pushed in
        while(i < first_half.length) { //add remaining elements from first half
            sorted.push(first_half[i]);
            ++i;
        }
    }

    return sorted;
}