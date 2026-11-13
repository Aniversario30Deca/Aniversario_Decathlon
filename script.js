/* ============================================================
   ACTIVIDADES (inventadas por ahora) — edita este arreglo
   date: AAAA-MM-DD · time: HH:MM (24h) · duration: minutos
   cat: una de las claves de CATS
   ============================================================ */
const CATS = {
  running:   { name: 'Running',    color: '#0082C3' },
  fitness:   { name: 'Fitness',    color: '#e4572e' },
  ninos:     { name: 'Niños',      color: '#f2a900' },
  outdoor:   { name: 'Outdoor',    color: '#2e9e5b' },
  taller:    { name: 'Talleres',   color: '#7b4bd6' },
  fiesta:    { name: 'Fiesta',     color: '#d6336c' }
};

const ACTIVITIES = [
  { date:'2026-11-16', time:'08:00', duration:60,  cat:'running', icon:'🏃', title:'Carrera 3K "30 años"', desc:'Carrera recreativa de 3 km para todas las edades. Playera conmemorativa para los primeros 100.', place:'Explanada principal' },
  { date:'2026-11-16', time:'18:00', duration:45,  cat:'fitness', icon:'🧘', title:'Yoga al atardecer', desc:'Clase abierta guiada por instructores certificados. Lleva tu tapete.', place:'Estacionamiento techado' },

  { date:'2026-11-17', time:'17:00', duration:90,  cat:'ninos',   icon:'⚽', title:'Mini Olimpiadas', desc:'Circuito de juegos deportivos para niños de 5 a 12 años con medallas para todos.', place:'Zona infantil' },

  { date:'2026-11-18', time:'11:00', duration:60,  cat:'taller',  icon:'🔧', title:'Taller de bici', desc:'Aprende mantenimiento básico: frenos, cadena y ajuste de llantas.', place:'Taller de bicicletas' },
  { date:'2026-11-18', time:'19:00', duration:60,  cat:'fitness', icon:'💃', title:'Zumba masiva', desc:'Una hora de baile y cardio con música para toda la familia.', place:'Explanada principal' },

  { date:'2026-11-19', time:'18:30', duration:75,  cat:'outdoor', icon:'🧗', title:'Muro de escalada libre', desc:'Prueba nuestro muro portátil con instructores y equipo incluido.', place:'Patio exterior' },

  { date:'2026-11-20', time:'10:00', duration:120, cat:'taller',  icon:'🎒', title:'Cómo armar tu mochila de trekking', desc:'Consejos prácticos de peso, capas y equipo esencial para tu primera ruta.', place:'Sala de talleres' },
  { date:'2026-11-20', time:'19:30', duration:60,  cat:'fitness', icon:'🥊', title:'Box funcional', desc:'Clase intensa de box sin contacto, apta para principiantes.', place:'Explanada principal' },

  { date:'2026-11-21', time:'09:00', duration:90,  cat:'running', icon:'🚴', title:'Rodada familiar 10K', desc:'Paseo en bici por ruta segura y señalizada. Casco obligatorio.', place:'Salida desde tienda' },
  { date:'2026-11-21', time:'17:00', duration:60,  cat:'ninos',   icon:'🎨', title:'Pinta tu deporte', desc:'Los peques pintan su mural deportivo que quedará en tienda.', place:'Zona infantil' },

  { date:'2026-11-23', time:'18:00', duration:60,  cat:'fitness', icon:'🏋️', title:'Reto Crossfit 30 min', desc:'Entrena 30 minutos y compite por premios contra otros miembros.', place:'Explanada principal' },

  { date:'2026-11-24', time:'12:00', duration:60,  cat:'taller',  icon:'🥗', title:'Nutrición para deportistas', desc:'Charla con nutriólogo: qué comer antes, durante y después de entrenar.', place:'Sala de talleres' },
  { date:'2026-11-24', time:'18:30', duration:60,  cat:'outdoor', icon:'⛺', title:'Armado de casa de campaña', desc:'Competencia relámpago: ¿quién arma su tienda más rápido?', place:'Patio exterior' },

  { date:'2026-11-25', time:'17:30', duration:60,  cat:'ninos',   icon:'🏓', title:'Torneo de ping pong', desc:'Torneo abierto por categorías: infantil, juvenil y adultos.', place:'Zona de juegos' },

  { date:'2026-11-26', time:'18:00', duration:90,  cat:'running', icon:'🌙', title:'Carrera nocturna 5K', desc:'Corre de noche con luces led y música en el recorrido.', place:'Explanada principal' },

  { date:'2026-11-27', time:'11:00', duration:45,  cat:'taller',  icon:'👟', title:'Elige tus tenis ideales', desc:'Análisis de pisada gratuito y asesoría personalizada de calzado.', place:'Área de running' },
  { date:'2026-11-27', time:'19:00', duration:60,  cat:'fitness', icon:'🤸', title:'Stretching & recovery', desc:'Sesión de estiramiento y recuperación para cerrar la semana.', place:'Explanada principal' },

  { date:'2026-11-28', time:'12:00', duration:60,  cat:'ninos',   icon:'🎂', title:'Pastel gigante de 30 años', desc:'Cortamos el pastel de aniversario y lo compartimos con todos.', place:'Explanada principal' },
  { date:'2026-11-28', time:'17:00', duration:180, cat:'fiesta',  icon:'🎉', title:'Gran fiesta + sorteo de premios', desc:'Música en vivo, DJ, reconocimientos y sorteo de equipo deportivo.', place:'Explanada principal' }
];

