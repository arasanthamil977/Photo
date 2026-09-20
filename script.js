const header=document.getElementById("header");
const menuBtn=document.getElementById("menuBtn");
const mobileNav=document.getElementById("mobileNav");

window.addEventListener("scroll",()=>header.classList.toggle("scrolled",window.scrollY>30));

menuBtn.addEventListener("click",()=>{
  mobileNav.classList.toggle("open");
  document.body.classList.toggle("lock");
});
document.querySelectorAll(".mobile-nav a").forEach(a=>a.addEventListener("click",()=>{
  mobileNav.classList.remove("open");
  document.body.classList.remove("lock");
}));

/* Portfolio categories */
const filters=document.querySelectorAll(".filter");
const cards=[...document.querySelectorAll(".gallery-card")];
filters.forEach(btn=>{
  btn.addEventListener("click",()=>{
    filters.forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    const f=btn.dataset.filter;
    cards.forEach(card=>card.style.display=(f==="all"||card.dataset.category===f)?"":"none");
  });
});

/* Full screen lightbox */
const lightbox=document.getElementById("lightbox");
const lightboxImage=document.getElementById("lightboxImage");
let current=0;
function visible(){
  return cards.filter(c=>c.style.display!=="none").map(c=>c.querySelector("img"));
}
function show(index){
  const imgs=visible();
  if(!imgs.length)return;
  current=(index+imgs.length)%imgs.length;
  lightboxImage.src=imgs[current].src;
  lightboxImage.alt=imgs[current].alt;
}
cards.forEach(card=>card.addEventListener("click",()=>{
  const imgs=visible();
  current=imgs.indexOf(card.querySelector("img"));
  show(current);
  lightbox.classList.add("open");
  document.body.classList.add("lock");
}));
function closeLightbox(){
  lightbox.classList.remove("open");
  document.body.classList.remove("lock");
}
document.getElementById("lightboxClose").addEventListener("click",closeLightbox);
document.getElementById("lightboxPrev").addEventListener("click",()=>show(current-1));
document.getElementById("lightboxNext").addEventListener("click",()=>show(current+1));
lightbox.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener("keydown",e=>{
  if(!lightbox.classList.contains("open"))return;
  if(e.key==="Escape")closeLightbox();
  if(e.key==="ArrowLeft")show(current-1);
  if(e.key==="ArrowRight")show(current+1);
});

/* Booking demo */
const form=document.getElementById("bookingForm");
const message=document.getElementById("formMessage");
form.addEventListener("submit",e=>{
  e.preventDefault();
  const name=new FormData(form).get("name");
  message.textContent=`Thank you ${name}. Your THAMIL enquiry is ready to be connected to email/backend.`;
  form.reset();
});

/* Reveal animations */
const reveal=document.querySelectorAll(".intro .split,.section-head,.gallery-card,.service-grid article,.about-grid,.testimonial-grid article,.instagram-grid img,.contact-grid");
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("reveal-in");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.08});
reveal.forEach(el=>{el.style.opacity="0";el.style.transform="translateY(28px)";el.style.transition="opacity .8s ease,transform .8s ease";observer.observe(el)});
const style=document.createElement("style");
style.textContent=".reveal-in{opacity:1!important;transform:translateY(0)!important}";
document.head.appendChild(style);
