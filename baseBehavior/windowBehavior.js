document.addEventListener('DOMContentLoaded', () => {
    const windows = document.querySelectorAll(".window");
    const taskbarContainer = document.getElementById('taskbar_container');
    const desktopIcons = document.querySelectorAll('.icon');
    const closeButton = document.querySelectorAll(".button.close");
  
    //function allowing to drag and drop any window to new place
    windows.forEach(window => {
      const header = window.querySelector(".window_name");
      
      let isDragging = false;
      let offsetX, offsetY;
  
      header.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - window.offsetLeft;
        offsetY = e.clientY - window.offsetTop;
        
        header.style.cursor = "grabbing";
      });
  
      document.addEventListener("mousemove", (e) => {
        if (isDragging) {
          const x = e.clientX - offsetX;
          const y = e.clientY - offsetY;
  
          window.style.left = `${x}px`;
          window.style.top = `${y}px`;
        }
      });
  
      document.addEventListener("mouseup", () => {
        isDragging = false;
        header.style.cursor = "grab";
      });
    });

    //if any icon was clicked, calls openApp function to open window of related to the icon app
    desktopIcons.forEach(icon => {
        icon.addEventListener('dblclick', () => {
          const appId = icon.dataset.id;
          const appWindow = document.getElementById(`app-${appId}`);
          if (appWindow) {
            openApp(appWindow, appId, icon);
          }
        });
    });
    
    //launches an app associated with an icon
    function openApp(appWindow, appId, icon) {
        appWindow.classList.add('show');
        appWindow.style.zIndex = 1000;
    
        //adding icon to the taskbar if its not present
        const existingTaskbarIcon = taskbarContainer.querySelector(`.taskbar_icon[data-id="${appId}"]`);
        if (!existingTaskbarIcon) {
          const taskbarIcon = document.createElement('div');
          taskbarIcon.className = 'taskbar_icon';
          taskbarIcon.dataset.id = appId;
          taskbarIcon.innerHTML = `<img class="taskbarIcon_image" src="${icon.querySelector('img').src}" alt="${icon.textContent.trim()}">`;
          taskbarIcon.addEventListener('click', () => toggleAppWindow(appWindow, taskbarIcon));
          taskbarContainer.appendChild(taskbarIcon);
        }
    }
    
    //function showing or hiding the window
    function toggleAppWindow(appWindow) {
        if (appWindow.classList.contains("show")) {
            appWindow.classList.remove('show');
        } else {
            appWindow.classList.add('show');
        }
    }

    document.querySelectorAll('.button.collapse').forEach(collapseButton => {
      collapseButton.addEventListener('click', () => {
          const appWindow = collapseButton.closest('.window'); 
          if (appWindow) {
              appWindow.classList.remove('show'); 
          }
      });
  });
  });