javascript:(async()=>{
const ARCH='https://moisesms1999-dev.github.io/archive-/';const RAWB='https://raw.githubusercontent.com/moisesms1999-dev/archive-/main/';
{const old=document.getElementById('rnc');if(old)old.remove();}
const LS={get:(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d;}catch(e){return d;}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}};
let PAR=null,NODATE=false,SLOW=false;
let RAWS=null;const rawSha=async()=>{if(RAWS!==null)return RAWS;RAWS='';try{const r=await fetch('https://api.github.com/repos/moisesms1999-dev/archive-/commits/main',{headers:{Accept:'application/vnd.github.sha'},cache:'no-store'});const t=(await r.text()).trim();if(r.ok&&/^[0-9a-f]{40}$/.test(t))RAWS='https://raw.githubusercontent.com/moisesms1999-dev/archive-/'+t+'/';}catch(e){}return RAWS;};
const ffetch=async p=>{const S0=await rawSha();for(const b of [S0,RAWB,ARCH].filter(Boolean)){try{const r=await fetch(b+p,{cache:'no-store'});if(r.ok)return r;}catch(e){}}return fetch(ARCH+p);};
let LK=null;const links=async()=>{if(LK)return LK;try{LK=await (await ffetch('links.json?'+Date.now())).json();}catch(e){LK={t:{},k:{}};}return LK;};
let FU=null;const fuera=async()=>{if(FU)return FU;try{FU=await (await ffetch('fuera.json?'+Date.now())).json();}catch(e){FU={};}return FU;};
const TRX=/^https?:\/\/(?:www\.tumblr\.com\/([\w-]+)|([\w-]+)\.tumblr\.com\/post)\/(\d{15,})/;
function relink(h,blog){const T=(LK&&LK.t)||{},M=(LS.get('rnc_links',{})[blog])||{};let n=0;
  const out=h.replace(/href="([^"]*)"/g,(s,u)=>{const m=u.replace(/&amp;/g,'&').match(TRX);if(!m)return s;const id=m[3],x=T[id]||{},c=M[id];
    const to=x.own===false?(x.wb||c):(c||x.wb);if(!to||to===u)return s;n++;return 'href="'+to.replace(/&/g,'&amp;').replace(/"/g,'&quot;')+'"';});
  return {html:out,n:n};}
function remember(blog,key,url){const ids=((LK&&LK.k)||{})[key]||[];if(!ids.length)return 0;const all=LS.get('rnc_links',{});all[blog]=all[blog]||{};ids.forEach(x=>{all[blog][x]=url;});LS.set('rnc_links',all);return ids.length;}
const copy=async s=>{try{await navigator.clipboard.writeText(s);return true;}catch(e){const a=document.createElement('textarea');a.value=s;a.setAttribute('readonly','');a.style.cssText='position:fixed;left:-9999px;opacity:0';document.body.append(a);a.select();let ok=false;try{ok=document.execCommand('copy');}catch(_){}a.remove();return ok;}};
const dl=async(url,name)=>{try{const b=await (await fetch(url)).blob();const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;document.body.append(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},5000);return true;}catch(e){window.open(url,'_blank');return false;}};
const $=(t,p={},...k)=>{const e=document.createElement(t);Object.assign(e,p);if(p.style)e.setAttribute('style',p.style);k.flat().forEach(c=>e.append(c));return e;};
const html=document.documentElement.innerHTML;
const TOK=(html.match(/"API_TOKEN":"([^"]+)"/)||[])[1];
const CSRF=(html.match(/"csrfToken":"([^"]+)"/)||[])[1];
const snk=o=>Array.isArray(o)?o.map(snk):(o&&typeof o==='object'&&Object.getPrototypeOf(o)===Object.prototype)?Object.fromEntries(Object.entries(o).map(([k,v])=>[k.replace(/[A-Z]/g,c=>'_'+c.toLowerCase()),snk(v)])):o;
const api0=async(path,opts={})=>{
  if(window.tumblr&&typeof window.tumblr.apiFetch==='function'){
    const o={method:opts.method||'GET'};if(opts.body)o.body=opts.body;if(opts.headers)o.headers=opts.headers;
    try{return snk(await window.tumblr.apiFetch('/v2'+path,o));}catch(e){return {error:String(e&&(e.message||e)),body:e&&e.body};}
  }
  const form=opts.body instanceof FormData;const hd={'Authorization':'Bearer '+TOK,'X-Version':'redpop/3/0//redpop/','X-CSRF':CSRF||''};if(!form)hd['Content-Type']='application/json';
  const r=await fetch('/api/v2'+path,{method:opts.method||'GET',credentials:'include',headers:hd,body:opts.body?(form?opts.body:JSON.stringify(opts.body)):undefined});
  let j=null;try{j=await r.json();}catch(e){}return j&&r.ok?j:{error:'HTTP '+r.status,detail:j};
};
const apiT=(path,opts,ms)=>new Promise(res=>{let done=false;const t=setTimeout(()=>{if(!done){done=true;res({error:'timeout',timeout:true});}},ms);api0(path,opts||{}).then(r=>{if(!done){done=true;clearTimeout(t);res(r);}},e=>{if(!done){done=true;clearTimeout(t);res({error:String(e&&(e.message||e))});}});});
const api=(path,opts={},ms)=>apiT(path,opts,ms||((opts.method&&opts.method!=='GET')?180000:45000));
const box=$('div',{id:'rnc',style:'position:fixed;inset:0;z-index:2147483647;background:#1a120b;color:#ffd9b0;font:16px/1.4 system-ui,sans-serif;overflow:auto;padding:16px 14px 40px'});
const log=$('div',{style:'font-size:13px;color:#e7b98a;white-space:pre-wrap;max-height:34vh;overflow:auto;margin-top:10px'});
const st=$('div',{style:'color:#9be59b;min-height:1.3em;margin:8px 0'});
const close=$('button',{textContent:'✕ Cerrar',style:'position:absolute;top:10px;right:12px;background:#5a3a1e;color:#ffd9b0;border:0;border-radius:10px;padding:8px 12px;font-weight:700'});
close.onclick=()=>box.remove();
box.append(close,$('h2',{textContent:'🍪 Renacer',style:'color:#ff9a3c;margin:0 0 4px'}),$('div',{textContent:'modo: '+((window.tumblr&&typeof window.tumblr.apiFetch==='function')?'interno':'alternativo'),style:'font-size:11px;color:#a58a6a'}),$('p',{textContent:'Publica en el blog que elijas, de uno en uno y en orden, el blog entero de un toque. El ritmo lo eliges abajo: con un blog nuevo, con calma. Cada línea del registro dice cuánto tardó el post y cuánto de eso fue Tumblr trayendo las imágenes.',style:'color:#f3c99a;margin:0 0 12px'}));
const tick=$('div',{style:'position:sticky;top:0;z-index:2;background:#3a2412;color:#ffcf6b;font-size:14px;font-weight:700;border-radius:10px;padding:8px 10px;margin:0 0 8px;display:none'});tick.setAttribute('role','status');tick.setAttribute('aria-live','polite');
const say2=t=>{tick.textContent=t||'';tick.style.display=t?'block':'none';};box.insertBefore(tick,box.children[1]);
document.body.append(box);
let blogs=[];
const u=await api('/user/info');
const R=u&&(u.response||u);
if(R&&R.user&&R.user.blogs)blogs=R.user.blogs.map(b=>({name:b.name,uuid:b.uuid}));
else{box.append($('p',{textContent:'No pude leer tus blogs: '+JSON.stringify(u).slice(0,200)+'. ¿Estás en tumblr.com con la sesión iniciada?'}));}
const sel=$('select',{style:'width:100%;padding:11px;border-radius:10px;background:#1a120b;color:#ffd9b0;border:1px solid #5a3a1e;margin-bottom:12px'});
blogs.forEach(b=>sel.append($('option',{value:b.name,textContent:b.name})));
box.append(sel);
const topbox=$('div',{style:'display:none;background:#2a1a0e;border:2px solid #ff9a3c;border-radius:14px;padding:12px;margin:0 0 14px'});const tst=$('div',{style:'color:#9be59b;font-size:16px;min-height:1.2em;margin-top:10px'});topbox.append(tst);box.append(topbox);
const wbon=$('input',{type:'checkbox',checked:LS.get('rnc_wbon',true)});wbon.onchange=()=>LS.set('rnc_wbon',wbon.checked);
const wbst=$('div',{style:'font-size:12px;color:#a58a6a;margin:2px 0 0 28px;min-height:1em'});
const wbl=$('label',{style:'display:flex;gap:8px;align-items:center;margin:0 0 2px;color:#ffb066;font-weight:700;font-size:14px'});wbl.append(wbon,$('span',{textContent:'🗄 Guardar cada post nuevo en el Wayback Machine, para que sus enlaces no mueran'}));
PAR=$('select',{style:'width:100%;padding:9px;border-radius:10px;background:#1a120b;color:#ffd9b0;border:1px solid #5a3a1e;margin:8px 0 0'});
[['c','🐢 Con calma: un post cada 30 a 60 s (el más seguro con un blog nuevo)'],['r','🚶 Rápido: un post cada 8 a 15 s'],['t','⚡ Turbo: sin espera, de uno en uno y en orden (con un blog recién hecho, Tumblr lo tumba por spam)'],['m','🚀 Turbo máximo: prepara hasta 4 posts a la vez y los publica en orden']].forEach(([v,t])=>PAR.append($('option',{value:v,textContent:t})));
{const v=String(LS.get('rnc_pace','c'));PAR.value=['c','r','t','m'].includes(v)?v:'c';}PAR.onchange=()=>LS.set('rnc_pace',PAR.value);
const bgon=$('input',{type:'checkbox',checked:LS.get('rnc_bgon',true)});bgon.onchange=()=>LS.set('rnc_bgon',bgon.checked);
const bgl=$('label',{style:'display:flex;gap:8px;align-items:center;margin:8px 0 0;color:#ffb066;font-weight:700;font-size:14px'});bgl.append(bgon,$('span',{textContent:'🔈 Seguir publicando aunque cambies de pestaña o de app (pone un sonido grave inaudible mientras publica)'}));
const ovr=$('input',{type:'checkbox',checked:LS.get('rnc_ovr',true)});ovr.onchange=()=>LS.set('rnc_ovr',ovr.checked);
const ovl=$('label',{style:'display:flex;gap:8px;align-items:center;margin:8px 0 0;color:#ffb066;font-weight:700;font-size:14px'});ovl.append(ovr,$('span',{textContent:'✏️ Si el post ya está en el blog elegido, lo sobrescribe con la versión del archivo en vez de publicar otro'}));const ovo=$('input',{type:'checkbox',checked:LS.get('rnc_ovo',true)});ovo.onchange=()=>LS.set('rnc_ovo',ovo.checked);const ovol=$('label',{style:'display:flex;gap:8px;align-items:center;margin:4px 0 0 22px;color:#e7b98a;font-size:13px'});ovol.append(ovo,$('span',{textContent:'…también en mis originales: les pone la versión del archivo (gramática corregida, también la de la cajita del ask, que sigue con el nombre de quien preguntó) y suma los tags, sin quitarles ningún enlace ni imagen'}));
const upr=$('input',{type:'checkbox',checked:LS.get('rnc_upr',false)});upr.onchange=()=>LS.set('rnc_upr',upr.checked);const upl=$('label',{style:'display:flex;gap:8px;align-items:center;margin:8px 0 0;color:#ff8a8a;font-weight:700;font-size:14px'});upl.append(upr,$('span',{textContent:'🔝 Subir arriba en los tags (solo con «Publicar los marcados»): en vez de sobrescribir, publica otra vez el post marcado que ya esté en el blog, le pone la fecha de cuando se publicó el original, borra el de antes (sus likes se pierden) y cambia al nuevo los enlaces que le apuntaban en tus otros posts'}));
box.append(wbl,wbst,PAR,ovl,ovol,upl,bgl,$('div',{style:'height:10px'}));
const hbox=$('div',{style:'background:#2a1a0e;border:1px solid #ff9a3c;border-radius:12px;padding:10px;margin:0 0 12px'});
const hst=$('div',{style:'color:#9be59b;font-size:14px;min-height:1.2em;margin-top:6px'});const hlog=$('div',{style:'font-size:13px;color:#e7b98a;white-space:pre-wrap;max-height:30vh;overflow:auto;margin-top:6px'});
const hlist=$('div');const bH=$('button',{textContent:'🧾 Poner las hojas nuevas en mis posts',style:'display:block;width:100%;background:#ff9a3c;color:#1a120b;border:0;border-radius:12px;padding:13px;font-weight:800;margin:8px 0 0'});
hbox.append($('b',{textContent:'🧾 Hojas de Sanctuarium',style:'color:#ffb066'}),$('p',{textContent:'Mira cada post marcado y le añade, en una fila nueva justo después de la última hoja que ya tenga, las hojas nuevas que le falten. No toca nada más: ni texto, ni tags, ni la cajita del ask.',style:'color:#f3c99a;margin:4px 0 6px;font-size:14px'}),hlist,bH,hst,hlog);box.append(hbox);
let HM=null;const hchk={};
let HB=RAWB;(async()=>{const S0=await rawSha();for(const b of [S0,RAWB,ARCH].filter(Boolean)){try{const r=await fetch(b+'sheets.json?'+Date.now(),{cache:'no-store'});if(r.ok){HM=await r.json();HB=b===ARCH?RAWB:b;break;}}catch(e){}}if(!HM){hst.textContent='No pude leer la lista de hojas (ni de GitHub ni de la web). Vuelve a abrir el Renacer en un minuto.';return;}
  HM.posts.forEach(p=>{const c=$('input',{type:'checkbox',checked:LS.get('rnc_h_'+p.id,p.on)});c.onchange=()=>LS.set('rnc_h_'+p.id,c.checked);hchk[p.id]=c;const l=$('label',{style:'display:flex;gap:8px;align-items:center;margin:2px 0;font-size:14px'});l.append(c,$('span',{textContent:p.label}));hlist.append(l);});
  hst.textContent=HM.sheets.length+' hojas en la lista; la última: '+HM.sheets[HM.sheets.length-1].f.split('/').pop();})();
bH.onclick=async()=>{if(!HM)return;bH.disabled=true;hlog.textContent='';const say=t=>{hlog.textContent+=t+'\n';hlog.scrollTop=1e9;};const blog=HM.blog;let done=0,same=0,bad=0;
  const big=b=>{const m=(b.media||[]).slice().sort((x,y)=>(y.width||0)-(x.width||0))[0]||{};return [m.width||0,m.height||0];};
  const near=(s,w,h)=>s&&Math.abs(s.w-w)<=3&&Math.abs(s.h-h)<=3;const which=b=>{if(!b||b.type!=='image')return -1;const [w,h]=big(b);let k=HM.sheets.findIndex(s=>near(s,w,h));if(k<0)k=HM.sheets.findIndex(s=>near(s.old,w,h));return k;};const isOld=b=>{const [w,h]=big(b);return HM.sheets.some(s=>near(s.old,w,h)&&!near(s,w,h));};
  for(const p of HM.posts){if(!hchk[p.id]||!hchk[p.id].checked)continue;
    const P=await getPost(blog,p.id,3);if(!P||!P.content){say('✗ '+p.label+': no pude leerlo');bad++;continue;}
    const C=P.content;const DR=HM.drop||[];const isDrop=b=>{if(!b||b.type!=='image')return false;const [w,h]=big(b);return DR.some(d=>near(d,w,h));};const drop=new Set();C.forEach((b,i)=>{if(isDrop(b))drop.add(i);});
    const TL=new Set((p.tail||[]).map(f=>HM.sheets.findIndex(s=>s.f===f)).filter(k=>k>=0));const mv=[];C.forEach((b,i)=>{if(!drop.has(i)&&TL.has(which(b)))mv.push(i);});
    const keep=C.map((b,i)=>i).filter(i=>!drop.has(i));const needMove=mv.length>0&&mv.join()!==keep.slice(-mv.length).join();const mvS=new Set(needMove?mv:[]);
    let last=-1,lastBlock=-1;const have=new Set();C.forEach((b,i)=>{if(drop.has(i))return;const k=which(b);if(k>=0){have.add(k);if(k>last)last=k;if(!mvS.has(i))lastBlock=Math.max(lastBlock,i);}});
    if(last<0){say('= '+p.label+': no encuentro ninguna hoja en el post, no lo toco');same++;continue;}
    const add=[];for(let k=last+1;k<HM.sheets.length;k++)if(!have.has(k))add.push(k);
    const sw=[];C.forEach((b,i)=>{if(!drop.has(i)&&which(b)>=0&&isOld(b))sw.push(i);});if(!add.length&&!sw.length&&!drop.size&&!needMove){say('= '+p.label+': ya tiene todas las hojas');same++;continue;}
    {const cur=C.filter((b,i)=>b&&b.type==='image'&&!drop.has(i)).length;const room=30-cur;if(add.length>room){const left=add.splice(Math.max(0,room));say('⚠ '+p.label+': solo caben '+Math.max(0,room)+' hoja(s) más (tope de 30 imágenes de Tumblr); se quedan fuera: '+left.map(k=>HM.sheets[k].f.split('/').pop().replace(/^\d+_/,'').replace('.png','')).join(', '));}if(!add.length&&!sw.length&&!drop.size&&!needMove){say('= '+p.label+': está lleno (30 imágenes), no le cabe ninguna hoja más');same++;continue;}}
    const NB=add.map(k=>({type:'image',media:[{url:HB+HM.sheets[k].f}]}));const content=[];const m=[];let at=-1;
    const put=(b,i)=>{m[i]=content.length;content.push(sw.includes(i)?{type:'image',media:[{url:HB+HM.sheets[which(b)].f}]}:b);};
    C.forEach((b,i)=>{if(drop.has(i)){m[i]=-1;}else if(!mvS.has(i)){put(b,i);}if(i===lastBlock){at=content.length;NB.forEach(x=>content.push(x));}});
    if(at<0&&NB.length){at=content.length;NB.forEach(x=>content.push(x));}
    mv.forEach(i=>{if(mvS.has(i))put(C[i],i);});
    const nimgs=content.filter(x=>x&&x.type==='image').length;if(nimgs>30){say('✗ '+p.label+': quedaría con '+nimgs+' imágenes y Tumblr solo deja 30 por post; no lo toco');bad++;continue;}
    const mp=j=>m[j];const layout=(P.layout||[]).map(l=>{const L=JSON.parse(JSON.stringify(l));if(L.blocks)L.blocks=L.blocks.map(mp).filter(j=>j>=0);if(L.truncate_after!=null){let t=L.truncate_after;while(t>=0&&m[t]<0)t--;L.truncate_after=t>=0?m[t]:L.truncate_after;}
      if(L.type==='rows'&&L.display){let ri=L.display.findIndex(r=>r.blocks.includes(lastBlock));L.display.forEach(r=>{r.blocks=r.blocks.filter(j=>!mvS.has(j)).map(mp).filter(j=>j>=0);});const rows=[];for(let k=0;k<NB.length;k+=3)rows.push({blocks:NB.slice(k,k+3).map((_,q)=>at+k+q)});if(ri<0)ri=L.display.length-1;L.display.splice(ri+1,0,...rows);mv.forEach(i=>{if(mvS.has(i))L.display.push({blocks:[m[i]]});});L.display=L.display.filter(r=>r.blocks.length);}
      return L;});
    if(drop.size)say('… '+p.label+': quito '+drop.size+' hoja(s) repetida(s) de una versión anterior');
    const body={content,layout,tags:(P.tags||[]).join(',')};
    if(sw.length)say('… '+p.label+': cambio '+sw.length+' hoja(s) por la versión con el número de ronda');if(needMove)say('… '+p.label+': pongo '+mv.length+' hoja(s) al final, debajo del texto al que contestan');if(add.length)say('… '+p.label+': añado '+add.map(k=>HM.sheets[k].f.split('/').pop().replace(/^\d+_/,'').replace('.png','')).join(', '));
    const r=await api('/blog/'+blog+'/posts/'+p.id,{method:'PUT',body},180000);
    if(r&&r.error){say('✗ '+p.label+': Tumblr no dejó editarlo: '+why(r).trim());bad++;}else{say('✓ '+p.label+': hecho');done++;}
    await sleep(3000);}
  hst.textContent='Listo: '+done+' editados, '+same+' sin cambios'+(bad?', '+bad+' con error':'')+'.';bH.disabled=false;};
