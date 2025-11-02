// Bubble Sort Algorithm
async function bubbleSort() {
    const bars = document.querySelectorAll('.bar');
    const n = bars.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Check if sorting was reset
            if (!isSorting) return;
            
            // Highlight bars being compared
            bars[j].style.background = '#ffeb3b';
            bars[j + 1].style.background = '#ffeb3b';
            
            comparisons++;
            updateStats();
            await waitforme(delay);
            
            if (getBarValue(bars[j]) > getBarValue(bars[j + 1])) {
                // Highlight bars being swapped
                bars[j].style.background = '#e74c3c';
                bars[j + 1].style.background = '#e74c3c';
                
                await waitforme(delay);
                swap(bars[j], bars[j + 1]);
                await waitforme(delay);
            }
            
            // Reset color if not in final position
            if (j !== n - i - 1) {
                bars[j].style.background = 'cyan';
                bars[j + 1].style.background = 'cyan';
            }
        }
        
        // Mark sorted element
        bars[n - i - 1].style.background = '#2ecc71';
        steps++;
        updateStats();
    }
    
    // Mark first element as sorted
    bars[0].style.background = '#2ecc71';
    
    isSorting = false;
    enableControls();
}

// Selection Sort Algorithm
async function selectionSort() {
    const bars = document.querySelectorAll('.bar');
    const n = bars.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        bars[minIndex].style.background = '#9b59b6'; // Pivot color
        
        for (let j = i + 1; j < n; j++) {
            // Check if sorting was reset
            if (!isSorting) return;
            
            // Highlight current comparison
            bars[j].style.background = '#ffeb3b';
            
            comparisons++;
            updateStats();
            await waitforme(delay);
            
            if (getBarValue(bars[j]) < getBarValue(bars[minIndex])) {
                // Reset previous min index color
                if (minIndex !== i) {
                    bars[minIndex].style.background = 'cyan';
                }
                minIndex = j;
                bars[minIndex].style.background = '#9b59b6';
            } else {
                bars[j].style.background = 'cyan';
            }
        }
        
        await waitforme(delay);
        
        // Swap if needed
        if (minIndex !== i) {
            bars[i].style.background = '#e74c3c';
            bars[minIndex].style.background = '#e74c3c';
            
            await waitforme(delay);
            swap(bars[i], bars[minIndex]);
            await waitforme(delay);
        }
        
        // Mark sorted element
        bars[i].style.background = '#2ecc71';
        if (minIndex !== i) {
            bars[minIndex].style.background = 'cyan';
        }
        
        steps++;
        updateStats();
    }
    
    // Mark last element as sorted
    bars[n - 1].style.background = '#2ecc71';
    
    isSorting = false;
    enableControls();
}

// Insertion Sort Algorithm
async function insertionSort() {
    const bars = document.querySelectorAll('.bar');
    const n = bars.length;
    
    // Mark first element as sorted
    bars[0].style.background = '#2ecc71';
    
    for (let i = 1; i < n; i++) {
        // Check if sorting was reset
        if (!isSorting) return;
        
        let j = i - 1;
        let key = getBarValue(bars[i]);
        bars[i].style.background = '#ffeb3b'; // Comparing color
        
        await waitforme(delay);
        
        while (j >= 0 && getBarValue(bars[j]) > key) {
            // Check if sorting was reset
            if (!isSorting) return;
            
            comparisons++;
            updateStats();
            
            bars[j].style.background = '#ffeb3b';
            bars[j + 1].style.background = '#e74c3c';
            
            await waitforme(delay);
            
            // Shift element
            bars[j + 1].style.height = bars[j].style.height;
            
            // Update label if exists
            if (bars[j + 1].firstChild) {
                bars[j + 1].firstChild.textContent = bars[j].firstChild.textContent;
            }
            
            j--;
            
            await waitforme(delay);
            
            // Reset colors
            for (let k = i; k >= 0; k--) {
                bars[k].style.background = '#2ecc71';
            }
        }
        
        // Place key in correct position
        bars[j + 1].style.height = `${key}px`;
        
        // Update label if exists
        if (bars[j + 1].firstChild) {
            bars[j + 1].firstChild.textContent = key;
        }
        
        // Mark as sorted
        bars[i].style.background = '#2ecc71';
        steps++;
        updateStats();
    }
    
    isSorting = false;
    enableControls();
}

// Quick Sort Algorithm
async function quickSort() {
    const bars = document.querySelectorAll('.bar');
    await quickSortHelper(bars, 0, bars.length - 1);
    
    // Mark all as sorted
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.background = '#2ecc71';
    }
    
    isSorting = false;
    enableControls();
}

async function quickSortHelper(bars, low, high) {
    if (low < high) {
        // Check if sorting was reset
        if (!isSorting) return;
        
        let pivotIndex = await partition(bars, low, high);
        await quickSortHelper(bars, low, pivotIndex - 1);
        await quickSortHelper(bars, pivotIndex + 1, high);
    } else if (low === high) {
        // Mark single element as sorted
        bars[low].style.background = '#2ecc71';
    }
}

