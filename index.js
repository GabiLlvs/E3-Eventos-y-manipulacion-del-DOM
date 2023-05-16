document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("pizzaForm");
  const input = document.getElementById("pizzaId");
  const resultContainer = document.getElementById("resultContainer");
  let lastPizzaId = localStorage.getItem("lastPizzaId");

  const renderPizzaCard = (pizza) => {
    resultContainer.innerHTML = `
      <div class="card">
        <h2>${pizza.nombre}</h2>
        <img src="${pizza.imagen}" alt="${pizza.nombre}">
        <p>Precio: $${pizza.precio.toFixed(2)}</p>
      </div>
    `;
  };

  const renderError = (message) => {
    resultContainer.innerHTML = `
  <div class="error-box">
  <p class="error">${message}</p>
</div>
  `;
  };

  const getPizzaById = (id) => {
    return pizzas.find((pizza) => pizza.id === id);
  };

  const searchPizza = (pizzaId) => {
    const pizza = getPizzaById(pizzaId);

    if (pizza) {
      renderPizzaCard(pizza);
      localStorage.setItem("lastPizzaId", pizzaId);
    } else {
      renderError("No se encontró ninguna pizza con ese número.");
    }
  };

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const pizzaId = parseInt(input.value);

    if (isNaN(pizzaId)) {
      renderError("Debes ingresar un número válido.");
      return;
    }

    searchPizza(pizzaId);
  });

  const pizzas = [
    {
      id: 1,
      nombre: "Pizza Muzzarella",
      precio: 500,
      ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
      imagen: "./img/muzzarella.png",
    },

    {
      id: 2,
      nombre: "Pizza Fugazzeta",
      precio: 1500,
      ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
      imagen: "./img/cebolla.png",
    },

    {
      id: 3,
      nombre: "Pizza 4 Quesos",
      precio: 1380,
      ingredientes: [
        "Muzzarella",
        "Tomate",
        "Queso Azul",
        "Parmesano",
        "Roquefort",
      ],
      imagen: "./img/4quesos.png",
    },

    {
      id: 4,
      nombre: "Pizza Especial",
      precio: 1000,
      ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
      imagen: "./img/especial.png",
    },

    {
      id: 5,
      nombre: "Pizza Tropical",
      precio: 600,
      ingredientes: ["Muzzarella", "Tomate", "Anana"],
      imagen: "./img/anana.png",
    },
  ];

  if (lastPizzaId) {
    const lastPizza = getPizzaById(parseInt(lastPizzaId));
    if (lastPizza) {
      renderPizzaCard(lastPizza);
    } else {
      localStorage.removeItem("lastPizzaId");
    }
  }
});
