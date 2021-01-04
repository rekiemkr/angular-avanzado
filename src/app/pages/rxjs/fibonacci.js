function fibonacci(a, b, c) {
    const arr = [a,b]    
    for (let index = 2; index < c; index++) {
        arr.push(arr[index-2]+arr[index-1])
    }
    return arr
}

fibonacci(1,20)