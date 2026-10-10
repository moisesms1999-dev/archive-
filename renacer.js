javascript:(async()=>{
const ARCH='https://moisesms1999-dev.github.io/archive-/';
{const old=document.getElementById('rnc');if(old)old.remove();}
const LS={get:(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d;}catch(e){return d;}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}};
let LK=null;const links=async()=>{if(LK)return LK;try{LK=await (await fetch(ARCH+'links.json?'+Date.now())).json();}catch(e){LK={t:{},k:{}};}return LK;};
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
const api=async(path,opts={})=>{
  if(window.tumblr&&typeof window.tumblr.apiFetch==='function'){
    const o={method:opts.method||'GET'};if(opts.body)o.body=opts.body;
    try{return await window.tumblr.apiFetch('/v2'+path,o);}catch(e){return {error:String(e&&(e.message||e)),body:e&&e.body};}
  }
  const r=await fetch('/api/v2'+path,{method:opts.method||'GET',credentials:'include',headers:{'Authorization':'Bearer '+TOK,'Content-Type':'application/json','X-Version':'redpop/3/0//redpop/','X-CSRF':CSRF||''},body:opts.body?JSON.stringify(opts.body):undefined});
  let j=null;try{j=await r.json();}catch(e){}return j&&r.ok?j:{error:'HTTP '+r.status,detail:j};
};
const box=$('div',{id:'rnc',style:'position:fixed;inset:0;z-index:2147483647;background:#1a120b;color:#ffd9b0;font:16px/1.4 system-ui,sans-serif;overflow:auto;padding:16px 14px 40px'});
const log=$('div',{style:'font-size:13px;color:#e7b98a;white-space:pre-wrap;max-height:34vh;overflow:auto;margin-top:10px'});
const st=$('div',{style:'color:#9be59b;min-height:1.3em;margin:8px 0'});
const close=$('button',{textContent:'✕ Cerrar',style:'position:absolute;top:10px;right:12px;background:#5a3a1e;color:#ffd9b0;border:0;border-radius:10px;padding:8px 12px;font-weight:700'});
close.onclick=()=>box.remove();
box.append(close,$('h2',{textContent:'🍪 Renacer',style:'color:#ff9a3c;margin:0 0 4px'}),$('div',{textContent:'modo: '+((window.tumblr&&typeof window.tumblr.apiFetch==='function')?'interno':'alternativo'),style:'font-size:11px;color:#a58a6a'}),$('p',{textContent:'Publica en el blog que elijas. Turbo: sin espera entre posts, hasta 25 por tanda.',style:'color:#f3c99a;margin:0 0 12px'}));
document.body.append(box);
let blogs=[];
const u=await api('/user/info');
const R=u&&(u.response||u);
if(R&&R.user&&R.user.blogs)blogs=R.user.blogs.map(b=>({name:b.name,uuid:b.uuid}));
else{box.append($('p',{textContent:'No pude leer tus blogs: '+JSON.stringify(u).slice(0,200)+'. ¿Estás en tumblr.com con la sesión iniciada?'}));}
const sel=$('select',{style:'width:100%;padding:11px;border-radius:10px;background:#1a120b;color:#ffd9b0;border:1px solid #5a3a1e;margin-bottom:12px'});
blogs.forEach(b=>sel.append($('option',{value:b.name,textContent:b.name})));
box.append(sel);
const wbon=$('input',{type:'checkbox',checked:LS.get('rnc_wbon',true)});wbon.onchange=()=>LS.set('rnc_wbon',wbon.checked);
const wbst=$('div',{style:'font-size:12px;color:#a58a6a;margin:2px 0 0 28px;min-height:1em'});
const wbl=$('label',{style:'display:flex;gap:8px;align-items:center;margin:0 0 2px;color:#ffb066;font-weight:700;font-size:14px'});wbl.append(wbon,$('span',{textContent:'🗄 Guardar cada post nuevo en el Wayback Machine, para que sus enlaces no mueran'}));
box.append(wbl,wbst,$('div',{style:'height:10px'}));
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
const sp=$('select',{style:'width:100%;padding:9px;border-radius:10px;background:#1a120b;color:#ffd9b0;border:1px solid #5a3a1e;margin-top:6px'});sp.append($('option',{value:'t',textContent:'Turbo (sin espera)'}),$('option',{value:'f',textContent:'Rápido (uno cada 0,8 a 1,6 s)'}),$('option',{value:'n',textContent:'Normal (uno cada 2,5 a 5 s)'}));
fbox.append($('b',{textContent:'Seguidores',style:'color:#ffb066'}),sp,bF,bL,fst,flog);box.append(fbox);
const nap=()=>sp.value==='t'?Promise.resolve():new Promise(r=>setTimeout(r,sp.value==='f'?800+Math.random()*800:2500+Math.random()*2500));
async function followAll(names,label){
  bF.disabled=bL.disabled=true;let ok=0,n=0;
  for(const nm of names){n++;fst.textContent=label+': '+n+' de '+names.length+' ('+nm+')';
    const r=await api('/user/follow',{method:'POST',body:{url:'https://'+nm+'.tumblr.com'}});
    if(r&&!r.error&&!(r.meta&&r.meta.status>=400)){ok++;flog.textContent+='✓ '+nm+'\n';}else flog.textContent+='✗ '+nm+'\n';
    flog.scrollTop=1e9;await nap();}
  fst.textContent=label+': hecho, '+ok+' seguidos de '+names.length+'.';bF.disabled=bL.disabled=false;
}
bF.onclick=async()=>{const blog=sel.value;fst.textContent='Leyendo seguidores de '+blog+'…';let users=[],off=0,total=0;
  for(let k=0;k<100;k++){const r=await api('/blog/'+blog+'/followers?limit=20&offset='+off);const R=r&&(r.response||r);
    if(!R||!R.users){fst.textContent='No pude leer los seguidores: '+JSON.stringify(r).slice(0,150);return;}
    total=R.total_users||0;users=users.concat(R.users);if(R.users.length<20||users.length>=total)break;off+=20;}
  const todo=users.filter(x=>!x.following).map(x=>x.name);
  flog.textContent='Seguidores: '+total+'. Por seguir: '+todo.length+'\n';
  if(!todo.length){fst.textContent='Ya los sigues a todos.';return;}
  followAll(todo,'Seguidores');};
bL.onclick=async()=>{fst.textContent='Leyendo la lista…';let t='';try{t=await (await fetch(ARCH+'lista.txt?'+Date.now())).text();}catch(e){}
  const L=[...new Set(t.split(/\r?\n/).map(x=>x.trim().toLowerCase().replace(/^@/,'')).filter(Boolean))];
  if(!L.length){fst.textContent='La lista está vacía.';return;}
  followAll(L,'Lista fija');};
const abox=$('div',{style:'background:#2a1a0e;border:1px solid #5a3a1e;border-radius:12px;padding:10px;margin:0 0 12px'});
const bA=$('button',{textContent:'🎨 Cabecera y foto de perfil',style:'display:block;width:100%;text-align:left;background:#5a3a1e;color:#ffd9b0;border:0;border-radius:10px;padding:11px;font-weight:700'});
const ain=$('div');abox.append(bA,ain);box.append(abox);
bA.onclick=async()=>{ain.innerHTML='';let K=[];try{K=await (await fetch(ARCH+'branding/kits.json?'+Date.now())).json();}catch(e){}
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
async function cleanImgs(h){const us=[...new Set([...h.matchAll(/<img src="([^"]+)"/g)].map(m=>m[1]))];const bad=[];
  for(let k=0;k<us.length;k+=8){const part=us.slice(k,k+8);const r=await Promise.all(part.map(imgOK));part.forEach((u,j)=>{if(!r[j])bad.push(u);});}
  let out=h;for(const u of bad){out=out.split('<p><img src="'+u+'"></p>').join('').split('<img src="'+u+'">').join('');}
  return {html:out,bad:bad.length};}
function inline(node,acc){
  for(const n of node.childNodes){
    if(n.nodeType===3){acc.text+=n.nodeValue;continue;}
    if(n.nodeType!==1)continue;
    const tag=n.tagName,s=acc.text.length;
    if(tag==='BR'){acc.text+='\n';continue;}
    inline(n,acc);const e=acc.text.length;if(e<=s)continue;
    if(tag==='B'||tag==='STRONG')acc.fmt.push({start:s,end:e,type:'bold'});
    else if(tag==='I'||tag==='EM')acc.fmt.push({start:s,end:e,type:'italic'});
    else if(tag==='A'&&n.getAttribute('href'))acc.fmt.push({start:s,end:e,type:'link',url:n.getAttribute('href')});
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
    if(c.tagName==='FIGURE'){const url=c.getAttribute('data-url')||((c.querySelector('iframe')||{}).src||'');if(url)out.push({type:'video',provider:'youtube',url:url.replace('/embed/','/watch?v=').replace(/\?feature=oembed/,'')});continue;}
    const img=c.tagName==='IMG'?c:c.querySelector('img');
    if(img&&!c.textContent.trim()){out.push({type:'image',media:[{url:img.getAttribute('src')}]});continue;}
    if(img){const t=textBlocks(c,'indented');out.push(...t);c.querySelectorAll('img').forEach(im=>out.push({type:'image',media:[{url:im.getAttribute('src')}]}));continue;}
    out.push(...textBlocks(c,'indented'));}
  return out;}
function toNPF(h){
  const doc=new DOMParser().parseFromString('<div>'+h+'</div>','text/html');const root=doc.body.firstChild;const C=[];
  for(const el of root.children){
    const tag=el.tagName;
    if(tag==='FIGURE'){const url=el.getAttribute('data-url')||((el.querySelector('iframe')||{}).src||'');if(url)C.push({type:'video',provider:'youtube',url:url.replace('/embed/','/watch?v=').replace(/\?feature=oembed/,'')});continue;}
    const as=el.querySelectorAll?el.querySelectorAll('a'):[];
    if(tag==='P'&&as.length===1&&!el.querySelector('img')&&el.textContent.trim()===as[0].textContent.trim()&&/^https?:/.test(as[0].getAttribute('href')||'')){C.push({type:'link',url:as[0].getAttribute('href'),title:as[0].textContent.trim()});continue;}
    const img=el.tagName==='IMG'?el:el.querySelector('img');
    if(img&&!el.textContent.trim()){C.push({type:'image',media:[{url:img.getAttribute('src')}]});continue;}
    if(tag==='BLOCKQUOTE'){C.push(...quoteBlocks(el));continue;}
    if(tag==='UL'||tag==='OL'){for(const li of el.children)C.push(...textBlocks(li,tag==='UL'?'unordered-list-item':'ordered-list-item'));continue;}
    C.push(...textBlocks(el));
  }
  return C;
}
const why=x=>{const e=(x&&x.body&&x.body.errors&&x.body.errors[0])||{};return (e.code||'')+' '+(e.detail||e.title||x&&x.error||'');};
async function getPost(blog,id){for(const q of ['/blog/'+blog+'/posts/'+id+'?npf=true','/blog/'+blog+'/posts/'+id,'/blog/'+blog+'/posts?id='+id+'&npf=true']){for(let k=0;k<3;k++){const g=await api(q);const G=g&&(g.response||g);const PP=G&&(G.posts&&G.posts[0]||G);if(PP&&PP.reblog_key)return PP;await new Promise(z=>setTimeout(z,1200));}}return null;}
function dropTrail(h,name){const m=h.match(new RegExp('^\\s*<p>(?:<a [^>]*>)?'+name+'(?:</a>)?:</p>\\s*<blockquote>'));if(!m)return h;let d=1,i=m[0].length;const re=/<(\/?)blockquote>/g;re.lastIndex=i;let t;while((t=re.exec(h))){d+=t[1]?-1:1;if(!d)return h.slice(re.lastIndex);}return h;}
async function publishOne(blog,html,TAGS,label,key,chain){
  const em=html.match(/^\s*<!--reblog ([\w-]+) (\d+)-->/);
  if(em){html=html.slice(em[0].length);const PB=await getPost(em[1],em[2]);const bi=await api('/blog/'+em[1]+'/info');const BI=bi&&(bi.response||bi);const pu=BI&&BI.blog&&BI.blog.uuid;
    if(!PB||!PB.reblog_key||!pu){if(new RegExp('^\\s*<p>(?:<a [^>]*>)?'+em[1]+'(?:</a>)?:</p>\\s*<blockquote>').test(html))log.textContent+='  (el post '+em[2]+' de '+em[1]+' ya no se puede leer: lo publico suelto, con su cita dentro)\n';else{log.textContent+='✗ '+label+' · no pude leer el post '+em[2]+' de '+em[1]+' para reblogarlo (¿borrado o privado?)\n';return {};}}
    else{html=dropTrail(html,em[1]);chain={uuid:pu,prev:{id:em[2],key:PB.reblog_key}};log.textContent+='  ↻ reblog de '+em[1]+'/'+em[2]+'\n';}}
  const ci=await cleanImgs(html);const rl=relink(ci.html,blog);const Hh=rl.html;
  if(ci.bad)log.textContent+='  ('+ci.bad+' imagen(es) caída(s), quitada(s))\n';if(rl.n)log.textContent+='  🔗 '+rl.n+' enlace(s) llevados a una copia viva\n';
  const content=toNPF(Hh);const tags=TAGS.slice(0,30).join(',');let isRe=!!chain,restart=false;
  const body={content,tags,state:'published'};
  if(isRe&&!chain.prev.key){const PP=await getPost(blog,chain.prev.id);if(PP&&PP.reblog_key)chain.prev.key=PP.reblog_key;}
  if(isRe&&!chain.uuid){const bi=await api('/blog/'+blog+'/info');const BI=bi&&(bi.response||bi);chain.uuid=BI&&BI.blog&&BI.blog.uuid;}
  if(isRe&&(!chain.prev.key||!chain.uuid)){log.textContent+='  (reblog imposible: falta '+(chain.prev.key?'':'reblog key ')+(chain.uuid?'':'uuid del blog')+'; lo publico suelto)\n';isRe=false;}
  if(isRe){body.parent_tumblelog_uuid=chain.uuid;body.parent_post_id=String(chain.prev.id);body.reblog_key=chain.prev.key;}
  let r=await api('/blog/'+blog+'/posts',{method:'POST',body});
  if(r&&r.error&&isRe&&/404|not found/i.test(why(r)+String(r.error))){delete body.parent_tumblelog_uuid;delete body.parent_post_id;delete body.reblog_key;isRe=false;restart=true;r=await api('/blog/'+blog+'/posts',{method:'POST',body});}
  if(r&&r.error){log.textContent+='  · nativo: '+why(r)+(r.detail?' '+JSON.stringify(r.detail).slice(0,200):'')+'\n';
    const x=isRe?await api('/blog/'+blog+'/post/reblog',{method:'POST',body:{id:chain.prev.id,reblog_key:chain.prev.key,comment:Hh,tags}})
                :await api('/blog/'+blog+'/post',{method:'POST',body:{type:'text',format:'html',body:Hh,tags}});
    if(x&&!x.error){r=x;log.textContent+='  (como HTML, igual que pegarlo)\n';}else log.textContent+='  · HTML: '+why(x)+'\n';}
  const RR=r&&(r.response||r);const id=RR&&(RR.id_string||RR.id);
  if(!id){log.textContent+='✗ '+label+' · '+why(r)+'\n';log.scrollTop=1e9;return {restart};}
  log.textContent+='✓ '+label+(isRe?' (reblog)':'')+' → '+id+'\n';log.scrollTop=1e9;
  const nu='https://www.tumblr.com/'+blog+'/'+id;remember(blog,key,nu);
  let wi=[],rk=null;try{const PP=await getPost(blog,id);rk=PP&&PP.reblog_key;if(!rk)log.textContent+='  (no pude leer la reblog key de '+id+')\n';if(wbon.checked&&PP)wi=wbImgs(PP.content);}catch(e){}
  if(wi.length)log.textContent+='  🗄 '+wi.length+' imagen(es) a la cola del Wayback\n';wbAdd(nu,wi);
  return {id:String(id),key:rk,restart};
}
async function loadPage(path){const h=await (await fetch(ARCH+path+'?'+Date.now())).text();const m=h.match(/const (?:D|P)=(\[[\s\S]*?\]);\s*const TAGS=("(?:[^"\\]|\\.)*")/);if(!m)return null;
  const base=new URL(path,ARCH).href.replace(/[^/]*$/,'');const D=JSON.parse(m[1]).map(x=>x.split('MEDIA/').join(base+'media/'));const TAGS=JSON.parse(m[2]).split(',').map(s=>s.trim()).filter(Boolean);
  const labs={};let lm;const lre=/data-i="(\d+)"[^>]*>(?:<span[^>]*>[^<]*<\/span>)?<span class="t">([^<]*)<\/span>/g;while((lm=lre.exec(h)))labs[+lm[1]]=lm[2].replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&amp;/g,'&');
  return {D,TAGS,labs};}
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
wbox.append($('b',{textContent:'🔁 Blog entero, de un toque',style:'color:#ffb066'}),$('p',{textContent:'Cada botón publica un blog caído completo en el blog elegido arriba, en el orden en que se postearon los originales: lo más viejo primero y lo último al final, así el último que se publica es justo el último que se posteó y queda arriba. Como va en orden, cuando un post enlaza a otro anterior, ese ya está republicado y el enlace apunta a la copia nueva. Las cadenas de reblogs van juntas, cada trozo rebloguea el anterior, como estaban. Tandas de 25; sigue donde lo dejaste.',style:'font-size:13px;color:#e7b98a;margin:6px 0 8px'}));
const wst=$('div',{style:'color:#9be59b;font-size:14px;min-height:1.2em;margin-top:6px'});const wlist=$('div');wbox.append(wlist,wst);box.append(wbox);
(async()=>{let BL=[];try{BL=await (await fetch(ARCH+'blogs.json?'+Date.now())).json();}catch(e){}
  const dkey=h=>{const t=h.replace(/<[^>]+>/g,' ').replace(/&[a-z#0-9]+;/g,' ').toLowerCase().replace(/[^a-z0-9]/g,'');const n=(h.match(/<img /g)||[]).length;if(t.length>=60)return t.slice(0,120);return t+'|'+n+'|'+(h.match(/(?:src|href|data-url)="[^"]*"/g)||[]).join('');};
  for(const bl of BL){const b=$('button',{textContent:'🔁 '+bl.label,style:bstyle});wlist.append(b);
    b.onclick=async()=>{const blog=sel.value;b.disabled=true;wst.textContent='Leyendo '+bl.pages.length+' página(s)…';await links();
      let IX=[];try{IX=await (await fetch(ARCH+'index.json?'+Date.now())).json();}catch(e){}const CH=new Set(IX.filter(x=>x.chain).map(x=>x.path));let ORD={};try{ORD=await (await fetch(ARCH+'order.json?'+Date.now())).json();}catch(e){}
      const M=new Map();const skipped={dup:0,big:0,other:0,moved:0};const all=[];let seq=0;const OWN=new RegExp(BL.map(x=>x.match).filter(Boolean).join('|'),'i');
      const foreign=d=>{const m=d.match(/^\s*<p>(?:<a [^>]*>)?([\w-]+)(?:<\/a>)?:<\/p>\s*<blockquote>/);return !!(m&&!OWN.test(m[1]));};
      for(const path of bl.pages){const pg=await loadPage(path);if(!pg)continue;const isC=CH.has(path);
        const OW=ORD[path]||[];pg.D.forEach((d,i)=>{const w=OW[i]||null;if(w==='x'){skipped.moved++;return;}const im=(d.match(/<img /g)||[]).length;if(im>30){skipped.big++;return;}if(foreign(d)){skipped.other++;return;}
          const it={path,i,html:d,TAGS:pg.TAGS,label:(pg.labs[i]||('Post '+(i+1))),key:path+'#'+i,links:hasTl(d),chain:isC,im,w,seq:seq++};all.push(it);
          const k=dkey(d);const prev=M.get(k);if(!prev){M.set(k,it);return;}skipped.dup++;if((isC&&!prev.chain)||(isC===prev.chain&&(im>prev.im||(bl.strict&&im===prev.im)))){prev.drop=true;M.set(k,it);}else it.drop=true;});}
      const keep=all.filter(x=>!x.drop);{let lw=null;keep.forEach(x=>{if(!x.w)x.w=lw;lw=x.w||lw;});}const solo=keep.filter(x=>!x.chain);const groups=[];
      for(const x of keep.filter(x=>x.chain)){let g=groups.find(g=>g.path===x.path);if(!g){g={path:x.path,items:[],links:false};groups.push(g);}g.items.push(x);g.links=g.links||x.links;}
      groups.forEach(g=>g.items.forEach((x,j)=>{x.gprev=j?g.items[j-1]:null;}));
      const W=x=>String(x||'').padStart(20,'0');const units=solo.map(x=>({w:x.w,seq:x.seq,items:[x]})).concat(groups.map(g=>({w:g.items[0].w,seq:g.items[0].seq,items:g.items})));
      units.sort((a,b)=>W(a.w)<W(b.w)?-1:W(a.w)>W(b.w)?1:a.seq-b.seq);const order=[];units.forEach(u=>order.push(...u.items));
      const PK='rnc_whole_'+bl.name+'_'+blog;const done=new Set(LS.get(PK,[]));const todo=order.filter(x=>!done.has(x.key));
      const nch=groups.reduce((a,g)=>a+g.items.length,0);
      wst.textContent=bl.label+': '+order.length+' posts, en el orden en que se postearon'+(nch?' ('+nch+' en cadena de reblogs)':'')+', '+done.size+' ya publicados aquí, '+todo.length+' por publicar.'+(skipped.dup?' '+skipped.dup+' repetidos omitidos (de cada post repetido queda la versión con más capturas).':'')+(skipped.big?' '+skipped.big+' de más de 30 imágenes omitidos (van por trozos, en cadena).':'')+(skipped.other?' '+skipped.other+' reblogs de posts ajenos fuera.':'')+(skipped.moved?' '+skipped.moved+' que eran de otro blog van en el botón de ese blog.':'');
      if(!todo.length){b.disabled=false;wst.textContent+=' Nada pendiente.';return;}
      const go=$('button',{textContent:'Publicar la siguiente tanda ('+Math.min(25,todo.length)+' de '+todo.length+') en '+blog,style:'display:block;width:100%;background:#ff9a3c;color:#1a120b;border:0;border-radius:12px;padding:13px;font-weight:800;margin:8px 0'});
      const reset=$('button',{textContent:'Empezar de cero en este blog (olvidar lo publicado)',style:bstyle+';font-size:13px'});reset.onclick=()=>{LS.set(PK,[]);groups.forEach(g=>LS.set('rnc_chain_'+g.path+'_'+blog,null));wst.textContent='Progreso borrado. Vuelve a pulsar el botón del blog.';go.remove();reset.remove();b.disabled=false;};
      go.onclick=async()=>{go.disabled=true;let ok=0;const batch=todo.slice(0,25);let uuid=null;
        if(batch.some(x=>x.chain)){const bi=await api('/blog/'+blog+'/info');const BI=bi&&(bi.response||bi);uuid=BI&&BI.blog&&BI.blog.uuid;}
        for(let n=0;n<batch.length;n++){const x=batch[n];wst.textContent='Publicando '+(n+1)+' de '+batch.length+(x.chain?' (en cadena)':'')+'…';
          let ch=null;if(x.chain&&x.gprev){const pv=LS.get('rnc_chain_'+x.path+'_'+blog,null);if(pv&&pv.id&&pv.next===x.i)ch={uuid,prev:pv};else log.textContent+='  (no tengo el post anterior de la cadena: este va suelto)\n';}
          const res=await publishOne(blog,x.html,x.TAGS,x.label,x.key,ch);
          if(res&&res.restart)log.textContent+='  (el post anterior de la cadena ya no existe: empiezo cadena nueva)\n';
          if(res&&res.id){ok++;const d=LS.get(PK,[]);if(!d.includes(x.key))d.push(x.key);LS.set(PK,d);if(x.chain)LS.set('rnc_chain_'+x.path+'_'+blog,{id:String(res.id),key:res.key,next:x.i+1});}else break;}
        const left=order.filter(x=>!new Set(LS.get(PK,[])).has(x.key)).length;
        wst.textContent='Tanda hecha: '+ok+' de '+batch.length+'. Quedan '+left+'.'+(left?' Vuelve a pulsar el botón del blog para la siguiente tanda.':' Blog entero publicado.');go.remove();reset.remove();b.disabled=false;};
      wlist.append(go,reset);};}
})();
let items=[];
try{items=await (await fetch(ARCH+'index.json?'+Date.now())).json();}catch(e){list.append($('p',{textContent:'No pude leer el archivo.'}));}
for(const it of items){
  const b=$('button',{textContent:it.title,style:'display:block;width:100%;text-align:left;background:#3a2412;color:#ffd9b0;border:0;border-radius:10px;padding:12px;margin:0 0 8px;font-weight:700'});
  b.onclick=async()=>{st.textContent='Leyendo '+it.title+'…';
    const pg=await loadPage(it.path);if(!pg){st.textContent='Esa página no tiene posts.';return;}
    const {D,TAGS,labs}=pg;
    showPosts(it,D,TAGS,labs);st.textContent='';
  };
  list.append(b);
}
function showPosts(it,D,TAGS,labs){
  const title=it.title;list.innerHTML='';list.append($('h3',{textContent:title,style:'color:#ffb066;margin:4px 0 8px'}));
  const chk=$('input',{type:'checkbox',checked:!!it.chain});const cl=$('label',{style:'display:flex;gap:8px;align-items:center;margin:0 0 10px;color:#ffb066;font-weight:700'});cl.append(chk,$('span',{textContent:'⛓ En cadena: cada post rebloguea el anterior, desde el marcado en adelante'}));list.append(cl);
  const KEY=()=>'rnc_chain_'+it.path+'_'+sel.value;
  const checks=[];
  D.forEach((d,i)=>{const row=$('label',{style:'display:flex;gap:8px;align-items:flex-start;margin:0 0 8px;font-size:14px'});
    const c=$('input',{type:'checkbox',checked:true});c.dataset.i=i;checks.push(c);
    row.append(c,$('span',{textContent:(labs[i]||('Post '+(i+1)))+'  ·  '+(d.match(/<img /g)||[]).length+' img'}));list.append(row);});
  const pub=$('button',{textContent:'Publicar los marcados (Turbo, hasta 25 seguidos)',style:'display:block;width:100%;background:#ff9a3c;color:#1a120b;border:0;border-radius:12px;padding:15px;font-weight:800;margin:8px 0'});
  const chain={};
  pub.onclick=async()=>{
    const blog=sel.value;
    let picks;
    if(chk.checked){const first=checks.findIndex(c=>c.checked&&!c.disabled);if(first<0){st.textContent='Marca desde cuál empezar.';return;}picks=checks.slice(first).filter(c=>!c.disabled).slice(0,25);}
    else picks=checks.filter(c=>c.checked&&!c.disabled).slice(0,25);
    if(!picks.length){st.textContent='No hay nada marcado.';return;}
    pub.disabled=true;let ok=0;await links();
    let uuid=null;if(chk.checked){const bi=await api('/blog/'+blog+'/info');const BI=bi&&(bi.response||bi);uuid=BI&&BI.blog&&BI.blog.uuid;}
    let prev=null;try{prev=JSON.parse(localStorage.getItem(KEY())||'null');}catch(e){}
    for(let n=0;n<picks.length;n++){
      const i=+picks[n].dataset.i;st.textContent='Publicando '+(n+1)+' de '+picks.length+'…';
      const res=await publishOne(blog,D[i],TAGS,labs[i]||('Post '+(i+1)),it.path+'#'+i,(chk.checked&&prev&&prev.next===i&&uuid)?{uuid,prev}:null);
      if(res&&res.restart){log.textContent+='  (el post anterior de la cadena ya no existe: empiezo cadena nueva)\n';prev=null;}
      if(res&&res.id){ok++;picks[n].checked=false;picks[n].disabled=true;
        if(chk.checked){prev={id:String(res.id),key:res.key,next:i+1};try{localStorage.setItem(KEY(),JSON.stringify(prev));}catch(e){}
          if(checks[i+1]&&!checks[i+1].disabled)checks[i+1].checked=true;}}
      else break;
      log.scrollTop=1e9;
      
    }
    const left=checks.filter(c=>!c.disabled).length-(chk.checked?0:0);
    st.textContent='Tanda hecha: '+ok+' de '+picks.length+'.'+(chk.checked?' La cadena sigue donde lo dejaste: vuelve a pulsar para la siguiente tanda.':'');pub.disabled=false;
  };
  list.append(pub);
}
})();
