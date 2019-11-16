let values = [];
let sorted_values = [];
let size;
let sort = false;
let i = 0;
let c_size = 0;
let adjusted_width = window.innerWidth*0.95;
let adjusted_height = window.innerHeight*0.95;

function setup() {
    createCanvas(adjusted_width, adjusted_height);
    setup_ui();
}

function setup_ui(){
    sizeSlider = createSlider(0, 1000, 200);
    sizeSlider.position(20, 20);
    button = createButton('Start');
    button.position(10, 50);
    button.mousePressed(init_array);
}

function init_array() {
    i = 0;
    values = new Array(size);
    for (let i = 0; i < values.length; i++) {
        values[i] = random(height);
    }
    c_size =  adjusted_width/sizeSlider.value();
    sorted_values = values.slice();
    sorted_values.sort((a, b) => a - b);
    sort = true;
    loop();
}

function draw() {
    size = sizeSlider.value();
    background(50);
    textSize(20);
    stroke(0);
    fill(255, 255, 255);
    text(size,170, 30);

    if (i < values.length) {
        for (let j = 0; j < values.length - i - 1; j++) {
            let a = values[j];
            let b = values[j + 1];
            if (a > b) {
                swap(values, j, j + 1);
            }

        }
    } else {
        //sort = false;
         // noLoop();
    }
    i++;
    if (sort) {
        for (let i = 0; i < values.length; i++) {
            rect(adjusted_width-i*c_size , height, c_size,  values[i]-adjusted_height);
            stroke(255, 255, 255);
            if (values[i] === sorted_values[i]) {
                fill(255, 0, 0);
            } else {
                fill(0, 0, 0);
            }
        }
    }
}

function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}