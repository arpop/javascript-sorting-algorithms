/**
 * Look up an element in an arrary based on a one-based index.
 *
 * @param  {Number} index one-base index
 * @return {Object}       element at index in array
 */
Array.prototype.elem = function (index) {
  return this[index-1];
};

/**
 * Swap an element using one-based indexes.
 *
 * @param  {Number} index1 index of first element to swap
 * @param  {Number} index2 index of second element to swap
 * @return {void}
 */
Array.prototype.elemSwap = function (index1, index2) {
  var temp = this[index1 - 1];
  this[index1 - 1] = this[index2 - 1];
  this[index2 - 1] = temp;
};

/**
 * Swap an element using zero-base indexes.
 * @param  {[type]} index1 [description]
 * @param  {[type]} index2 [description]
 * @return {[type]}        [description]
 */
Array.prototype.swap = function (index1, index2) {
  var temp = this[index1];
  this[index1] = this[index2];
  this[index2] = temp;
};

/**
 * Clone an array.
 *
 * @return {void}
 */
Array.prototype.clone = function() {
  return this.slice(0);
};

var sort = function (algo, arr) {
  /**
   * Selection sorting algorithm.
   *
   * @param  {Array} arr array to be sorted
   * @return {Array}     sorted array
   */
  function selectionSort (arr) {
    //visit every element in array
    for (var i = 0; i < arr.length; i++) {
      //find minimum in elements in i...n
      var min = arr[i];
      var minIndex = i;
      for (var j = i+1; j < arr.length; j++) {
        if (arr[j] < min) {
          min = arr[j];
          minIndex = j;
        }
      }
      //swap the current index with that of the minimum value
      arr.swap(i, minIndex);
    }
    return arr;
  }

  /**
   * Insertion sort algorithm.
   *
   * @param  {Array} arr array to be sorted
   * @return {Array}     sorted array
   */
  function insertSort (arr) {
    for (var i = 1; i <= arr.length; i++) {
      for (var j = i-1; j >= 0; j--) {
        if (arr[j+1] < arr[j]) {
          arr.swap(j, j+1);
        }
      }
    }
    return arr;
  }

  /**
   * Merge sort algorithm.
   *
   * @param  {Array} arr array to be sorted
   * @return {Array}     sorted array
   */
  function mergeSort (arr) {
    //step 1 - recursively divide array until we are down to a single element
    if (arr.length <= 1) {
      return arr;
    }
    var middleIndex = Math.floor(arr.length/2);
    var leftSorted = mergeSort(arr.slice(0, middleIndex));
    var rightSorted = mergeSort(arr.slice(middleIndex));
    //step 2 - merge the divided arrays
    return merge(leftSorted, rightSorted);
  }

  /**
   * Helper function to #mergeSort-- merge the left and right array into a single sorted array.
   *
   * @param  {Array} left  left array to be merged
   * @param  {Array} right right array to be merged
   * @return {Array}       sorted array
   */
  function merge (left, right) {
    var sortedArr = [];
    //current left and right index being compared
    var leftInd = 0;
    var rightInd = 0;
    while (leftInd < left.length || rightInd < right.length) {
      if (rightInd === right.length || left[leftInd] <= right[rightInd]) {
        sortedArr.push(left[leftInd]);
        ++leftInd;
      } else {
        sortedArr.push(right[rightInd]);
        ++rightInd;
      }
    }
    return sortedArr;
  }

  /**
   * Heap constructor.
   *
   * Build a minimum heap.
   * @constructor
   * @param {Array} arr array to be sorted
   */
  function Heap (arr) {
    this.heapArray = arr.clone();
    //a few good attributes to know...
    this.heapSize = this.heapArray.length;
    this.numberOfNonLeaveNodes = Math.ceil(this.heapSize/2);
    //build the heap
    this.buildHeap();
    //this will remain blank, until calling #sort
    this.sortedArray = [];
  }

  /**
   * Build the heap.
   *
   * We build the heap by working up from the n/2 node and calling #heapifyNode.
   * @return {void}
   */
  Heap.prototype.buildHeap = function () {
    for(var i = this.numberOfNonLeaveNodes; i >= 1; --i) {
      this.heapifyNode(i);
    }
  };

  /**
   * Heapify the node.
   *
   * This function assumes that the "sub-heaps" of the children element of index are
   * valid heaps.
   * @param  {Number} index one-based index
   * @return {void}
   */
  Heap.prototype.heapifyNode = function (index) {
    //find indexes of children
    var leftIndex = 2 * index;
    var rightIndex = 2 * index + 1;
    var smallest = index;
    //look to see if left child or left child is less than parent
    if (leftIndex <= this.heapSize && this.heapArray.elem(leftIndex) < this.heapArray.elem(smallest)) {
      smallest = leftIndex;
    }
    if (rightIndex <= this.heapSize && this.heapArray.elem(rightIndex) < this.heapArray.elem(smallest)) {
      smallest = rightIndex;
    }
    //if left or right child was smaller than we have to heapify that node
    if (smallest != index) {
      this.heapArray.elemSwap(index, smallest);
      this.heapifyNode(smallest);
    }
  };

  /**
   * Sort the array using the heap.
   *
   * @return {Array} Sorted Array
   */
  Heap.prototype.sort = function () {
    //sort was already called ie the sorted array is already populated, just return that
    if (this.sortedArray.length !== 0) {
      return this.sortedArray;
    } else {
      for (var i = 1; i <= this.heapSize; ++i) {
        this.heapArray.elemSwap(1, this.heapArray.length);
        this.sortedArray[i - 1] = this.heapArray.pop();
        this.heapifyNode(1);
      }
      return this.sortedArray;
    }
  };

  switch (algo) {
    case "SELECTION":
      return selectionSort(arr);
    case "INSERT":
      return insertSort(arr);
    case "MERGE":
      return mergeSort(arr);
    case "HEAP":
      return new Heap(arr).sort();
    default:
      throw "Sorting algorithm not found";
  }
};