const KA={on:0,ctx:null,osc:null,el:null,url:null,
start(){if(!bgon.checked)return;this.on++;if(this.on>1){this.poke();return;}
try{const C=window.AudioContext||window.webkitAudioContext;if(C){const c=new C(),o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.value=40;g.gain.value=0.0015;o.connect(g);g.connect(c.destination);o.start();this.ctx=c;this.osc=o;if(c.state!=='running')c.resume().catch(()=>{});}}catch(e){}
try{const R=8000,N=R*12,d=new DataView(new ArrayBuffer(44+N*2));const w=(o,t)=>{for(let i=0;i<t.length;i++)d.setUint8(o+i,t.charCodeAt(i));};w(0,'RIFF');d.setUint32(4,36+N*2,true);w(8,'WAVE');w(12,'fmt ');d.setUint32(16,16,true);d.setUint16(20,1,true);d.setUint16(22,1,true);d.setUint32(24,R,true);d.setUint32(28,R*2,true);d.setUint16(32,2,true);d.setUint16(34,16,true);w(36,'data');d.setUint32(40,N*2,true);for(let i=0;i<N;i++)d.setInt16(44+i*2,Math.round(50*Math.sin(2*Math.PI*40*i/R)),true);
this.url=URL.createObjectURL(new Blob([d.buffer],{type:'audio/wav'}));const el=new Audio(this.url);el.loop=true;el.play().catch(()=>{});this.el=el;
if('mediaSession' in navigator&&window.MediaMetadata){navigator.mediaSession.metadata=new MediaMetadata({title:'Renacer: publicando',artist:'Renacer'});try{navigator.mediaSession.playbackState='playing';}catch(e){}}}catch(e){}},
poke(){try{if(this.ctx&&this.ctx.state!=='running')this.ctx.resume().catch(()=>{});if(this.el&&this.el.paused)this.el.play().catch(()=>{});}catch(e){}},
stop(){if(!this.on)return;this.on--;if(this.on)return;try{if(this.osc)this.osc.stop();if(this.ctx)this.ctx.close();}catch(e){}try{if(this.el){this.el.pause();this.el.removeAttribute('src');this.el.load();}if(this.url)URL.revokeObjectURL(this.url);}catch(e){}try{if('mediaSession' in navigator)navigator.mediaSession.metadata=null;}catch(e){}this.ctx=this.osc=this.el=this.url=null;}};
let wbRunning=false;
async function wbRun(){if(wbRunning)return;wbRunning=true;let done=0;
  for(;;){let k='rnc_wbq',q=LS.get(k,[]);if(!q.length){k='rnc_wbqi';q=LS.get(k,[]);}if(!q.length)break;const u=q[0];
    wbst.textContent='Wayback: guardando. En cola: '+LS.get('rnc_wbq',[]).length+' post(s) y '+LS.get('rnc_wbqi',[]).length+' imagen(es). Deja esta pestaña abierta; si la cierras, sigue la próxima vez.';
    try{await fetch('https://web.archive.org/save/'+u,{mode:'no-cors',credentials:'omit'});}catch(e){}
    LS.set(k,LS.get(k,[]).filter(x=>x!==u));done++;await new Promise(r=>setTimeout(r,k==='rnc_wbq'?4000:2500));}
  wbst.textContent=done?'Wayback: '+done+' guardado(s), cola vacía.':'';wbRunning=false;}
function wbImgs(C){const L=[];(C||[]).forEach(b=>{if(!b||b.type!=='image'||!b.media||!b.media.length)return;const M=b.media.filter(m=>m&&m.url&&m.width).sort((a,c)=>a.width-c.width);if(!M.length)return;
  const pick=w=>(M.find(m=>m.width>=w)||M[M.length-1]).url;[pick(1e9),pick(1080),pick(540)].forEach((u,j)=>{(L[j]=L[j]||[]).push(u);});});
  return [...new Set([].concat(...L))];}
const wbAdd=(u,imgs)=>{if(!wbon.checked)return;const q=LS.get('rnc_wbq',[]);if(!q.includes(u)){q.push(u);LS.set('rnc_wbq',q);}
  if(imgs&&imgs.length){const qi=LS.get('rnc_wbqi',[]);imgs.forEach(x=>{if(!qi.includes(x))qi.push(x);});LS.set('rnc_wbqi',qi);}wbRun();};
