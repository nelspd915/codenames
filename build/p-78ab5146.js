const t="codenames";let e;let n;let s=false;let c=false;const o=typeof window!=="undefined"?window:{};const l=o.document||{head:{}};const i={t:0,o:"",jmp:t=>t(),raf:t=>requestAnimationFrame(t),ael:(t,e,n,s)=>t.addEventListener(e,n,s),rel:(t,e,n,s)=>t.removeEventListener(e,n,s),ce:(t,e)=>new CustomEvent(t,e)};const f=t=>Promise.resolve(t);const r=(()=>{try{new CSSStyleSheet;return typeof(new CSSStyleSheet).replaceSync==="function"}catch(t){}return false})();const u=(t,e,n,s)=>{if(n){n.map((([n,s,c])=>{const o=t;const l=a(e,c);const f=d(n);i.ael(o,s,l,f);(e.l=e.l||[]).push((()=>i.rel(o,s,l,f)))}))}};const a=(t,e)=>n=>{try{{if(t.t&256){t.i[e](n)}else{(t.u=t.u||[]).push([e,n])}}}catch(t){dt(t)}};const d=t=>(t&2)!==0;const h="{visibility:hidden}.hydrated{visibility:inherit}";const p=(t,e="")=>{{return()=>{}}};const y=(t,e)=>{{return()=>{}}};const $=new WeakMap;const m=(t,e,n)=>{let s=yt.get(t);if(r&&n){s=s||new CSSStyleSheet;if(typeof s==="string"){s=e}else{s.replaceSync(e)}}else{s=e}yt.set(t,s)};const b=(t,e,n,s)=>{let c=S(e);const o=yt.get(c);t=t.nodeType===11?t:l;if(o){if(typeof o==="string"){t=t.head||t;let e=$.get(t);let n;if(!e){$.set(t,e=new Set)}if(!e.has(c)){{{n=l.createElement("style");n.innerHTML=o}t.insertBefore(n,t.querySelector("link"))}if(e){e.add(c)}}}else if(!t.adoptedStyleSheets.includes(o)){t.adoptedStyleSheets=[...t.adoptedStyleSheets,o]}}return c};const w=t=>{const e=t.h;const n=t.p;const s=e.t;const c=p("attachStyles",e.$);const o=b(n.shadowRoot?n.shadowRoot:n.getRootNode(),e);if(s&10){n["s-sc"]=o;n.classList.add(o+"-h")}c()};const S=(t,e)=>"sc-"+t.$;const g={};const j=t=>t!=null;const k=t=>{t=typeof t;return t==="object"||t==="function"};const C=(t,e,...n)=>{let s=null;let c=false;let o=false;const l=[];const i=e=>{for(let n=0;n<e.length;n++){s=e[n];if(Array.isArray(s)){i(s)}else if(s!=null&&typeof s!=="boolean"){if(c=typeof t!=="function"&&!k(s)){s=String(s)}if(c&&o){l[l.length-1].m+=s}else{l.push(c?M(null,s):s)}o=c}}};i(n);if(e){{const t=e.className||e.class;if(t){e.class=typeof t!=="object"?t:Object.keys(t).filter((e=>t[e])).join(" ")}}}const f=M(t,null);f.S=e;if(l.length>0){f.g=l}return f};const M=(t,e)=>{const n={t:0,j:t,m:e,k:null,g:null};{n.S=null}return n};const O={};const P=t=>t&&t.j===O;const U=(t,e,n,s,c,l)=>{if(n!==s){let f=at(t,e);let r=e.toLowerCase();if(e==="class"){const e=t.classList;const c=x(n);const o=x(s);e.remove(...c.filter((t=>t&&!o.includes(t))));e.add(...o.filter((t=>t&&!c.includes(t))))}else if(!f&&e[0]==="o"&&e[1]==="n"){if(e[2]==="-"){e=e.slice(3)}else if(at(o,r)){e=r.slice(2)}else{e=r[2]+e.slice(3)}if(n){i.rel(t,e,n,false)}if(s){i.ael(t,e,s,false)}}else{const o=k(s);if((f||o&&s!==null)&&!c){try{if(!t.tagName.includes("-")){const c=s==null?"":s;if(e==="list"){f=false}else if(n==null||t[e]!=c){t[e]=c}}else{t[e]=s}}catch(t){}}if(s==null||s===false){if(s!==false||t.getAttribute(e)===""){{t.removeAttribute(e)}}}else if((!f||l&4||c)&&!o){s=s===true?"":s;{t.setAttribute(e,s)}}}}};const v=/\s/;const x=t=>!t?[]:t.split(v);const E=(t,e,n,s)=>{const c=e.k.nodeType===11&&e.k.host?e.k.host:e.k;const o=t&&t.S||g;const l=e.S||g;{for(s in o){if(!(s in l)){U(c,s,o[s],undefined,n,e.t)}}}for(s in l){U(c,s,o[s],l[s],n,e.t)}};const N=(t,n,c,o)=>{const i=n.g[c];let f=0;let r;let u;if(i.m!==null){r=i.k=l.createTextNode(i.m)}else{r=i.k=l.createElement(i.j);{E(null,i,s)}if(j(e)&&r["s-si"]!==e){r.classList.add(r["s-si"]=e)}if(i.g){for(f=0;f<i.g.length;++f){u=N(t,i,f);if(u){r.appendChild(u)}}}}return r};const T=(t,e,s,c,o,l)=>{let i=t;let f;if(i.shadowRoot&&i.tagName===n){i=i.shadowRoot}for(;o<=l;++o){if(c[o]){f=N(null,s,o);if(f){c[o].k=f;i.insertBefore(f,e)}}}};const A=(t,e,n,s,c)=>{for(;e<=n;++e){if(s=t[e]){c=s.k;c.remove()}}};const F=(t,e,n,s)=>{let c=0;let o=0;let l=e.length-1;let i=e[0];let f=e[l];let r=s.length-1;let u=s[0];let a=s[r];let d;while(c<=l&&o<=r){if(i==null){i=e[++c]}else if(f==null){f=e[--l]}else if(u==null){u=s[++o]}else if(a==null){a=s[--r]}else if(H(i,u)){L(i,u);i=e[++c];u=s[++o]}else if(H(f,a)){L(f,a);f=e[--l];a=s[--r]}else if(H(i,a)){L(i,a);t.insertBefore(i.k,f.k.nextSibling);i=e[++c];a=s[--r]}else if(H(f,u)){L(f,u);t.insertBefore(f.k,i.k);f=e[--l];u=s[++o]}else{{d=N(e&&e[o],n,o);u=s[++o]}if(d){{i.k.parentNode.insertBefore(d,i.k)}}}}if(c>l){T(t,s[r+1]==null?null:s[r+1].k,n,s,o,r)}else if(o>r){A(e,c,l)}};const H=(t,e)=>{if(t.j===e.j){return true}return false};const L=(t,e)=>{const n=e.k=t.k;const c=t.g;const o=e.g;const l=e.m;if(l===null){{{E(t,e,s)}}if(c!==null&&o!==null){F(n,c,e,o)}else if(o!==null){if(t.m!==null){n.textContent=""}T(n,null,e,o,0,o.length-1)}else if(c!==null){A(c,0,c.length-1)}}else if(t.m!==l){n.data=l}};const R=(t,s)=>{const c=t.p;const o=t.C||M(null,null);const l=P(s)?s:C(null,null,s);n=c.tagName;l.j=null;l.t|=4;t.C=l;l.k=o.k=c.shadowRoot||c;{e=c["s-sc"]}L(o,l)};const W=t=>ft(t).p;const q=(t,e,n)=>{const s=W(t);return{emit:t=>I(s,e,{bubbles:!!(n&4),composed:!!(n&2),cancelable:!!(n&1),detail:t})}};const I=(t,e,n)=>{const s=i.ce(e,n);t.dispatchEvent(s);return s};const V=(t,e)=>{if(e&&!t.M&&e["s-p"]){e["s-p"].push(new Promise((e=>t.M=e)))}};const _=(t,e)=>{{t.t|=16}if(t.t&4){t.t|=512;return}V(t,t.O);const n=()=>z(t,e);return jt(n)};const z=(t,e)=>{const n=p("scheduleUpdate",t.h.$);const s=t.i;let c;if(e){{t.t|=256;if(t.u){t.u.map((([t,e])=>K(s,t,e)));t.u=null}}}n();return Q(c,(()=>B(t,s,e)))};const B=async(t,e,n)=>{const s=t.p;const c=p("update",t.h.$);const o=s["s-rc"];if(n){w(t)}const l=p("render",t.h.$);{D(t,e)}if(o){o.map((t=>t()));s["s-rc"]=undefined}l();c();{const e=s["s-p"];const n=()=>G(t);if(e.length===0){n()}else{Promise.all(e).then(n);t.t|=4;e.length=0}}};const D=(t,e,n)=>{try{e=e.render();{t.t&=~16}{t.t|=2}{{{R(t,e)}}}}catch(e){dt(e,t.p)}return null};const G=t=>{const e=t.h.$;const n=t.p;const s=p("postUpdate",e);const c=t.O;if(!(t.t&64)){t.t|=64;{X(n)}s();{t.P(n);if(!c){J()}}}else{s()}{if(t.M){t.M();t.M=undefined}if(t.t&512){gt((()=>_(t,false)))}t.t&=~(4|512)}};const J=e=>{{X(l.documentElement)}gt((()=>I(o,"appload",{detail:{namespace:t}})))};const K=(t,e,n)=>{if(t&&t[e]){try{return t[e](n)}catch(t){dt(t)}}return undefined};const Q=(t,e)=>t&&t.then?t.then(e):e();const X=t=>t.classList.add("hydrated");const Y=(t,e)=>{if(t!=null&&!k(t)){if(e&4){return t==="false"?false:t===""||!!t}if(e&2){return parseFloat(t)}if(e&1){return String(t)}return t}return t};const Z=(t,e)=>ft(t).U.get(e);const tt=(t,e,n,s)=>{const c=ft(t);const o=c.U.get(e);const l=c.t;const i=c.i;n=Y(n,s.v[e][0]);const f=Number.isNaN(o)&&Number.isNaN(n);const r=n!==o&&!f;if((!(l&8)||o===undefined)&&r){c.U.set(e,n);if(i){if((l&(2|16))===2){_(c,false)}}}};const et=(t,e,n)=>{if(e.v){const s=Object.entries(e.v);const c=t.prototype;s.map((([t,[s]])=>{if(s&31||n&2&&s&32){Object.defineProperty(c,t,{get(){return Z(this,t)},set(n){tt(this,t,n,e)},configurable:true,enumerable:true})}}));if(n&1){const e=new Map;c.attributeChangedCallback=function(t,n,s){i.jmp((()=>{const n=e.get(t);if(this.hasOwnProperty(n)){s=this[n];delete this[n]}else if(c.hasOwnProperty(n)&&typeof this[n]==="number"&&this[n]==s){return}this[n]=s===null&&typeof this[n]==="boolean"?false:s}))};t.observedAttributes=s.filter((([t,e])=>e[0]&15)).map((([t,n])=>{const s=n[1]||t;e.set(s,t);return s}))}}return t};const nt=async(t,e,n,s,c)=>{if((e.t&32)===0){{e.t|=32;c=pt(n);if(c.then){const t=y();c=await c;t()}if(!c.isProxied){et(c,n,2);c.isProxied=true}const t=p("createInstance",n.$);{e.t|=8}try{new c(e)}catch(t){dt(t)}{e.t&=~8}t();st(e.i)}if(c.style){let t=c.style;const e=S(n);if(!yt.has(e)){const s=p("registerStyles",n.$);m(e,t,!!(n.t&1));s()}}}const o=e.O;const l=()=>_(e,true);if(o&&o["s-rc"]){o["s-rc"].push(l)}else{l()}};const st=t=>{{K(t,"connectedCallback")}};const ct=t=>{if((i.t&1)===0){const e=ft(t);const n=e.h;const s=p("connectedCallback",n.$);if(!(e.t&1)){e.t|=1;{let n=t;while(n=n.parentNode||n.host){if(n["s-p"]){V(e,e.O=n);break}}}if(n.v){Object.entries(n.v).map((([e,[n]])=>{if(n&31&&t.hasOwnProperty(e)){const n=t[e];delete t[e];t[e]=n}}))}{nt(t,e,n)}}else{u(t,e,n.N);st(e.i)}s()}};const ot=t=>{if((i.t&1)===0){const e=ft(t);{if(e.l){e.l.map((t=>t()));e.l=undefined}}}};const lt=(t,e={})=>{const n=p();const s=[];const c=e.exclude||[];const f=o.customElements;const r=l.head;const u=r.querySelector("meta[charset]");const a=l.createElement("style");const d=[];let y;let $=true;Object.assign(i,e);i.o=new URL(e.resourcesUrl||"./",l.baseURI).href;t.map((t=>{t[1].map((e=>{const n={t:e[0],$:e[1],v:e[2],N:e[3]};{n.v=e[2]}{n.N=e[3]}const o=n.$;const l=class extends HTMLElement{constructor(t){super(t);t=this;ut(t,n);if(n.t&1){{{t.attachShadow({mode:"open"})}}}}connectedCallback(){if(y){clearTimeout(y);y=null}if($){d.push(this)}else{i.jmp((()=>ct(this)))}}disconnectedCallback(){i.jmp((()=>ot(this)))}componentOnReady(){return ft(this).T}};n.A=t[0];if(!c.includes(o)&&!f.get(o)){s.push(o);f.define(o,et(l,n,1))}}))}));{a.innerHTML=s+h;a.setAttribute("data-styles","");r.insertBefore(a,u?u.nextSibling:r.firstChild)}$=false;if(d.length){d.map((t=>t.connectedCallback()))}else{{i.jmp((()=>y=setTimeout(J,30)))}}n()};const it=new WeakMap;const ft=t=>it.get(t);const rt=(t,e)=>it.set(e.i=t,e);const ut=(t,e)=>{const n={t:0,p:t,h:e,U:new Map};{n.T=new Promise((t=>n.P=t));t["s-p"]=[];t["s-rc"]=[]}u(t,n,e.N);return it.set(t,n)};const at=(t,e)=>e in t;const dt=(t,e)=>(0,console.error)(t,e);const ht=new Map;const pt=(t,e,n)=>{const s=t.$.replace(/-/g,"_");const c=t.A;const o=ht.get(c);if(o){return o[s]}
/*!__STENCIL_STATIC_IMPORT_SWITCH__*/return import(`./${c}.entry.js${""}`).then((t=>{{ht.set(c,t)}return t[s]}),dt)};const yt=new Map;const $t=[];const mt=[];const bt=(t,e)=>n=>{t.push(n);if(!c){c=true;if(e&&i.t&4){gt(St)}else{i.raf(St)}}};const wt=t=>{for(let e=0;e<t.length;e++){try{t[e](performance.now())}catch(t){dt(t)}}t.length=0};const St=()=>{wt($t);{wt(mt);if(c=$t.length>0){i.raf(St)}}};const gt=t=>f().then(t);const jt=bt(mt,true);export{O as H,lt as b,q as c,C as h,f as p,rt as r};
//# sourceMappingURL=p-78ab5146.js.map