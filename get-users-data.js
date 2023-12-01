document.addEventListener('DOMContentLoaded', function () {
    const swiperWrapper = document.getElementById('swiper-wrapper');
    const loader = document.getElementById('loader');

    function fetchData() {
        loader.style.display = 'block'; 

        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                renderUsers(data);
                initSwiper();
                loader.style.display = 'none'; 
            })
            .catch(error => {
                console.error(`⚠ Something went wrong: ${error.message}`);
                loader.style.display = 'none'; 
            });
    }

    function renderUsers(users) {
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.classList.add('swiper-slide');
            userCard.innerHTML = `
                <img src="https://via.placeholder.com/150" alt="${user.name}">
                <h3>${user.name}</h3>
                <p>${user.email}</p>
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

    fetchData();
});