const FINAL_DATE = new Date('2026-11-28T17:00:00');
const DAYS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
const MONTHS = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

const pad = n => String(n).padStart(2, '0');
const start = a => new Date(`${a.date}T${a.time}:00`);
const end = a => new Date(start(a).getTime() + a.duration * 60000);
const fmtTime = d => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

ACTIVITIES.sort((a, b) => start(a) - start(b));

/* ---------- RENDER ---------- */
const daysEl = document.getElementById('days');
const filtersEl = document.getElementById('filters');

function render() {
  const byDay = {};
  ACTIVITIES.forEach((a, i) => { a.id = i; (byDay[a.date] ||= []).push(a); });

  daysEl.innerHTML = Object.entries(byDay).map(([date, list]) => {
    const d = new Date(`${date}T00:00:00`);
    const cards = list.map(a => {
      const c = CATS[a.cat];
      return `
      <article class="card" data-id="${a.id}" data-cat="${a.cat}" style="--c:${c.color}">
        <div class="card__top"><span class="tag">${c.name}</span><span class="ico">${a.icon}</span></div>
        <h3>${a.title}</h3>
        <p>${a.desc}</p>
        <div class="meta"><span>🕘 ${fmtTime(start(a))} – ${fmtTime(end(a))}</span><span>📍 ${a.place}</span></div>
        <div class="cd">
          <div><b data-u="d">00</b><small>días</small></div>
          <div><b data-u="h">00</b><small>horas</small></div>
          <div><b data-u="m">00</b><small>min</small></div>
          <div><b data-u="s">00</b><small>seg</small></div>
        </div>
        <div class="state"></div>
      </article>`;
    }).join('');
    return `
    <div class="day" data-date="${date}">
      <div class="day__date"><small>${DAYS[d.getDay()].slice(0,3)}</small><b>${d.getDate()}</b><span>${MONTHS[d.getMonth()]}</span></div>
      <div class="day__list">${cards}</div>
    </div>`;
  }).join('');

  const used = [...new Set(ACTIVITIES.map(a => a.cat))];
  filtersEl.innerHTML =
    `<button class="chip on" data-f="all">Todas</button>` +
    used.map(k => `<button class="chip" data-f="${k}">${CATS[k].name}</button>`).join('');
}

filtersEl.addEventListener('click', e => {
  const btn = e.target.closest('.chip'); if (!btn) return;
  filtersEl.querySelectorAll('.chip').forEach(c => c.classList.toggle('on', c === btn));
  const f = btn.dataset.f;
  document.querySelectorAll('.card').forEach(c => c.classList.toggle('hide', f !== 'all' && c.dataset.cat !== f));
  document.querySelectorAll('.day').forEach(d => d.classList.toggle('hide', !d.querySelector('.card:not(.hide)')));
});

/* ---------- COUNTDOWN ---------- */
function setCd(root, ms) {
  const t = Math.max(0, Math.floor(ms / 1000));
  const v = { d: Math.floor(t / 86400), h: Math.floor(t % 86400 / 3600), m: Math.floor(t % 3600 / 60), s: t % 60 };
  root.querySelectorAll('[data-u]').forEach(el => { el.textContent = pad(v[el.dataset.u]); });
}

function tick() {
  const now = new Date();
  const todayKey = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

  document.querySelectorAll('.card').forEach(card => {
    const a = ACTIVITIES[card.dataset.id];
    const s = start(a), e = end(a);
    const st = card.querySelector('.state');
    card.classList.toggle('live', now >= s && now < e);
    card.classList.toggle('done', now >= e);
    if (now >= e) st.textContent = 'Actividad finalizada';
    else if (now >= s) st.textContent = '¡En curso ahora!';
    else setCd(card, s - now);
  });
  document.querySelectorAll('.day').forEach(d => d.classList.toggle('today', d.dataset.date === todayKey));

  // Próxima actividad (o en curso)
  const live = ACTIVITIES.find(a => now >= start(a) && now < end(a));
  const next = ACTIVITIES.find(a => start(a) > now);
  const hero = document.getElementById('nextCd');
  const label = document.getElementById('nextLabel');
  const title = document.getElementById('nextTitle');
  const when = document.getElementById('nextWhen');
  const target = live || next;

  if (!target) {
    label.textContent = 'Gracias por celebrar';
    title.textContent = '¡Fueron 30 años increíbles!';
    when.textContent = 'El programa ha terminado.';
    setCd(hero, 0);
  } else if (live) {
    label.textContent = 'En curso ahora';
    title.textContent = live.title;
    when.textContent = `Termina a las ${fmtTime(end(live))} · ${live.place}`;
    setCd(hero, end(live) - now);
  } else {
    const d = start(next);
    label.textContent = 'Próxima actividad';
    title.textContent = next.title;
    when.textContent = `${DAYS[d.getDay()]} ${d.getDate()} de ${MONTHS[d.getMonth()]} · ${fmtTime(d)} · ${next.place}`;
    setCd(hero, d - now);
  }

  setCd(document.getElementById('finalCd'), FINAL_DATE - now);
}

render();
tick();
setInterval(tick, 1000);
