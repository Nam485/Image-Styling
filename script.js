document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('image');
            img.src = e.target.result;
            img.onload = function() {
                updateDimensions();
            };
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('imageContainer').addEventListener('click', function() {
    document.getElementById('fileInput').click();
});

const heightRange = document.getElementById('heightRange');
const widthRange = document.getElementById('widthRange');
const borderRadiusRange = document.getElementById('borderRadiusRange');
const img = document.getElementById('image');
const xRange = document.getElementById('xRange');
const yRange = document.getElementById('yRange');
const dimensionsDiv = document.getElementById('dimensions');
const copyButton = document.getElementById('copyButton');

widthRange.addEventListener('input', function() {
    const size = widthRange.value;
    img.style.width = `${size}px`;
    updateDimensions();
});

heightRange.addEventListener('input', function() {
    const size = heightRange.value;
    img.style.height = `${size}px`;
    updateDimensions();
});

borderRadiusRange.addEventListener('input', function() {
    img.style.borderRadius = `${borderRadiusRange.value}%`;
    updateDimensions();
});

document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function(event) {
        const objectFitValue = event.target.id;
        img.style.objectFit = objectFitValue;
        updateDimensions();
    });
});

xRange.addEventListener('input', function() {
    const x = xRange.value;
    const y = yRange.value;
    img.style.objectPosition = `${x}% ${y}%`;
    updateDimensions();
});

yRange.addEventListener('input', function() {
    const x = xRange.value;
    const y = yRange.value;
    img.style.objectPosition = `${x}% ${y}%`;
    updateDimensions();
});

document.getElementById('imageContainer').addEventListener('dragover', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.add('dragover');
});

document.getElementById('imageContainer').addEventListener('dragleave', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.remove('dragover');
});

document.getElementById('imageContainer').addEventListener('drop', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.remove('dragover');
    console.log(event)
    const file = event.dataTransfer.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('image');
            img.src = e.target.result;
            img.onload = function() {
                updateDimensions();
            };
        };
        reader.readAsDataURL(file);
    }
});

function updateDimensions() {
    dimensionsDiv.textContent = `width: ${img.style.width}; height: ${img.style.height}; border-radius: ${img.style.borderRadius}; object-fit: ${img.style.objectFit}; object-position: ${img.style.objectPosition};`;
}

copyButton.addEventListener('click', function() {
    const cssText = dimensionsDiv.textContent;
    navigator.clipboard.writeText(cssText).then(function() {
        alert('CSS copied to clipboard!');
    }, function() {
        alert('Failed to copy CSS.');
    });
});
