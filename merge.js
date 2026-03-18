let array = [];
let delay = 50;

const container = document.getElementById("array-container");

function generateArray(size = 100) {
  array = [];
  container.innerHTML = "";

  for (let i = 0; i < size; i++) {
    let value = Math.floor(Math.random() * 300) + 10;
    array.push(value);

    const bar = document.createElement("div");
    bar.style.height = `${value}px`;
    bar.classList.add("bar");
    container.appendChild(bar);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function updateBars() {
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    bars[i].style.height = `${array[i]}px`;
  }
}

async function merge(l, m, r) {
  let left = array.slice(l, m + 1);
  let right = array.slice(m + 1, r + 1);

  let i = 0, j = 0, k = l;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      array[k++] = left[i++];
    } else {
      array[k++] = right[j++];
    }
    updateBars();
    await sleep(delay);
  }

  while (i < left.length) {
    array[k++] = left[i++];
    updateBars();
    await sleep(delay);
  }

  while (j < right.length) {
    array[k++] = right[j++];
    updateBars();
    await sleep(delay);
  }
}

async function mergeSort(l, r) {
  if (l >= r) return;

  let m = Math.floor((l + r) / 2);

  await mergeSort(l, m);
  await mergeSort(m + 1, r);
  await merge(l, m, r);
}

async function startSort() {
  delay = 101 - document.getElementById("speed").value;
  await mergeSort(0, array.length - 1);
}

// Initial array
generateArray();
