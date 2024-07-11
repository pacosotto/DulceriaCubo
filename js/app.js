//Variables
const listaDulces = document.querySelector("#lista-dulces");
const carritoDulces = document.querySelector("#carrito-dulces");
let carrito = [];

//Eventos
eventListeners();

function eventListeners() {
  document.addEventListener("DOMContentLoaded", llenarListaDulces);
  listaDulces.addEventListener("click", agregarDulceAlCarrito);
  carritoDulces.addEventListener("click", eliminarDulces);
  carrito = JSON.parse(localStorage.getItem("carritoDulces") || []);
  mostrarCarrito();
}

//Funciones
function llenarListaDulces() {
  dulces.forEach((dulce) => {
    const { id, nombre } = dulce;

    const itemDulce = document.createElement("li");
    const pDulce = document.createElement("p");
    const btnAgregarDulce = document.createElement("button");

    pDulce.textContent = nombre + " ";
    btnAgregarDulce.dataset.id = id;
    btnAgregarDulce.textContent = "+";
    btnAgregarDulce.classList.add("agregar-carrito");
    btnAgregarDulce.id = `btn${nombre}`;

    itemDulce.appendChild(pDulce);
    pDulce.appendChild(btnAgregarDulce);
    listaDulces.appendChild(itemDulce);
  });
}

function agregarDulceAlCarrito(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const dulceSeleccionado = e.target.parentElement.parentElement;
    leerDatos(dulceSeleccionado);
  }
}

function leerDatos(dulce) {
  const informacion = {
    nombre: dulce.querySelector("p").textContent,
    id: dulce.querySelector("button").getAttribute("data-id"),
    cantidad: 1,
  };

  if (informacion.nombre.includes("+")) {
    informacion.nombre = informacion.nombre.replace("+", "");
  }

  const existe = carrito.some((dulce) => dulce.id === informacion.id);
  if (existe) {
    const dulces = carrito.map((dulce) => {
      if (dulce.id === informacion.id) {
        dulce.cantidad++;
        return dulce;
      } else {
        return dulce;
      }
    });
    carrito = [...dulces];
  } else {
    carrito = [...carrito, informacion];
  }

  mostrarCarrito();
}

function mostrarCarrito() {
  limpiarHTML();

  carrito.forEach((dulce) => {
    const { id, nombre, cantidad } = dulce;
    const li = document.createElement("li");
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    const button = document.createElement("button");

    p.textContent = nombre;
    strong.textContent = ` - Cantidad: ${cantidad} `;
    button.textContent = " Remover ";
    button.classList.add("removerDulce");
    button.dataset.id = id;

    li.appendChild(p);
    p.appendChild(strong);
    p.appendChild(button);

    carritoDulces.appendChild(li);
  });

  const carritoJSON = JSON.stringify(carrito);
  localStorage.setItem("carritoDulces", carritoJSON);
}

function limpiarHTML() {
  while (carritoDulces.firstChild) {
    carritoDulces.removeChild(carritoDulces.firstChild);
  }
}

function eliminarDulces(e) {
  if (e.target.classList.contains("removerDulce")) {
    const dulceId = e.target.getAttribute("data-id");

    carrito.forEach((dulce) => {
      if (dulce.id === dulceId && dulce.cantidad > 1) {
        dulce.cantidad--;
        mostrarCarrito();
      } else if (dulce.id === dulceId && dulce.cantidad === 1) {
        carrito = carrito.filter((dulce) => dulce.id !== dulceId);
        mostrarCarrito();
      }
    });
  }
}
