// ============================================================
//  REGISTRO DE MASCOTAS EN SUPABASE
// ============================================================

function showToast(tipo, titulo, mensaje) {
  const wrapper = document.getElementById('toast-wrapper');
  const toast = document.createElement('div');
  toast.className = `toast ${tipo === 'error' ? 'error' : ''}`;
  toast.innerHTML = `
    <div class="toast-icon">${tipo === 'success' ? '✅' : '❌'}</div>
    <div class="toast-body">
      <div class="toast-title">${titulo}</div>
      <div class="toast-msg">${mensaje}</div>
    </div>
  `;
  wrapper.appendChild(toast);
  setTimeout(() => toast.remove(), 4500);
}

const formMascota = document.getElementById('form-mascota');
const btnSubmit   = document.getElementById('btn-submit');
const btnText     = document.getElementById('btn-text');

formMascota.addEventListener('submit', async (e) => {
  e.preventDefault();
  btnSubmit.disabled = true;
  btnText.textContent = 'Guardando...';

  const datos = {
    nombre_mascota:      document.getElementById('nombre_mascota').value.trim(),
    edad_mascota:        parseInt(document.getElementById('edad_mascota').value),
    peso:                parseFloat(document.getElementById('peso').value),
    nombre_dueno:        document.getElementById('nombre_dueno').value.trim(),
    apellido_dueno:      document.getElementById('apellido_dueno').value.trim(),
    dni_dueno:           document.getElementById('dni_dueno').value.trim(),
    celular:             document.getElementById('celular').value.trim(),
    correo:              document.getElementById('correo').value.trim(),
    especie_id:          parseInt(document.getElementById('especie_id').value),
    raza_id:             parseInt(document.getElementById('raza_id').value),
    tipo_atencion_id:    parseInt(document.getElementById('tipo_atencion_id').value),
    condicion_medica_id: parseInt(document.getElementById('condicion_medica_id').value),
    observaciones:       document.getElementById('observaciones').value.trim()
  };

  try {
    await supabase.post('mascotas', datos);
    showToast('success', 'Mascota registrada', 'El registro se guardó correctamente en el sistema.');
    formMascota.reset();
    actualizarSelectRazas(null);
    await cargarListado();
    document.getElementById('listado').scrollIntoView({ behavior: 'smooth' });
  } catch (err) {
    console.error('Error al registrar:', err);
    showToast('error', 'Error al guardar', 'No se pudo registrar. Verifica la conexión e inténtalo nuevamente.');
  } finally {
    btnSubmit.disabled = false;
    btnText.textContent = 'Guardar registro';
  }
});