let array = [];
const visualizer = document.getElementById("visualizer");
let speed = 50; // Default speed

function generateArray(size) {
  array = [];
  visualizer.innerHTML = "";

  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 100) + 1;
    array.push(value);

    const barContainer = document.createElement("div");
    barContainer.classList.add("bar-container");

    const bar = document.createElement("div");
    bar.style.height = `${value * 3}px`;
    bar.classList.add("bar");

    const label = document.createElement("div");
    label.classList.add("bar-label");
    label.textContent = value;

    barContainer.appendChild(bar);
    barContainer.appendChild(label);
    visualizer.appendChild(barContainer);
  }
}

function updateBars() {
  const bars = document.getElementsByClassName("bar");
  const labels = document.getElementsByClassName("bar-label");

  for (let i = 0; i < array.length; i++) {
    bars[i].style.height = `${array[i] * 3}px`;
    labels[i].textContent = array[i];
  }
}

function sleep(ms) {
  return new Promise((resolve) =>
    setTimeout(resolve, (ms * (101 - speed)) / 100)
  );
}

async function bubbleSort() {
  let bars = document.getElementsByClassName("bar");
  let labels = document.getElementsByClassName("bar-label");

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        // Swap elements
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        // Update visual representation
        bars[j].style.height = `${array[j] * 3}px`;
        bars[j + 1].style.height = `${array[j + 1] * 3}px`;

        // Update numbers on top of bars
        labels[j].textContent = array[j];
        labels[j + 1].textContent = array[j + 1];

        await sleep(100);
      }
    }
  }
}

async function selectionSort() {
  let bars = document.getElementsByClassName("bar");
  let labels = document.getElementsByClassName("bar-label");

  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      // Swap elements
      let temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;

      // Update visual representation
      bars[i].style.height = `${array[i] * 3}px`;
      bars[minIndex].style.height = `${array[minIndex] * 3}px`;

      // Update numbers on top of bars
      labels[i].textContent = array[i];
      labels[minIndex].textContent = array[minIndex];

      await sleep(100);
    }
  }
}

async function insertionSort() {
  let bars = document.getElementsByClassName("bar");
  let labels = document.getElementsByClassName("bar-label");

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      bars[j + 1].style.height = `${array[j + 1] * 3}px`;
      labels[j + 1].textContent = array[j + 1];
      j--;
      await sleep(100);
    }
    array[j + 1] = key;
    bars[j + 1].style.height = `${array[j + 1] * 3}px`;
    labels[j + 1].textContent = array[j + 1];
  }
}

async function mergeSort(start = 0, end = array.length) {
  if (end - start > 1) {
    const mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid);
    await mergeSort(mid, end);
    await merge(start, mid, end);
  }
}

async function merge(start, mid, end) {
  let bars = document.getElementsByClassName("bar");
  let labels = document.getElementsByClassName("bar-label");
  let left = array.slice(start, mid);
  let right = array.slice(mid, end);
  let k = start;
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      array[k] = left.shift();
    } else {
      array[k] = right.shift();
    }
    bars[k].style.height = `${array[k] * 3}px`;
    labels[k].textContent = array[k];
    k++;
    await sleep(100);
  }
  while (left.length) {
    array[k] = left.shift();
    bars[k].style.height = `${array[k] * 3}px`;
    labels[k].textContent = array[k];
    k++;
  }
  while (right.length) {
    array[k] = right.shift();
    bars[k].style.height = `${array[k] * 3}px`;
    labels[k].textContent = array[k];
    k++;
  }
}

async function quickSort(start = 0, end = array.length - 1) {
  if (start < end) {
    const pivotIndex = await partition(start, end);
    await quickSort(start, pivotIndex - 1);
    await quickSort(pivotIndex + 1, end);
  }
}

async function partition(start, end) {
  let bars = document.getElementsByClassName("bar");
  let labels = document.getElementsByClassName("bar-label");
  let pivot = array[end];
  let pivotIndex = start;
  for (let i = start; i < end; i++) {
    if (array[i] < pivot) {
      let temp = array[i];
      array[i] = array[pivotIndex];
      array[pivotIndex] = temp;

      bars[i].style.height = `${array[i] * 3}px`;
      bars[pivotIndex].style.height = `${array[pivotIndex] * 3}px`;

      labels[i].textContent = array[i];
      labels[pivotIndex].textContent = array[pivotIndex];

      pivotIndex++;
      await sleep(100);
    }
  }
  let temp = array[end];
  array[end] = array[pivotIndex];
  array[pivotIndex] = temp;

  bars[end].style.height = `${array[end] * 3}px`;
  bars[pivotIndex].style.height = `${array[pivotIndex] * 3}px`;

  labels[end].textContent = array[end];
  labels[pivotIndex].textContent = array[pivotIndex];

  await sleep(100);
  return pivotIndex;
}

document.getElementById("speed").addEventListener("input", (event) => {
  speed = event.target.value;
});

document.getElementById("size").addEventListener("input", (event) => {
  document.getElementById("sizeValue").textContent = event.target.value;
});

document.getElementById("generate").addEventListener("click", () => {
  const size = document.getElementById("size").value;
  generateArray(size);
});

document.getElementById("start").addEventListener("click", () => {
  const algorithm = document.getElementById("algorithm").value;
  switch (algorithm) {
    case "bubble":
      bubbleSort();
      break;
    case "selection":
      selectionSort();
      break;
    case "insertion":
      insertionSort();
      break;
    case "merge":
      mergeSort();
      break;
    case "quick":
      quickSort();
      break;
  }
});

// Generate an initial array with a default size
generateArray(20);
