function cambiarTipoCliente() {
  const tipoCliente = document.getElementById("tipo-cliente").value;
  const tasaAdminContainer = document.getElementById("tasa-administrativa-container");
  const leyendaAdmin = document.getElementById("leyenda-admin");

  if (tipoCliente === "administrativo") {
    tasaAdminContainer.classList.remove("hidden");
    leyendaAdmin.classList.remove("hidden");
  } else {
    tasaAdminContainer.classList.add("hidden");
    leyendaAdmin.classList.add("hidden");
  }

  actualizarCalculo();
}

function actualizarCalculo() {
  const monto = parseFloat(document.getElementById("monto").value);
  const tipoCliente = document.getElementById("tipo-cliente").value;
  const resultadosDiv = document.getElementById("resultados");

  if (isNaN(monto) || monto <= 0) {
    resultadosDiv.innerHTML = '<p style="color: red;">Por favor, ingresa un monto válido.</p>';
    return;
  }

  let tasaSeleccionada = 99.90; // Tasa por defecto para clientes normales
  let factoresBase;

  if (tipoCliente === "normal") {
    // Factores para clientes normales
    factoresBase = {
      3: 0.087,
      6: 0.174,
      9: 0.261,
      12: 0.348,
    };
  } else if (tipoCliente === "administrativo") {
    const tasaAdmin = parseFloat(document.getElementById("tasa-admin").value);
    if (!isNaN(tasaAdmin)) {
      tasaSeleccionada = tasaAdmin;
    }

    // Factores base ajustados para la tasa administrativa estándar (39.90%)
    factoresBase = {
      3: 0.0522,
      6: 0.1044,
      9: 0.1566,
      12: 0.2088,
    };

    // Ajustar factores proporcionalmente si la tasa administrativa no es 39.90%
    if (tasaSeleccionada !== 39.90) {
      for (let meses in factoresBase) {
        factoresBase[meses] = factoresBase[meses] * (tasaSeleccionada / 39.90);
      }
    }
  }

  let html = '';
  for (let meses of [3, 6, 9, 12]) {
    const comision = monto * factoresBase[meses];
    const mensualidad = monto / meses;
    const primerPago = mensualidad + comision;

    html += `
      <div class="result">
        <p><strong>${meses} meses</strong></p>
        <p>Comisión por diferir: $${comision.toFixed(2)}</p>
        <p>Mensualidad fija: $${mensualidad.toFixed(2)}</p>
        <p>Primer pago (con comisión): $${primerPago.toFixed(2)}</p>
      </div>
    `;
  }

  resultadosDiv.innerHTML = html;
}
