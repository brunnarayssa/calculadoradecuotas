class Cliente {
  constructor(nombre, apellido, montoPrestamo, numCuotas) {
    // Constructor de la clase Cliente que inicializa las propiedades del cliente
    this.nombre = nombre;
    this.apellido = apellido;
    this.montoPrestamo = montoPrestamo;
    this.numCuotas = numCuotas;
  }
}  //testando esse parte de cima do codigo.

window.addEventListener('DOMContentLoaded', () => {
  const calculateBtn = document.getElementById('calculateBtn');
  calculateBtn.addEventListener('click', calcularCuotas);

  cargarClientes();
});

function cargarClientes() {
  const storedClientes = localStorage.getItem('clientes');
  if (storedClientes) {
    const clientes = JSON.parse(storedClientes);
    mostrarClientesEnDOM(clientes);
  }
}

function guardarClientes(clientes) {
  localStorage.setItem('clientes', JSON.stringify(clientes));
  mostrarClientesEnDOM(clientes);
}

function mostrarClientesEnDOM(clientes) {
  const clientesContainer = document.getElementById('clientesContainer');
  clientesContainer.innerHTML = '';

  clientes.forEach(cliente => {
    const clienteDiv = document.createElement('div');
    clienteDiv.className = 'cliente';

    const nombreApellido = document.createElement('p');
    nombreApellido.textContent = `Nombre: ${cliente.nombre} ${cliente.apellido} `;

    const montoPrestamo = document.createElement('p');
    montoPrestamo.textContent = `Monto del Préstamo: ${cliente.montoPrestamo}  $`;

    const numCuotas = document.createElement('p');
    numCuotas.textContent = `Número de Cuotas: ${cliente.numCuotas} Meses`;

    const valorCuota = document.createElement('p');
    const valorCuotaTexto = (cliente.montoPrestamo / cliente.numCuotas).toFixed(2);
    valorCuota.textContent = `Valor de cada cuota: ${valorCuotaTexto}   $`;

    clienteDiv.appendChild(nombreApellido);
    clienteDiv.appendChild(montoPrestamo);
    clienteDiv.appendChild(numCuotas);
    clienteDiv.appendChild(valorCuota);

    clientesContainer.appendChild(clienteDiv);
  });
}

function calcularCuotas(event) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const loanAmount = parseFloat(document.getElementById('loanAmount').value);
  const numPayments = parseInt(document.getElementById('numPayments').value);

  if (!nombre || !apellido || isNaN(loanAmount) || isNaN(numPayments)) {
    alert('Por favor, completa todos los campos correctamente antes de calcular.');
    return;
  }

  const cliente = new Cliente(nombre, apellido, loanAmount, numPayments);

  const storedClientes = localStorage.getItem('clientes');
  let clientes = [];

  if (storedClientes) {
    clientes = JSON.parse(storedClientes);
  }

  clientes.push(cliente);
  guardarClientes(clientes); // tentando guardar  la lista actualizada de clientes


  document.getElementById('nombre').value = '';
  document.getElementById('apellido').value = '';

  cargarClientes(); //  lista de clientes en el DOM
}

