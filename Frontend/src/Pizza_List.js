let pizzas = [
    {
        id: 1,
        icon: 'assets/images/pizza_7.jpg',
        title: "Імпреза",
        type: 'М’ясна піца',
        content: {
            meat: ['балик', 'салямі'],
            chicken: ['куриця'],
            cheese: ['сир моцарелла', 'сир рокфорд'],
            pineapple: ['ананаси'],
            additional: ['томатна паста', 'петрушка']
        },
        small_size: {
            weight: 370,
            size: 30,
            price: 99
        },
        big_size: {
            weight: 660,
            size: 40,
            price: 169
        },
        is_new: true,
        is_popular: true
    },
    {
        id: 2,
        icon: 'assets/images/pizza_2.jpg',
        title: "BBQ",
        type: 'М’ясна піца',
        content: {
            meat: ['мисливські ковбаски', 'ковбаски папероні', 'шинка'],
            cheese: ['сир домашній'],
            mushroom: ['шампінйони'],
            additional: ['петрушка', 'оливки']
        },
        small_size:{
            weight: 460,
            size: 30,
            price: 139
        },
        big_size:{
            weight: 840,
            size: 40,
            price: 199
        },
        is_popular:true
    },
    {
        id: 3,
        icon: 'assets/images/pizza_1.jpg',
        title: "Міксовий поло",
        type: 'М’ясна піца',
        content: {
            meat: ['вітчина', 'куриця копчена'],
            cheese: ['сир моцарелла'],
            pineapple: ['ананаси'],
            additional: ['кукурудза', 'петрушка', 'соус томатний']
        },
        small_size:{
            weight: 430,
            size: 30,
            price: 115
        },
        big_size:{
            weight: 780,
            size: 40,
            price: 179
        }
    },
    // Додайте інші піци тут
    {
        id: 4,
        icon: 'assets/images/pizza_4.jpg',
        title: "Гавайська",
        type: 'З ананасами',
        content: {
            meat: ['куриця', 'шинка'],
            cheese: ['сир моцарелла'],
            pineapple: ['ананаси'],
            additional: ['соус томатний', 'петрушка']
        },
        small_size:{
            weight: 420,
            size: 30,
            price: 125
        },
        big_size:{
            weight: 780,
            size: 40,
            price: 189
        },
        is_popular: true
    },
    {
        id: 5,
        icon: 'assets/images/pizza_5.jpg',
        title: "Супер пепероні",
        type: 'М’ясна піца',
        content: {
            meat: ['ковбаски папероні'],
            cheese: ['сир моцарелла'],
            additional: ['соус томатний', 'орегано']
        },
        small_size:{
            weight: 410,
            size: 30,
            price: 130
        },
        big_size:{
            weight: 800,
            size: 40,
            price: 199
        },
        is_new: true,
        is_popular: true
    },
    {
        id: 6,
        icon: 'assets/images/pizza_6.jpg',
        title: "Вегетаріанська",
        type: 'Вега',
        content: {
            cheese: ['сир моцарелла', 'сир рокфор'],
            vegetable: ['помідори', 'перець', 'цибуля', 'оливки'],
            additional: ['соус томатний', 'орегано']
        },
        small_size:{
            weight: 400,
            size: 30,
            price: 120
        },
        big_size:{
            weight: 750,
            size: 40,
            price: 180
        },
        is_popular: true
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const pizzaListElement = document.getElementById('pizza-list');

    // Функція для додавання однієї піци до списку
    function addPizzaToPage(pizza) {
        let pizzaItem = document.createElement('div');
        pizzaItem.classList.add('pizza-item');

        let pizzaImage = document.createElement('img');
        pizzaImage.src = pizza.icon;
        pizzaImage.alt = pizza.title + ' піца';
        pizzaItem.appendChild(pizzaImage);

        let pizzaTitle = document.createElement('div');
        pizzaTitle.classList.add('pizza-title');
        pizzaTitle.textContent = pizza.title;
        pizzaItem.appendChild(pizzaTitle);

        let pizzaType = document.createElement('div');
        pizzaType.classList.add('pizza-type');
        pizzaType.textContent = pizza.type;
        pizzaItem.appendChild(pizzaType);

        let ingredients = document.createElement('div');
        ingredients.classList.add('ingredients');
        ingredients.textContent = `Інгредієнти: ${Object.values(pizza.content).flat().join(', ')}`;
        pizzaItem.appendChild(ingredients);

        let sizes = document.createElement('div');
        sizes.classList.add('sizes');

        let smallSize = document.createElement('div');
        smallSize.classList.add('size');
        smallSize.innerHTML = `
            <label>Маленька (${pizza.small_size.size} см, ${pizza.small_size.weight} г)</label>
            <button class="buy-button">Купити за ${pizza.small_size.price} грн</button>
        `;
        sizes.appendChild(smallSize);

        let bigSize = document.createElement('div');
        bigSize.classList.add('size');
        bigSize.innerHTML = `
            <label>Велика (${pizza.big_size.size} см, ${pizza.big_size.weight} г)</label>
            <button class="buy-button">Купити за ${pizza.big_size.price} грн</button>
        `;
        sizes.appendChild(bigSize);

        pizzaItem.appendChild(sizes);

        if (pizza.is_new) {
            let newBadge = document.createElement('div');
            newBadge.classList.add('new-badge');
            newBadge.textContent = 'Нова';
            pizzaItem.appendChild(newBadge);
        }

        if (pizza.is_popular) {
            let popularBadge = document.createElement('div');
            popularBadge.classList.add('popular-badge');
            popularBadge.textContent = 'Популярна';
            pizzaItem.appendChild(popularBadge);
        }

        pizzaListElement.appendChild(pizzaItem);
    }

    // Додати всі піци до сторінки
    pizzas.forEach(function(pizza) {
        addPizzaToPage(pizza);
    });

    // Логіка для фільтрації піц за категоріями (усе, м'ясні, з ананасами, з грибами, з морепродуктами, вега)
    const pizzaCategoryButtons = document.querySelectorAll('.pizza-category');

    pizzaCategoryButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            let category = button.getAttribute('data-category');
            filterPizzasByCategory(category);
        });
    });

    function filterPizzasByCategory(category) {
        let filteredPizzas = [];

        if (category === 'all') {
            filteredPizzas = pizzas;
        } else {
            filteredPizzas = pizzas.filter(function(pizza) {
                return pizza.type.toLowerCase().includes(category);
            });
        }

        // Очищення списку піц перед відображенням нових
        pizzaListElement.innerHTML = '';

        // Додавання відфільтрованих піц на сторінку
        filteredPizzas.forEach(function(pizza) {
            addPizzaToPage(pizza);
        });

        // Оновлення лічильника піц
        document.getElementById('pizza-count').textContent = filteredPizzas.length;
    }

    // Оновлення лічильника піц при завантаженні сторінки
    document.getElementById('pizza-count').textContent = pizzas.length;
});
