document.addEventListener('DOMContentLoaded', () => {
    const windows = document.querySelectorAll(".window");
    const taskbarContainer = document.getElementById('taskbar_container');
    const desktopIcons = document.querySelectorAll('.icon');
    
    
  
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

    desktopIcons.forEach(icon => {
        icon.addEventListener('dblclick', () => {
          const appId = icon.dataset.id;
          const appWindow = document.getElementById(`app-${appId}`);
          if (appWindow) {
            openApp(appWindow, appId, icon);
          }
        });
      });
    
      function openApp(appWindow, appId, icon) {
        // Показать окно приложения
        appWindow.classList.add('show');
        appWindow.style.zIndex = 1000; // Переместить на передний план
    
        // Добавить иконку в панель задач, если ее там нет
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
    
      function toggleAppWindow(appWindow, taskbarIcon) {
        // Показать или свернуть окно приложения
        if (appWindow.classList.contains("show")) {
            appWindow.classList.remove('show');
        } else {
            appWindow.classList.add('show');
        }
      }

    
  });