async function partition(bars, low, high) {
    let pivot = getBarValue(bars[high]);
    bars[high].style.background = '#9b59b6'; // Pivot color
    
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        // Check if sorting was reset
        if (!isSorting) return i + 1;
        
        bars[j].style.background = '#ffeb3b'; // Comparing color
        
        comparisons++;
        updateStats();
        await waitforme(delay);
        
        if (getBarValue(bars[j]) < pivot) {
            i++;
            
            bars[i].style.background = '#e74c3c'; // Swapping color
            await waitforme(delay);
            
            swap(bars[i], bars[j]);
            await waitforme(delay);
            
            // Reset color after swap
            bars[i].style.background = 'cyan';
            bars[j].style.background = 'cyan';
        } else {
            bars[j].style.background = 'cyan';
        }
    }
    
    await waitforme(delay);
    
    // Place pivot in correct position
    bars[i + 1].style.background = '#e74c3c';
    bars[high].style.background = '#e74c3c';
    
    await waitforme(delay);
    swap(bars[i + 1], bars[high]);
    await waitforme(delay);
    
    // Reset colors
    bars[i + 1].style.background = '#2ecc71'; // Pivot is now sorted
    
    for (let k = low; k <= high; k++) {
        if (k !== i + 1) {
            bars[k].style.background = 'cyan';
        }
    }
    
    steps++;
    updateStats();
    
    return i + 1;
}

// Merge Sort Algorithm - FIXED VERSION
async function mergeSort() {
    const bars = document.querySelectorAll('.bar');
    // Reset all bars to default color
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.background = 'cyan';
    }
    
    await mergeSortHelper(bars, 0, bars.length - 1);
    
    // Mark all as sorted
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.background = '#2ecc71';
    }
    
    isSorting = false;
    enableControls();
}

async function mergeSortHelper(bars, left, right) {
    if (left >= right) {
        return;
    }
    
    // Check if sorting was reset
    if (!isSorting) return;
    
    const mid = Math.floor((left + right) / 2);
    
    // Color the left half blue and right half orange
    for (let i = left; i <= mid; i++) {
        bars[i].style.background = '#3498db'; // Blue for left half
    }
    for (let i = mid + 1; i <= right; i++) {
        bars[i].style.background = '#f39c12'; // Orange for right half
    }
    
    await waitforme(delay * 2);
    
    // Recursively sort both halves
    await mergeSortHelper(bars, left, mid);
    await mergeSortHelper(bars, mid + 1, right);
    
    // Merge the sorted halves
    await merge(bars, left, mid, right);
}

async function merge(bars, left, mid, right) {
    const leftArray = [];
    const rightArray = [];
    
    const n1 = mid - left + 1;
    const n2 = right - mid;
    
    // Copy data to temporary arrays
    for (let i = 0; i < n1; i++) {
        leftArray.push(getBarValue(bars[left + i]));
    }
    
    for (let j = 0; j < n2; j++) {
        rightArray.push(getBarValue(bars[mid + 1 + j]));
    }
    
    let i = 0, j = 0, k = left;
    
    // Merge the temporary arrays back
    while (i < n1 && j < n2) {
        // Check if sorting was reset
        if (!isSorting) return;
        
        // Highlight elements being compared
        if (left + i < bars.length) bars[left + i].style.background = '#ffeb3b';
        if (mid + 1 + j < bars.length) bars[mid + 1 + j].style.background = '#ffeb3b';
        
        comparisons++;
        updateStats();
        await waitforme(delay);
        
        if (leftArray[i] <= rightArray[j]) {
            // Update height
            bars[k].style.height = `${leftArray[i]}px`;
            
            // Update label if exists
            if (bars[k].firstChild) {
                bars[k].firstChild.textContent = leftArray[i];
            }
            
            // Mark as merged
            bars[k].style.background = '#2ecc71';
            
            i++;
        } else {
            // Update height
            bars[k].style.height = `${rightArray[j]}px`;
            
            // Update label if exists
            if (bars[k].firstChild) {
                bars[k].firstChild.textContent = rightArray[j];
            }
            
            // Mark as merged
            bars[k].style.background = '#2ecc71';
            
            j++;
        }
        
        k++;
        steps++;
        updateStats();
        await waitforme(delay);
    }
    
    // Copy remaining elements of leftArray
    while (i < n1) {
        // Check if sorting was reset
        if (!isSorting) return;
        
        bars[k].style.height = `${leftArray[i]}px`;
        
        // Update label if exists
        if (bars[k].firstChild) {
            bars[k].firstChild.textContent = leftArray[i];
        }
        
        bars[k].style.background = '#2ecc71';
        
        i++;
        k++;
        steps++;
        updateStats();
        await waitforme(delay);
    }
    
    // Copy remaining elements of rightArray
    while (j < n2) {
        // Check if sorting was reset
        if (!isSorting) return;
        
        bars[k].style.height = `${rightArray[j]}px`;
        
        // Update label if exists
        if (bars[k].firstChild) {
            bars[k].firstChild.textContent = rightArray[j];
        }
        
        bars[k].style.background = '#2ecc71';
        
        j++;
        k++;
        steps++;
        updateStats();
        await waitforme(delay);
    }
}