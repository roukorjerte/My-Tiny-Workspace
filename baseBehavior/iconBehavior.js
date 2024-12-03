const desktop = document.getElementById("desktop");
const icons = document.querySelectorAll(".icon");

let draggedIcon = null;
let currentIcon = null;
const occupiedCells = new Set();

const ICON_SIZE = 110;
const GAP = 10;

const initialPositions = new Map();

function calculateColumnsCount() {
    const desktopWidth = desktop.offsetWidth;
    const cellSize = ICON_SIZE + GAP;
    return Math.floor(desktopWidth / cellSize);
}

function calculateRowsCount() {
    const desktopHeight = desktop.offsetHeight;
    const cellSize = ICON_SIZE + GAP;
    return Math.floor(desktopHeight / cellSize);
}

function positionIcons() {
    const rowsCount = calculateRowsCount();
    let currentColumn = 0;
    let currentRow = 0;

    icons.forEach((icon, index) => {
        const initialColumn = currentColumn + 1;
        const initialRow = currentRow + 1;
        initialPositions.set(icon, { column: initialColumn, row: initialRow });

        icon.style.gridColumnStart = initialColumn;
        icon.style.gridRowStart = initialRow;

        currentRow++;

        if (currentRow >= rowsCount) {
            currentRow = 0;
            currentColumn++;
        }

        occupiedCells.add(`${initialColumn},${initialRow}`);
    });
}

window.addEventListener("resize", positionIcons);
positionIcons();

icons.forEach((icon, index) => {
    icon.addEventListener("click", (event) => {
        event.stopPropagation(); 
        togglePressedState(index);
    });

    icon.addEventListener("dragstart", () => {
        const startColumn = icon.style.gridColumnStart || "auto";
        const startRow = icon.style.gridRowStart || "auto";
        if (startColumn !== "auto" && startRow !== "auto") {
            const cellKey = `${startColumn},${startRow}`;
            occupiedCells.delete(cellKey);
        }
        draggedIcon = icon;
        icon.classList.add("dragging");
    });

    icon.addEventListener("dragend", () => {
        icon.classList.remove("dragging"); 
        draggedIcon = null;
    });

    icon.addEventListener("mouseenter", () => {
        applyHoverStyle(index);
    });

    icon.addEventListener("mouseleave", () => {
        removeHoverStyle(index);
    });
});

document.addEventListener("click", () => {
    if (currentIcon !== null) {
        icons[currentIcon].classList.remove("pressed");
        currentIcon = null;
    }
});

desktop.addEventListener("dragover", (event) => {
    event.preventDefault();
});

desktop.addEventListener("drop", (event) => {
    event.preventDefault();

    if (!draggedIcon) return;

    const desktopRect = desktop.getBoundingClientRect();
    const dropX = event.clientX - desktopRect.left;
    const dropY = event.clientY - desktopRect.top;

    const column = Math.floor(dropX / (ICON_SIZE + GAP));
    const row = Math.floor(dropY / (ICON_SIZE + GAP));

    const maxColumns = calculateColumnsCount();
    const maxRows = calculateRowsCount();

    if (column >= maxColumns || row >= maxRows) {
        return;
    }

    const cellKey = `${column + 1},${row + 1}`;

    if (occupiedCells.has(cellKey)) {
        alert("This cell is already occupied!");
    } else {
        draggedIcon.style.gridColumnStart = column + 1;
        draggedIcon.style.gridRowStart = row + 1;

        occupiedCells.add(cellKey);

        initialPositions.set(draggedIcon, { column: column + 1, row: row + 1 });
    }
});

function togglePressedState(index) {
    if (currentIcon === index) {
        icons[currentIcon].classList.remove("pressed");
        currentIcon = null;
    } else {
        if (currentIcon !== null) {
            icons[currentIcon].classList.remove("pressed");
        }
        icons[index].classList.add("pressed");
        currentIcon = index;
    }
}

function applyHoverStyle(index) {
    icons[index].classList.add("hovered");
}

function removeHoverStyle(index) {
    icons[index].classList.remove("hovered");
}
