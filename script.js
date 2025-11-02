// Global variables
let array = [];
let delay = 260;
let isPaused = false;
let isSorting = false;
let currentAlgorithm = null;
let comparisons = 0;
let swaps = 0;
let steps = 0;
let gapSize = 2;

// DOM elements
const barsContainer = document.querySelector("#bars");
const arraySizeSlider = document.querySelector('#arr_sz');
const speedSlider = document.querySelector('#speed_input');
const gapSlider = document.querySelector('#gap_input');
const customArrayInput = document.querySelector('#customArray');
const useCustomArrayBtn = document.querySelector('#useCustomArray');
const pauseResumeBtn = document.querySelector('#pauseResumeBtn');
const resetBtn = document.querySelector('#resetBtn');
const comparisonsElement = document.querySelector('#comparisons');
const swapsElement = document.querySelector('#swaps');
const stepsElement = document.querySelector('#steps');
const algorithmInfoElement = document.querySelector('#algorithmInfo');
const cppCodeElement = document.querySelector('#cppCode');

// Algorithm information
const algorithmInfo = {
    bubbleSort: {
        name: "Bubble Sort",
        description: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.",
        timeComplexity: {
            best: "O(n)",
            average: "O(n²)",
            worst: "O(n²)"
        },
        spaceComplexity: "O(1)",
        stable: true
    },
    selectionSort: {
        name: "Selection Sort",
        description: "Selection Sort divides the input list into two parts: a sorted sublist and an unsorted sublist. The algorithm repeatedly finds the minimum element from the unsorted part and puts it at the beginning of the sorted part.",
        timeComplexity: {
            best: "O(n²)",
            average: "O(n²)",
            worst: "O(n²)"
        },
        spaceComplexity: "O(1)",
        stable: false
    },
    insertionSort: {
        name: "Insertion Sort",
        description: "Insertion Sort builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.",
        timeComplexity: {
            best: "O(n)",
            average: "O(n²)",
            worst: "O(n²)"
        },
        spaceComplexity: "O(1)",
        stable: true
    },
    quickSort: {
        name: "Quick Sort",
        description: "Quick Sort is a divide-and-conquer algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays according to whether they are less than or greater than the pivot.",
        timeComplexity: {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n²)"
        },
        spaceComplexity: "O(log n)",
        stable: false
    },
    mergeSort: {
        name: "Merge Sort",
        description: "Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.",
        timeComplexity: {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n log n)"
        },
        spaceComplexity: "O(n)",
        stable: true
    }
};

