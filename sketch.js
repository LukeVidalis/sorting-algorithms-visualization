let values = [];
let sorted_values = [];
let size;
let sort = false;
let i = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    sizeSlider = createSlider(0, 1000, 500);
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
    sorted_values = values.slice();
    sorted_values.sort((a, b) => a - b);
    sort = true;
    loop();
}

function draw() {
    size = sizeSlider.value();
    const c_size =  width/sizeSlider.value();
    background(50);
    textSize(20);
    text(size,170, 30);
    stroke(0);
    fill(255, 255, 255);

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
         noLoop();
    }
    i++;
    if (sort) {
        for (let i = 0; i < values.length; i++) {
            stroke(255, 255, 255);
            if (values[i] === sorted_values[i]) {
                fill(255, 0, 0);
            } else {
                fill(0, 0, 0);
            }
            // line(i*2, height, i*2, height - values[i]);
            rect(width-i*c_size , height, c_size,  values[i]-height);
        }
    }
}

function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}