let values = [];
let sorted_values = [];
let size;
let i = 0;
let c_size = 0;
let adjusted_width = window.innerWidth * 0.95;
let adjusted_height = window.innerHeight * 0.95;
let comparisons = 0;
let array_acccesses = 0;
let swaps = 0;
let low = 0;
let high = 0;

function setup() {
    createCanvas(adjusted_width, adjusted_height);
    setup_ui();
}

function setup_ui() {
    sizeSlider = createSlider(0, 1000, 200);
    sizeSlider.position(20, 20);
    sizeSlider.style('width', '260px');

    button = createButton('Sort');
    button.position(sizeSlider.x, 50);
    button.mousePressed(init_array);

    sel = createSelect();
    sel.position(20, button.y + button.width);
    sel.option('Bubble Sort');
    sel.option('Insertion Sort');
    sel.option('Quick Sort');
    sel.option('Selection Sort');
    sel.changed(init_array);

}

function init_array() {
    i = 0;
    values = new Array(size);
    for (let i = 0; i < values.length; i++) {
        values[i] = random(height);
    }
    c_size = adjusted_width / sizeSlider.value();
    comparisons = 0;
    array_acccesses = 0;
    sorted_values = values.slice();
    sorted_values.sort((a, b) => a - b);
}

function draw() {
    size = sizeSlider.value();
    background(50);
    textSize(20);
    stroke(0);
    fill(255, 255, 255);
    text("Number of Values: " + size, sizeSlider.x + button.width + 10, button.y + button.height / 2);
    text("Comparisons: \t" + comparisons, sizeSlider.x * 4 + sizeSlider.width, 30);
    text("Array Accesses: \t" + array_acccesses, sizeSlider.x * 4 + sizeSlider.width, button.y + button.height / 2);

    if (adjusted_width / c_size > 450) {
        strokeWeight(0);
    } else {
        strokeWeight(1);
    }
    if (i < values.length) {
        switch (sel.value()) {
            case 'Bubble Sort':
                bubbleSort();
                break;
            case 'Selection Sort':
                selectionSort();
                break;
            case 'Insertion Sort':
                insertionSort();
                break;
            case 'Quick Sort':
                quickSort(values,0,values.length-1);
                break;
            default:
                bubbleSort();
                break;
        }
    } else {
        //sort = false;
    }
    i++;

    for (let i = 0; i < values.length; i++) {
        rect(adjusted_width - i * c_size, height, c_size, values[i] - adjusted_height);
        stroke(255, 255, 255);
        if (values[i] === sorted_values[i]) {
            fill(255, 0, 0);
        } else {
            fill(0, 0, 0);
        }
    }

}

function bubbleSort() {
    for (let j = 0; j < values.length - i - 1; j++) {
        let a = values[j];
        array_acccesses++;
        let b = values[j + 1];
        array_acccesses++;
        if (a > b) {
            swap(values, j, j + 1);
        }
        comparisons++;
    }
}
function insertionSort() {
    let key = values[i];
    let j = i - 1;

    while (j >= 0 && values[j] > key) {
        comparisons++;
        values[j + 1] = values[j];
        array_acccesses++;
        j = j - 1;
    }
    values[j + 1] = key;
    array_acccesses++;
}

function selectionSort() {
    let min_id = i;
    for (let j = i + 1; j < values.length; j++) {
        if (values[j] < values[min_id]) {
            array_acccesses++;
            min_id = j;
        }
    }
    comparisons++;
    array_acccesses++;
    array_acccesses++;
    swap(values, min_id, i);
}

function quickSort(arr,low,high) {
    setTimeout(() => {

        if (low < high) {
            comparisons++;
            let pi = partition(arr, low, high);

            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    },650);
}

function partition(arr, low, high) {
    let pivot = arr[high];
    let i = (low - 1);
    for (let j = low; j <= high - 1; j++) {
        if (arr[j] <= pivot) {
            array_acccesses++;
            comparisons++;
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return (i + 1);
}

function swap(arr, a, b) {
    let temp = arr[a];
    array_acccesses++;
    arr[a] = arr[b];
    array_acccesses++;
    arr[b] = temp;
    array_acccesses++;
}