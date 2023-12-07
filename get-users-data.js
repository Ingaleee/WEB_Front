document.addEventListener('DOMContentLoaded', function () {
    const swiperWrapper = document.getElementById('swiper-wrapper');
    const loader = document.getElementById('loader');
    const errorContainer = document.getElementById('error-container');

    let requestCount = 0;

    function fetchData(userIds) {
        loader.style.display = 'block';
        errorContainer.style.display = 'none';

        const filterParam = `id_in=${userIds.join(',')}`;

        fetch(`https://jsonplaceholder.typicode.com/users?${filterParam}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(usersData => {
                renderUsers(usersData);
                initSwiper();
                loader.style.display = 'none';
            })
            .catch(error => {
                console.error(`⚠ Something went wrong: ${error.message}`);
                showError(error.message);
                loader.style.display = 'none';
            });

        requestCount++;
    }

    const randomUserIds = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10) + 1);

    fetchData(randomUserIds);

    function renderUsers(users) {
        const userCardTemplate = document.getElementById('user-card-template');
    
        users.forEach(user => {
            const userCard = document.importNode(userCardTemplate.content, true);
            const userCardElement = userCard.querySelector('.swiper-slide');
    
            userCardElement.querySelector('img').setAttribute('alt', user.name);
            userCardElement.querySelector('h3').textContent = user.name;
            userCardElement.querySelector('.email').textContent = `Email: ${user.email}`;
            userCardElement.querySelector('.phone').textContent = `Phone: ${user.phone}`;
            userCardElement.querySelector('.website').textContent = `Website: ${user.website}`;
    
            swiperWrapper.appendChild(userCard);
        });
    }

    function initSwiper() {
        const mySwiper = new Swiper('.swiper-container', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 5000,
            },
        });
    }

    function showError(errorMessage) {
        if (errorContainer) {
            errorContainer.textContent = errorMessage;
            errorContainer.style.display = 'block';
        }
    }
});