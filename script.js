function calcularValorCuota(montoTotal, cantidadCuotas) {
  if (isNaN(montoTotal) || isNaN(cantidadCuotas) || montoTotal <= 0 || cantidadCuotas <= 0) {
    return 'Por favor, ingrese valores válidos para el monto total y la cantidad de cuotas.';
  }

  return montoTotal / cantidadCuotas;
}

function mostrarResultados(cuotas) {
  let resultados = '';
  for (let i = 0; i < cuotas.length; i++) {
    resultados += `Mes ${i + 1}: Valor de cuota: $${cuotas[i].toFixed(2)}\n`;
  }
  alert(resultados);
}

function calcularCuotas() {
  const montoTotalInput = prompt('Ingrese el monto total:');
  const cantidadCuotasInput = prompt('Ingrese la cantidad de cuotas:');

  const montoTotal = parseFloat(montoTotalInput);
  const cantidadCuotas = parseInt(cantidadCuotasInput);

  if (isNaN(montoTotal) || isNaN(cantidadCuotas) || montoTotal <= 0 || cantidadCuotas <= 0) {
    alert('Por favor, ingrese valores válidos para el monto total y la cantidad de cuotas.');
    return;
  }

  const valorCuota = calcularValorCuota(montoTotal, cantidadCuotas);
  const cuotas = new Array(cantidadCuotas).fill(valorCuota);

  mostrarResultados(cuotas);

  const confirmacion = confirm('¿Desea calcular cuántos meses faltan para terminar?');
  if (confirmacion) {
    const mesesFaltantes = cantidadCuotas;
    alert(`Meses faltantes para terminar: ${mesesFaltantes}`);
  }
}

calcularCuotas();