// C++ code examples
const cppCode = {
    bubbleSort: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
            }
        }
    }
}`,
    selectionSort: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        int minIdx = i;
        for (int j = i+1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        swap(arr[minIdx], arr[i]);
    }
}`,
    insertionSort: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = key;
    }
}`,
    quickSort: `int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i+1], arr[high]);
    return i+1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi-1);
        quickSort(arr, pi+1, high);
    }
}`,
    mergeSort: `void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    
    int L[n1], R[n2];
    
    for (int i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];
        
    int i = 0, j = 0, k = l;
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m+1, r);
        merge(arr, l, m, r);
    }
}`
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    createNewArray();
    setupEventListeners();
    updateAlgorithmInfo('bubbleSort');
});

// Setup event listeners
function setupEventListeners() {
    // Array size slider
    arraySizeSlider.addEventListener('input', function() {
        createNewArray(parseInt(arraySizeSlider.value));
    });
    
    // Speed slider
    speedSlider.addEventListener('input', function() {
        // Lower values = slower speed (higher delay)
        delay = 320 - parseInt(speedSlider.value) * 3;
    });
    
    // Gap slider
    gapSlider.addEventListener('input', function() {
        gapSize = parseInt(gapSlider.value);
        updateBarsGap();
    });
    
    // Custom array input
    useCustomArrayBtn.addEventListener('click', function() {
        useCustomArray();
    });
    
    customArrayInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            useCustomArray();
        }
    });
    
    // Pause/Resume button
    pauseResumeBtn.addEventListener('click', togglePauseResume);
    
    // Reset button
    resetBtn.addEventListener('click', resetVisualization);
    
    // Algorithm buttons
    document.querySelector('.bubbleSort').addEventListener('click', function() {
        startAlgorithm('bubbleSort');
    });
    
    document.querySelector('.selectionSort').addEventListener('click', function() {
        startAlgorithm('selectionSort');
    });
    
    document.querySelector('.insertionSort').addEventListener('click', function() {
        startAlgorithm('insertionSort');
    });
    
    document.querySelector('.quickSort').addEventListener('click', function() {
        startAlgorithm('quickSort');
    });
    
    document.querySelector('.mergeSort').addEventListener('click', function() {
        startAlgorithm('mergeSort');
    });
    
    // New array button
    document.querySelector('.newArray').addEventListener('click', function() {
        createNewArray(arraySizeSlider.value);
    });
}

// Create a new random array
function createNewArray(noOfBars = 30) {
    if (isSorting) return;
    
    resetStats();
    deleteChild();
    
    array = [];
    for (let i = 0; i < noOfBars; i++) {
        array.push(Math.floor(Math.random() * 250) + 10);
    }
    
    renderBars();
    updateBarsGap();
}

// Use custom array from input
function useCustomArray() {
    if (isSorting) return;
    
    const input = customArrayInput.value;
    if (!input) return;
    
    try {
        const customArray = input.split(',').map(num => {
            const parsed = parseInt(num.trim());
            if (isNaN(parsed) || parsed < 1 || parsed > 500) {
                throw new Error('Invalid number');
            }
            return parsed;
        });
        
        if (customArray.length < 5 || customArray.length > 100) {
            alert('Array size must be between 5 and 100');
            return;
        }
        
        resetStats();
        deleteChild();
        
        array = customArray;
        arraySizeSlider.value = customArray.length;
        renderBars();
        updateBarsGap();
    } catch (e) {
        alert('Please enter valid numbers between 1 and 500, separated by commas');
        customArrayInput.value = '';
    }
}

// Render bars in the container
function renderBars() {
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = `${array[i]}px`;
        bar.classList.add('bar');
        bar.classList.add('flex-item');
        bar.classList.add(`barNo${i}`);
        
        // Add value label for smaller arrays
        if (array.length <= 30) {
            const label = document.createElement("div");
            label.classList.add('bar-label');
            label.textContent = array[i];
            bar.appendChild(label);
        }
        
        barsContainer.appendChild(bar);
    }
}

// Update gap between bars
function updateBarsGap() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.style.margin = `0 ${gapSize}px`;
    });
}

// Delete all bars
function deleteChild() {
    barsContainer.innerHTML = '';
}

// Reset statistics
function resetStats() {
    comparisons = 0;
    swaps = 0;
    steps = 0;
    updateStats();
}

// Update statistics display
function updateStats() {
    comparisonsElement.textContent = `Comparisons: ${comparisons}`;
    swapsElement.textContent = `Swaps: ${swaps}`;
    stepsElement.textContent = `Steps: ${steps}`;
}

// Start a sorting algorithm
function startAlgorithm(algorithm) {
    if (isSorting) return;
    
    isSorting = true;
    currentAlgorithm = algorithm;
    disableControls();
    
    // Update algorithm info and code
    updateAlgorithmInfo(algorithm);
    
    // Reset and update stats
    resetStats();
    
    // Execute the selected algorithm
    switch(algorithm) {
        case 'bubbleSort':
            bubbleSort();
            break;
        case 'selectionSort':
            selectionSort();
            break;
        case 'insertionSort':
            insertionSort();
            break;
        case 'quickSort':
            quickSort();
            break;
        case 'mergeSort':
            mergeSort();
            break;
    }
}

// Update algorithm information display
function updateAlgorithmInfo(algorithm) {
    const info = algorithmInfo[algorithm];
    
    let html = `
        <h6>${info.name}</h6>
        <p class="algorithm-details">${info.description}</p>
        <table class="complexity-table table table-sm table-dark">
            <thead>
                <tr>
                    <th>Time Complexity</th>
                    <th>Space Complexity</th>
                    <th>Stable</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        Best: ${info.timeComplexity.best}<br>
                        Average: ${info.timeComplexity.average}<br>
                        Worst: ${info.timeComplexity.worst}
                    </td>
                    <td>${info.spaceComplexity}</td>
                    <td>${info.stable ? 'Yes' : 'No'}</td>
                </tr>
            </tbody>
        </table>
    `;
    
    algorithmInfoElement.innerHTML = html;
    cppCodeElement.textContent = cppCode[algorithm];
}

// Toggle pause/resume
function togglePauseResume() {
    if (!isSorting) return;
    
    isPaused = !isPaused;
    
    if (isPaused) {
        pauseResumeBtn.innerHTML = '<i class="fas fa-play"></i> Resume';
        pauseResumeBtn.classList.remove('btn-outline-warning');
        pauseResumeBtn.classList.add('btn-outline-success');
    } else {
        pauseResumeBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
        pauseResumeBtn.classList.remove('btn-outline-success');
        pauseResumeBtn.classList.add('btn-outline-warning');
    }
}

// Reset visualization
function resetVisualization() {
    if (isSorting) {
        isSorting = false;
        isPaused = false;
        currentAlgorithm = null;
    }
    
    enableControls();
    pauseResumeBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
    pauseResumeBtn.classList.remove('btn-outline-success');
    pauseResumeBtn.classList.add('btn-outline-warning');
    
    createNewArray(arraySizeSlider.value);
}

// Disable controls during sorting
function disableControls() {
    document.querySelector(".bubbleSort").disabled = true;
    document.querySelector(".selectionSort").disabled = true;
    document.querySelector(".insertionSort").disabled = true;
    document.querySelector(".quickSort").disabled = true;
    document.querySelector(".mergeSort").disabled = true;
    document.querySelector(".newArray").disabled = true;
    arraySizeSlider.disabled = true;
    speedSlider.disabled = true;
    gapSlider.disabled = true;
    customArrayInput.disabled = true;
    useCustomArrayBtn.disabled = true;
}

// Enable controls after sorting
function enableControls() {
    document.querySelector(".bubbleSort").disabled = false;
    document.querySelector(".selectionSort").disabled = false;
    document.querySelector(".insertionSort").disabled = false;
    document.querySelector(".quickSort").disabled = false;
    document.querySelector(".mergeSort").disabled = false;
    document.querySelector(".newArray").disabled = false;
    arraySizeSlider.disabled = false;
    speedSlider.disabled = false;
    gapSlider.disabled = false;
    customArrayInput.disabled = false;
    useCustomArrayBtn.disabled = false;
}

// Wait function for animations
function waitforme(milisec) {
    return new Promise(resolve => {
        // Check for pause state
        const checkPause = () => {
            if (!isPaused) {
                setTimeout(() => { resolve(''); }, milisec);
            } else {
                setTimeout(checkPause, 100);
            }
        };
        checkPause();
    });
}

// Swap function
function swap(el1, el2) {
    let temp = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = temp;
    
    // Also swap labels if they exist
    if (el1.firstChild && el2.firstChild) {
        const tempText = el1.firstChild.textContent;
        el1.firstChild.textContent = el2.firstChild.textContent;
        el2.firstChild.textContent = tempText;
    }
    
    swaps++;
    updateStats();
}

// Get bar value
function getBarValue(bar) {
    return parseInt(bar.style.height);
}