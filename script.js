function calcularCuotas() {
    const montoTotal = parseFloat(document.getElementById('monto').value);
    const cantidadCuotas = parseInt(document.getElementById('cuotas').value);
  
    if (isNaN(montoTotal) || isNaN(cantidadCuotas) || montoTotal <= 0 || cantidadCuotas <= 0) {
      alert('Por favor, ingrese valores válidos para el monto total y la cantidad de cuotas.');
      return;
    }
  
    const valorCuota = montoTotal / cantidadCuotas;
  
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = `<p>Valor de cada cuota: $${valorCuota.toFixed(2)}</p>`;
  }
  
