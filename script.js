/* ============================================================
   ACTIVIDADES REALES (fuente: references/resumen.txt)
   sessions: [['HH:MM', minutos], ...]  → cada una con su cuenta atrás
   when:     texto que se muestra en la tarjeta
   ============================================================ */
const CATS = {
  patinaje:    { name: 'Patinaje',    color: '#3653BA' },
  running:     { name: 'Running',     color: '#e4572e' },
  taller:      { name: 'Taller',      color: '#7b4bd6' },
  raqueta:     { name: 'Raqueta',     color: '#2e9e5b' },
  celebracion: { name: 'Celebración', color: '#d6336c' },
  juegos:      { name: 'Juegos',      color: '#f2a900' },
  servicios:   { name: 'Servicios',   color: '#0e8fa8' },
  animacion:   { name: 'Animación',   color: '#ff7a2f' }
};

const PEAKS = [['12:30', 120], ['17:30', 180]];
const PEAKS_TXT = '12:30 – 14:30 h y 17:30 – 20:30 h';

const ACTIVITIES = [
  /* ---------- Miércoles 18 ---------- */
  { date:'2026-11-18', cat:'patinaje', icon:'🛼', title:'Roll In · Escuela de patinaje',
    desc:'Escuela de patinaje en el parking de afuera. Formación y deportes sobre ruedas.',
    place:'Parking exterior', when:'17:00 – 19:00 h', sessions:[['17:00',120]] },
  { date:'2026-11-18', cat:'running', icon:'⛰️', title:'Reto en cinta con inclinación',
    desc:'Pon a prueba tu resistencia y supérate en la cinta de correr con inclinación.',
    place:'En tienda', when:'18:00 – 19:00 h', sessions:[['18:00',60]] },
  { date:'2026-11-18', cat:'running', icon:'🏃‍♀️', title:'Tarde Social Runners 10K',
    desc:'Running en comunidad con degustación de geles, barritas e isotónicos.',
    place:'En tienda', when:'19:00 – 20:00 h', sessions:[['19:00',60]] },

  /* ---------- Viernes 20 ---------- */
  { date:'2026-11-20', cat:'taller', icon:'🚲', title:'Taller de mecánica rápida',
    desc:'En 15 minutos aprende a cambiar una cámara y a ajustar los frenos de tu bici.',
    place:'En tienda', when:'18:00 h · 15 min', sessions:[['18:00',15]] },
  { date:'2026-11-20', cat:'raqueta', icon:'🏓', title:'Ping pong y bádminton',
    desc:'Juega ping pong y bádminton en la planta de arriba.',
    place:'Planta de arriba', when:'18:00 h', sessions:[['18:00',60]] },

  /* ---------- Sábado 21 ---------- */
  { date:'2026-11-21', cat:'celebracion', icon:'🎂', title:'Tarta de aniversario',
    desc:'Celebramos con una tarta de aniversario en la apertura de la tienda.',
    place:'Apertura de la tienda', when:'09:30 h', sessions:[['09:30',30]] },
  { date:'2026-11-21', cat:'celebracion', icon:'🏅', title:'Pasillo de honor a los clientes',
    desc:'Recibimos a los clientes con un pasillo de honor y compartimos 15 minutos con ellos.',
    place:'Apertura de la tienda', when:'09:30 h · 15 min', sessions:[['09:30',15]] },
  { date:'2026-11-21', cat:'juegos', icon:'🗺️', title:'Mapa del tesoro',
    desc:'Sigue el mapa y encuentra 4 tarjetas regalo: 2 por la mañana y 2 por la tarde.',
    place:'En tienda', when:'11:30 h (mañana) y 18:00 h (tarde)', sessions:[['11:30',60],['18:00',60]] },
  { date:'2026-11-21', cat:'raqueta', icon:'🏓', title:'Ping pong y bádminton',
    desc:'Juego libre de ping pong y bádminton en la planta de arriba.',
    place:'Planta de arriba', when:'12:00 h y 18:00 h', sessions:[['12:00',60],['18:00',60]] },

  /* ---------- Miércoles 25 ---------- */
  { date:'2026-11-25', cat:'patinaje', icon:'🛼', title:'Roll In · Escuela de patinaje',
    desc:'Escuela de patinaje en el parking de afuera. Formación y deportes sobre ruedas.',
    place:'Parking exterior', when:'17:00 – 19:00 h', sessions:[['17:00',120]] },
  { date:'2026-11-25', cat:'running', icon:'🏃‍♀️', title:'Tarde Social Runners 10K',
    desc:'Running en comunidad con degustación de geles, barritas e isotónicos.',
    place:'En tienda', when:'19:00 – 20:00 h', sessions:[['19:00',60]] },

  /* ---------- Viernes 27 ---------- */
  { date:'2026-11-27', cat:'servicios', icon:'🛠️', title:'Jornada de Servicios',
    desc:'Un día enfocado en nuestros servicios: taller y postventa para todos los deportes.',
    place:'En tienda', when:PEAKS_TXT, sessions:PEAKS },

  /* ---------- Sábado 28 ---------- */
  { date:'2026-11-28', cat:'animacion', icon:'🎈', title:'OUTSIDE · Arco inflable y globos',
    desc:'Arco inflable afuera y torre de globos para regalar durante la jornada.',
    place:'Exterior de la tienda', when:PEAKS_TXT, sessions:PEAKS },
  { date:'2026-11-28', cat:'juegos', icon:'🎁', title:'10 tarjetas regalo escondidas',
    desc:'Encuentra las 10 tarjetas regalo escondidas en distintos puntos de la tienda.',
    place:'En tienda', when:'Turno mañana y tarde · ' + PEAKS_TXT, sessions:PEAKS },
  { date:'2026-11-28', cat:'celebracion', icon:'🎂', title:'Tarta de aniversario',
    desc:'Clausura del evento con tarta de aniversario en ambos picos de la tienda.',
    place:'En tienda', when:PEAKS_TXT, sessions:PEAKS }
];

