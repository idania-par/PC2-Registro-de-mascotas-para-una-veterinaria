// ============================================================
//  CONFIGURACIÓN DE SUPABASE
//  Reemplaza estos valores con los tuyos cuando tengamos Supabase
// ============================================================

const SUPABASE_URL = 'https://sgdcnegpefefrxhthkjd.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ujkAgnogst7LOv73_E-dzA_-YmrQsKu';

// Cliente HTTP simple para Supabase REST API (sin librería externa)
const supabase = {

  async get(tabla, params = {}) {
    const url = new URL(`${SUPABASE_URL}/rest/v1/${tabla}`);

    if (params.select) url.searchParams.set('select', params.select);
    if (params.order) url.searchParams.set('order', params.order);
    if (params.limit) url.searchParams.set('limit', params.limit);
    if (params.filter) {
      const [campo, valor] = params.filter.split('=');
      url.searchParams.set(campo, valor);
    }

    const res = await fetch(url, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Error ${res.status}: ${res.statusText}`);
    }
    return res.json();
  },

  async post(tabla, data) {
    const url = `${SUPABASE_URL}/rest/v1/${tabla}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Error ${res.status}`);
    }
    return true;
  }

};
