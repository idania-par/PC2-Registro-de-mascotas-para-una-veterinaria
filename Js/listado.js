// ============================================================
//  LISTADO Y FILTRO DESDE SUPABASE
// ============================================================

const tablaBody     = document.getElementById('tabla-body');
const tablaContainer= document.getElementById('tabla-container');
const loadingEl     = document.getElementById('loading');
const emptyMsg      = document.getElementById('empty-msg');
const filtrosCount  = document.getElementById('filtros-count');
const statTotal     = document.getElementById('stat-total');

const especieEmoji = { 'Perro': '🐶', 'Gato': '🐱', 'Conejo': '🐰', 'Ave': '🦜', 'Otro': '🐾' };

async function cargarListado() {
  loadingEl.classList.remove('hidden');
  tablaContainer.classList.add('hidden');
  emptyMsg.classList.add('hidden');
  filtrosCount.textContent = '';

  const especieId = document.getElementById('filtro-especie').value;

  try {
    let filtro = '';
    if (especieId) filtro = `especie_id=eq.${especieId}`;

    const data = await supabase.get('mascotas', {
      select: [
        'nombre_mascota','edad_mascota','peso',
        'nombre_dueno','apellido_dueno','dni_dueno','celular','correo',
        'especies(nombre)','razas(nombre)',
        'tipos_atencion(nombre)','condiciones_medicas(nombre)',
        'created_at'
      ].join(','),
      filter: filtro,
      order: 'created_at.desc'
    });

    loadingEl.classList.add('hidden');

    if (!data || data.length === 0) {
      emptyMsg.classList.remove('hidden');
      filtrosCount.textContent = '0 registros';
      return;
    }

    filtrosCount.textContent = `${data.length} registro${data.length !== 1 ? 's' : ''}`;
    if (statTotal) statTotal.textContent = data.length;

    tablaBody.innerHTML = '';
    data.forEach(m => {
      const espNombre = m.especies?.nombre || 'Otro';
      const emoji = especieEmoji[espNombre] || '🐾';
      tablaBody.innerHTML += `
        <tr>
          <td>
            <div class="td-mascota">
              <div class="td-avatar">${emoji}</div>
              <div>
                <div class="td-name">${m.nombre_mascota}</div>
                <div class="td-sub">${m.correo || ''}</div>
              </div>
            </div>
          </td>
          <td>
            <div class="td-name">${m.edad_mascota} año(s)</div>
            <div class="td-sub">${m.peso} kg</div>
          </td>
          <td>
            <div class="td-name">${m.nombre_dueno} ${m.apellido_dueno}</div>
            <div class="td-sub">${m.correo || ''}</div>
          </td>
          <td>${m.dni_dueno}</td>
          <td>${m.celular}</td>
          <td><span class="badge">${emoji} ${espNombre}</span></td>
          <td><span class="badge badge-gray">${m.razas?.nombre || '-'}</span></td>
          <td><span class="badge badge-amber">${m.tipos_atencion?.nombre || '-'}</span></td>
          <td>${m.condiciones_medicas?.nombre || '-'}</td>
        </tr>
      `;
    });

    tablaContainer.classList.remove('hidden');

  } catch (err) {
    loadingEl.classList.add('hidden');
    console.error('Error:', err);
    emptyMsg.textContent = 'Error al cargar los registros.';
    emptyMsg.classList.remove('hidden');
  }
}

document.getElementById('filtro-especie').addEventListener('change', cargarListado);
document.getElementById('btn-reload').addEventListener('click', cargarListado);
cargarListado();