const FINAL_DATE = new Date('2026-11-28T12:30:00');
const DAYS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
const MONTHS = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

const pad = n => String(n).padStart(2, '0');
const fmtTime = d => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

// Convierte las sesiones en fechas reales
ACTIVITIES.forEach(a => {
  a.slots = a.sessions.map(([t, min]) => {
    const s = new Date(`${a.date}T${t}:00`);
    return { s, e: new Date(s.getTime() + min * 60000) };
  });
});
ACTIVITIES.sort((a, b) => a.slots[0].s - b.slots[0].s);

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
        <div class="meta"><span>🕘 ${a.when}</span><span>📍 ${a.place}</span></div>
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
  daysEl.classList.toggle('filtered', f !== 'all');
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
    const st = card.querySelector('.state');
    const live = a.slots.find(x => now >= x.s && now < x.e);
    const next = a.slots.find(x => x.s > now);
    card.classList.toggle('live', !!live);
    card.classList.toggle('done', !live && !next);
    if (live) st.textContent = '¡En curso ahora!';
    else if (!next) { st.textContent = 'Actividad finalizada'; setCd(card, 0); }
    else setCd(card, next.s - now);
  });
  document.querySelectorAll('.day').forEach(d => {
    d.classList.toggle('today', d.dataset.date === todayKey);
    d.classList.toggle('past', !d.querySelector('.card:not(.done)'));
  });

  // Próxima actividad (o en curso) en el hero
  const events = ACTIVITIES.flatMap(a => a.slots.map(x => ({ a, ...x })));
  const live = events.filter(x => now >= x.s && now < x.e).sort((p, q) => p.e - q.e)[0];
  const next = events.filter(x => x.s > now).sort((p, q) => p.s - q.s)[0];
  const hero = document.getElementById('nextCd');
  const label = document.getElementById('nextLabel');
  const title = document.getElementById('nextTitle');
  const when = document.getElementById('nextWhen');

  if (live) {
    label.textContent = 'En curso ahora';
    title.textContent = live.a.title;
    when.textContent = `Termina a las ${fmtTime(live.e)} h · ${live.a.place}`;
    setCd(hero, live.e - now);
  } else if (next) {
    label.textContent = 'Próxima actividad';
    title.textContent = next.a.title;
    when.textContent = `${DAYS[next.s.getDay()]} ${next.s.getDate()} de ${MONTHS[next.s.getMonth()]} · ${fmtTime(next.s)} h · ${next.a.place}`;
    setCd(hero, next.s - now);
  } else {
    label.textContent = 'Gracias por celebrar';
    title.textContent = '¡Fueron 30 años increíbles!';
    when.textContent = 'El programa ha terminado.';
    setCd(hero, 0);
  }

  setCd(document.getElementById('finalCd'), FINAL_DATE - now);
}

