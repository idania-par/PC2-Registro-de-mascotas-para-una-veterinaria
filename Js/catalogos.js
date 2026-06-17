// ============================================================
//  CARGA DE CATÁLOGOS DESDE SUPABASE
// ============================================================

async function cargarEspecies() {
  try {
    const data = await supabase.get('especies', { select: 'id,nombre', order: 'nombre.asc' });
    const sel = document.getElementById('especie_id');
    sel.innerHTML = '<option value="">Selecciona una especie</option>';
    data.forEach(e => {
      sel.innerHTML += `<option value="${e.id}">${e.nombre}</option>`;
    });
  } catch (err) {
    console.error('Error cargando especies:', err);
  }
}

async function cargarRazas() {
  try {
    const data = await supabase.get('razas', { select: 'id,nombre,especie_id', order: 'nombre.asc' });
    window._todasLasRazas = data;
    // Las razas se muestran según especie seleccionada
    actualizarSelectRazas(null);
  } catch (err) {
    console.error('Error cargando razas:', err);
  }
}

function actualizarSelectRazas(especieId) {
  const sel = document.getElementById('raza_id');
  const razas = window._todasLasRazas || [];

  if (!especieId) {
    sel.innerHTML = '<option value="">Selecciona especie primero</option>';
    return;
  }

  const filtradas = razas.filter(r => r.especie_id == especieId);
  sel.innerHTML = '<option value="">Selecciona una raza</option>';

  if (filtradas.length === 0) {
    sel.innerHTML = '<option value="">No hay razas para esta especie</option>';
    return;
  }

  filtradas.forEach(r => {
    sel.innerHTML += `<option value="${r.id}">${r.nombre}</option>`;
  });
}

async function cargarTiposAtencion() {
  try {
    const data = await supabase.get('tipos_atencion', { select: 'id,nombre', order: 'nombre.asc' });
    const sel = document.getElementById('tipo_atencion_id');
    sel.innerHTML = '<option value="">Selecciona tipo de atención</option>';
    data.forEach(t => {
      sel.innerHTML += `<option value="${t.id}">${t.nombre}</option>`;
    });
  } catch (err) {
    console.error('Error cargando tipos de atención:', err);
  }
}

async function cargarCondicionesMedicas() {
  try {
    const data = await supabase.get('condiciones_medicas', { select: 'id,nombre', order: 'nombre.asc' });
    const sel = document.getElementById('condicion_medica_id');
    sel.innerHTML = '<option value="">Selecciona condición médica</option>';
    data.forEach(c => {
      sel.innerHTML += `<option value="${c.id}">${c.nombre}</option>`;
    });
  } catch (err) {
    console.error('Error cargando condiciones médicas:', err);
  }
}

async function cargarEspeciesFiltro() {
  try {
    const data = await supabase.get('especies', { select: 'id,nombre', order: 'nombre.asc' });
    const sel = document.getElementById('filtro-especie');
    data.forEach(e => {
      sel.innerHTML += `<option value="${e.id}">${e.nombre}</option>`;
    });
  } catch (err) {
    console.error('Error cargando filtro de especies:', err);
  }
}

// Filtrar razas cuando cambia la especie seleccionada en el formulario
document.getElementById('especie_id').addEventListener('change', function () {
  actualizarSelectRazas(this.value);
});

// Cargar todo al iniciar
(async () => {
  await Promise.all([
    cargarEspecies(),
    cargarRazas(),
    cargarTiposAtencion(),
    cargarCondicionesMedicas(),
    cargarEspeciesFiltro()
  ]);
})();
