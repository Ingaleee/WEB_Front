const userMenu = document.querySelector('.user-menu');
const contextMenu = document.querySelector('.context-menu');
contextMenu.style.display = 'none';

userMenu.addEventListener('click', (event) => {
    event.stopPropagation(); 
    contextMenu.style.display = 'block';
});

document.addEventListener('click', (event) => {
    if (contextMenu.style.display === 'block') {
        contextMenu.style.display = 'none';
    }
});

contextMenu.addEventListener('click', (event) => {
    event.stopPropagation(); 
});

