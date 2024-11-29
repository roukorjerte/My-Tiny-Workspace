const desktop = document.getElementById("desktop");
const icons = document.querySelectorAll(".icon");

let draggedIcon = null;
let currentIcon = null;
const occupiedCells = new Set();

icons.forEach((icon, index) => {

    // If the icon was clicked applies the "pressed" style to it
    icon.addEventListener("click", (event) => {
        event.stopPropagation(); 
        toggleBackgroundForIcon(index);
    });
  
    icon.addEventListener("dragstart", () => {
        // Mark the starting position as unoccupied
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

    //If icon is hovered applies "hovered" style to it
    icon.addEventListener('mouseenter', () => {
        onHoverStyle(index);
    });

    //If icon is not hovered removes "hovered" style from it
    icon.addEventListener('mouseleave', () => {
        offHoverStyle(index);
    });
});

// this event checks if there was clicks anywhere on the screen, and if yes removes "pressed"style from the last selected icon
document.addEventListener("click", () => {
    if (currentIcon !== null) {
        icons[currentIcon].classList.remove("pressed");
        currentIcon = null;
    }
});


// Prevent default behavior on dragover
desktop.addEventListener("dragover", (event) => {
    event.preventDefault();
});

// Handle drop event
desktop.addEventListener("drop", (event) => {
    event.preventDefault();

    if (!draggedIcon) return; // Ensure there's an icon being dragged

    // Get the desktop bounding box
    const desktopRect = desktop.getBoundingClientRect();

    // Get the drop position relative to the desktop
    const dropX = event.clientX - desktopRect.left;
    const dropY = event.clientY - desktopRect.top;

    // Calculate the closest grid cell position
    const cellSize = 110 + 10; // Icon size + gap
    const column = Math.round(dropX / cellSize);
    const row = Math.round(dropY / cellSize);

    const cellKey = `${column + 1},${row + 1}`; // Generate a unique key for the cell

    // Check if the cell is already occupied
    if (!occupiedCells.has(cellKey)) {
        // Update the position of the dragged icon in the grid
        draggedIcon.style.gridColumnStart = column + 1; // 1-based index
        draggedIcon.style.gridRowStart = row + 1;

        // Mark the cell as occupied
        occupiedCells.add(cellKey);
    } else {
        // If occupied, reset the icon to its previous position
        alert("This cell is already occupied!");
    }
});

//function that adds or removes the "pressed" style to the icon
function toggleBackgroundForIcon(index) {
    //if user clicks on the icon 2nd time, the "pressed" style is removed, the currentIcon is now null
    if (currentIcon === index) {
      icons[currentIcon].classList.remove("pressed");
      currentIcon = null; 
    } else {

        //if there is already clicked icon, it removes the stelt "pressed" from it, and applies style to the currently clicked icon
      if (currentIcon !== null) {
        icons[currentIcon].classList.remove("pressed");
        icons[index].classList.add("pressed");
        currentIcon = index; 
      }

      //if there are no icons that has style "pressed", it applies the style to the current icon and sets it currentIcon
      else{
        icons[index].classList.add("pressed");
      currentIcon = index; 
      }
    }
};

function onHoverStyle(index) {
    icons[index].classList.add("hovered");
}

function offHoverStyle(index) {
    icons[index].classList.remove("hovered");
}