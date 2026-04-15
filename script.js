function scrollToSection(id){
  document.getElementById(id).scrollIntoView({behavior:'smooth'});
}

// subtle scroll reveal
const elements = document.querySelectorAll('.card, .gallery img');

window.addEventListener('scroll', () => {
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight - 50){
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }
  });
});

// initial state
elements.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(40px)';
  el.style.transition = 'all 0.6s ease';
});

const canvas = document.getElementById('energyCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lines = [];

for(let i=0;i<30;i++){
  lines.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    length: Math.random()*100,
    speed: Math.random()*2+1
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.strokeStyle = 'rgba(0,255,255,0.5)';
  ctx.lineWidth = 2;

  lines.forEach(l=>{
    ctx.beginPath();
    ctx.moveTo(l.x,l.y);
    ctx.lineTo(l.x + l.length, l.y);
    ctx.stroke();

    l.x += l.speed;
    if(l.x > canvas.width) l.x = 0;
  });

  requestAnimationFrame(animate);
}

animate();

function filterGallery(type){
  document.querySelectorAll('.gallery-item').forEach(img=>{
    img.style.display = (type === 'all' || img.classList.contains(type)) ? 'block' : 'none';
  });
}

// lightbox
document.querySelectorAll('.gallery img').forEach(img=>{
  img.onclick = () => {
    const popup = document.createElement('div');
    popup.style = "position:fixed;top:0;left:0;width:100%;height:100%;background:#000c;display:flex;align-items:center;justify-content:center;";
    popup.innerHTML = `<img src='${img.src}' style='max-width:90%'>`;
    popup.onclick = () => popup.remove();
    document.body.appendChild(popup);
  };
});

