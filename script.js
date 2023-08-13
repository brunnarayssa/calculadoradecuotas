
function calcularCuotas(montoTotal, cantidadCuotas) {
  if (isNaN(montoTotal) || isNaN(cantidadCuotas) || montoTotal <= 0 || cantidadCuotas <= 0) {
    return 'Por favor, ingrese valores válidos para el monto total y la cantidad de cuotas.';
  }

  const valorCuota = montoTotal / cantidadCuotas;
  return `Valor de cada cuota: $${valorCuota.toFixed(2)}`;
}

// Ejemplo de uso
const monto = parseFloat(prompt('Ingrese el monto total:'));
const cuotas = parseInt(prompt('Ingrese la cantidad de cuotas:'));

const resultado = calcularCuotas(monto, cuotas);
console.log(resultado);
