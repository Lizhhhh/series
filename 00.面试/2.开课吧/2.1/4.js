function binarySearch(arr, item) {
  let low = 0
  let high = arr.length - 1
  while (low <= high) {
    let mid = Math.floor((low + high) / 2)
    if (arr[mid] < item && mid + 1 < arr.length) {
      low = mid + 1
      continue
    }
    if (arr[mid] > item && mid - 1 > 0) {
      high = mid - 1
      continue
    }
    console.log(mid)
    return mid
  }
}

binarySearch([1, 2, 3, 5, 7, 10, 11, 13, 15, 18, 20, 23], 15)