if(LS.get('rnc_wbq',[]).length||LS.get('rnc_wbqi',[]).length)wbRun();
const fbox=$('div',{style:'background:#2a1a0e;border:1px solid #5a3a1e;border-radius:12px;padding:10px;margin:0 0 12px'});
const fst=$('div',{style:'color:#9be59b;font-size:14px;min-height:1.2em;margin-top:6px'});
const flog=$('div',{style:'font-size:12px;color:#e7b98a;white-space:pre-wrap;max-height:18vh;overflow:auto'});
const bstyle='display:block;width:100%;text-align:left;background:#5a3a1e;color:#ffd9b0;border:0;border-radius:10px;padding:11px;margin:6px 0 0;font-weight:700';
const bF=$('button',{textContent:'👥 Seguir a todos mis seguidores',style:bstyle});
const bL=$('button',{textContent:'📋 Seguir a mi lista fija',style:bstyle});
const sp=$('select',{style:'width:100%;padding:9px;border-radius:10px;background:#1a120b;color:#ffd9b0;border:1px solid #5a3a1e;margin-top:6px'});sp.append($('option',{value:'n',textContent:'Normal (uno cada 6 a 12 s; el seguro con un blog nuevo)'}),$('option',{value:'f',textContent:'Rápido (uno cada 2 a 4 s)'}),$('option',{value:'a',textContent:'Como antes (uno cada 0,8 a 1,6 s)'}),$('option',{value:'t',textContent:'Turbo (sin espera)'}));
const CAP=200;const fkey=()=>'rnc_fts_'+sel.value;const fts=()=>{const n=Date.now();let a=LS.get(fkey(),null);if(!Array.isArray(a)){a=[];const k0=new Date(n).toISOString().slice(0,10),k1=new Date(n-864e5).toISOString().slice(0,10),m0=Date.parse(k0+'T00:00:00Z');const c1=LS.get('rnc_fday_'+sel.value+'_'+k1,0),c0=LS.get('rnc_fday_'+sel.value+'_'+k0,0);for(let i=0;i<c1;i++)a.push(m0);for(let i=0;i<c0;i++)a.push(n);}a=a.filter(t=>n-t<864e5);LS.set(fkey(),a);return a;};const ftoday=()=>fts().length;const fadd=()=>{const a=fts();a.push(Date.now());LS.set(fkey(),a);};const fwhen=()=>{const a=fts();if(a.length<CAP)return 'ya';const t=new Date(a[a.length-CAP]+864e5);return 'a partir de las '+t.toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit'})+(t.toDateString()!==new Date().toDateString()?' de mañana':'');};async function followingSet(){const S=new Set();let off=0,tot=0;for(let k=0;k<500;k++){const r=await api('/user/following?limit=20&offset='+off);const R=r&&(r.response||r);if(!R||!R.blogs)break;tot=R.total_blogs||tot;R.blogs.forEach(b=>b&&b.name&&S.add(String(b.name).toLowerCase()));if(!R.blogs.length)break;off+=20;if(tot&&off>=tot)break;}return S;}
const fnote=$('div',{style:'font-size:12px;color:#a58a6a;margin-top:4px'});
fbox.append($('b',{textContent:'Seguidores',style:'color:#ffb066'}),sp,fnote,bF,bL,fst,flog);box.append(fbox);
/* Perfil: título, bio, foto, cabecera, colores y pinned de un toque */
const pbox=$('div',{style:'background:#2a1a0e;border:1px solid #5a3a1e;border-radius:12px;padding:10px;margin:0 0 12px'});
let PROF=null;const prof=async()=>{if(PROF)return PROF;try{PROF=await (await ffetch('profile/profile.json?'+Date.now())).json();}catch(e){PROF={sets:[]};}return PROF;};
const pinExtra=async key=>{if(!key)return [];try{const P=await prof();for(const S of (P.sets||[])){if(S.pinned&&S.pinned.page+'#'+S.pinned.i===key)return S.pinned.extra_tags||[];}}catch(e){}return [];};
const selst='width:100%;padding:9px;border-radius:10px;background:#1a120b;color:#ffd9b0;border:1px solid #5a3a1e;margin-top:6px';
const psel=$('select',{style:selst}),phsel=$('select',{style:selst});
const pck=(t,on)=>{const l=$('label',{style:'display:inline-block;margin:6px 12px 0 0;font-size:14px'});const c=$('input',{type:'checkbox',checked:on!==false});l.append(c,' '+t);return [l,c];};
const [lT,cT]=pck('título'),[lB,cB]=pck('bio'),[lA,cA]=pck('foto'),[lH,cH]=pck('cabecera'),[lC,cC]=pck('colores'),[lP,cP]=pck('pinned (publicar y fijar)');
const pst=$('div',{style:'color:#9be59b;font-size:14px;min-height:1.2em;margin-top:6px'});const plog=$('div',{style:'font-size:12px;color:#e7b98a;white-space:pre-wrap;max-height:18vh;overflow:auto'});
const bP=$('button',{textContent:'🪪 Poner el perfil en el blog elegido arriba',style:bstyle});
const pnote=$('div',{style:'font-size:12px;color:#a58a6a;margin-top:4px',textContent:'Elige el juego y la cabecera; lo marcado se pone de un toque en el blog de arriba. La bio va tal cual está guardada. Si Tumblr no acepta una foto de perfil, prueba la siguiente de la lista.'});
const fillH=()=>{const S=PROF&&PROF.sets[+psel.value];phsel.innerHTML='';(S&&S.headers||[]).forEach((h,i)=>phsel.append($('option',{value:String(i),textContent:h.label})));lP.style.display=S&&S.pinned?'inline-block':'none';};
prof().then(P=>{P.sets.forEach((S,i)=>psel.append($('option',{value:String(i),textContent:S.label})));fillH();});psel.onchange=fillH;
const b64=b=>new Promise((ok,ko)=>{const r=new FileReader();r.onload=()=>ok(String(r.result).replace(/^.+,/,''));r.onerror=ko;r.readAsDataURL(b);});
bP.onclick=async()=>{const blog=sel.value;const S=PROF&&PROF.sets[+psel.value];if(!blog||!S){pst.textContent='Elige blog y juego.';return;}bP.disabled=true;plog.textContent='';const say=t=>{plog.textContent+=t+'\n';};pst.textContent='Poniendo el perfil en '+blog+'…';
  try{
    if(cT.checked||cB.checked){const body={};if(cT.checked)body.title=S.title;if(cB.checked)body.description=S.description.replace(/\n/g,'<br />');const r=await api('/blog/'+blog+'/settings',{method:'POST',body});say(r&&!r.error?'✓ '+[cT.checked?'título':'',cB.checked?'bio':''].filter(Boolean).join(' y '):'✗ título/bio: '+why(r));}
    if(S.settings){const K=Object.keys(S.settings);const cc=k=>k.replace(/_([a-z])/g,(m,c)=>c.toUpperCase());
      const read=async()=>{try{const q=await api('/blog/'+blog+'/info?fields%5Bblogs%5D='+K.join(','));const B=q&&(q.response||q)&&(q.response||q).blog;if(!B)return null;const o={};K.forEach(k=>{o[k]=B[k]!==undefined?B[k]:B[cc(k)];});return o;}catch(e){return null;}};
      let r=await api('/blog/'+blog+'/settings',{method:'POST',body:S.settings});let v=await read();
      const bad=()=>v&&K.some(k=>v[k]!==undefined&&v[k]!==S.settings[k]);
      if(!r||r.error||(r.meta&&r.meta.status>=400)||bad()){const b2={};K.forEach(k=>{b2[cc(k)]=S.settings[k];});r=await api('/blog/'+blog+'/settings',{method:'POST',body:b2});v=await read();}
      const lab={ask_enabled:'preguntas (asks) activadas',ask_allow_anonymous:'anónimos activados',messaging_allow_follows_only:'mensajes solo de quien sigues'};
      if(!r||r.error||(r.meta&&r.meta.status>=400))say('✗ asks y mensajes: '+why(r));
      else K.forEach(k=>{const x=v&&v[k];say((x===undefined?'✓ ':x===S.settings[k]?'✓ ':'✗ ')+(lab[k]||k)+(x===undefined?' (Tumblr no me deja comprobarlo desde aquí: míralo en Ajustes si quieres)':x===S.settings[k]?'':' (Tumblr no lo dejó puesto)'));});}
    if(cC.checked&&S.theme){const r=await api('/blog/'+blog+'/theme_settings',{method:'POST',body:S.theme});say(r&&!r.error?'✓ colores y letra':'✗ colores: '+why(r));}
    if(cA.checked&&(S.avatars||S.avatar)){const AV=(S.avatars&&S.avatars.length?S.avatars:[{file:S.avatar,label:'foto'}]).map(a=>typeof a==='string'?{file:a,label:a.split('/').pop()}:a);let okA=false;for(let k=0;k<AV.length&&!okA;k++){const A=AV[k];const nx=k+1<AV.length?' → pruebo la siguiente':'';try{const b=await (await ffetch(A.file)).blob();const r=await api('/blog/'+blog+'/avatar',{method:'POST',body:{data:await b64(b)}});if(!r||r.error){say('✗ foto '+(k+1)+' ('+A.label+'): '+why(r)+nx);continue;}await new Promise(z=>setTimeout(z,6000));const bi=await api('/blog/'+blog+'/info');const BI=bi&&(bi.response||bi);const au=JSON.stringify((BI&&BI.blog&&BI.blog.avatar)||'');if(/default_avatar|media_violation/.test(au)){say('✗ foto '+(k+1)+' ('+A.label+'): Tumblr no la dejó puesta'+nx);continue;}okA=true;say('✓ foto ('+A.label+')');}catch(e){say('✗ foto '+(k+1)+' ('+A.label+'): '+String(e&&(e.message||e))+nx);}}if(!okA)say('✗ foto: no entró ninguna de las '+AV.length);}
    if(cH.checked&&S.headers&&S.headers.length){const H=S.headers[+phsel.value||0];const b=await (await ffetch(H.file)).blob();const fd=new FormData();fd.append('data',new File([b],H.file.split('/').pop(),{type:b.type}));fd.append('header_stretch',String(!(S.theme&&S.theme.header_stretch===false)));const r=await api('/blog/'+blog+'/header',{method:'POST',body:fd,headers:{'Content-Type':'multipart/form-data'}});say(r&&!r.error?'✓ cabecera ('+H.label+')':'✗ cabecera: '+why(r));}
    if(cP.checked&&S.pinned){await links();const M=(LS.get('rnc_links',{})[blog])||{};let u=M[S.pinned.id],id=u?u.split('/').pop():null;
      if(!id){say('  el pinned no estaba publicado aquí: lo publico');const pg=await loadPage(S.pinned.page);if(!pg)throw new Error('no pude cargar '+S.pinned.page);const key=S.pinned.page+'#'+S.pinned.i;const res=await publishOne(blog,pg.D[S.pinned.i],(pg.TG&&pg.TG[S.pinned.i])||pg.TAGS,pg.labs[S.pinned.i]||'pinned',key,null,null);id=res&&res.id;
        if(id&&S.pinned.whole){const PKw='rnc_whole_'+S.pinned.whole+'_'+blog;const d=LS.get(PKw,[]);if(!d.includes(key))d.push(key);LS.set(PKw,d);}}
      if(id){const r=await api('/blog/'+blog+'/posts/'+id+'/pin',{method:'POST'});say(r&&!r.error?'✓ pinned fijado ('+id+')':'✗ fijar: '+why(r));}else say('✗ no pude publicar el pinned');}
    pst.textContent='Perfil puesto en '+blog+'.';
  }catch(e){say('✗ '+String(e&&(e.message||e)));pst.textContent='Algo falló; mira el registro.';}
  bP.disabled=false;};
pbox.append($('b',{textContent:'🪪 Perfil',style:'color:#ffb066'}),psel,phsel,$('div',{},lT,lB,lA,lH,lC,lP),pnote,bP,pst,plog);box.append(pbox);
const fupd=()=>{fnote.textContent='Tope: '+CAP+' follows cada 24 horas por blog, contadas hora a hora (no se reinicia a medianoche), el límite de Tumblr. Llevas '+ftoday()+' en '+sel.value+(ftoday()>=CAP?'; puedes seguir otra vez '+fwhen():'')+'. Del 201 en adelante Tumblr dice OK pero no sigue a nadie. Los que ya sigues se saltan solos. Con el blog recién hecho, pon foto y cabecera y publica algo antes de seguir.';};
fupd();sel.addEventListener('change',fupd);
sp.value=LS.get('rnc_fpace','n');sp.onchange=()=>LS.set('rnc_fpace',sp.value);
const nap=()=>sp.value==='t'?Promise.resolve():new Promise(r=>setTimeout(r,sp.value==='a'?800+Math.random()*800:sp.value==='f'?2000+Math.random()*2000:6000+Math.random()*6000));
async function followAll(names,label){
  bF.disabled=bL.disabled=true;KA.start();let ok=0,n=0,capped=false;
  for(const nm of names){if(ftoday()>=CAP){capped=true;break;}n++;fst.textContent=label+': '+n+' de '+names.length+' ('+nm+') · hoy '+ftoday()+' de '+CAP;
    const r=await api('/user/follow',{method:'POST',body:{url:'https://'+nm+'.tumblr.com'}});
    if(r&&!r.error&&!(r.meta&&r.meta.status>=400)){ok++;fadd();flog.textContent+='✓ '+nm+'\n';}else flog.textContent+='✗ '+nm+' · '+why(r)+'\n';
    flog.scrollTop=1e9;await nap();}
  fst.textContent=label+': hecho, '+ok+' seguidos de '+names.length+'.'+(capped?' Tope de '+CAP+' follows en 24 horas en este blog (el límite de Tumblr): los que faltan, '+fwhen()+', y se salta solo a los que ya sigues; pasarse del límite es lo que los deja en fantasma.':'');bF.disabled=bL.disabled=false;KA.stop();if(typeof fupd==='function')fupd();
}
bF.onclick=async()=>{const blog=sel.value;fst.textContent='Leyendo seguidores de '+blog+'…';let users=[],off=0,total=0;
  for(let k=0;k<500;k++){const r=await api('/blog/'+blog+'/followers?limit=20&offset='+off);const R=r&&(r.response||r);
    if(!R||!R.users){if(users.length)break;fst.textContent='No pude leer los seguidores: '+JSON.stringify(r).slice(0,150);return;}
    total=R.total_users||total;users=users.concat(R.users);off+=20;fst.textContent='Leyendo seguidores de '+blog+'… '+users.length+(total?' de '+total:'');if(!R.users.length||(total&&off>=total))break;}
  {const seen=new Set();users=users.filter(x=>x&&x.name&&!seen.has(String(x.name).toLowerCase())&&seen.add(String(x.name).toLowerCase()));}
  const F0=await followingSet();const todo=users.filter(x=>!x.following&&!F0.has(String(x.name).toLowerCase())).map(x=>x.name);
  flog.textContent='Seguidores: '+total+' (leídos '+users.length+'). Ya los sigues: '+(users.length-todo.length)+'. Por seguir: '+todo.length+'\n';
  if(!todo.length){fst.textContent='Ya los sigues a todos.';return;}
  followAll(todo,'Seguidores');};
bL.onclick=async()=>{fst.textContent='Leyendo la lista…';let t='';try{t=await (await ffetch('lista.txt?'+Date.now())).text();}catch(e){}
  const L=[...new Set(t.split(/\r?\n/).map(x=>x.trim().toLowerCase().replace(/^@/,'')).filter(Boolean))];
  if(!L.length){fst.textContent='La lista está vacía.';return;}fst.textContent='Mirando a quién sigues ya…';const F=await followingSet();const todo=L.filter(x=>!F.has(x));flog.textContent='Lista fija: '+L.length+'. Ya los sigues: '+(L.length-todo.length)+'. Por seguir: '+todo.length+'\n';if(!todo.length){fst.textContent='Ya sigues a todos los de la lista.';return;}followAll(todo,'Lista fija');};
const kbox=$('div',{style:'background:#2a1a0e;border:1px solid #5a3a1e;border-radius:12px;padding:10px;margin:0 0 12px'});
const bK=$('button',{textContent:'🚫 Bloquear a todos los de mi lista de bloqueos',style:bstyle});
const kst=$('div',{style:'color:#9be59b;font-size:14px;min-height:1.2em;margin-top:6px'});
const klog=$('div',{style:'font-size:12px;color:#e7b98a;white-space:pre-wrap;max-height:18vh;overflow:auto'});
const nst=$('div',{style:'color:#9be59b;font-size:13px;min-height:1.2em;margin-top:4px'});
kbox.append($('b',{textContent:'Bloqueos',style:'color:#ffb066'}),$('p',{textContent:'Nada más abrir el Renacer (o cambiar de blog arriba) se bloquea solo a todos los de la lista de bloqueos en ese blog, y el blog se pone en no compartir a quién sigues. Los que ya tienes bloqueados se saltan, así que el botón se puede pulsar las veces que haga falta.',style:'font-size:13px;color:#e7b98a;margin:6px 0 0'}),bK,nst,kst,klog);box.append(kbox);
const kname=x=>x.replace(/#.*/,'').trim().toLowerCase().replace(/^@/,'').replace(/^https?:\/\//,'').replace(/^www\.tumblr\.com\//,'').replace(/\.tumblr\.com.*$/,'').replace(/[\/?].*$/,'');
let KRUN=false;
async function noShare(blog){const MK='rnc_nofol_'+blog;if(LS.get(MK,false)){nst.textContent='✓ '+blog+' no comparte a quién sigue.';return;}
  nst.textContent='Poniendo '+blog+' en no compartir a quién sigue…';
  const r=await api('/blog/'+blog+'/settings',{method:'POST',body:{share_following:false}});
  if(!r||r.error||(r.meta&&r.meta.status>=400)){nst.textContent='✗ No pude quitar "compartir a quién sigues" en '+blog+': '+why(r)+'. Se reintenta solo la próxima vez que entres.';return;}
  let v;try{const q=await api('/blog/'+blog+'/info?fields%5Bblogs%5D=share_following');const Q=q&&(q.response||q);const B=Q&&Q.blog;v=B?(B.share_following!==undefined?B.share_following:B.shareFollowing):undefined;}catch(e){}
  if(v===true){nst.textContent='✗ Tumblr no aceptó quitar "compartir a quién sigues" en '+blog+'. Se reintenta solo la próxima vez que entres.';return;}
  LS.set(MK,true);nst.textContent='✓ '+blog+' ya no comparte a quién sigue'+(v===undefined?' (Tumblr no me deja comprobarlo desde aquí: si ves la pestaña Siguiendo pública, dímelo)':'')+'.';}
async function runBlocks(auto){const blog=sel.value;if(KRUN||!blog)return;KRUN=true;bK.disabled=true;
  try{try{await noShare(blog);}catch(e){nst.textContent='✗ compartir seguidos: '+String(e&&e.message||e);}
  let t='';try{t=await (await ffetch('bloqueos.txt?'+Date.now())).text();}catch(e){}
  const L=[...new Set(t.split(/\r?\n/).map(kname).filter(x=>/^[a-z0-9-]+$/.test(x)))];const sig=L.slice().sort().join(',');const MK='rnc_blk_'+blog;
  if(!L.length){kst.textContent='La lista de bloqueos está vacía.';return;}
  if(auto&&LS.get(MK,'')===sig){kst.textContent='✓ La lista de bloqueos ('+L.length+') ya está aplicada en '+blog+'.';return;}
  klog.textContent='';kst.textContent=(auto?'Al entrar: ':'')+'mirando a quién tienes ya bloqueado en '+blog+'…';const have=new Set();
  for(let off=0;off<5000;off+=20){const r=await api('/blog/'+blog+'/blocks?limit=20&offset='+off);const R=r&&(r.response||r);const B=(R&&(R.blocked_tumblelogs||R.blockedTumblelogs))||[];B.forEach(b=>have.add(String(b&&b.name||'').toLowerCase()));if(B.length<20)break;}
  const todo=L.filter(n=>!have.has(n));klog.textContent='Lista: '+L.length+' · ya bloqueados en '+blog+': '+(L.length-todo.length)+' · por bloquear: '+todo.length+'\n';
  let ok=0,n=0;
  for(const nm of todo){n++;kst.textContent=(auto?'Al entrar: ':'')+'bloqueando '+n+' de '+todo.length+' ('+nm+')…';
    const r=await api('/blog/'+blog+'/blocks',{method:'POST',body:{blocked_tumblelog:nm}});
    if(r&&!r.error&&!(r.meta&&r.meta.status>=400)){ok++;klog.textContent+='✓ '+nm+'\n';}else klog.textContent+='✗ '+nm+' · '+why(r)+'\n';
    klog.scrollTop=1e9;await new Promise(z=>setTimeout(z,700+Math.random()*700));}
  if(ok===todo.length)LS.set(MK,sig);
  kst.textContent=todo.length?(auto?'Al entrar: ':'')+ok+' bloqueados nuevos en '+blog+(todo.length-ok?', '+(todo.length-ok)+' no se pudieron (mira abajo): se reintentan solos la próxima vez que entres':'')+'. De la lista, bloqueados: '+(L.length-todo.length+ok)+' de '+L.length+'.':'✓ Ya los tienes a todos bloqueados en '+blog+'.';
  }finally{KRUN=false;bK.disabled=false;}}
bK.onclick=()=>runBlocks(false);sel.addEventListener('change',()=>runBlocks(true));setTimeout(()=>runBlocks(true),1200);
/* Respuestas fijas: mis respuestas en un post ajeno y luego bloquear, de un toque */
const rbox=$('div',{style:'background:#2a1a0e;border:1px solid #5a3a1e;border-radius:12px;padding:10px;margin:0 0 12px'});
const rst=$('div',{style:'color:#9be59b;font-size:14px;min-height:1.2em;margin-top:6px'});const rlog=$('div',{style:'font-size:12px;color:#e7b98a;white-space:pre-wrap;max-height:18vh;overflow:auto'});
const rin=$('div');rbox.append($('b',{textContent:'💬 Respuestas fijas',style:'color:#ffb066'}),$('p',{textContent:'Pega tus respuestas en el post, desde el blog elegido arriba, y después bloquea. Solo cuando pulsas. Si una respuesta ya salió desde este blog, no se repite.',style:'font-size:12px;color:#a58a6a;margin:4px 0'}),rin,rst,rlog);box.append(rbox);{const rsb=$('div',{style:'margin-top:10px'});box.append(rsb);ffetch('restaurar.json?'+Date.now()).then(r=>r.ok?r.json():[]).then(L=>{if(!L||!L.length)return;const st=$('div',{style:'font-size:12px;color:#e7b98a;white-space:pre-wrap;margin-top:6px'});const b=$('button',{textContent:'↩️ Devolver a su versión original los '+L.length+' posts que el Renacer editó sin permiso',style:'width:100%;padding:10px;border-radius:10px;background:#5a3a1e;color:#ffd9b0;border:0;margin-top:6px;font:inherit'});b.onclick=async()=>{b.disabled=true;st.textContent='';for(const E of L){const H=E.html;const tags=(E.tags||[]).join(',');const AK=askNPF(H);let r=await api('/blog/'+E.blog+'/posts/'+E.id,{method:'PUT',body:AK?{content:AK.content,layout:AK.layout,tags,state:'published'}:{content:toNPF(H),tags,state:'published'}});if(r&&r.error&&AK){r=await api('/blog/'+E.blog+'/posts/'+E.id,{method:'PUT',body:{content:toNPF(H),tags,state:'published'}});st.textContent+=((r&&!r.error)?'✓ '+E.label+' (texto, enlaces y tags originales; Tumblr no deja volver a poner la cajita de ask al editar)':'✗ '+E.label+': '+why(r||{}))+'\n';continue;}st.textContent+=((r&&!r.error)?'✓ '+E.label+' devuelto a su versión original':'✗ '+E.label+': '+why(r||{}))+'\n';}b.disabled=false;};rsb.append(b,st);}).catch(()=>{});}
const RMAX=1975;
const rparts=(pre,parts)=>{const all=parts.join('\n\n');if((pre+all).length<=RMAX)return [pre+all];const out=[];
  for(const p of parts){let s=p;while((pre+s).length>RMAX){let cut=s.lastIndexOf('. ',RMAX-pre.length-1);if(cut<200)cut=s.lastIndexOf(' ',RMAX-pre.length-1);out.push(pre+s.slice(0,cut+1).trim());s=s.slice(cut+1).trim();}out.push(pre+s);}return out;};
const rnm=x=>String((x&&(x.blog_name||x.blogName||(x.blog&&x.blog.name)||(x.tumblelog&&x.tumblelog.name)))||'').toLowerCase();const rrid=x=>String((x&&(x.reply_id||x.replyId||x.id))||'');
const rtx=x=>{if(!x)return '';if(Array.isArray(x.content))return x.content.map(c=>(c&&c.text)||'').join(' ');return String(x.reply_text||x.replyText||x.text||'');};const nrm=t=>String(t||'').toLowerCase().replace(/\s+/g,' ').trim();
async function listMine(P,blog){const out=[];const seen=new Set();const walk=a=>{(a||[]).forEach(x=>{if(!x||typeof x!=='object')return;if(rnm(x)===blog.toLowerCase()&&rrid(x)&&!seen.has(rrid(x))){seen.add(rrid(x));out.push(x);}walk(x.children&&x.children.elements);walk(x.replies&&x.replies.elements);});};
  let path='/blog/'+P.blog+'/post/'+P.id+'/replies';for(let k=0;k<15&&path;k++){const q=await api(path);if(k===0&&(!q||q.error||(q.meta&&q.meta.status>=400)))return null;const Q=q&&(q.response||q);const T=Q&&(Q.timeline||Q);if(k===0&&!(T&&Array.isArray(T.elements)))return null;walk(T&&T.elements);const nx=T&&T.links&&T.links.next&&T.links.next.href;path=nx?String(nx).replace(/^\/?(api\/)?v2/,''):null;}
  return out;}
const hasReply=(M,R)=>{const need=nrm((R.parts||[])[0]).slice(0,60);return !!need&&(M||[]).some(x=>nrm(rtx(x)).includes(need));};
async function runReply(E,btn,o){o=o||{};const blog=o.blog||sel.value;if(!blog)return false;if(btn)btn.disabled=true;if(!o.keep)rlog.textContent='';let allok=true;const say=t=>{rlog.textContent+=t+'\n';rlog.scrollTop=1e9;};
  try{const P=E.post;rst.textContent='Leyendo el post de '+P.blog+'…';
    const PP=await getPost(P.blog,P.id,3);const key=PP&&(PP.reblog_key||PP.reblogKey);
    if(!key){allok=false;o.err='no pude leer el post';rst.textContent='✗ No pude leer el post de '+P.blog+' (¿borrado, o te tiene bloqueado?).'+(o.noblock?'':' Paso al bloqueo.');}
    else{const MINE=o.force?null:await listMine(P,blog);for(const R of E.replies){if(o.only&&!o.only.includes(R))continue;const MK='rnc_rep_'+blog+'_'+(R.id||R.target||R.thread_of||'post');if(!o.force){if(MINE&&hasReply(MINE,R)){LS.set(MK,true);say('· La respuesta a '+(R.target||R.thread_of||'el post')+' ya está en el post desde '+blog+': no la repito.');continue;}if(LS.get(MK,false)){if(E.guard&&MINE){say('· La respuesta a '+(R.target||R.thread_of||'el post')+' salió desde '+blog+' y ya no está en el post: la repongo.');}else{say('· La respuesta a '+(R.target||R.thread_of||'el post')+' ya salió desde '+blog+': no la repito.');continue;}}}
      const RT=R.target||null;let root=null,pre='';if(RT){const q=await api('/blog/'+P.blog+'/post/'+P.id+'/replies/'+RT+'/permalink');const Q=q&&(q.response||q);const E0=Q&&Q.timeline&&Q.timeline.elements&&Q.timeline.elements[0];if(!E0){say('✗ No encuentro la respuesta '+RT+' en el post: '+why(q||{}));continue;}root=String(E0.id||E0.reply_id);const kids=(E0.children&&E0.children.elements)||[];const T=String(E0.id||E0.reply_id)===RT?E0:kids.find(k=>String(k.id||k.reply_id)===RT);pre=(T&&T!==E0)?'@'+(T.blog_name||(T.blog&&T.blog.name)||P.blog)+' ':'';}else if(R.thread_of){const q=await api('/blog/'+P.blog+'/post/'+P.id+'/replies/'+R.thread_of+'/permalink');const Q=q&&(q.response||q);const E0=Q&&Q.timeline&&Q.timeline.elements&&Q.timeline.elements[0];if(E0)root=String(E0.id||E0.reply_id);else say('· El hilo de la respuesta original ya no está: la pongo como respuesta al post.');}let ok=true;
      for(const txt of rparts(pre,R.parts)){rst.textContent='Respondiendo desde '+blog+'…';
        const r=await api('/user/post/reply',{method:'POST',body:{post_id:P.id,reply_text:txt,reblog_key:key,tumblelog:P.blog,reply_as:blog,...(root?{parent_reply_id:root,target_reply_id:RT||root}:{})}});
        if(!r||r.error||(r.meta&&r.meta.status>=400)){ok=false;o.err=String(why(r||{})).trim();say('✗ Respuesta a '+(RT||'el post')+': '+why(r||{}));break;}
        say('✓ Respuesta a '+(RT||'el post')+' publicada ('+txt.length+' caracteres).');await sleep(2500+Math.random()*1500);}
      if(ok)LS.set(MK,true);else allok=false;}}
    if(!o.noblock)for(const nm of E.block||[]){rst.textContent='Bloqueando a '+nm+'…';const r=await api('/blog/'+blog+'/blocks',{method:'POST',body:{blocked_tumblelog:nm}});
      say((r&&!r.error&&!(r.meta&&r.meta.status>=400))?'✓ '+nm+' bloqueado en '+blog:'✗ '+nm+': '+why(r||{}));await sleep(800);}
    if(!o.keep)rst.textContent='Hecho en '+blog+'. Mira abajo cada paso.';
  }finally{if(btn)btn.disabled=false;}return allok;}
async function delMyReplies(E,btn){const blog=sel.value;if(!blog)return;const P=E.post;if(!confirm('🗑 ¿Borrar todas las respuestas de '+blog+' en el post de '+P.blog+'?'))return;btn.disabled=true;rlog.textContent='';const say=t=>{rlog.textContent+=t+'\n';rlog.scrollTop=1e9;};
  try{const nm=x=>String((x&&(x.blog_name||x.blogName||(x.blog&&x.blog.name)||(x.tumblelog&&x.tumblelog.name)))||'').toLowerCase();const rid=x=>String((x&&(x.reply_id||x.replyId||x.id))||'');
    const list=async()=>{const out=[];const seen=new Set();const walk=a=>{(a||[]).forEach(x=>{if(!x||typeof x!=='object')return;if(nm(x)===blog.toLowerCase()&&rid(x)&&!seen.has(rid(x))){seen.add(rid(x));out.push(x);}walk(x.children&&x.children.elements);walk(x.replies&&x.replies.elements);});};
      let path='/blog/'+P.blog+'/post/'+P.id+'/replies';for(let k=0;k<15&&path;k++){const q=await api(path);const Q=q&&(q.response||q);const T=Q&&(Q.timeline||Q);walk(T&&T.elements);const nx=T&&T.links&&T.links.next&&T.links.next.href;path=nx?String(nx).replace(/^\/?(api\/)?v2/,''):null;}
      if(!out.length){const q=await api('/blog/'+P.blog+'/notes?id='+P.id+'&mode=conversation');const Q=q&&(q.response||q);walk(((Q&&Q.notes)||[]).filter(n=>n&&n.type==='reply'));}
      return out;};
    rst.textContent='Buscando tus respuestas desde '+blog+'…';let M=await list();if(!M.length){rst.textContent='No encuentro ninguna respuesta de '+blog+' en ese post (¿ya borradas?).';return;}
    say('Encontradas '+M.length+' respuesta(s) de '+blog+'.');const KW='rnc_repdel_way';let ways=[
      x=>['/blog/'+P.blog+'/post/'+P.id+'/replies/'+rid(x),{method:'DELETE'}],
      x=>['/user/post/reply/delete',{method:'POST',body:{post_id:P.id,tumblelog:P.blog,reply_id:rid(x),reply_as:blog}}],
      x=>['/user/post/reply',{method:'DELETE',body:{post_id:P.id,tumblelog:P.blog,reply_id:rid(x),reply_as:blog}}],
      x=>['/blog/'+P.blog+'/post/'+P.id+'/replies/'+rid(x)+'/delete',{method:'POST',body:{}}],
      x=>['/blog/'+blog+'/post/'+P.id+'/replies/'+rid(x),{method:'DELETE'}]];
    const w0=LS.get(KW,null);if(w0!==null&&ways[w0]){ways=[ways[w0]].concat(ways.filter((_,i)=>i!==w0));}
    let gone=0;for(const x of M){const id=rid(x);let ok=false;
      const lk=[];const scan=o=>{if(!o||typeof o!=='object')return;for(const [k,v] of Object.entries(o)){if(typeof v==='string'&&/delete/i.test(k+v)&&/^\/?(api\/)?v2\//.test(v))lk.push(v);else if(typeof v==='object')scan(v);}};scan(x);
      const tries=lk.map(h=>()=>[String(h).replace(/^\/?(api\/)?v2/,''),{method:'DELETE'}]).concat(ways.map(f=>()=>f(x)));
      for(let i=0;i<tries.length&&!ok;i++){const [p,o]=tries[i]();const r=await api(p,o);await sleep(1200);const L2=await list();if(!L2.some(y=>rid(y)===id)){ok=true;gone++;say('✓ respuesta '+id+' borrada');}else if(r&&r.error)say('  · '+o.method+' '+p+' → '+why(r).trim());}
      if(!ok)say('✗ no pude borrar la respuesta '+id+': Tumblr no aceptó ninguna forma. Bórrala a mano: toca tu respuesta en las notas del post → Borrar.');}
    E.replies.forEach(R=>LS.set('rnc_rep_'+blog+'_'+(R.id||R.target||R.thread_of||'post'),false));
    rst.textContent=gone===M.length?'Hecho: '+gone+' respuesta(s) de '+blog+' borradas del post de '+P.blog+'.':'Borradas '+gone+' de '+M.length+'. Mira abajo.';
  }finally{btn.disabled=false;}}
const GK='rnc_guard';const gkey=E=>E.post.blog+'/'+E.post.id;const GUI={};let GL=[];let GBUSY=false;let GKA=false;let GLAST=0;const ganyon=()=>{const A=LS.get(GK,{});return GL.some(E=>(A[gkey(E)]||{}).on);};const gka=on=>{try{if(on&&!GKA){GKA=true;KA.start();}else if(!on&&GKA){GKA=false;KA.stop();}}catch(e){}};
async function guardOne(E){const k=gkey(E);const G=(LS.get(GK,{})[k]);const st=GUI[k];const put=t=>{if(st)st.textContent=t;};if(!G||!G.on)return;
  const sv=()=>{const B=LS.get(GK,{});B[k]=G;LS.set(GK,B);};const hh=()=>new Date().toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit'});
  if(!blogs.some(b=>b.name===G.blog)){put('🛡 El guardián está puesto para '+G.blog+' y esta sesión no tiene ese blog: no hago nada.');return;}
  const M=await listMine(E.post,G.blog);if(M===null){put('🛡 '+hh()+' · No pude leer las respuestas del post (¿borrado, o '+G.blog+' bloqueado?). No repongo nada a ciegas.');return;}
  const miss=E.replies.filter(R=>!hasReply(M,R));
  if(!miss.length){put('🛡 '+hh()+' · Tu respuesta sigue en el post desde '+G.blog+'.'+(G.n?' Repuesta '+G.n+' vez/veces.':''));return;}
  const wait=30*60e3-(Date.now()-(G.last||0));if(wait>0){put('🛡 '+hh()+' · Falta tu respuesta y la repuse hace menos de 30 min: vuelvo a ponerla en '+Math.ceil(wait/60000)+' min.');return;}
  put('🛡 '+hh()+' · Falta tu respuesta: la repongo desde '+G.blog+'…');const o={blog:G.blog,only:miss,force:true,noblock:true,keep:true};
  const ok=await runReply(E,null,o);G.last=Date.now();
  if(ok){G.n=(G.n||0)+1;sv();put('🛡 '+hh()+' · La habían quitado y ya está repuesta desde '+G.blog+' (van '+G.n+').');}
  else{G.on=false;G.stop=o.err||'Tumblr no la aceptó';sv();if(GUI[k+'#c'])GUI[k+'#c'].checked=false;put('🛡 '+hh()+' · No pude reponerla ('+G.stop+'). Paro el guardián de este post: si ese blog está bloqueado ahí, no insisto.');}}
async function guardAll(){if(GBUSY)return;GBUSY=true;GLAST=Date.now();try{for(const E of GL){try{await guardOne(E);}catch(e){}}}finally{GBUSY=false;gka(ganyon());}}
ffetch('respuestas.json?'+Date.now()).then(r=>r.json()).then(L=>{L.forEach(E=>{const b=$('button',{textContent:'💬 '+E.label,style:bstyle});b.onclick=()=>{if(!confirm('💬 ¿Responder desde '+sel.value+' en el post de '+E.post.blog+(E.block&&E.block.length?' y bloquear a '+E.block.join(', '):'')+'?'))return;runReply(E,b);};const d=$('button',{textContent:'🗑 Borrar mis respuestas de este post (desde el blog elegido)',style:bstyle+';background:#5a1e1e;color:#ffd0d0;font-size:13px'});d.onclick=()=>delMyReplies(E,d);rin.append(b,d);if(E.guard){const k=gkey(E);const G0=(LS.get(GK,{})[k])||{};const c=$('input',{type:'checkbox',checked:!!G0.on});const st=$('div',{style:'font-size:12px;color:#e7b98a;white-space:pre-wrap;margin:2px 0 8px 28px;min-height:1em'});GUI[k]=st;GUI[k+'#c']=c;c.onchange=()=>{const A=LS.get(GK,{});const G=A[k]||{};if(c.checked){const bl=(E.as&&blogs.some(x=>x.name===E.as))?E.as:sel.value;if(!confirm('🛡 ¿Activar el guardián? Mientras el Renacer esté abierto, si tu respuesta desaparece del post de '+E.post.blog+', la repone solo desde '+bl+' (mira cada 10 min, repone al momento y deja 30 min entre una reposición y la siguiente; para si Tumblr la rechaza).')){c.checked=false;return;}G.on=true;G.blog=bl;G.stop='';}else G.on=false;A[k]=G;LS.set(GK,A);st.textContent=G.on?'🛡 Guardián activado para '+G.blog+'.':'';gka(ganyon());if(G.on)guardAll();};const l=$('label',{style:'display:flex;gap:8px;align-items:center;margin:6px 0 0;color:#ffb066;font-weight:700;font-size:13px'});l.append(c,$('span',{textContent:'🛡 Guardián: si borran esta respuesta, el Renacer la repone solo, sin que toques nada, mientras esta pestaña siga abierta (también en segundo plano)'}));rin.append(l,st);if(G0.on)st.textContent='🛡 Guardián activado para '+G0.blog+'.';}});GL=L.filter(E=>E.guard);if(ganyon())gka(true);document.addEventListener('pointerdown',()=>{if(GKA&&document.body.contains(box))KA.poke();},{passive:true});document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&document.body.contains(box)){if(GKA)KA.poke();if(Date.now()-GLAST>5*60e3)guardAll();}});setTimeout(guardAll,4000);const gt=setInterval(()=>{if(!document.body.contains(box)){clearInterval(gt);return;}guardAll();},10*60e3);}).catch(()=>{rst.textContent='No pude cargar las respuestas fijas.';});
const abox=$('div',{style:'background:#2a1a0e;border:1px solid #5a3a1e;border-radius:12px;padding:10px;margin:0 0 12px'});
const bA=$('button',{textContent:'🎨 Cabecera y foto de perfil',style:'display:block;width:100%;text-align:left;background:#5a3a1e;color:#ffd9b0;border:0;border-radius:10px;padding:11px;font-weight:700'});
const ain=$('div');abox.append(bA,ain);box.append(abox);
bA.onclick=async()=>{ain.innerHTML='';let K=[];try{K=await (await ffetch('branding/kits.json?'+Date.now())).json();}catch(e){}
  if(!K.length)K=[{name:'Choco',dir:'branding/',header:'header.png',avatar:'avatar.png'}];
  const row=$('div',{style:'display:flex;flex-wrap:wrap;gap:6px;margin-top:10px'});const body=$('div');ain.append(row,body);
  const sb='background:#3a2412;color:#ffd9b0;border:0;border-radius:10px;padding:9px 12px;font-weight:700';
  const cb=(lab,val)=>{const b=$('button',{textContent:'📋 '+lab,style:sb+';margin-top:6px'});b.onclick=async()=>{b.textContent=(await copy(val))?'✓ Copiado':'✗ No pude, mantén pulsado el texto';setTimeout(()=>{b.textContent='📋 '+lab;},2200);};return b;};
  const show=k=>{body.innerHTML='';[...row.children].forEach(x=>{x.style.background=x.dataset.n===k.name?'#ff9a3c':'#3a2412';x.style.color=x.dataset.n===k.name?'#1a120b':'#ffd9b0';});
    const im=(f,lab,name)=>{const u=ARCH+k.dir+f;const d=$('button',{textContent:'⬇ Descargar '+lab.toLowerCase(),style:sb+';margin-top:6px'});d.onclick=async()=>{d.textContent='Descargando…';await dl(u+'?'+Date.now(),name);d.textContent='⬇ Descargar '+lab.toLowerCase();};
      return $('div',{style:'margin-top:12px'},$('div',{textContent:lab,style:'font-size:13px;color:#f3c99a;margin-bottom:4px'}),$('img',{src:u+'?'+Date.now(),alt:lab,style:'width:100%;max-width:420px;border-radius:10px;display:block'}),d);};
    const slug=k.name.replace(/[^\w-]+/g,'-').toLowerCase();
    body.append(im(k.header,'Cabecera',slug+'_cabecera.'+k.header.split('.').pop()));if(k.avatar)body.append(im(k.avatar,'Foto de perfil',slug+'_avatar.'+k.avatar.split('.').pop()));else body.append($('p',{textContent:'Foto de perfil: Tumblr no la guardó al cerrar el blog. Ponla desde tu galería.',style:'font-size:13px;color:#e7b98a;margin-top:10px'}));
    const tx=(lab,v)=>$('div',{style:'margin-top:12px;background:#1a120b;border:1px solid #5a3a1e;border-radius:10px;padding:10px'},$('div',{textContent:lab,style:'font-size:12px;color:#e7b98a'}),$('div',{textContent:v,style:'white-space:pre-wrap;margin:4px 0'}),cb('Copiar '+lab.toLowerCase(),v));
    if(k.title)body.append(tx('Título',k.title));
    if(k.description)body.append(tx('Descripción',k.description));
    if(k.theme&&k.theme.length){const ul=$('div',{style:'margin-top:12px'},$('div',{textContent:'Apariencia',style:'font-size:12px;color:#e7b98a;margin-bottom:4px'}));
      k.theme.forEach(([lab,v])=>{const r=$('div',{style:'display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:0 0 6px;font-size:14px'});
        const hex=/^#[0-9a-f]{3,8}$/i.test(v);if(hex)r.append($('span',{style:'display:inline-block;width:18px;height:18px;border-radius:5px;border:1px solid #fff6;background:'+v}));
        r.append($('span',{textContent:lab+': '}),$('b',{textContent:v}));if(hex){const b=$('button',{textContent:'📋',ariaLabel:'Copiar '+lab.toLowerCase()+', '+v,style:sb+';padding:4px 10px'});b.onclick=async()=>{b.textContent=(await copy(v))?'✓':'✗';setTimeout(()=>{b.textContent='📋';},1800);};r.append(b);}ul.append(r);});body.append(ul);}
    body.append($('a',{href:'https://www.tumblr.com/settings/blog/'+sel.value,target:'_blank',textContent:'➜ Abrir la apariencia de '+sel.value,style:'display:block;margin-top:12px;color:#ff9a3c;font-weight:800'}));
    if(k.page)body.append($('a',{href:ARCH+k.page,target:'_blank',textContent:'➜ La página del kit',style:'display:block;margin-top:8px;color:#ffb066;font-weight:700'}));};
  K.forEach(k=>{const b=$('button',{textContent:k.name,style:sb});b.dataset.n=k.name;b.onclick=()=>show(k);row.append(b);});
  show(K.find(k=>k.match&&new RegExp(k.match,'i').test(sel.value))||K[0]);};
const list=$('div');box.append(list,st,log);

const imgOK=u=>new Promise(res=>{const im=new Image();let done=false;const t=setTimeout(()=>{if(!done){done=true;res(false);}},9000);im.onload=()=>{if(!done){done=true;clearTimeout(t);res(im.naturalWidth>0);}};im.onerror=()=>{if(!done){done=true;clearTimeout(t);res(false);}};im.src=u;});
async function cleanImgs(h){const us=[...new Set([...h.matchAll(/<img src="([^"]+)"/g)].map(m=>m[1]))].filter(u=>!u.startsWith(ARCH)&&!u.startsWith(RAWB));const bad=[];
  for(let k=0;k<us.length;k+=8){const part=us.slice(k,k+8);const r=await Promise.all(part.map(imgOK));part.forEach((u,j)=>{if(!r[j])bad.push(u);});}
  let out=h;for(const u of bad){out=out.split('<p><img src="'+u+'"></p>').join('').split('<img src="'+u+'">').join('');}
  return {html:out,bad:bad.length};}
const NPFC={joey:'#ff4930',monica:'#ff8a00',rachel:'#e8d738',ross:'#00cf35',chandler:'#00b8ff',niles:'#ff62ce',frasier:'#7c5cff'};
function subOf(el){const t=el.tagName,c=el.classList;if(t==='H1')return 'heading1';if(t==='H2')return 'heading2';if(c&&c.contains('npf_quote'))return 'quote';if(c&&c.contains('npf_chat'))return 'chat';if(c&&c.contains('npf_quirky'))return 'quirky';return undefined;}
function colorOf(n){const m=(n.getAttribute('class')||'').match(/npf_color_(\w+)/);if(m&&NPFC[m[1]])return NPFC[m[1]];const st=(n.getAttribute('style')||'').match(/color:\s*(#[0-9a-f]{6})/i);return st?st[1]:null;}
function inline(node,acc){
  for(const n of node.childNodes){
    if(n.nodeType===3){acc.text+=n.nodeValue;continue;}
    if(n.nodeType!==1)continue;
    const tag=n.tagName,s=acc.text.length;
    if(tag==='BR'){acc.text+='\n';continue;}
    inline(n,acc);const e=acc.text.length;if(e<=s)continue;
    if(tag==='B'||tag==='STRONG')acc.fmt.push({start:s,end:e,type:'bold'});
    else if(tag==='I'||tag==='EM')acc.fmt.push({start:s,end:e,type:'italic'}); else if(tag==='S'||tag==='STRIKE'||tag==='DEL')acc.fmt.push({start:s,end:e,type:'strikethrough'});
    else if(tag==='A'&&n.getAttribute('href'))acc.fmt.push({start:s,end:e,type:'link',url:n.getAttribute('href')});
    else if(tag==='SMALL')acc.fmt.push({start:s,end:e,type:'small'});
    else if(tag==='SPAN'||tag==='FONT'){const hx=colorOf(n);if(hx)acc.fmt.push({start:s,end:e,type:'color',hex:hx});}
  }
  return acc;
}
function textBlocks(el,subtype){
  const a=inline(el,{text:'',fmt:[]});const t=a.text.replace(/\s+$/,'');if(!t.trim())return [];
  const out=[];
  for(let i=0;i<t.length;i+=4000){const piece=t.slice(i,i+4000);const b={type:'text',text:piece};
    const f=a.fmt.filter(x=>x.start<i+4000&&x.end>i).map(x=>Object.assign({},x,{start:Math.max(0,x.start-i),end:Math.min(piece.length,x.end-i)}));
    if(f.length)b.formatting=f;if(subtype)b.subtype=subtype;out.push(b);}
  return out;
}
function quoteBlocks(el){const out=[];const kids=el.children.length?[...el.children]:[el];
  for(const c of kids){if(c.tagName==='BLOCKQUOTE'){out.push(...quoteBlocks(c));continue;}
    if(c.tagName==='UL'||c.tagName==='OL'){let n=0;for(const li of c.children){n++;const t=textBlocks(li,'indented');if(t.length){const p=c.tagName==='UL'?'• ':n+'. ';t[0].text=p+t[0].text;if(t[0].formatting)t[0].formatting=t[0].formatting.map(x=>Object.assign({},x,{start:x.start+p.length,end:x.end+p.length}));}out.push(...t);}continue;}
    if(c.tagName==='FIGURE'){const url=c.getAttribute('data-url')||((c.querySelector('iframe')||{}).src||'');if(url)out.push({type:'video',provider:'youtube',url:url.replace('/embed/','/watch?v=').replace(/\?feature=oembed/,'')});continue;}
    {const vd=c.tagName==='VIDEO'?c:c.querySelector('video');if(vd&&!c.textContent.trim()){const b=vidBlock(vd);if(b)out.push(b);continue;}}
    const img=c.tagName==='IMG'?c:c.querySelector('img');
    if(img&&!c.textContent.trim()){out.push({type:'image',media:[{url:img.getAttribute('src')}]});continue;}
    if(img){const t=textBlocks(c,'indented');out.push(...t);c.querySelectorAll('img').forEach(im=>out.push({type:'image',media:[{url:im.getAttribute('src')}]}));continue;}
    out.push(...textBlocks(c,'indented'));}
  return out;}
let VIDN=0,VIDOFF=false;
function vidBlock(v){const s=v.getAttribute('src')||(v.querySelector('source')&&v.querySelector('source').getAttribute('src'))||'';if(!/^https?:/.test(s))return null;
  if(VIDOFF)return {type:'link',url:s};return {type:'video',media:{type:'video/mp4',identifier:'video'+(++VIDN)},_src:s};}
const hasVid=b=>!!(b&&b.content&&b.content.some(x=>x&&x._src));
async function vidForm(body){const c=JSON.parse(JSON.stringify(body));const V=c.content.filter(x=>x&&x._src);const fd=new FormData();
  for(const x of V){const r=await fetch(x._src);if(!r.ok)throw new Error('vídeo '+r.status);const bl=await r.blob();fd.append(x.media.identifier,new File([bl],x.media.identifier+'.mp4',{type:'video/mp4'}));delete x._src;}
  fd.append('json',JSON.stringify(c));return fd;}
function toNPF(h){
  const doc=new DOMParser().parseFromString('<div>'+h+'</div>','text/html');const root=doc.body.firstChild;const C=[];
  for(const el of root.children){
    const tag=el.tagName;
    if(tag==='FIGURE'){const url=el.getAttribute('data-url')||((el.querySelector('iframe')||{}).src||'');if(url)C.push({type:'video',provider:'youtube',url:url.replace('/embed/','/watch?v=').replace(/\?feature=oembed/,'')});continue;}
    const as=el.querySelectorAll?el.querySelectorAll('a'):[];
    if(tag==='P'&&!el.classList.contains('npf_text')&&as.length===1&&!el.querySelector('img')&&el.textContent.trim()===as[0].textContent.trim()&&/^https?:/.test(as[0].getAttribute('href')||'')){C.push(cardOf(as[0].getAttribute('href'),{type:'link',url:as[0].getAttribute('href'),title:as[0].textContent.trim()}));continue;}
    {const vd=tag==='VIDEO'?el:el.querySelector('video');if(vd&&!el.textContent.trim()){const b=vidBlock(vd);if(b)C.push(b);continue;}}
    const img=el.tagName==='IMG'?el:el.querySelector('img');
    if(img&&!el.textContent.trim()){C.push({type:'image',media:[{url:img.getAttribute('src')}]});continue;}
    if(tag==='BLOCKQUOTE'){C.push(...quoteBlocks(el));continue;}
    if(tag==='UL'||tag==='OL'){for(const li of el.children)C.push(...textBlocks(li,tag==='UL'?'unordered-list-item':'ordered-list-item'));continue;}
    C.push(...textBlocks(el,subOf(el)));
  }
  return C;
}
const why=x=>{const e=(x&&x.body&&x.body.errors&&x.body.errors[0])||{};return (e.code||'')+' '+(e.detail||e.title||x&&x.error||'');};
const sleep=ms=>new Promise(z=>setTimeout(z,ms));
const secs=ms=>ms<9500?(ms/1000).toFixed(1).replace('.0','')+' s':ms<90000?Math.round(ms/1000)+' s':Math.floor(ms/60000)+' min '+Math.round(ms%60000/1000)+' s';
async function getPost1(blog,id){const g=await api('/blog/'+blog+'/posts/'+id+'?npf=true');const G=g&&(g.response||g);const PP=G&&(G.posts&&G.posts[0]||G);return PP&&PP.reblog_key?PP:null;}
async function getPost(blog,id,tries){tries=tries||1;for(const q of ['/blog/'+blog+'/posts/'+id+'?npf=true','/blog/'+blog+'/posts/'+id,'/blog/'+blog+'/posts?id='+id+'&npf=true']){for(let k=0;k<tries;k++){const g=await api(q);const G=g&&(g.response||g);const PP=G&&(G.posts&&G.posts[0]||G);if(PP&&PP.reblog_key)return PP;if(g&&/404|not found|no such/i.test(why(g)+' '+String(g.error||'')))break;await sleep(600);}}return null;}
let ASKOFF=false;let ASKNAMED=false;let CARDOFF=false;const CARDS={"1oQNLPuA8cP8GpH-HJDEahIUK6blhgDkr": {"d": "THE LOST-GAMBLERS-WISH FILE The Choco Situation, second file. The fifth wave, in his own words and in mine. 30 August to 15 September 2026...", "p": "branding/cards/lostgamblers.jpg"}, "1UwjthIyMEA3zMOPMTK62IrL_IO4F2hs-7AXHU1E0HxE": {"d": "This document uses the tabs for ease of organising.  Some portions don’t have author commentary, and that’s because I believe the screenshot...", "p": "branding/cards/dovegroomer.jpg"}, "1xJMmSF_bK3LOiiSW0qxTtoxxIzt5hopwAKw6Nvq4EUg": {"d": "THE COINEDBANK FILE Fakeclaiming, DARVO, victim blaming and harassment, in your own words 29 September to 1 October 2026 Second edition. Twe...", "p": "branding/cards/coinedbank.jpg"},"1QVxdKVDTm9uPe2M_GNgpGw20PpNXY6uI":{"d":"CHOCO SITUATION Verdict and Accountability document against Proship-Frogo, H28731. Gravekanfy, Mayday, Sanctuarium-acnusdeil and several other predators, on the back of the Summer Situation, Mirmo situation. Caleb situation. Gravekandy Situation. Reddit situation. Alfie situation. And all child d...","p":"branding/cards/ruling.jpg"},"1XT2OWC2wTr0A4Nla87sOl0ZTVivAEFNh":{"d":"","p":"branding/cards/videos.jpg"}};const hasCard=b=>!!(b&&(b.content||[]).some(x=>x&&x.type==='link'&&x.poster));const cardOf=(u,lb)=>{if(CARDOFF)return lb;const m=String(u||'').match(/docs\.google\.com\/document\/d\/([\w-]+)/);const c=m&&CARDS[m[1]];if(!c)return lb;lb.site_name='Google Docs';if(c.d)lb.description=c.d;lb.poster=[{url:RAWB+c.p,type:'image/jpeg',width:1200,height:630}];return lb;};let USED=new Set();let BL=null;const FAST=()=>!!(PAR&&(PAR.value==='t'||PAR.value==='m'));
function askSplit(h,nm){const cm=h.match(CARDRE);const lead=cm?cm[0]:'';if(lead)h=h.slice(lead.length);const m=h.match(nm?/^\s*<p><b>[\w-]+ asked:<\/b><\/p>\s*/:/^\s*<p><b>Anonymous asked:<\/b><\/p>\s*/);if(!m)return null;let i=m[0].length;const qs=[];
  if(/^\s*<blockquote[^>]*>/.test(h.slice(i))){const o=h.slice(i).match(/^\s*<blockquote[^>]*>/);let d=1,j=i+o[0].length;const re=/<(\/?)blockquote[^>]*>/g;re.lastIndex=j;let t,end=-1;while((t=re.exec(h))){d+=t[1]?-1:1;if(!d){end=re.lastIndex;break;}}if(end<0)return null;qs.push(h.slice(i+o[0].length,t.index));i=end;}
  if(!qs.length)return null;return {q:qs.join(''),rest:lead+h.slice(i)};}
const CARDRE=/^\s*(?:<p><img src="[^"]*card_\d+\.png"\s*\/?><\/p>\s*)+/;
function askNPF(h,nm){const sp=askSplit(h,nm);if(!sp)return null;const qd=new DOMParser().parseFromString('<div>'+sp.q+'</div>','text/html').body.firstChild;const QB=[];let extra='';
  for(const el of [...qd.children]){if(el.tagName==='IMG'||el.querySelector('img,figure,iframe')){extra+=el.outerHTML;continue;}if(el.tagName==='BLOCKQUOTE'){QB.push(...quoteBlocks(el));continue;}if(el.tagName==='UL'||el.tagName==='OL'){for(const li of el.children)QB.push(...textBlocks(li,el.tagName==='UL'?'unordered-list-item':'ordered-list-item'));continue;}QB.push(...textBlocks(el,subOf(el)));}
  const AB=toNPF(extra+sp.rest);if(!QB.length||!AB.length)return null;return {content:QB.concat(AB),layout:[{type:'ask',blocks:QB.map((_,k)=>k)}]};}
function dropTrail(h,name){const m=h.match(new RegExp('^\\s*<p>(?:<a [^>]*>)?'+name+'(?:</a>)?:</p>\\s*<blockquote>'));if(!m)return h;let d=1,i=m[0].length;const re=/<(\/?)blockquote>/g;re.lastIndex=i;let t;while((t=re.exec(h))){d+=t[1]?-1:1;if(!d)return h.slice(re.lastIndex);}return h;}
const nimg=h=>(h.match(/<img /g)||[]).length;
const sigC=C=>{let t='',n=0;(C||[]).forEach(b=>{if(!b)return;if(b.type==='text')t+=' '+(b.text||'');else if(b.type==='image')n++;});return {t:t.toLowerCase().replace(/[^a-z0-9]/g,''),n};};
const sameSig=(a,b)=>{if(a.t.length>=20||b.t.length>=20){const k=Math.min(100,a.t.length,b.t.length);if(k<20)return false;return a.t.includes(b.t.slice(0,k))||b.t.includes(a.t.slice(0,k));}return a.n===b.n&&a.t===b.t;};
async function findMine(blog,sg,since,tags,lim){const g=await api('/blog/'+blog+'/posts?npf=true&limit='+(lim||5),{},30000);const G=g&&(g.response||g);const P=(G&&G.posts)||[];
  for(const p of P){if(!p||!p.content)continue;const ts=+(p.timestamp||0);if(since&&ts&&ts<since-180)continue;if(!sameSig(sg,sigC(p.content)))continue;
    if(sg.t.length<20){const tg=(Array.isArray(p.tags)?p.tags:[]).map(x=>String(x).toLowerCase()).join(',');if(tg!==String(tags||'').toLowerCase())continue;}
    const id=p.id_string||p.idString||(p.id&&String(p.id));if(id)return {id:String(id),key:p.reblog_key||p.reblogKey||null};}
  return null;}
const PT=120000;
async function askInbox(blog,AK,tags,date,say){
  const nq=AK.layout[0].blocks.length,Q=AK.content.slice(0,nq),A=AK.content.slice(nq);
  if(!Q.length||!A.length||Q.some(b=>!b||b.type!=='text'))return null;
  const s=await api('/blog/'+blog+'/posts',{method:'POST',body:{content:Q,layout:[{type:'ask',blocks:Q.map((_,k)=>k)}],send_to_facebook:false,send_to_twitter:false,context:'Blog',state:'ask'}});
  if(!s||s.error){say('  (Tumblr no dejó mandar el ask al buzón: '+why(s||{}).trim()+')');return null;}
  const S=s.response||s;let sid=S&&(S.id_string||S.id)?String(S.id_string||S.id):null;
  const nt=C=>(C||[]).map(b=>(b&&b.text)||'').join(' ').toLowerCase().replace(/[^a-z0-9]/g,'');const qt=nt(Q).slice(0,80);let QQ=Q;
  for(let k=0;k<5;k++){await sleep(k?(FAST()?1200:2500):(FAST()?500:1000));const g=await api('/user/inbox/'+blog);const G=g&&(g.response||g);const L=(G&&(G.posts||G.submissions||G.items))||[];
    const f=L.find(p=>p&&(sid?String(p.id_string||p.id)===sid:nt(p.content).startsWith(qt)));
    if(f){sid=String(f.id_string||f.id);const lay=(f.layout||[]).find(l=>l&&l.type==='ask');if(lay&&lay.blocks&&lay.blocks.length&&f.content&&lay.blocks.every(i=>f.content[i]))QQ=lay.blocks.map(i=>f.content[i]);break;}}
  if(!sid){say('  (el ask no apareció en el buzón)');return null;}
  const QL=QQ.map((b,k)=>{const o=Q[k];return (o&&o.formatting&&o.formatting.length&&b&&String(b.text||'').trim()===String(o.text||'').trim())?Object.assign({},b,{formatting:o.formatting}):b;});const LK2=QL.some((b,k)=>b!==QQ[k]);const body={content:QL.concat(A),layout:[{type:'ask',blocks:QL.map((_,k)=>k)}],state:'published',tags};if(date)body.date=date;
  let r=await api('/blog/'+blog+'/posts/'+sid,{method:'PUT',body});if(r&&r.error&&LK2){body.content=QQ.concat(A);r=await api('/blog/'+blog+'/posts/'+sid,{method:'PUT',body});if(!(r&&r.error))say('  (Tumblr no dejó poner los enlaces de la pregunta como enlace: salen como texto)');}
  if(r&&r.error&&date){delete body.date;r=await api('/blog/'+blog+'/posts/'+sid,{method:'PUT',body});}
  if(r&&r.error){const e0=why(r).trim();const AT=A.filter(b=>b&&b.type==='text');
    if(AT.length){const b1={content:QL.concat(AT),layout:[{type:'ask',blocks:QL.map((_,k)=>k)}],state:'published',tags};let r1=await api('/blog/'+blog+'/posts/'+sid,{method:'PUT',body:b1});let QX=QL;if(r1&&r1.error&&LK2){QX=QQ;b1.content=QQ.concat(AT);r1=await api('/blog/'+blog+'/posts/'+sid,{method:'PUT',body:b1});}
      if(r1&&!r1.error){const R1=r1.response||r1;const nid=String(R1.id_string||R1.id||sid);say('  (Tumblr no dejó contestarlo entero ['+e0+']: lo contesto primero con el texto y luego le pongo el resto)');
        const lay=[{type:'ask',blocks:QX.map((_,k)=>k)}];const put=C=>api('/blog/'+blog+'/posts/'+nid,{method:'PUT',body:{content:QX.concat(C),layout:lay,state:'published',tags}});
        const lt=(u,t)=>{const x=String(t||u);return {type:'text',text:x,formatting:[{type:'link',start:0,end:Array.from(x).length,url:u}]};};
        const A1=A.map(b=>b&&b.type==='video'&&b.url&&!b.media?lt(b.url):b);const A2=A1.map(b=>b&&b.type==='link'&&b.url?lt(b.url,b.title||b.url):b);
        let r2=await put(A);let how='';if(r2&&r2.error&&A1.some((b,k)=>b!==A[k])){r2=await put(A1);how='los vídeos de YouTube van como enlace';}
        if(r2&&r2.error&&A2.some((b,k)=>b!==A1[k])){r2=await put(A2);how='los vídeos y las tarjetas de enlace van como enlace';}
        if(r2&&!r2.error){if(how)say('  ('+how+': Tumblr no los aceptó dentro del ask)');return {response:{id_string:nid,reblog_key:null}};}
        say('  (tampoco dejó ponerle el resto: '+why(r2||{}).trim()+'; lo quito)');await api('/blog/'+blog+'/post/delete',{method:'POST',body:{id:nid}});return null;}}}
  if(!r||r.error){say('  (no pude contestar el ask del buzón: '+why(r||{}).trim()+'; lo quito del buzón)');await api('/blog/'+blog+'/post/delete',{method:'POST',body:{id:sid}});return null;}
  const R=r.response||r;return {response:{id_string:String(R.id_string||R.id||sid),reblog_key:R.reblog_key||null}};
}
async function getAny(blog,id){const g=await api('/blog/'+blog+'/posts/'+id+'?npf=true');const G=g&&(g.response||g);const PP=G&&(G.posts&&G.posts[0]||G);return PP&&!PP.error&&(PP.id||PP.id_string||PP.content)?PP:null;}
async function findExisting(blog,key,sg){const ids=((LK&&LK.k)||{})[key]||[];const T=(LK&&LK.t)||{};const M=(LS.get('rnc_links',{})[blog])||{};const cand=[];const ORIG=new Set();Object.values((LK&&LK.k)||{}).forEach(v=>(v||[]).forEach(x=>ORIG.add(String(x))));
  ids.forEach(id=>{const x=T[id];if(x&&x.b===blog)cand.push(String(id));const u=M[id];if(u){const m=String(u).match(/\/(\d{15,})(?:[\/?#]|$)/);if(m)cand.push(m[1]);}});
  for(const id of [...new Set(cand)]){const PP=(await getPost(blog,id))||(await getAny(blog,id));if(PP)return {id,key:PP.reblog_key||null,orig:ORIG.has(String(id))};}
  if(sg&&sg.t&&sg.t.length>=20){if(!BL||BL.blog!==blog)BL={blog,pages:[]};for(const [pi,off] of [[0,0],[1,20],[2,40]]){let P=BL.pages[pi];if(!P){const g=await api('/blog/'+blog+'/posts?npf=true&limit=20&offset='+off,{},30000);const G=g&&(g.response||g);P=(G&&G.posts)||[];BL.pages[pi]=P;}
    for(const p of P){if(!p||!p.content||(p.trail&&p.trail.length)||p.parent_post_id)continue;if(USED.has(String(p.id_string||p.id)))continue;if(sameSig(sg,sigC(p.content)))return {id:String(p.id_string||p.id),key:p.reblog_key||null,bySig:true,orig:ORIG.has(String(p.id_string||p.id))};}
    if(P.length<20)break;}}
  return null;}
let SOLO=false,HV=null,HADN=0;
async function haveIndex(blog){if(HV&&HV.blog===blog)return HV;const ids=new Map(),list=[];let full=true;
  for(let k=0,off=0;k<80;k++,off+=20){const g=await api('/blog/'+blog+'/posts?npf=true&limit=20&offset='+off,{},30000);const G=g&&(g.response||g);const P=G&&G.posts;if(!Array.isArray(P)){full=false;break;}
    let fresh=0;P.forEach(p=>{if(!p)return;const id=String(p.id_string||p.idString||p.id||'');if(!id||ids.has(id))return;fresh++;const o={id,key:p.reblog_key||p.reblogKey||null,re:!!((p.trail&&p.trail.length)||p.parent_post_id),sig:p.content?sigX(p.content):null};ids.set(id,o);list.push(o);});
    if(P.length<20||!fresh)break;if(k===79)full=false;}
  HV={blog,ids,list,full};return HV;}
const sigX=C=>{let t='',n=0;(C||[]).forEach(b=>{if(!b)return;if(b.type==='text')t+=' '+(b.text||'');else if(b.type==='image')n++;});return {t:t.replace(/https?:\/\/[^\s]+/gi,' ').toLowerCase().replace(/[^a-z0-9]/g,''),n};};
const sigHave=(a,b)=>{if(a.t.length<20||b.t.length<20)return a.t.length<20&&b.t.length<20&&(a.t.length>0||a.n>0)&&a.n===b.n&&a.t===b.t;const k=Math.min(100,a.t.length,b.t.length);if(a.t.slice(0,k)!==b.t.slice(0,k))return false;if(a.t.slice(-60)===b.t.slice(-60))return true;const q=a.t.length/b.t.length;return a.n===b.n&&q>=0.97&&q<=1.03;};
async function findHave(blog,key,C){const sg=C?sigX(C):null;const H=await haveIndex(blog);const ids=((LK&&LK.k)||{})[key]||[];const T=(LK&&LK.t)||{};const M=(LS.get('rnc_links',{})[blog])||{};const cand=[];
  ids.forEach(id=>{const x=T[id];if(x&&x.b===blog)cand.push(String(id));const u=M[id];if(u){const m=String(u).match(/\/(\d{15,})(?:[\/?#]|$)/);if(m)cand.push(m[1]);}});
  for(const id of cand){const o=H.ids.get(id);if(o)return {id,key:o.key};}
  if(sg&&typeof sg.t==='string'){let best=null;for(const o of H.list){if(o.re||!o.sig||!sigHave(sg,o.sig))continue;if(USED.has(o.id)&&!(sg.t.length>=20&&o.sig.t===sg.t&&o.sig.n===sg.n))continue;const df=Math.abs(o.sig.t.length-sg.t.length)+1000*Math.abs(o.sig.n-sg.n);if(!best||df<best.df)best={o,df};}if(best)return {id:best.o.id,key:best.o.key,bySig:true};}
  if(!H.full)return findExisting(blog,key,C?sigC(C):null);
  return null;}
let UPON=false,FORCEUP=false;
async function fixLinks(blog,oldId,newUrl){let n=0;const src='https?:\\/\\/(?:www\\.)?(?:tumblr\\.com\\/'+blog+'|'+blog+'\\.tumblr\\.com\\/post)\\/'+oldId+'(?:\\/[^\\s"<>?#]*)?(?:\\?[^\\s"<>#]*)?(?:#[^\\s"<>]*)?';const hit=u=>new RegExp('^'+src+'$').test(String(u||''));const cp=(t,i)=>Array.from(t.slice(0,i)).length;
  const fixB=b=>{let ch=false;if(!b||typeof b!=='object')return false;if(b.url&&hit(b.url)){b.url=newUrl;if(b.display_url)b.display_url=newUrl;ch=true;}(b.formatting||[]).forEach(f=>{if(f&&f.url&&hit(f.url)){f.url=newUrl;ch=true;}});
    if(typeof b.text==='string'){const R=new RegExp(src,'g');const t=b.text;let out='',last=0,m;const sh=[];while((m=R.exec(t))){out+=t.slice(last,m.index)+newUrl;sh.push([cp(t,m.index),Array.from(m[0]).length,Array.from(newUrl).length]);last=m.index+m[0].length;}
      if(sh.length){out+=t.slice(last);b.text=out;ch=true;const mp=(x,end)=>{let d=0;for(const [i,l,nl] of sh){if(x>=i+l)d+=nl-l;else if(x>i)return i+d+(end?nl:0);}return x+d;};(b.formatting||[]).forEach(f=>{if(typeof f.start==='number')f.start=mp(f.start,false);if(typeof f.end==='number')f.end=mp(f.end,true);});}}
    return ch;};
  for(const bn of (blogs||[]).map(b=>b.name)){for(const off of [0,20]){const g=await api('/blog/'+bn+'/posts?npf=true&limit=20&offset='+off,{},30000);const G=g&&(g.response||g);const P=(G&&G.posts)||[];
    for(const p of P){if(!p||!p.content||(p.trail&&p.trail.length)||p.parent_post_id)continue;const pid=String(p.id_string||p.id);if(pid===String(oldId))continue;let ch=false;p.content.forEach(b=>{if(fixB(b))ch=true;});if(!ch)continue;
      const body={content:p.content,tags:(p.tags||[]).join(','),state:'published'};if(p.layout&&p.layout.length)body.layout=p.layout;const r=await api('/blog/'+bn+'/posts/'+pid,{method:'PUT',body});if(r&&!r.error)n++;else log.textContent+='  ⚠️ no pude cambiar el enlace en '+bn+'/'+pid+': '+why(r||{}).trim()+'\n';}
    if(P.length<20)break;}}
  return n;}
async function publishOne(blog,html,TAGS,label,key,chain,date,first,G){
  const T0=Date.now();let pre='';const say=s=>{pre+=s+'\n';};
  const em=html.match(/^\s*<!--reblog ([\w-]+) (\d+)-->(?:<!--shot (https:[^\s<>"]+)-->)?/);
  if(em){html=html.slice(em[0].length);const bi=await api('/blog/'+em[1]+'/info');const BI=bi&&(bi.response||bi);const pu=BI&&BI.blog&&BI.blog.uuid;const PB=pu?await getPost(em[1],em[2]):null;
    if(!PB||!PB.reblog_key||!pu){if(new RegExp('^\\s*<p>(?:<a [^>]*>)?'+em[1]+'(?:</a>)?:</p>\\s*<blockquote>').test(html)){say('  (el post '+em[2]+' de '+em[1]+' ya no se puede leer: lo publico suelto, con su cita dentro'+(em[3]?' y la captura de su post delante':'')+')');if(em[3])html='<p><img src="'+em[3]+'"/></p>'+html;}else{log.textContent+=pre+'✗ '+label+' · no pude leer el post '+em[2]+' de '+em[1]+' para reblogarlo (¿borrado o privado?): lo salto y sigo\n';return {skip:true};}}
    else{html=dropTrail(html,em[1]);chain={uuid:pu,prev:{id:em[2],key:PB.reblog_key}};say('  ↻ reblog de '+em[1]+'/'+em[2]);}}
  {const own=(((LK&&LK.k)||{})[key]||[]).some(x=>{const t=((LK&&LK.t)||{})[x];return t&&t.b===blog;});const cm=own&&html.match(CARDRE);if(cm){html=html.slice(cm[0].length);say('  (es de este mismo blog: va sin la tarjeta de delante)');}}
  const rl=relink(html,blog);let Hh=rl.html;if(rl.n)say('  🔗 '+rl.n+' enlace(s) llevados a una copia viva');
  {const XT=await pinExtra(key);if(XT.length){const low=XT.map(x=>x.toLowerCase());TAGS=[...TAGS.filter(x=>!low.includes(String(x).toLowerCase())).slice(0,30-XT.length),...XT];}}
  const tags=TAGS.slice(0,30).join(',');let isRe=!!chain,restart=false;let AK=null;ASKNAMED=false;
  const mk=()=>{AK=(chain||ASKOFF)?null:askNPF(Hh,ASKNAMED);if(hasVid(AK))AK=null;const body={content:AK?AK.content:toNPF(Hh),tags,state:'published'};if(AK)body.layout=AK.layout;if(date)body.date=date;
    if(isRe){body.parent_tumblelog_uuid=chain.uuid;body.parent_post_id=String(chain.prev.id);body.reblog_key=chain.prev.key;}return body;};
  if(isRe&&!chain.prev.key){const PP=await getPost(blog,chain.prev.id,2);if(PP&&PP.reblog_key)chain.prev.key=PP.reblog_key;}
  if(isRe&&!chain.uuid){const bi=await api('/blog/'+blog+'/info');const BI=bi&&(bi.response||bi);chain.uuid=BI&&BI.blog&&BI.blog.uuid;}
  if(isRe&&(!chain.prev.key||!chain.uuid)){say('  (reblog imposible: falta '+(chain.prev.key?'':'reblog key ')+(chain.uuid?'':'uuid del blog')+'; lo publico suelto)');isRe=false;}
  let body=mk();const T1=Date.now();const mine=()=>sigC(body.content);const lab=label.length>70?label.slice(0,70)+'…':label;
  const post=()=>{const t0=Date.now();const iv=setInterval(()=>{say2('⏳ Tumblr lleva '+Math.round((Date.now()-t0)/1000)+' s sin contestar con: '+lab);},30000);const send=async()=>{if(!hasVid(body))return api('/blog/'+blog+'/posts',{method:'POST',body},PT);let fd;try{fd=await vidForm(body);}catch(e){return {error:'no pude bajar el vídeo: '+(e&&e.message||e),vidfail:true};}say('  🎬 subiendo el vídeo a Tumblr');return api('/blog/'+blog+'/posts',{method:'POST',body:fd,headers:{'Content-Type':'multipart/form-data'}},PT);};return send().then(x=>{clearInterval(iv);say2('');return x;});};
  const look=async n=>{for(let k=0;k<n;k++){await sleep(k?(FAST()?5000:15000):3000);const f=await findMine(blog,mine(),Math.floor(T1/1000),tags,5);if(f)return f;}return null;};
  let RD=(LK&&LK.rd&&key&&LK.rd[key]&&LK.rd[key].blog===blog)?LK.rd[key]:null;if(RD){const OP0=await getPost(blog,RD.old,2);if(!OP0){RD=null;}else{date=RD.date;body.date=RD.date;first=false;say('  ♻️ lo publico otra vez con la cajita del ask corregida y la misma fecha del original; si sale bien, borro el de antes ('+RD.old+')');}}
  if(SOLO&&key&&!RD&&!UPON&&!(LK&&LK.ow&&LK.ow[key]&&LK.ow[key].blog===blog)){const ex=await findHave(blog,key,isRe?null:body.content);if(ex){USED.add(String(ex.id));remember(blog,key,'https://www.tumblr.com/'+blog+'/'+ex.id);log.textContent+=pre+'= '+label+' · ya está en el blog ('+ex.id+(ex.bySig?', lo reconozco por su texto':'')+'): no lo toco\n';log.scrollTop=1e9;return {id:String(ex.id),key:ex.key,ms:Date.now()-T0,api:0,img:0,had:true};}}
  let UPX=null;if(UPON&&!isRe&&key&&!RD){const ex=await findExisting(blog,key,mine());if(ex){const OP=await getPost(blog,ex.id,2);if(OP&&OP.content){UPX={old:String(ex.id),date:String(OP.date||'')};first=false;date=null;delete body.date;say('  🔝 ya estaba en el blog ('+ex.id+'): lo publico otra vez para que salga arriba en los tags, le pongo la fecha del original ('+UPX.date+') y borro el de antes');}}}
  let UPD=UPX?UPX.date:null;if(UPON&&!UPD&&key){for(const x of (((LK&&LK.k)||{})[key]||[])){const t=((LK&&LK.t)||{})[x];if(t&&t.d){UPD=String(t.d);break;}}}
  const UPANON=UPON&&!!AK&&/<b>Anonymous asked:/i.test(Hh);
  const OW=(LK&&LK.ow&&LK.ow[key]&&LK.ow[key].blog===blog)?LK.ow[key]:null;if(((ovr.checked&&!SOLO)||OW)&&!isRe&&key&&!RD&&!UPX){let ORIGM=null;const ex=OW?{id:String(OW.id),key:null,orig:false}:await findExisting(blog,key,mine());if(ex){if(ex.orig){const nu0='https://www.tumblr.com/'+blog+'/'+ex.id;remember(blog,key,nu0);const skipO=w=>{log.textContent+=pre+'= '+label+' · el original ya está en este blog ('+ex.id+')'+(w?': '+w:'')+': no lo toco\n';log.scrollTop=1e9;return {id:String(ex.id),key:ex.key,ms:Date.now()-T0,api:0,img:0,edited:false,orig:true};};if(!ovo.checked)return skipO('');const OP=await getPost(blog,ex.id,2);if(!OP||!OP.content)return skipO('no pude leerlo para comparar');const nl=u=>{let x=String(u||'').trim();try{const m=x.match(/[?&]z=([^&]+)/);if(/t\.umblr\.com\/redirect/.test(x)&&m)x=decodeURIComponent(m[1]);}catch(e){}x=x.replace(/[).,;!?]+$/,'').replace(/[?#].*$/,'').replace(/\/+$/,'').toLowerCase().replace(/^https?:\/\/(www\.)?/,'');const t=x.match(/^tumblr\.com\/([\w-]+)\/(\d{15,})/)||x.match(/^([\w-]+)\.tumblr\.com\/post\/(\d{15,})/);return t?'tumblr:'+t[1]+'/'+t[2]:x;};const gl=C=>{const S=new Set();(C||[]).forEach(b=>{if(!b)return;if(b.type==='link'&&b.url)S.add(nl(b.url));(b.formatting||[]).forEach(f=>{if(f&&f.type==='link'&&f.url)S.add(nl(f.url));});String(b.text||'').replace(/https?:\/\/[^\s<>"]+/g,u=>{S.add(nl(u));return u;});});return S;};const OAL=(OP.layout||[]).find(l=>l&&l.type==='ask');ASKNAMED=!!(OAL&&OAL.attribution);const nb0=mk();const NS=gl(nb0.content);const miss=[...gl(OP.content)].filter(u=>!NS.has(u));const ic=C=>(C||[]).filter(b=>b&&b.type==='image').length;const wasAsk=(OP.layout||[]).some(l=>l&&l.type==='ask');if(miss.length)return skipO('a la versión del archivo le faltaría '+(miss.length===1?'un enlace':miss.length+' enlaces')+' ('+miss[0]+')');if(ic(nb0.content)<ic(OP.content)){let QOK={};try{const qr=await ffetch('quitar.json?'+Date.now());if(qr.ok)QOK=await qr.json();}catch(e){}const qv=QOK[String(ex.id)];if(!(qv===true||qv===ic(nb0.content)))return skipO('a la versión del archivo le faltarían imágenes');say('(me pediste quitarle imágenes a este: le pongo la versión del archivo tal cual, con '+ic(nb0.content)+' imágenes)');}if(wasAsk&&!nb0.layout)return skipO('es un ask y la versión del archivo no saldría como ask');const TT=String(nb0.tags||'').split(',').map(s=>s.trim()).filter(Boolean);(OP.tags||[]).forEach(t=>{if(!TT.some(x=>x.toLowerCase()===String(t).toLowerCase()))TT.push(String(t));});ORIGM={wasAsk,tags:TT.slice(0,30).join(','),q:wasAsk?(((OP.layout||[]).find(l=>l&&l.type==='ask')||{blocks:[]}).blocks||[]).map(i=>OP.content[i]).filter(Boolean):null,lay:OAL?JSON.parse(JSON.stringify(OAL)):null};say('  (es tu original: le pongo la versión del archivo sin quitarle nada, enlaces, imágenes y tags incluidos)');}if(ex.bySig)say('  (lo encontré en el blog por su texto: es el mismo post)');
    const put=async b=>{if(!hasVid(b))return api('/blog/'+blog+'/posts/'+ex.id,{method:'PUT',body:b},PT);let fd;try{fd=await vidForm(b);}catch(e){return {error:'no pude bajar el vídeo: '+(e&&e.message||e)};}return api('/blog/'+blog+'/posts/'+ex.id,{method:'PUT',body:fd,headers:{'Content-Type':'multipart/form-data'}},PT);};
    let b2=mk();delete b2.date;if(ORIGM)b2.tags=ORIGM.tags;let QOLD=false;const keepQ=b=>{if(ORIGM&&ORIGM.q&&ORIGM.q.length&&b.layout){const ql=((b.layout.find(l=>l&&l.type==='ask')||{blocks:[]}).blocks||[]).length;if(QOLD||!ql){b.content=ORIGM.q.concat(b.content.slice(ql));b.layout=[Object.assign({},ORIGM.lay||{type:'ask'},{blocks:ORIGM.q.map((_,k)=>k)})];}else{const tq=x=>String((x&&x.text)||'').replace(/\s+/g,' ').trim();b.content=b.content.map((x,k)=>(k<ql&&ORIGM.q[k]&&tq(ORIGM.q[k])===tq(x))?ORIGM.q[k]:x);b.layout=[Object.assign({},ORIGM.lay||{type:'ask'},{blocks:b.content.slice(0,ql).map((_,k)=>k)})];}}};keepQ(b2);if(G)await G.wait;let rr=await put(b2);if(rr&&rr.error&&hasCard(b2)&&!/429|limit exceeded|rate limit|too many/i.test(why(rr)+' '+String(rr.error))){say('  (Tumblr no aceptó la tarjeta del documento con su vista previa ['+why(rr).trim()+']: va el enlace como antes)');CARDOFF=true;b2=mk();CARDOFF=false;delete b2.date;if(ORIGM)b2.tags=ORIGM.tags;keepQ(b2);rr=await put(b2);}if(rr&&rr.error&&!QOLD&&ORIGM&&ORIGM.q&&ORIGM.q.length&&!/429|limit exceeded|rate limit|too many/i.test(why(rr)+' '+String(rr.error))){say('  (Tumblr no dejó cambiar el texto de la cajita ['+why(rr).trim()+']: la dejo como estaba y pongo el resto)');QOLD=true;b2=mk();delete b2.date;b2.tags=ORIGM.tags;keepQ(b2);rr=await put(b2);if(rr&&rr.error&&hasCard(b2)){CARDOFF=true;b2=mk();CARDOFF=false;delete b2.date;b2.tags=ORIGM.tags;keepQ(b2);rr=await put(b2);}}if(G)G.release();
    if(rr&&rr.error&&AK&&!(ORIGM&&ORIGM.wasAsk)){ASKOFF=true;b2=mk();ASKOFF=false;delete b2.date;if(ORIGM)b2.tags=ORIGM.tags;rr=await put(b2);}
    const ni=nimg(Hh);
    if(!rr||rr.error){log.textContent+=pre+'✗ '+label+' · ya estaba en el blog ('+ex.id+') y Tumblr no dejó sobrescribirlo: '+why(rr||{}).trim()+'. No publico otro para no duplicarlo; sigo con el siguiente.\n';log.scrollTop=1e9;return {skip:true,failed:true};}
    if(ORIGM&&ORIGM.wasAsk&&ORIGM.q&&ORIGM.q.length&&!QOLD){const PV0=await getPost(blog,ex.id,1);const L0=PV0&&(PV0.layout||[]).find(l=>l&&l.type==='ask');if(PV0&&!L0){say('  ⚠️ Tumblr quitó la cajita al cambiarle el texto: la vuelvo a poner como estaba');QOLD=true;const b3=mk();delete b3.date;b3.tags=ORIGM.tags;keepQ(b3);const r3=await put(b3);say(r3&&!r3.error?'  💬 cajita puesta otra vez, con su texto de antes':'  ✗ no pude volver a poner la cajita: '+why(r3||{}).trim());}else if(L0){const tq2=x=>String((x&&x.text)||'').replace(/\s+/g,' ').trim();const nowQ=(L0.blocks||[]).map(i=>tq2(PV0.content[i])).join('|');const wantQ=b2.content.slice(0,((b2.layout.find(l=>l&&l.type==='ask')||{blocks:[]}).blocks||[]).length).map(tq2).join('|');say(nowQ===wantQ?'  💬 la cajita del ask va con la gramática corregida':'  ⚠️ Tumblr no deja cambiar el texto de la cajita del ask en un post ya publicado: se queda el del original (tu respuesta sí va corregida)');}}if(ORIGM&&ORIGM.lay&&ORIGM.lay.attribution){const PV=await getPost(blog,ex.id,1);const L2=PV&&(PV.layout||[]).find(l=>l&&l.type==='ask');say(L2&&L2.attribution?'  💬 la cajita del ask sigue con el nombre de quien preguntó ('+((L2.attribution.blog||{}).name||'')+')':'  ⚠️ mira la cajita del ask: Tumblr no me devuelve el nombre de quien preguntó');}const nu='https://www.tumblr.com/'+blog+'/'+ex.id;remember(blog,key,nu);if(OW&&OW.dup){const dr=await api('/blog/'+blog+'/post/delete',{method:'POST',body:{id:String(OW.dup)}});say(dr&&!dr.error?'  🗑 duplicado '+OW.dup+' borrado':'  (no pude borrar el duplicado '+OW.dup+': '+why(dr||{}).trim()+')');}
    log.textContent+=pre+'✓ '+label+' → '+ex.id+(ORIGM?' · tu original, con la versión del archivo (sin quitarle nada) · ':' · sobrescrito, no publicado de nuevo · ')+''+secs(Date.now()-T0)+(ni?' ('+ni+' img)':'')+'\n';log.scrollTop=1e9;
    let wi=[];if(wbon.checked){try{const PP=await getPost1(blog,ex.id);if(PP)wi=wbImgs(PP.content);}catch(e){}}wbAdd(nu,wi);
    return {id:String(ex.id),key:ex.key,ms:Date.now()-T0,api:Date.now()-T1,img:ni,edited:true};}}
  let r=null,viaInbox=false;
  if(first){const f=await findMine(blog,mine(),0,tags,3);if(f){say('  (ya estaba en el blog de la vez anterior, aunque Tumblr no llegó a contestar: no lo repito)');r={response:{id_string:f.id,reblog_key:f.key}};}}
  if(G)await G.wait;if(!r&&AK&&!isRe){const q=await askInbox(blog,AK,tags,date,say);if(q){r=q;viaInbox=true;say('  📮 ask mandado al buzón de '+blog+' y contestado');}}
  if(!r)r=await post();if(r&&r.error&&!r.timeout&&hasCard(body)&&!/429|limit exceeded|rate limit|too many/i.test(why(r)+' '+String(r.error))){say('  (Tumblr no aceptó la tarjeta del documento con su vista previa ['+why(r).trim()+']: va el enlace como antes)');CARDOFF=true;body=mk();CARDOFF=false;r=await post();}if(G)G.release();
  if(r&&r.error&&!r.timeout&&hasVid(body)&&!/429|limit exceeded|rate limit|too many/i.test(why(r)+' '+String(r.error))){const f=await look(1);if(f){say('  (Tumblr dio error pero el post con vídeo sí quedó publicado: no lo repito)');r={response:{id_string:f.id,reblog_key:f.key}};}else{say('  (Tumblr no aceptó el vídeo subido ['+why(r).trim()+']: va como enlace al vídeo)');VIDOFF=true;body=mk();VIDOFF=false;r=await post();}}
  for(let tryN=1;r&&r.timeout;tryN++){log.textContent+=pre+'  (Tumblr lleva 2 min sin contestar con este post: miro si ya está en el blog)\n';pre='';log.scrollTop=1e9;
    const f=await look(6);if(f){say('  (Tumblr lo publicó aunque no contestó)');r={response:{id_string:f.id,reblog_key:f.key}};break;}
    if(tryN>=2){log.textContent+='✗ '+label+' · Tumblr no contesta con este post (dos intentos de 2 min) y no aparece en el blog. Paro aquí para no repetir nada: vuelve a pulsar y sigue desde este. Si Tumblr te ha sacado algún aviso, está debajo del Renacer: ciérralo con ✕ Cerrar, míralo y vuelve a abrir el marcador.\n';log.scrollTop=1e9;return {stall:true};}
    say('  (no está: lo intento otra vez)');r=await post();}
  if(r&&r.error&&!/429|limit exceeded|rate limit|too many/i.test(why(r)+' '+String(r.error))){const f=await look(1);if(f){say('  (Tumblr dio error ['+why(r).trim()+'] pero el post sí quedó publicado: no lo repito)');r={response:{id_string:f.id,reblog_key:f.key}};}}
  if(r&&r.error&&/429|limit exceeded|rate limit|too many/i.test(why(r)+' '+String(r.error)))return {limit:true,why:why(r)};
  if(r&&r.error&&/<img src="(?!https:\/\/(?:moisesms1999-dev\.github\.io|raw\.githubusercontent\.com)\/)/.test(Hh)){const ci=await cleanImgs(Hh);if(ci.bad){say('  ('+ci.bad+' imagen(es) caída(s), quitada(s))');Hh=ci.html;body=mk();r=await post();}}
  if(r&&r.error&&date){if(!NODATE){NODATE=true;log.textContent+='  (Tumblr no aceptó la fecha ['+why(r)+']: sigo de uno en uno, con la hora de ahora)\n';}return {again:true};}
  if(AK&&r&&r.error){log.textContent+=pre+'✗ '+label+' · Tumblr no aceptó la cajita del ask ['+why(r).trim()+']: un ask solo sale en su cajita, así que no lo publico como texto'+(UPX?'; el de antes ('+UPX.old+') sigue en el blog, sin tocar':'')+'\n';log.scrollTop=1e9;return {skip:true,failed:true};}
  if(AK){if(r&&r.error){say('  (Tumblr no aceptó la cajita del ask: '+why(r)+'; va como texto)');ASKOFF=true;body=mk();r=await post();ASKOFF=false;}else say('  💬 en su cajita de ask');}
  if(r&&r.error&&isRe&&/404|not found/i.test(why(r)+String(r.error))){isRe=false;restart=true;body=mk();r=await post();}
  if(r&&r.error){say('  · nativo: '+why(r)+(r.detail?' '+JSON.stringify(r.detail).slice(0,200):''));
    const x=isRe?await api('/blog/'+blog+'/post/reblog',{method:'POST',body:{id:chain.prev.id,reblog_key:chain.prev.key,comment:Hh,tags}})
                :await api('/blog/'+blog+'/post',{method:'POST',body:{type:'text',format:'html',body:Hh,tags}});
    if(x&&!x.error){r=x;say('  (como HTML, igual que pegarlo)');}else say('  · HTML: '+why(x));}
  const tA=Date.now()-T1;const RR=r&&(r.response||r);const id=RR&&(RR.id_string||RR.id);
  if(!id){log.textContent+=pre+'✗ '+label+' · '+why(r)+'\n';log.scrollTop=1e9;return {restart};}
  if(AK&&!viaInbox){const PQ=(await getPost1(blog,id))||(await getPost(blog,id,2));if(PQ&&!(PQ.layout||[]).some(l=>l&&l.type==='ask')){log.textContent+=pre+'  (Tumblr quitó la cajita del ask al publicarlo)\n';await api('/blog/'+blog+'/post/delete',{method:'POST',body:{id:String(id)}});if(true){log.textContent+='  ✗ un ask solo sale en su cajita: lo he quitado y no lo publico como texto'+(UPX?'; el de antes ('+UPX.old+') sigue en el blog, sin tocar':'')+'\n';log.scrollTop=1e9;return {skip:true,failed:true};}ASKOFF=true;const r2=await publishOne(blog,html,TAGS,label,key,chain,date);ASKOFF=false;return r2;}}
  const ni=nimg(Hh);log.textContent+=pre+'✓ '+label+(isRe?' (reblog)':'')+' → '+id+' · '+secs(Date.now()-T0)+(ni?' ('+ni+' img, Tumblr tardó '+secs(tA)+')':'')+'\n';log.scrollTop=1e9;
  if(UPON&&!(UPX&&String(id)===UPX.old)){await sleep(2500);const PN=await getPost(blog,id,3);let bad='';
    if(!PN||!PN.content)bad='no encuentro el nuevo ('+id+') para comprobarlo';
    else if(AK){const LN=(PN.layout||[]).find(l=>l&&l.type==='ask');if(!LN)bad='salió sin la cajita del ask';}
    else if(nimg(Hh)&&(PN.content||[]).filter(b=>b&&b.type==='image').length<nimg(Hh))bad='le faltan imágenes';
    if(bad&&!UPX&&!AK){log.textContent+='  ⚠️ '+bad+'\n';}
    if(bad&&(UPX||AK)){if(PN&&PN.content)await api('/blog/'+blog+'/post/delete',{method:'POST',body:{id:String(id)}});log.textContent+='  ✗ '+bad+': borro el nuevo'+(UPX?' y el de antes ('+UPX.old+') se queda en el blog, sin tocar':'')+'. No se pierde nada.\n';log.scrollTop=1e9;return {skip:true,failed:true};}
    if(AK&&!bad)log.textContent+='  💬 comprobado: sale en su cajita de ask\n';
    if(UPD&&PN&&PN.content){const bd={content:PN.content,tags:(PN.tags||[]).join(','),state:'published',date:UPD};if(PN.layout&&PN.layout.length)bd.layout=PN.layout;const rD=await api('/blog/'+blog+'/posts/'+id,{method:'PUT',body:bd});await sleep(1500);const PN2=await getPost(blog,id,2);const LN2=AK&&PN2&&(PN2.layout||[]).find(l=>l&&l.type==='ask');
      if(AK&&PN2&&!LN2){const bk={content:PN.content,layout:PN.layout,tags:(PN.tags||[]).join(','),state:'published'};await api('/blog/'+blog+'/posts/'+id,{method:'PUT',body:bk});log.textContent+='  ⚠️ al ponerle la fecha Tumblr le quitó la cajita: se la vuelvo a poner y se queda con la fecha de hoy\n';}
      else log.textContent+=(PN2&&String(PN2.date)===UPD)?'  🕐 fecha puesta: la del original ('+UPD+')\n':'  ⚠️ Tumblr no dejó ponerle la fecha del original'+(rD&&rD.error?' ['+why(rD).trim()+']':'')+': se queda con la de hoy\n';}
    if(UPX){const dr=await api('/blog/'+blog+'/post/delete',{method:'POST',body:{id:UPX.old}});log.textContent+=(dr&&!dr.error?'  🗑 el de antes ('+UPX.old+') borrado: queda solo este, arriba en los tags\n':'  ⚠️ no pude borrar el de antes ('+UPX.old+'): '+why(dr||{}).trim()+'\n');log.scrollTop=1e9;
      if(dr&&!dr.error){const nf=await fixLinks(blog,UPX.old,'https://www.tumblr.com/'+blog+'/'+id);log.textContent+=nf?'  🔗 enlace cambiado al nuevo en '+nf+' post(s) tuyo(s)\n':'  🔗 ningún post tuyo reciente enlazaba al de antes\n';log.scrollTop=1e9;}}}
  if(RD&&String(id)!==String(RD.old)){const PN=await getPost(blog,id,3);const LN=PN&&(PN.layout||[]).find(l=>l&&l.type==='ask');const tq3=x=>String((x&&x.text)||'').toLowerCase().replace(/[^a-z0-9]/g,'');const want=AK?AK.content.slice(0,AK.layout[0].blocks.length).map(tq3).join('|'):'';const got=LN?(LN.blocks||[]).map(i=>tq3(PN.content[i])).join('|'):'';const anonOK=!(LN&&LN.attribution)||!!RD.named;const dOK=P=>!!P&&(String(P.date||'')===String(RD.date)||Math.abs(Number(P.timestamp||0)-Number(RD.ts||0))<180);let dateOK=dOK(PN);let PF=PN;if(PN&&LN&&!dateOK){const rD=await api('/blog/'+blog+'/posts/'+id,{method:'PUT',body:{content:PN.content,layout:PN.layout,tags:(PN.tags||[]).join(','),state:'published',date:String(RD.date)}});if(rD&&!rD.error){await sleep(1500);const PN2=await getPost(blog,id,3);if(dOK(PN2)){dateOK=true;PF=PN2;log.textContent+='  🕐 fecha puesta: la misma que el original\n';}}}const LF=PF&&(PF.layout||[]).find(l=>l&&l.type==='ask');const gotF=LF?(LF.blocks||[]).map(i=>tq3(PF.content[i])).join('|'):'';const anonF=!(LF&&LF.attribution)||!!RD.named;if(PF&&LF&&want&&gotF===want&&anonF&&dateOK){const dr=await api('/blog/'+blog+'/post/delete',{method:'POST',body:{id:String(RD.old)}});log.textContent+=(dr&&!dr.error?'  🗑 el de antes ('+RD.old+') borrado: queda este, con la cajita corregida y la misma fecha\n':'  ⚠️ no pude borrar el de antes ('+RD.old+'): '+why(dr||{}).trim()+'\n');log.scrollTop=1e9;}else{await api('/blog/'+blog+'/post/delete',{method:'POST',body:{id:String(id)}});log.textContent+='  ✗ el nuevo no salió igual ('+(!LF?'sin cajita':!anonF?'la cajita sale con nombre':!dateOK?'Tumblr no le dejó la fecha del original':'la cajita no tiene el texto corregido')+'): lo borro y el de antes se queda como estaba\n';log.scrollTop=1e9;return {skip:true,failed:true};}}const nu='https://www.tumblr.com/'+blog+'/'+id;remember(blog,key,nu);
  let wi=[],rk=(RR&&RR.reblog_key)||null;if(HV&&HV.blog===blog&&!HV.ids.has(String(id))){const o={id:String(id),key:rk,re:!!isRe,sig:sigX(body.content)};HV.ids.set(o.id,o);HV.list.unshift(o);}if(wbon.checked&&FAST()){getPost1(blog,id).then(PP=>wbAdd(nu,PP?wbImgs(PP.content):[])).catch(()=>wbAdd(nu,[]));wi=null;}else if(wbon.checked){try{const PP=await getPost1(blog,id);if(PP){rk=rk||PP.reblog_key;wi=wbImgs(PP.content);}}catch(e){}}
  if(wi){if(wi.length)log.textContent+='  🗄 '+wi.length+' imagen(es) a la cola del Wayback\n';wbAdd(nu,wi);}
  return {id:String(id),key:rk,restart,ms:Date.now()-T0,api:tA,img:ni};
}
function linkIds(h){const T=(LK&&LK.t)||{};const s=new Set();h.replace(/href="([^"]*)"/g,(a,u)=>{const m=u.replace(/&amp;/g,'&').match(TRX);if(m&&T[m[3]])s.add(m[3]);return a;});return s;}
async function runBatch(blog,items,status,onOk){
  const conc=()=>(PAR&&PAR.value==='m'&&!SLOW)?4:1;BL=null;HV=null;HADN=0;const pace=()=>{const v=PAR&&PAR.value;return (v==='t'||v==='m')?0:v==='r'?8000+Math.random()*7000:30000+Math.random()*30000;};const N=items.length;
  const st=new Array(N).fill(0);let active=0,stop=false,ok=0,hold=0,hT=null,bad=0,fails=0;USED=new Set();
  const K=(LK&&LK.k)||{},owner={};items.forEach((it,m)=>{(K[it.key]||[]).forEach(id=>{owner[id]=m;});});
  const deps=items.map((it,n)=>it.wait?[...Array(n).keys()]:[...linkIds(it.html)].map(id=>owner[id]).filter(m=>m!==undefined&&m<n));
  let started=0,WL=null,pumpRef=null,prevPub=Promise.resolve();KA.start();const wl=async()=>{try{if(navigator.wakeLock&&document.visibilityState==='visible')WL=await navigator.wakeLock.request('screen');}catch(e){}};await wl();
  const onVis=()=>{KA.poke();if(document.visibilityState==='visible'){wl();if(pumpRef)pumpRef();}};document.addEventListener('visibilitychange',onVis);
  await new Promise(resolve=>{const pump=()=>{
    if(hold>Date.now()){clearTimeout(hT);hT=setTimeout(pump,hold-Date.now()+20);return;}
    while(!stop&&active<conc()){const n=st.indexOf(0);if(n<0)break;const it=items[n];
      if(deps[n].some(m=>st[m]!==2))break;
      st[n]=1;active++;status(n,active);const ch=it.chain?it.chain():null;let rel;const G={wait:prevPub,release:()=>rel&&rel()};prevPub=new Promise(z=>{rel=z;});
      publishOne(blog,it.html,it.TAGS,it.label,it.key,ch,null,started++===0,G).then(res=>{G.release();active--;
        if(res&&res.again){st[n]=0;pump();return;}if(res&&res.had){st[n]=2;bad=0;HADN++;USED.add(String(res.id));onOk(it,res,n);pump();return;}if(res&&res.skip){st[n]=2;if(res.failed)fails++;pump();return;}
        if(res&&res.limit&&!it.retried){it.retried=true;SLOW=true;hold=Date.now()+5000;log.textContent+='  (Tumblr frena ['+res.why+']: espero 5 s y sigo de uno en uno)\n';st[n]=0;pump();return;}st[n]=2;
        if(res&&res.restart)log.textContent+='  (el post anterior de la cadena ya no existe: empiezo cadena nueva)\n';
        if(res&&res.id){ok++;bad=0;USED.add(String(res.id));onOk(it,res,n);const w=st.some(x=>x===0)?pace():0;if(w){hold=Date.now()+w;status(n,0,Math.round(w/1000));}}else if(res&&(res.limit||res.stall)){if(res.limit)log.textContent+='✗ '+it.label+' · '+res.why+'\n';stop=true;}else{fails++;if(++bad>=3){stop=true;log.textContent+='  (tres posts seguidos sin salir: paro aquí; vuelve a pulsar y sigue desde el primero que falta)\n';}else log.textContent+='  (este no salió: sigo con el siguiente; queda pendiente para la próxima tanda)\n';}pump();},e=>{G.release();st[n]=2;active--;fails++;log.textContent+='✗ '+it.label+' · '+String(e&&(e.message||e))+'\n';if(++bad>=3){stop=true;log.textContent+='  (tres posts seguidos sin salir: paro aquí)\n';}pump();});}
    if(!active&&(stop||st.every(x=>x===2))){if(fails)log.textContent+='  ('+fails+' post(s) de esta tanda no salieron; siguen pendientes)\n';resolve();}};pumpRef=pump;pump();});
  document.removeEventListener('visibilitychange',onVis);KA.stop();try{if(WL)WL.release();}catch(e){}
  return ok;}
async function loadPage(path){const h=await (await ffetch(path+'?'+Date.now())).text();const m=h.match(/const (?:D|P)=(\[[\s\S]*?\]);\s*const TAGS=("(?:[^"\\]|\\.)*")/);if(!m)return null;
  const base=new URL(path,ARCH).href.replace(/[^/]*$/,'');const D=JSON.parse(m[1]).map(x=>x.split('MEDIA/').join(base.replace(ARCH,RAWB)+'media/'));const TAGS=JSON.parse(m[2]).split(',').map(s=>s.trim()).filter(Boolean);
  const labs={};let lm;const lre=/data-i="(\d+)"[^>]*>(?:<span[^>]*>[^<]*<\/span>)?<span class="t">([^<]*)<\/span>/g;while((lm=lre.exec(h)))labs[+lm[1]]=lm[2].replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&amp;/g,'&');
  let TG=null;const tg=h.match(/const TG=(\[[\s\S]*?\]);<\/script>/);if(tg){try{TG=JSON.parse(tg[1]);}catch(e){TG=null;}}
  return {D,TAGS,labs,TG};}
const norm=h=>h.replace(/<[^>]+>/g,' ').replace(/&[a-z#0-9]+;/g,' ').replace(/\s+/g,' ').trim().toLowerCase().slice(0,300);
const hasTl=h=>/href="https?:\/\/(?:www\.tumblr\.com\/[\w-]+|[\w-]+\.tumblr\.com\/post)\/\d{15,}/.test(h);
const dbox=$('div',{style:'background:#2a1a0e;border:1px solid #5a3a1e;border-radius:12px;padding:10px;margin:0 0 12px'});
const dst=$('div',{style:'color:#9be59b;font-size:14px;min-height:1.2em;margin-top:6px'});
const bD=$('button',{textContent:'🗑 Borrar TODOS los posts del blog elegido',style:bstyle+';background:#6b1d1d;color:#ffd0d0'});
dbox.append($('b',{textContent:'Limpieza',style:'color:#ffb066'}),bD,dst);box.append(dbox);
bD.onclick=async()=>{const blog=sel.value;bD.disabled=true;dst.textContent='Contando posts de '+blog+'…';
  const first=await api('/blog/'+blog+'/posts?limit=20&offset=0');const F=first&&(first.response||first);
  if(!F||!F.posts){dst.textContent='No pude leer los posts: '+JSON.stringify(first).slice(0,150);bD.disabled=false;return;}
  const total=F.total_posts||F.posts.length;if(!total){dst.textContent='El blog ya está vacío.';bD.disabled=false;return;}
  if(!confirm('Vas a borrar '+total+' posts de '+blog+'. No se puede deshacer. ¿Seguro?')){dst.textContent='Nada borrado.';bD.disabled=false;return;}
  let done=0,fail=0,empty=0;
  for(let k=0;k<400;k++){const r=await api('/blog/'+blog+'/posts?limit=20&offset=0');const R=r&&(r.response||r);const ps=(R&&R.posts)||[];
    if(!ps.length){if(++empty>=2)break;await new Promise(z=>setTimeout(z,1200));continue;}empty=0;
    for(const p of ps){const id=p.id_string||p.id;const x=await api('/blog/'+blog+'/post/delete',{method:'POST',body:{id:String(id)}});
      if(x&&!x.error&&!(x.meta&&x.meta.status>=400))done++;else{fail++;log.textContent+='✗ borrar '+id+' · '+why(x)+'\n';}
      dst.textContent='Borrando… '+done+' de '+total+(fail?' ('+fail+' fallos)':'');await new Promise(z=>setTimeout(z,250));}
    if(fail>=ps.length&&fail>=20)break;}
  const keep={};Object.keys(localStorage).forEach(k=>{if((k.startsWith('rnc_whole_')||k.startsWith('rnc_chain_'))&&k.endsWith('_'+blog))localStorage.removeItem(k);});
  const L=LS.get('rnc_links',{});if(L[blog]){delete L[blog];LS.set('rnc_links',L);}
  dst.textContent='Hecho: '+done+' posts borrados de '+blog+(fail?', '+fail+' no se pudieron':'')+'. El progreso de los botones de blog entero para este blog se ha puesto a cero.';bD.disabled=false;};
const wbox=$('div',{style:'background:#2a1a0e;border:1px solid #5a3a1e;border-radius:12px;padding:10px;margin:0 0 12px'});
wbox.append($('b',{textContent:'🔁 Blog entero, de un toque',style:'color:#ffb066'}),$('p',{textContent:'Cada botón publica un blog caído completo en el blog elegido arriba, en el orden en que se postearon los originales: lo más viejo primero y lo último al final, así el último que se publica es justo el último que se posteó y queda arriba. Como va en orden, cuando un post enlaza a otro anterior, ese ya está republicado y el enlace apunta a la copia nueva. Las cadenas de reblogs van juntas, cada trozo rebloguea el anterior, como estaban. Todo de una vez, de uno en uno, al ritmo elegido arriba; sigue donde lo dejaste.',style:'font-size:13px;color:#e7b98a;margin:6px 0 8px'}));
const wst0=$('div',{style:'color:#9be59b;font-size:14px;min-height:1.2em;margin-top:6px'});const wlist=$('div');wbox.append(wlist,wst0);box.append(wbox);
(async()=>{let BL=[];try{BL=await (await ffetch('blogs.json?'+Date.now())).json();}catch(e){}
  const dkey=h=>{const t=h.replace(/<[^>]+>/g,' ').replace(/&[a-z#0-9]+;/g,' ').toLowerCase().replace(/[^a-z0-9]/g,'');const n=(h.match(/<img /g)||[]).length;if(t.length>=60)return t.slice(0,120);return t+'|'+n+'|'+(h.match(/(?:src|href|data-url)="[^"]*"/g)||[]).join('');};
  for(const bl of BL){const TOP=!!bl.top;const b=$('button',{textContent:TOP?(bl.big||bl.label):'🔁 '+bl.label,style:TOP?'display:block;width:100%;text-align:center;background:#ff9a3c;color:#1a120b;border:0;border-radius:14px;padding:22px 14px;font-weight:900;font-size:22px;line-height:1.25':bstyle});const wst=TOP?tst:wst0;const wl=TOP?topbox:wlist;if(TOP){topbox.style.display='block';topbox.insertBefore(b,tst);}else wlist.append(b);
    b.onclick=async()=>{const blog=sel.value;b.disabled=true;wst.textContent='Leyendo '+bl.pages.length+' página(s)…';await links();await fuera();
      let IX=[];try{IX=await (await ffetch('index.json?'+Date.now())).json();}catch(e){}const CH=new Set(IX.filter(x=>x.chain).map(x=>x.path));let ORD={};try{ORD=await (await ffetch('order.json?'+Date.now())).json();}catch(e){}
      const M=new Map();const skipped={dup:0,big:0,other:0,moved:0,sup:0,junk:0};const all=[];let seq=0;const OWN=new RegExp(BL.map(x=>x.match).filter(Boolean).join('|'),'i');
      const foreign=d=>{const m=d.match(/^\s*<p>(?:<a [^>]*>)?([\w-]+)(?:<\/a>)?:<\/p>\s*<blockquote>/);return !!(m&&!OWN.test(m[1]));};
      for(const path of bl.pages){const pg=await loadPage(path);if(!pg)continue;const isC=CH.has(path);
        const OW=ORD[path]||[];const FJ=new Set((FU&&FU[path])||[]);pg.D.forEach((d,i)=>{if(FJ.has(i)){skipped.junk++;return;}const w=OW[i]||null;if(w==='x'){skipped.moved++;return;}if(w==='s'){skipped.sup++;return;}const im=(d.match(/<img /g)||[]).length;if(im>30){skipped.big++;return;}if(foreign(d)){skipped.other++;return;}
          const tl=d.replace(/<[^>]+>/g,' ').replace(/&[a-z#0-9]+;/g,' ').replace(/[^A-Za-z0-9]/g,'').length;const it={path,i,html:d,TAGS:(pg.TG&&pg.TG[i])||pg.TAGS,label:(pg.labs[i]||('Post '+(i+1))),key:path+'#'+i,links:hasTl(d),chain:isC,im,tl,w,seq:seq++};all.push(it);
          const k=dkey(d);const prev=M.get(k);if(!prev){M.set(k,it);return;}skipped.dup++;{const a=prev.w,b=it.w;const mw=(a&&b)?(a.padStart(20,'0')<b.padStart(20,'0')?a:b):(a||b);prev.w=mw;it.w=mw;}if((isC&&!prev.chain)||(isC===prev.chain&&(im>prev.im||(im===prev.im&&(tl>prev.tl*1.02||(bl.strict&&tl>=prev.tl*0.98)))))){prev.drop=true;M.set(k,it);}else it.drop=true;});}
      const keep=all.filter(x=>!x.drop);{let lw=null;keep.forEach(x=>{if(!x.w)x.w=lw;lw=x.w||lw;});}const solo=keep.filter(x=>!x.chain);const groups=[];
      for(const x of keep.filter(x=>x.chain)){let g=groups.find(g=>g.path===x.path);if(!g){g={path:x.path,items:[],links:false};groups.push(g);}g.items.push(x);g.links=g.links||x.links;}
      groups.forEach(g=>g.items.forEach((x,j)=>{x.gprev=j?g.items[j-1]:null;}));
      const W=x=>String(x||'').padStart(20,'0');const units=solo.map(x=>({w:x.w,seq:x.seq,items:[x]})).concat(groups.map(g=>({w:g.items[0].w,seq:g.items[0].seq,items:g.items})));
      units.sort((a,b)=>W(a.w)<W(b.w)?-1:W(a.w)>W(b.w)?1:a.seq-b.seq);const order=[];units.forEach(u=>order.push(...u.items));
      const PK='rnc_whole_'+bl.name+'_'+blog;const done=new Set(LS.get(PK,[]));const HERE=(LS.get('rnc_links',{})[blog])||{};const KK=(LK&&LK.k)||{};let nHere=0;order.forEach(x=>{if(!done.has(x.key)&&(KK[x.key]||[]).some(id=>HERE[id])){done.add(x.key);nHere++;}});if(nHere)LS.set(PK,Array.from(done));const todo=order.filter(x=>!done.has(x.key));
      const nch=groups.reduce((a,g)=>a+g.items.length,0);
      wst.textContent=bl.label+': '+order.length+' posts, en el orden en que se postearon'+(nch?' ('+nch+' en cadena de reblogs)':'')+', '+done.size+' ya publicados aquí'+(nHere?' ('+nHere+' ya estaban en el blog por otro botón, como el pinned: no se repiten)':'')+', '+todo.length+' por publicar.'+(skipped.dup?' '+skipped.dup+' repetidos omitidos (de cada post repetido queda la versión con más capturas).':'')+(skipped.big?' '+skipped.big+' de más de 30 imágenes omitidos (van por trozos, en cadena).':'')+(skipped.other?' '+skipped.other+' reblogs de posts ajenos fuera.':'')+(skipped.moved?' '+skipped.moved+' que eran de otro blog van en el botón de ese blog.':'')+(skipped.sup?' '+skipped.sup+' con una versión más nueva en el archivo: va la nueva.':'')+(skipped.junk?' '+skipped.junk+' de morralla fuera (reblogs de otros blogs sin texto tuyo, lo del blog payaso, lo de Sanctuarium y lo de otros blogs).':'');
      if(!todo.length){b.disabled=false;wst.textContent+=' Nada pendiente.';return;}
      const go=$('button',{textContent:'Publicar todo lo que falta ('+todo.length+' de '+order.length+') en '+blog+' · lo que ya esté en el blog se salta, sin tocarlo',style:'display:block;width:100%;background:#ff9a3c;color:#1a120b;border:0;border-radius:12px;padding:'+(TOP?'20px 14px;font-size:20px':'13px')+';font-weight:800;margin:8px 0'});
      const reset=$('button',{textContent:'Empezar de cero en este blog (olvidar lo publicado)',style:bstyle+';font-size:13px'});reset.onclick=()=>{LS.set(PK,[]);groups.forEach(g=>LS.set('rnc_chain_'+g.path+'_'+blog,null));{const L2=LS.get('rnc_links',{});if(L2[blog]){delete L2[blog];LS.set('rnc_links',L2);}}wst.textContent='Progreso borrado. Vuelve a pulsar el botón del blog.';go.remove();reset.remove();b.disabled=false;};
      go.onclick=async()=>{go.disabled=true;UPON=false;SOLO=true;const batch=todo.slice(0);let uuid=null;const TS=Date.now();
        if(batch.some(x=>x.chain)){const bi=await api('/blog/'+blog+'/info');const BI=bi&&(bi.response||bi);uuid=BI&&BI.blog&&BI.blog.uuid;}
        const items=batch.map(x=>({html:x.html,TAGS:x.TAGS,label:x.label,key:x.key,wait:(x.chain&&x.gprev)?true:null,
          chain:x.chain&&x.gprev?()=>{const pv=LS.get('rnc_chain_'+x.path+'_'+blog,null);if(pv&&pv.id&&pv.next===x.i)return {uuid,prev:pv};log.textContent+='  (no tengo el post anterior de la cadena: este va suelto)\n';return null;}:null,x}));
        const ok=await runBatch(blog,items,(n,a,w)=>{wst.textContent=w?'Publicado '+(n+1)+' de '+batch.length+'. Espero '+w+' s antes del siguiente…':'Publicando '+(n+1)+' de '+batch.length+(batch[n].chain?' (en cadena)':'')+'…';},
          (it,res)=>{const x=it.x;const d=LS.get(PK,[]);if(!d.includes(x.key))d.push(x.key);LS.set(PK,d);if(x.chain)LS.set('rnc_chain_'+x.path+'_'+blog,{id:String(res.id),key:res.key,next:x.i+1});});
        SOLO=false;const left=order.filter(x=>!new Set(LS.get(PK,[])).has(x.key)).length;
        wst.textContent='Tanda hecha: '+ok+' publicados'+(HADN?' y '+HADN+' que ya estaban (sin tocar)':'')+' de '+batch.length+' en '+secs(Date.now()-TS)+(ok?' ('+secs((Date.now()-TS)/ok)+' por post)':'')+'. Quedan '+left+'.'+(left?' Vuelve a pulsar el botón del blog para la siguiente tanda.':' Blog entero publicado.');go.remove();reset.remove();b.disabled=false;};
      wl.append(go,reset);};}
})();
let items=[];
try{items=await (await ffetch('index.json?'+Date.now())).json();}catch(e){list.append($('p',{textContent:'No pude leer el archivo.'}));}
for(const it of items){
  const b=$('button',{textContent:it.title,style:'display:block;width:100%;text-align:left;background:#3a2412;color:#ffd9b0;border:0;border-radius:10px;padding:12px;margin:0 0 8px;font-weight:700'});
  b.onclick=async()=>{st.textContent='Leyendo '+it.title+'…';
    const pg=await loadPage(it.path);if(!pg){st.textContent='Esa página no tiene posts.';return;}await fuera();
    const {D,TAGS,labs,TG}=pg;
    showPosts(it,D,TAGS,labs,TG);st.textContent='';
  };
  list.append(b);
}
function showPosts(it,D,TAGS,labs,TG){
  const title=it.title;list.innerHTML='';list.append($('h3',{textContent:title,style:'color:#ffb066;margin:4px 0 8px'}));
  const chk=$('input',{type:'checkbox',checked:!!it.chain});const cl=$('label',{style:'display:flex;gap:8px;align-items:center;margin:0 0 10px;color:#ffb066;font-weight:700'});cl.append(chk,$('span',{textContent:'⛓ En cadena: cada post rebloguea el anterior, desde el marcado en adelante'}));list.append(cl);
  const KEY=()=>'rnc_chain_'+it.path+'_'+sel.value;
  const checks=[];
  const FJ=new Set((FU&&FU[it.path])||[]);const NV=D.length-D.filter((d,i)=>FJ.has(i)).length;
  if(FJ.size)list.append($('p',{textContent:'Sin la morralla: '+(D.length-NV)+' posts fuera (reblogs de otros blogs sin texto tuyo, lo del blog payaso, lo de Sanctuarium y lo de otros blogs). Quedan '+NV+'.',style:'font-size:13px;color:#9be59b;margin:0 0 10px'}));
  D.forEach((d,i)=>{const c=$('input',{type:'checkbox',checked:true});c.dataset.i=i;checks.push(c);if(FJ.has(i)){c.checked=false;c.disabled=true;return;}
    const row=$('label',{style:'display:flex;gap:8px;align-items:flex-start;margin:0 0 8px;font-size:14px'});
    row.append(c,$('span',{textContent:(labs[i]||('Post '+(i+1)))+'  ·  '+(d.match(/<img /g)||[]).length+' img'}));list.append(row);});
  const pub=$('button',{textContent:'Publicar los marcados (de uno en uno)',style:'display:block;width:100%;background:#ff9a3c;color:#1a120b;border:0;border-radius:12px;padding:15px;font-weight:800;margin:8px 0'});
  const chain={};const MULTI=NV>1;
  const pubS=$('button',{textContent:'➕ Publicar solo los que faltan (lo que ya esté en el blog no se toca)',style:'display:block;width:100%;background:#ff9a3c;color:#1a120b;border:0;border-radius:12px;padding:15px;font-weight:800;margin:8px 0'});
  if(MULTI){pub.textContent='✏️ Publicar los marcados y sobrescribir los que ya estén';pub.style.cssText='display:block;width:100%;background:#3a2412;color:#ffd9b0;border:1px solid #5a3a1e;border-radius:12px;padding:13px;font-weight:700;margin:0 0 8px';}
  const run=async solo=>{
    if(pub.disabled)return;const blog=sel.value;
    let picks;
    if(chk.checked){const first=checks.findIndex(c=>c.checked&&!c.disabled);if(first<0){st.textContent='Marca desde cuál empezar.';return;}picks=checks.slice(first).filter(c=>!c.disabled);}
    else picks=checks.filter(c=>c.checked&&!c.disabled);
    if(!picks.length){st.textContent='No hay nada marcado.';return;}
    UPON=!solo&&(upr.checked||FORCEUP);FORCEUP=false;if(UPON&&picks.length>3&&!confirm('🔝 Subir arriba está activado y hay '+picks.length+' posts marcados: los que ya estén en el blog se publican otra vez y pierden sus likes. ¿Seguro?')){UPON=false;return;}
    pub.disabled=true;pubS.disabled=true;SOLO=!!solo;await links();const TS=Date.now();
    let uuid=null;if(chk.checked){const bi=await api('/blog/'+blog+'/info');const BI=bi&&(bi.response||bi);uuid=BI&&BI.blog&&BI.blog.uuid;}
    let prev=null;try{prev=JSON.parse(localStorage.getItem(KEY())||'null');}catch(e){}
    const items=picks.map(c=>{const i=+c.dataset.i;return {html:D[i],TAGS:(TG&&TG[i])||TAGS,label:labs[i]||('Post '+(i+1)),key:it.path+'#'+i,i,c,wait:chk.checked?true:null,
      chain:chk.checked?()=>(prev&&prev.next===i&&uuid)?{uuid,prev}:null:null};});
    const ok=await runBatch(blog,items,(n,a,w)=>{st.textContent=w?'Publicado '+(n+1)+' de '+picks.length+'. Espero '+w+' s antes del siguiente…':'Publicando '+(n+1)+' de '+picks.length+'…';},
      (x,res)=>{x.c.checked=false;x.c.disabled=true;if(res.restart)prev=null;
        if(chk.checked){prev={id:String(res.id),key:res.key,next:x.i+1};try{localStorage.setItem(KEY(),JSON.stringify(prev));}catch(e){}
          if(checks[x.i+1]&&!checks[x.i+1].disabled)checks[x.i+1].checked=true;}});
    SOLO=false;st.textContent='Tanda hecha: '+ok+' publicados'+(HADN?' y '+HADN+' que ya estaban (sin tocar)':'')+' de '+picks.length+' en '+secs(Date.now()-TS)+(ok?' ('+secs((Date.now()-TS)/ok)+' por post)':'')+'.'+(chk.checked?' La cadena sigue donde lo dejaste: vuelve a pulsar para la siguiente tanda.':'');pub.disabled=false;pubS.disabled=false;
  };
  pub.onclick=()=>run(false);pubS.onclick=()=>run(true);
  const upb=$('button',{textContent:'🔝 Subir arriba en los tags los marcados',style:'display:block;width:100%;background:#c0392b;color:#fff;border:0;border-radius:12px;padding:15px;font-weight:800;margin:0 0 4px'});
  upb.onclick=()=>{if(pub.disabled)return;FORCEUP=true;pub.onclick();};
  list.append(...(MULTI?[pubS,pub]:[pub]),upb,$('p',{textContent:'Si ya está en el blog, lo publica otra vez (sale el primero en los tags), le pone la fecha de cuando se publicó, borra el de antes (se pierden sus likes) y cambia al nuevo los enlaces que le apuntaban en tus otros posts. Si no está, lo publica normal.',style:'font-size:12px;color:#e7b98a;margin:0 0 10px'}));
}
})();
