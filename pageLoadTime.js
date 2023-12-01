const startTime = new Date().getTime(); 

document.addEventListener('DOMContentLoaded', function () {
    const endTime = new Date().getTime();
    var loadTime = endTime - startTime;
    var loadTimeInSeconds = (loadTime / 1000).toFixed(3);

    var footer = document.querySelector('.footer');
    var loadTimeElement = document.createElement('p');
    loadTimeElement.textContent = 'Время загрузки страницы: ' + loadTimeInSeconds + ' секунд.';
    footer.appendChild(loadTimeElement);
}); 