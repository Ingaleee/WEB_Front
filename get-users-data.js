document.addEventListener('DOMContentLoaded', function () {
    const swiperWrapper = document.getElementById('swiper-wrapper');
    const loader = document.getElementById('loader');
    const errorContainer = document.getElementById('error-container');

    let requestCount = 0;

    function fetchData(userIds) {
        loader.style.display = 'block';
        errorContainer.style.display = 'none';

        const filterParam = requestCount % 2 === 0 ? 'id_gte=100' : 'id_lte=200';

        const promises = userIds.map(userId =>
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}?${filterParam}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.status}`);
                    }
                    return response.json();
                }).catch(error => {
                    console.error(`⚠ Something went wrong: ${error.message}`);
                    showError(error.message);
                }) 
        );

        Promise.all(promises)
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
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.classList.add('swiper-slide');
            userCard.innerHTML = `
                <img src="https://via.placeholder.com/150" alt="${user.name}">
                <h3>${user.name}</h3>
                <p>Email: ${user.email}</p>
                <p>Phone: ${user.phone}</p>
                <p>Website: ${user.website}</p>
            `;
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

