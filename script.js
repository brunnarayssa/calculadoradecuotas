
document.addEventListener('DOMContentLoaded', () => {
  const montoInput = document.getElementById('monto');
  const cuotasInput = document.getElementById('cuotas');
  const calcularButton = document.getElementById('calcular');
  const resultadosDiv = document.getElementById('resultados');
  
  calcularButton.addEventListener('click', calcularCuotas);
  
  function calcularValorCuota(montoTotal, cantidadCuotas) {
    if (isNaN(montoTotal) || isNaN(cantidadCuotas) || montoTotal <= 0 || cantidadCuotas <= 0) {
      return 'Por favor, ingrese valores válidos para el monto total y la cantidad de cuotas.';
    }
  
    return montoTotal / cantidadCuotas;
  }
  
  function mostrarResultados(resultado) {
    resultadosDiv.textContent = resultado;
  }
  
  function calcularCuotas() {
    const montoTotal = parseFloat(montoInput.value);
    const cantidadCuotas = parseInt(cuotasInput.value);
  
    const valorCuota = calcularValorCuota(montoTotal, cantidadCuotas);
    mostrarResultados(`Valor de cada cuota: $${valorCuota.toFixed(2)}`);
    
    // Almacenar datos en el Storage (Local Storage)
    localStorage.setItem('monto', montoTotal);
    localStorage.setItem('cuotas', cantidadCuotas);
  }
  
  // Recuperar datos del Storage al cargar la página
  const storedMonto = localStorage.getItem('monto');
  const storedCuotas = localStorage.getItem('cuotas');
  
  if (storedMonto && storedCuotas) {
    montoInput.value = storedMonto;
    cuotasInput.value = storedCuotas;
  }
});