/* ---------- FOTOS (3 a 23): LATERALES EN ESCRITORIO / CARRUSELES ENTRE DÍAS EN MÓVIL ---------- */
function buildPhotos() {
  const nums = Array.from({ length: 21 }, (_, i) => i + 3);
  const tilt = [-6, 4, -3, 7, -5, 3, -7, 5, -2, 6, -4];
  const mk = (n, i, lazy = false) => {
    const f = document.createElement('figure');
    f.className = 'ph';
    f.style.setProperty('--r', `${tilt[i % tilt.length]}deg`);
    f.style.setProperty('--x', `${((i * 37) % 12) - 6}px`);
    const img = new Image();
    img.src = `images/thumbs/${n}.jpg`; img.dataset.full = `images/${n}.jpeg`;
    img.alt = ''; if (lazy) img.loading = 'lazy';
    f.appendChild(img);
    return f;
  };
  // Escritorio: columnas a los lados
  const L = document.querySelector('.side--l'), R = document.querySelector('.side--r');
  nums.forEach((n, i) => (i % 2 === 0 ? L : R).appendChild(mk(n, i)));

  // Móvil: una galería en cada espacio entre días (cambia sola + puntos para cambiar a mano)
  const days = [...document.querySelectorAll('.day')];
  const gaps = days.length - 1;
  if (gaps < 1) return;
  const per = Math.ceil(nums.length / gaps);
  days.slice(0, gaps).forEach((day, g) => {
    const group = nums.slice(g * per, (g + 1) * per);
    if (!group.length) return;
    const gal = document.createElement('div');
    gal.className = 'gal';
    const stage = document.createElement('div');
    stage.className = 'gal__stage';
    const dots = document.createElement('div');
    dots.className = 'gal__dots';
    group.forEach((n, k) => {
      const f = mk(n, g * per + k, true);
      f.classList.add('gal__slide');
      stage.appendChild(f);
      const d = document.createElement('button');
      d.type = 'button'; d.setAttribute('aria-label', `Foto ${k + 1} de ${group.length}`);
      dots.appendChild(d);
    });
    gal.append(stage, dots);
    day.after(gal);

    const slides = [...stage.children], btns = [...dots.children];
    let cur = 0, timer;
    const show = i => {
      cur = (i + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle('on', k === cur));
      btns.forEach((b, k) => b.classList.toggle('on', k === cur));
    };
    const auto = () => { clearInterval(timer); timer = setInterval(() => show(cur + 1), 4000 + g * 400); };
    btns.forEach((b, k) => b.addEventListener('click', () => { show(k); auto(); }));
    // deslizar con el dedo
    let x0 = null;
    stage.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) { show(cur + (dx < 0 ? 1 : -1)); auto(); }
    });
    show(0); auto();
  });
}

/* ---------- FONDO DEL HERO: CAMBIA CADA POCOS SEGUNDOS ---------- */
(() => {
  const slides = document.querySelectorAll('.slide');
  if (slides.length < 2) return;
  let i = 0;
  setInterval(() => {
    slides[i].classList.remove('on');
    i = (i + 1) % slides.length;
    slides[i].classList.add('on');
  }, 5000);
})();

/* ---------- CONFETI DEL HERO ---------- */
(() => {
  const box = document.getElementById('confetti');
  if (!box) return;
  const cols = ['#ffffff', '#7ac943', '#3653BA', '#9db5f2', '#7ac943', '#ffffff'];
  for (let i = 0; i < 26; i++) {
    const el = document.createElement('i');
    const r = Math.floor(Math.random() * 180);
    el.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 75}%;background:${cols[i % cols.length]};--r:${r}deg;transform:rotate(${r}deg);` +
      `opacity:${0.55 + Math.random() * 0.4};animation-delay:${(-Math.random() * 7).toFixed(1)}s;width:${8 + Math.random() * 8}px;height:${18 + Math.random() * 14}px`;
    box.appendChild(el);
  }
})();

render();
buildPhotos();
tick();
setInterval(tick, 1000);

/* ---------- VISOR AMPLIADO DE FOTOS ---------- */
(() => {
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML = '<img alt=""><button type="button" aria-label="Cerrar">×</button>';
  document.body.appendChild(box);
  const big = box.querySelector('img');
  const open = src => { big.src = src; box.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const close = () => { box.classList.remove('open'); document.body.style.overflow = ''; };
  document.addEventListener('click', e => {
    const img = e.target.closest('.ph img');
    if (img) open(img.dataset.full || img.src);
  });
  // clic fuera de la foto (o en la X) cierra
  box.addEventListener('click', e => { if (e.target !== big) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
