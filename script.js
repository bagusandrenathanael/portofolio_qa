const one=(s,r=document)=>r.querySelector(s),all=(s,r=document)=>[...r.querySelectorAll(s)],toast=one('.toast');
function notify(message){toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2200)}
one('#year').textContent=new Date().getFullYear();
if(localStorage.getItem('andre-theme')==='dark')document.body.classList.add('dark');
one('.theme').addEventListener('click',()=>{document.body.classList.toggle('dark');localStorage.setItem('andre-theme',document.body.classList.contains('dark')?'dark':'light')});
const nav=one('nav'),menu=one('.menu');menu.addEventListener('click',()=>{nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(nav.classList.contains('open')))});all('nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)all('nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+e.target.id))}),{rootMargin:'-35% 0px -58% 0px'});all('main section[id]').forEach(s=>observer.observe(s));
all('[data-skill]').forEach(b=>b.addEventListener('click',()=>{all('[data-skill]').forEach(x=>x.classList.toggle('selected',x===b));all('.skill').forEach(c=>c.classList.toggle('hidden',b.dataset.skill!=='all'&&c.dataset.type!==b.dataset.skill))}));
all('[data-case]').forEach(b=>b.addEventListener('click',()=>{all('[data-case]').forEach(x=>x.classList.toggle('selected',x===b));all('.case').forEach(c=>c.classList.toggle('hidden',b.dataset.case!=='all'&&!c.dataset.category.split(' ').includes(b.dataset.case)))}));
all('[data-tab]').forEach(b=>b.addEventListener('click',()=>{all('[data-tab]').forEach(x=>x.classList.toggle('selected',x===b));all('.pane').forEach(p=>p.classList.toggle('selected',p.id===b.dataset.tab))}));
all('.show-detail').forEach(b=>b.addEventListener('click',()=>{one('#case-detail').scrollIntoView({behavior:'smooth'});notify('Contoh detail studi kasus — silakan sesuaikan dengan pengalaman Anda.')}));
one('#copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('andre@example.com');notify('Email disalin')}catch{notify('Alamat email: andre@example.com')}});
one('#contact-form').addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.currentTarget),subject=encodeURIComponent('Pesan portofolio dari '+d.get('name')),body=encodeURIComponent(d.get('message')+'\n\nDari: '+d.get('name')+' ('+d.get('email')+')');location.href='mailto:andre@example.com?subject='+subject+'&body='+body;notify('Membuka aplikasi email')});
