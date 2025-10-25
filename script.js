// Helpers
const zapNum = window.ZAP_NUM || "5561999310369";
const waLink = (msg="") => `https://wa.me/${zapNum}?text=${encodeURIComponent(msg)}`;

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Build default messages
const defaultMsg = "Olá! Vim pelo site *Zap da Sorte*. Quero participar dos bolões. 🍀";

// Bind CTAs
['cta-whatsapp','card-whatsapp','contact-whatsapp','fab-whatsapp','wa-inline'].forEach(id=>{
  const el = document.getElementById(id);
  if(el){
    el.setAttribute('href', waLink(defaultMsg));
  }
});

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
if(hamburger){
  hamburger.addEventListener('click', ()=>{
    const open = menu.style.display === 'flex';
    menu.style.display = open ? 'none' : 'flex';
    hamburger.setAttribute('aria-expanded', (!open).toString());
  });
}

// Form handling
const form = document.getElementById('lead-form');
function showError(input, message){
  const small = input.parentElement.querySelector('.error');
  if(small){ small.textContent = message || ''; }
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
}
function clearErrors(){
  form.querySelectorAll('.error').forEach(s=>s.textContent='');
  form.querySelectorAll('[aria-invalid="true"]').forEach(i=>i.removeAttribute('aria-invalid'));
}
function sanitizePhone(v){
  return (v||'').replace(/\D+/g, '');
}

if(form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    clearErrors();
    const nome = document.getElementById('nome');
    const whats = document.getElementById('whatsapp');
    const modalidade = document.getElementById('modalidade');

    let ok = true;
    if(!nome.value.trim()){ showError(nome, 'Informe seu nome.'); ok=false; }
    const phone = sanitizePhone(whats.value);
    if(phone.length < 10){ showError(whats, 'Digite um WhatsApp válido (com DDD).'); ok=false; }
    if(!modalidade.value){ showError(modalidade, 'Escolha uma modalidade.'); ok=false; }

    if(!ok) return;

    const msg = `Olá! Sou ${nome.value.trim()}. Meu WhatsApp é (${phone}). Quero participar dos bolões de *${modalidade.value}*. Vim pelo site Zap da Sorte. 🍀`;
    window.location.href = waLink(msg);
  });
}

// Smooth scroll (basic)
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const id = a.getAttribute('href').slice(1);
    const tgt = document.getElementById(id);
    if(tgt){
      e.preventDefault();
      tgt.scrollIntoView({behavior:'smooth'});
      if(menu && window.getComputedStyle(menu).display==='flex'){ menu.style.display='none'; }
    }
  });
});
