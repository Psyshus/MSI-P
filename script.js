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

  let tasaSeleccionada = 99.90; // Por defecto para cliente normal

  if (tipoCliente === "administrativo") {
    const tasaAdmin = parseFloat(document.getElementById("tasa-admin").value);
    if (!isNaN(tasaAdmin)) {
      tasaSeleccionada = tasaAdmin;
    }
  }

  const factoresBase = {
    3: 0.087,
    6: 0.174,
    9: 0.261,
    12: 0.348,
  };

  const factoresAjustados = {};
  for (let meses of [3, 6, 9, 12]) {
    factoresAjustados[meses] = factoresBase[meses] * (tasaSeleccionada / 99.90);
  }

  let html = '';
  for (let meses of [3, 6, 9, 12]) {
    const comision = monto * factoresAjustados[meses];
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
