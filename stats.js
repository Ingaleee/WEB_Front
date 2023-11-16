document.addEventListener('DOMContentLoaded', function () {
    var currentPage = window.location.pathname;
    var menuItems = document.querySelectorAll('.nav_li');

    for (var i = 0; i < menuItems.length; i++) {
        var menuItem = menuItems[i];
        var link = menuItem.querySelector('a').getAttribute('href');

        if (currentPage.endsWith(link)) {
            menuItem.classList.add('active');
        }
    }
});