document.addEventListener("DOMContentLoaded", () => {
    const windows = document.querySelectorAll(".window");
    const taskbarContainer = document.getElementById("taskbar_container");
    const desktopIcons = document.querySelectorAll(".icon");
    let previousPosition = { top: 0, left: 0 };
    let currentZIndex = 1000;

    // Function to allow dragging and dropping any window to a new position
    windows.forEach(window => {
        const header = window.querySelector(".window_name");

        let isDragging = false;
        let offsetX, offsetY;

        header.addEventListener("mousedown", (e) => {
            isDragging = true;
            offsetX = e.clientX - window.offsetLeft;
            offsetY = e.clientY - window.offsetTop;
            header.style.cursor = "grabbing";
            window.style.zIndex = currentZIndex++;
        });

        document.addEventListener("mousemove", (e) => {
            if (isDragging) {
                const desktopRect = document.getElementById("desktop").getBoundingClientRect();
                const taskbarHeight = document.getElementById("taskbar").offsetHeight;
    
                let x = e.clientX - offsetX;
                let y = e.clientY - offsetY;
    
                x = Math.max(desktopRect.left, Math.min(desktopRect.right - window.offsetWidth, x));
    
                y = Math.max(desktopRect.top, Math.min(desktopRect.bottom - window.offsetHeight, y));
    
                window.style.left = `${x}px`;
                window.style.top = `${y}px`;

                previousPosition = { top: y, left: x };
            }
        });

        document.addEventListener("mouseup", () => {
            if (isDragging) {
                isDragging = false;
                header.style.cursor = "grab";
            }
        });
    });

    // If any icon is clicked, calls openApp function to open the window of the related app
    desktopIcons.forEach(icon => {
        icon.addEventListener("dblclick", () => {
            const appId = icon.dataset.id;
            const appWindow = document.getElementById(`app-${appId}`);
            if (appWindow) {
                openApp(appWindow, appId, icon);
            }
        });
    });

    // Launches an app associated with an icon
    function openApp(appWindow, appId, icon) {

        const existingTaskbarIcon = taskbarContainer.querySelector(`.taskbar_icon[data-id="${appId}"]`);
        if (existingTaskbarIcon) {
            if (appWindow.classList.contains("show")) {
                return;
            }
            appWindow.classList.add("show");
            appWindow.style.zIndex = currentZIndex++;
            return;
        }
    
        if (!appWindow.dataset.id) {
            appWindow.dataset.id = appId;
        }
    
        const desktopRect = document.getElementById("desktop").getBoundingClientRect();
        const windowWidth = appWindow.offsetWidth;
        const windowHeight = appWindow.offsetHeight;
    
        const x = desktopRect.left + (desktopRect.width - windowWidth) / 2;
        const y = desktopRect.top + (desktopRect.height - windowHeight) / 2;
    
        appWindow.style.left = `${x}px`;
        appWindow.style.top = `${y}px`;
    
        appWindow.classList.add("show");
        appWindow.style.zIndex = currentZIndex++;
    
        const taskbarIcon = document.createElement("div");
        taskbarIcon.className = "taskbar_icon";
        taskbarIcon.dataset.id = appId;
        taskbarIcon.innerHTML = `
            <img class="taskbarIcon_image" src="${icon.querySelector("img").src}" alt="${icon.textContent.trim()}">
        `;
        taskbarIcon.addEventListener("click", () => { 
            if (appWindow.classList.contains("show")) {
                appWindow.classList.remove("show");
            } else {
                appWindow.classList.add("show");
                appWindow.style.zIndex = currentZIndex++;
            }            
        });
    
        taskbarContainer.appendChild(taskbarIcon);
    }
     
    //what happens if user clicked "collapse" button
    document.querySelectorAll(".button.collapse").forEach(collapseButton => {
        collapseButton.addEventListener("click", () => {
            const appWindow = collapseButton.closest(".window");
            if (appWindow) {
                appWindow.classList.remove("show");
            }
        });
    });

    //what happens if user clicked "close" button
    document.querySelectorAll(".button.close").forEach(closeButton => {
      closeButton.addEventListener("click", () => {
          const appWindow = closeButton.closest(".window");
          if (appWindow) {
              appWindow.classList.remove("show");

              const appId = appWindow.dataset.id;
              const taskbarIcon = taskbarContainer.querySelector(`.taskbar_icon[data-id="${appId}"]`);
              if (taskbarIcon) {
                  taskbarIcon.remove();
              }
          }
      });
    });

    //what happens if user clicked "fullscreen" button
    document.querySelectorAll(".button.fullscreen").forEach(fullscreenButton => {
      fullscreenButton.addEventListener("click", () => {
          const appWindow = fullscreenButton.closest(".window");
          if (appWindow) {
            const appIsInFullscreen = appWindow.dataset.fullscreen === "true";

            if(!appIsInFullscreen){
                previousPosition.top = appWindow.offsetTop;
                previousPosition.left = appWindow.offsetLeft;

                const desktopRect = document.getElementById("desktop").getBoundingClientRect();
                appWindow.classList.add("fullscreen");
                appWindow.dataset.fullscreen = "true";
                appWindow.style.top = "0px";
                appWindow.style.left = "0px";
                appWindow.style.width = `${desktopRect.width}px`;
                appWindow.style.height = `${desktopRect.height}px`;
                appWindow.style.zIndex = currentZIndex++;
                fullscreenButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen-exit" viewBox="0 0 16 16"><path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5m5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5M0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5m10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0z"/></svg>';
            }
            else{
                appWindow.classList.remove("fullscreen");
                appWindow.dataset.fullscreen = "false";
                appWindow.style.width = "";  
                appWindow.style.height = "";
                appWindow.style.top = `${previousPosition.top}px`;
                appWindow.style.left = `${previousPosition.left}px`;
                fullscreenButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen" viewBox="0 0 16 16"><path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5M.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5"/></svg>';                
            }
          }
      });
  });
});
