// Initializing variables

let container = document.querySelector('#pad-container');
let mouse_drag = false;
let canvas_size = 16;
let square;

// Window mouse events

window.addEventListener('mousedown', (event) => {
    mouse_drag = true;
})

window.addEventListener('mouseup', (event) => {
    mouse_drag = false;
} )

// Helper Functions

function create_pad(size) {
    for (let i = 0; i < Math.pow(size,2); i++) {
        let create_square = document.createElement("div");
        create_square.id = `square${i}`;
        create_square.classList.add('canvas-square');
        create_square.addEventListener('click', click_black);
        create_square.addEventListener('mouseenter', drag_black);
        container.appendChild(create_square);
    }
}

function delete_pad() {
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
}

function custom_pad() {
    let custom_canvas = Number(prompt('Please enter the amount of squares per side (maximum 100)', '16'));
    if (custom_canvas === NaN || custom_canvas === 0 || custom_canvas > 100) {
        alert('Please enter a valid number between 1 and 100!');
        custom_pad();
    } else {
        delete_pad();
        canvas_size = custom_canvas;
        document.querySelector(':root').style.setProperty('--square_px', `${600/canvas_size}px`)
        create_pad(canvas_size);
    }
}

function set_black() {
    for (let i = 0; i < Math.pow(canvas_size,2); i++) {
        square = document.querySelector(`#square${i}`);
        clear_event_listeners(square);
        square.addEventListener('click', click_black);
        square.addEventListener('mouseenter', drag_black);
    }
}

function set_gray() {
    for (let i = 0; i < Math.pow(canvas_size,2); i++) {
        square = document.querySelector(`#square${i}`);
        clear_event_listeners(square);
        square.addEventListener('click', click_grey);
        square.addEventListener('mouseenter', drag_grey);
    }
}

function set_rainbow() {
    for (let i = 0; i < Math.pow(canvas_size,2); i++) {
        square = document.querySelector(`#square${i}`);
        clear_event_listeners(square);
        square.addEventListener('click', click_rainbow);
        square.addEventListener('mouseenter', drag_rainbow);
    }
}

function set_eraser() {
    for (let i = 0; i < Math.pow(canvas_size,2); i++) {
        square = document.querySelector(`#square${i}`);
        clear_event_listeners(square);
        square.addEventListener('click', click_eraser);
        square.addEventListener('mouseenter', drag_eraser);
    }
}

function click_black(event) {
    event.target.classList.remove('greyscale_base');
    event.target.style.backgroundColor = 'black';
    event.target.style.opacity = 1;
}

function drag_black(event) {
    if (mouse_drag === true) {
        event.target.classList.remove('greyscale_base');
        event.target.style.backgroundColor = 'black';
        event.target.style.opacity = 1;
    }
}

function click_grey(event) {
    if (event.target.classList.contains('greyscale_base') != true) {
        event.target.classList.add('greyscale_base');
        event.target.style.backgroundColor = 'black';
        event.target.style.opacity = 0.1;
    }
    else {
        event.target.style.opacity = Number(event.target.style.opacity) + 0.1;
    }
}

function drag_grey(event) {
    if (mouse_drag === true) {
        if (event.target.classList.contains('greyscale_base') != true) {
            event.target.classList.add('greyscale_base');
            event.target.style.backgroundColor = 'black';
            event.target.style.opacity = 0.1;
        }
        else {
            event.target.style.opacity = Number(event.target.style.opacity) + 0.1;
        }
    }
}

function click_rainbow(event) {
    event.target.classList.remove('greyscale_base');
    event.target.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    event.target.style.opacity = 1;
}

function drag_rainbow(event) {
    if (mouse_drag === true) {
        event.target.classList.remove('greyscale_base');
        event.target.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        event.target.style.opacity = 1;
    }
}

function click_eraser(event) {
    event.target.classList.remove('greyscale_base');
    event.target.style.backgroundColor = 'white';
    event.target.style.opacity = 1;
}

function drag_eraser(event) {
    if (mouse_drag === true) {
        event.target.classList.remove('greyscale_base');
        event.target.style.backgroundColor = 'white';
        event.target.style.opacity = 1;
    }
}

function clear_pad() {
    for (let i = 0; i < Math.pow(canvas_size,2); i++) {
        document.querySelector(`#square${i}`).style.backgroundColor = 'white';
    }
}

function clear_event_listeners(pad_square) {
    pad_square.removeEventListener('click', click_black);
    pad_square.removeEventListener('mouseenter', drag_black);
    pad_square.removeEventListener('click', click_grey);
    pad_square.removeEventListener('mouseenter', drag_grey);
    pad_square.removeEventListener('click', click_rainbow);
    pad_square.removeEventListener('mouseenter', drag_rainbow);
    pad_square.removeEventListener('click', click_eraser);
    pad_square.removeEventListener('mouseenter', drag_eraser);
}

// Builds default pad

create_pad(canvas_size);