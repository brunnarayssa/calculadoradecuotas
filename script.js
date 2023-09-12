// Código que se ejecuta al cargar la página:
// Asignar evento al botón para calcular cuotas y cargar lista de clientes.
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('calculateBtn').addEventListener('click', calcularCuotas);
  cargarClientes();
  cargarDatosLocales(); // Llamada a la nueva función para cargar datos locales.
});

// Definición de la clase Cliente al inicio porque es necesaria para definir la estructura de un Cliente en varias funciones
class Cliente {
  constructor(nombre, apellido, montoPrestamo, numCuotas, tasaInteres, moneda) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.montoPrestamo = montoPrestamo;
    this.numCuotas = numCuotas;
    this.tasaInteres = tasaInteres;
    this.moneda = moneda;
  }
}
async function cargarDatosLocales() {
  try {
    const response = await fetch('package-lock.json');
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    console.log(data); // Por ahora, simplemente imprimimos los datos en la consola.
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

// Ahora, todas las funciones estarán declaradas aquí, después de la definición de la clase y del bloque DOMContentLoaded

function validarDatos(nombre, apellido, loanAmount, numPayments) {
  const MIN_PRESTAMO = 500;

  if (!nombre || !apellido || isNaN(loanAmount) || loanAmount <= 0 || isNaN(numPayments) || numPayments <= 0) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, completa todos los campos correctamente antes de calcular.'
    });
    return false;
  }

  if (loanAmount < MIN_PRESTAMO) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `El monto del préstamo debe ser al menos de $${MIN_PRESTAMO}.`
    });
    return false;
  }

  return true;
}

function calcularTasaInteres(numCuotas) {
  if (numCuotas <= 12) {
    return 0.05;
  } else if (numCuotas <= 24) {
    return 0.10;
  } else {
    return 0.15;
  }
}

function formatoMoneda(valor, moneda) {
  const codigoMoneda = moneda ? moneda : 'USD';
  const formatter = new Intl.NumberFormat('es', { style: 'currency', currency: codigoMoneda });
  return formatter.format(valor);
}

function calcularValorCuota(cliente) {
  const interes = cliente.montoPrestamo * cliente.tasaInteres;
  const montoTotal = cliente.montoPrestamo + interes;
  return montoTotal / cliente.numCuotas;
}

function obtenerClientesDeStorage() {
  const storedClientes = localStorage.getItem('clientes');
  return storedClientes ? JSON.parse(storedClientes) : [];
}

function guardarClientes(clientes) {
  localStorage.setItem('clientes', JSON.stringify(clientes));
}

function crearElementoCliente(cliente) {
  const clienteDiv = document.createElement('div');
  clienteDiv.className = 'cliente';

  const elementosCliente = [
    { etiqueta: 'p', contenido: `Nombre: ${cliente.nombre} ${cliente.apellido}` },
    { etiqueta: 'p', contenido: `Monto del Préstamo: ${formatoMoneda(cliente.montoPrestamo, cliente.moneda)}` },
    { etiqueta: 'p', contenido: `Número de Cuotas: ${cliente.numCuotas} Meses` },
    { etiqueta: 'p', contenido: `Tasa de Interés: ${(cliente.tasaInteres * 100).toFixed(2)}%` },
    { etiqueta: 'p', contenido: `Valor de cada cuota: ${formatoMoneda(calcularValorCuota(cliente), cliente.moneda)}` }
  ];

  elementosCliente.forEach(elemento => {
    const pElement = document.createElement(elemento.etiqueta);
    pElement.textContent = elemento.contenido;
    clienteDiv.appendChild(pElement);
  });

  return clienteDiv;
}

function mostrarClientesEnDOM(clientes) {
  const clientesContainer = document.getElementById('clientesContainer');
  clientesContainer.innerHTML = '';

  clientes.forEach(cliente => {
    const clienteDiv = crearElementoCliente(cliente);

    const btnBorrar = document.createElement('button');
    btnBorrar.textContent = 'Borrar';
    btnBorrar.addEventListener('click', () => borrarCliente(cliente));

    clienteDiv.appendChild(btnBorrar);
    clientesContainer.appendChild(clienteDiv);
  });
}

function borrarCliente(cliente) {
  const clientes = obtenerClientesDeStorage();
  const indice = clientes.findIndex(c => c.nombre === cliente.nombre && c.apellido === cliente.apellido);

  if (indice !== -1) {
    clientes.splice(indice, 1);
    guardarClientes(clientes);
    cargarClientes();
  }
}

function cargarClientes() {
  const clientes = obtenerClientesDeStorage();
  mostrarClientesEnDOM(clientes);
 
}

function calcularCuotas(event) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const loanAmount = parseFloat(document.getElementById('loanAmount').value);
  const numPayments = parseInt(document.getElementById('numPayments').value);
  const currency = document.getElementById('currency').value;

  if (!validarDatos(nombre, apellido, loanAmount, numPayments)) {
    return;
  }

  const tasaInteres = calcularTasaInteres(numPayments);
  const cliente = new Cliente(nombre, apellido, loanAmount, numPayments, tasaInteres, currency);

  const clientes = obtenerClientesDeStorage();
  clientes.push(cliente);
  guardarClientes(clientes);

  limpiarFormulario();
  cargarClientes();
}


function limpiarFormulario() {
  document.getElementById('nombre').value = '';
  document.getElementById('apellido').value = '';
  document.getElementById('loanAmount').value = '';
  document.getElementById('numPayments').value = '';
  document.getElementById('currency').value = 'USD';
}

