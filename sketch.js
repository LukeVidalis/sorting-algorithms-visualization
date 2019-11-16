let values = [];
let sorted_values = [];

let sort = false;
let i = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    button = createButton('Start');
    button.position(10, 50);
    button.mousePressed(init_array);

}

function init_array() {
    i = 0;
    values = new Array(width);
    for (let i = 0; i < values.length; i++) {
        values[i] = random(height);
    }
    sorted_values = values.slice();
    sorted_values.sort((a, b) => a - b);
    sort = true;
    loop();
}

function draw() {
    background(0);
    if (i < values.length && sort) {
        for (let j = 0; j < values.length - i - 1; j++) {
            let a = values[j];
            let b = values[j + 1];
            if (a > b) {
                swap(values, j, j + 1);
            }
        }
    } else {
        console.log("finished");
        sort = false;
        noLoop();
    }
    i++;

    for (let i = 0; i < values.length; i++) {
        if (values[i] === sorted_values[i]) {
            stroke(255, 0, 0);
        } else {
            stroke(255, 255, 255);
        }
        line(i, height, i, height - values[i]);
    }
}

function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}