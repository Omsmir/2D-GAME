(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function o(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=o(r);fetch(r.href,n)}})();class c{static instance;x;y;PLAYER_SIZE;is_moving;constructor(){this.x=1500,this.y=1500,this.PLAYER_SIZE=30,this.is_moving=!1}static getPlayerInstance=()=>(c.instance||(this.instance=new c),c.instance);setCoordinates=({x:e,y:o})=>{e&&(this.x=e),o&&(this.y=o)};getCoordinates=()=>({x:this.x,y:this.y});getPlayerBox=()=>({x:this.x,y:this.y,width:this.PLAYER_SIZE,height:this.PLAYER_SIZE+30})}const O=(t,e)=>t.x<e.x+e.width&&t.x+t.width>e.x&&t.y<e.y+e.height&&t.y+t.height>e.y,q=t=>{if(!t)return;const e=a("player");e&&(t.innerText=e.name)},a=t=>{const e=localStorage.getItem(t);if(e)return JSON.parse(e)},R=(t,e,o)=>{a("player")||(localStorage.setItem("player",JSON.stringify(t)),localStorage.setItem("flowers",JSON.stringify(e)),localStorage.setItem("assets",JSON.stringify(o)))},J=t=>{const e=a("player");if(!e)return;const o={...e,flowers_collected:{...e.flowers_collected,[t]:e.flowers_collected[t]+1}};localStorage.setItem("player",JSON.stringify(o))},G=t=>{const e=a("flowers");if(!e)return;const o=e.filter(s=>s.id!==t);localStorage.setItem("flowers",JSON.stringify(o))},Y=t=>{const e=a("flowers");if(!e)return;const o=e.map(s=>s.id===t?{...s,collected:!0}:s);localStorage.setItem("flowers",JSON.stringify(o))},z=t=>{t.addEventListener("click",()=>{localStorage.removeItem("player"),localStorage.removeItem("flowers"),location.reload()})},Z=(t,e)=>{t.addEventListener("click",()=>{if(!a("player"))return;const s=c.getPlayerInstance();s.is_moving=!1,s.setCoordinates({x:1500,y:1500}),U();const r=C(P);localStorage.setItem("flowers",JSON.stringify(r)),j(),x(e),w()})},g=6e3,_=50,P=130,S=["Tabark, you make my world softer just by being in it 💖","Deba, my heart chose you and it keeps choosing you every day","I smile like an idiot every time I think about you, Tabark","Deba el sammen ❤️ you’re my favorite place to rest","Loving you feels easy, natural, and endlessly beautiful","Tabark, you’re the calm in my chaos and the joy in my days","Deba, you own a piece of my heart and I don’t want it back","Every moment with you feels like a small miracle","Tabark, your laugh is my favorite sound in the world","Deba ❤️ you’re my comfort, my love, my home","I didn’t know what I was missing until you walked into my life","Tabark, being yours is my favorite thing","Deba, even silence with you feels warm","I love you more than words, more than distance, more than time","Tabark ❤️ you’re my forever kind of love"];function y(t,e){const{x:o,y:s}=c.getPlayerInstance().getCoordinates(),r=Math.random()*(e-t)+t,n=Math.abs(r-o),l=Math.abs(r-s);return n<=40||l<=40?(console.log(n,l),y(t,e)):r}function F(t){return t[Math.floor(Math.random()*t.length)]}function H(){const t=Math.floor(Math.random()*S.length);return S[t]}function C(t){const e=[];for(let o=0;o<t;o++)e.push({id:o+1,message:H(),x:y(0,g-_),y:y(0,g-_),color:F(["red","blue","green","purple"]),collected:!1});return e}const W=({message:t,messageElement:e,overlay:o})=>{e.textContent=t,o.classList.remove("hidden")},A=t=>{t.classList.add("hidden")},x=t=>{a("flowers")?.forEach(o=>{if(o.collected)return;const s=document.createElement("img");s.style.left=`${o.x}px`,s.style.top=`${o.y}px`,s.src=`/2D-GAME/assets/spirts/${o.color}_flower.png`,s.classList=`flower_asset flower_${o.id} `,t.appendChild(s)})},j=()=>{a("flowers")?.forEach(e=>{document.querySelector(`.flower_${e.id}`)?.remove()})},U=()=>{const t=a("player");if(!t)return;const e={red:0,green:0,blue:0,purple:0},o={...t,iterations:t.iterations+1,flowers_collected:e};localStorage.setItem("player",JSON.stringify(o))},X=t=>{t?.forEach(e=>{if(e.collected){const o=document.querySelector(`.flower_${e.id}`);if(!o)return;o.style.display="none",J(e.color),Y(e.id)}})},w=()=>{const t=a("player");if(!t)return;const e=t.flowers_collected;Object.entries(e).forEach(([o,s])=>{const r=document.querySelector(`.counter .${o}`);r.innerText=`${s}`})},b=({asset_type:t,count:e,asset_color:o,asset_size:s})=>{const r=[];for(let n=0;n<=e;n++)r.push({id:n+1,type:t,size:s,x:y(0,g-s),y:y(0,g-s),color:F(o)});return r},B=t=>{const e=a("assets");e&&(console.log(e),e.forEach(o=>{const s=document.createElement("img");s.className="static_asset",s.style.left=`${o.x}px`,s.style.top=`${o.y}px`,s.style.width=`${o.size}px`,s.style.height=`${o.size}px`,o.type==="shrub"&&(s.style.zIndex="100"),s.src=`/2D-GAME/assets/spirts/${o.color}_${o.type}.png`,t.appendChild(s)}))};function K({progressBar:t,loadingBox:e,onDone:o}){let s=0;const r=setInterval(()=>{s+=Math.ceil(Math.random()*6)+1,s>=100?(s=100,t.style.width=s+"%",clearInterval(r),setTimeout(()=>{e.remove(),o()},300)):t.style.width=s+"%"},50)}const Q=()=>{const t=b({asset_type:"shrub",count:30,asset_color:["red","green"],asset_size:100}),e=b({asset_type:"fallen_flowers",count:60,asset_color:["green"],asset_size:100});return[...t,...e]},V=t=>{const e=c.getPlayerInstance(),o=e.getPlayerBox();t?.forEach(s=>{if(s.type!=="shrub")return;const r={x:s.x,y:s.y,width:s.size,height:s.size},n={...o,width:o.width-36,height:o.height-37};if(O(n,r)){e.is_moving=!1;return}})},ee=({flowers:t,overlay:e,messageElement:o})=>{const s=c.getPlayerInstance(),r=s.getPlayerBox();t?.forEach(n=>{if(n.collected)return;const l={x:n.x,y:n.y,width:50,height:50};if(O(r,l)){n.collected=!0,s.is_moving=!1,X(t),w(),W({message:n.message,overlay:e,messageElement:o}),G(n.id);return}})},te=`<div class="dialog">
     <div class="start-screen">
  <h1 class="game-title">🌼 Bubu’s Flower Field</h1>
  <form class="name-form">
    <input
      type="text"
      placeholder="Enter your name..."
      class="name-input"
      max="10"
    />
    <span class='error_message'></span>
    <button type="submit" class="start-btn">
      Start 💛
    </button>
  </form>
</div>
     </div>`,oe=`<div class="loading-screen hidden">
  <div class="loading-box">
    <p class="loading-text">Planting flowers… 🌱</p>
    <div class="loading-bar">
      <div class="loading-progress"></div>
    </div>
  </div>
</div>
`,se='<button class="reset">reset</button>',re='<button class="new-game"></button>',ne=`<h4 >player name:
<p class='player_name'></p>
 </h1>`,ae=`<div>
<p class='red'>r 0</p>
<p class='purple'>p 0</p>
<p class='green'>g 0</p>
<p class='blue'>b 0</p></div>
</div>`,le=`<span class='counter'>
  <div class='counter-box'>  
 ${ne}
flowers collected:
${ae}
 <div class="counter-buttons">
        ${se}
        ${re}
      </div>
</span>`,ce=`
 <div class='character_layout'>
 <p class='character_name'>tabark</p>
 <img src="/2D-GAME/assets/character/bubu.png" class='character' />
 </div>
`,ie=`
<div class="main_board"> 
${ce}
</div>
`,de=`<div class="dialog-overlay hidden">
  <div class="dialog-box">
    <button class="dialog-close">✕</button>
    <p class="dialog-message"></p>
  </div>
</div>
`,ue=`
     ${te}
     ${le}
     ${de} 
     ${oe}
<div class="layout"> 
${ie}
</div>
`;document.querySelector(".container").innerHTML=ue;const p=document.querySelector(".layout"),d=document.querySelector(".main_board"),I=document.querySelector(".character_layout"),E=document.querySelector(".dialog"),ye=document.querySelector(".name-form"),m=document.querySelector(".name-input"),v=document.querySelector(".error_message"),u=document.querySelector(".dialog-overlay"),me=document.querySelector(".dialog-message"),fe=document.querySelector(".dialog-close"),$=document.querySelector(".loading-screen"),ge=document.querySelector(".loading-progress"),D=document.querySelector(".player_name"),pe=document.querySelector(".counter .reset"),he=document.querySelector(".counter .new-game"),M=a("player"),f=c.getPlayerInstance();M||(E.style.display="flex",ye.addEventListener("submit",t=>{if(t.preventDefault(),!m.value){v.innerText="please enter your name to start playing";return}if(m.value.length>10||m.value.length<4){v.innerText="name max and min length are 10 and 4 characters";return}v.innerText="";const e={name:`${m.value}`,iterations:1,flowers_collected:{red:0,green:0,blue:0,purple:0}};$.classList.remove("hidden"),K({progressBar:ge,loadingBox:$,onDone:()=>{const o=C(P),s=Q();R(e,o,s),x(d),B(d),q(D),w()}}),E.style.display="none"}));M&&(x(d),B(d),q(D),w());let h={x:1500,y:1500};const we=p.clientWidth,ve=p.clientHeight,L=2;p.addEventListener("click",t=>{const e=p.getBoundingClientRect();f.is_moving=!0,h.x=t.clientX-e.left+i.x,h.y=t.clientY-e.top+i.y});let i={x:0,y:0};function T(){const{x:t,y:e}=f.getCoordinates(),o=h.x-t,s=h.y-e,r=Math.hypot(o,s);if(r>1&&f.is_moving){const k=t+o/r*L,N=e+s/r*L;f.setCoordinates({x:k,y:N})}i.x=t-we/2+50,i.y=e-ve/2,d.style.transform=`translate(${-i.x}px, ${-i.y}px)`,I.style.left=`${t-32}px`,I.style.top=`${e-32}px`;const n=a("flowers"),l=a("assets");ee({flowers:n,overlay:u,messageElement:me}),V(l),requestAnimationFrame(T)}fe.addEventListener("click",()=>{A(u)});u.addEventListener("click",t=>{t.target==u&&A(u)});T();z(pe);Z(he,d);
