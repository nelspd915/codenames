const t="codenames";let e;let n;let s=false;let l=false;const o=typeof window!=="undefined"?window:{};const c=o.document||{head:{}};const i={t:0,l:"",jmp:t=>t(),raf:t=>requestAnimationFrame(t),ael:(t,e,n,s)=>t.addEventListener(e,n,s),rel:(t,e,n,s)=>t.removeEventListener(e,n,s),ce:(t,e)=>new CustomEvent(t,e)};const f=t=>Promise.resolve(t);const r=(()=>{try{new CSSStyleSheet;return typeof(new CSSStyleSheet).replaceSync==="function"}catch(t){}return false})();const u="{visibility:hidden}.hydrated{visibility:inherit}";const a=(t,e="")=>{{return()=>{}}};const d=(t,e)=>{{return()=>{}}};const h=new WeakMap;const p=(t,e,n)=>{let s=at.get(t);if(r&&n){s=s||new CSSStyleSheet;if(typeof s==="string"){s=e}else{s.replaceSync(e)}}else{s=e}at.set(t,s)};const y=(t,e,n,s)=>{let l=m(e);const o=at.get(l);t=t.nodeType===11?t:c;if(o){if(typeof o==="string"){t=t.head||t;let e=h.get(t);let n;if(!e){h.set(t,e=new Set)}if(!e.has(l)){{{n=c.createElement("style");n.innerHTML=o}t.insertBefore(n,t.querySelector("link"))}if(e){e.add(l)}}}else if(!t.adoptedStyleSheets.includes(o)){t.adoptedStyleSheets=[...t.adoptedStyleSheets,o]}}return l};const $=t=>{const e=t.o;const n=t.i;const s=e.t;const l=a("attachStyles",e.u);const o=y(n.shadowRoot?n.shadowRoot:n.getRootNode(),e);if(s&10){n["s-sc"]=o;n.classList.add(o+"-h")}l()};const m=(t,e)=>"sc-"+t.u;const b={};const w=t=>t!=null;const S=t=>{t=typeof t;return t==="object"||t==="function"};const g=(t,e,...n)=>{let s=null;let l=false;let o=false;const c=[];const i=e=>{for(let n=0;n<e.length;n++){s=e[n];if(Array.isArray(s)){i(s)}else if(s!=null&&typeof s!=="boolean"){if(l=typeof t!=="function"&&!S(s)){s=String(s)}if(l&&o){c[c.length-1].h+=s}else{c.push(l?j(null,s):s)}o=l}}};i(n);if(e){{const t=e.className||e.class;if(t){e.class=typeof t!=="object"?t:Object.keys(t).filter((e=>t[e])).join(" ")}}}const f=j(t,null);f.p=e;if(c.length>0){f.$=c}return f};const j=(t,e)=>{const n={t:0,m:t,h:e,S:null,$:null};{n.p=null}return n};const k={};const C=t=>t&&t.m===k;const M=(t,e,n,s,l,c)=>{if(n!==s){let f=it(t,e);let r=e.toLowerCase();if(e==="class"){const e=t.classList;const l=P(n);const o=P(s);e.remove(...l.filter((t=>t&&!o.includes(t))));e.add(...o.filter((t=>t&&!l.includes(t))))}else if(e==="ref"){if(s){s(t)}}else if(!f&&e[0]==="o"&&e[1]==="n"){if(e[2]==="-"){e=e.slice(3)}else if(it(o,r)){e=r.slice(2)}else{e=r[2]+e.slice(3)}if(n){i.rel(t,e,n,false)}if(s){i.ael(t,e,s,false)}}else{const o=S(s);if((f||o&&s!==null)&&!l){try{if(!t.tagName.includes("-")){const l=s==null?"":s;if(e==="list"){f=false}else if(n==null||t[e]!=l){t[e]=l}}else{t[e]=s}}catch(t){}}if(s==null||s===false){if(s!==false||t.getAttribute(e)===""){{t.removeAttribute(e)}}}else if((!f||c&4||l)&&!o){s=s===true?"":s;{t.setAttribute(e,s)}}}}};const O=/\s/;const P=t=>!t?[]:t.split(O);const U=(t,e,n,s)=>{const l=e.S.nodeType===11&&e.S.host?e.S.host:e.S;const o=t&&t.p||b;const c=e.p||b;{for(s in o){if(!(s in c)){M(l,s,o[s],undefined,n,e.t)}}}for(s in c){M(l,s,o[s],c[s],n,e.t)}};const v=(t,n,l,o)=>{const i=n.$[l];let f=0;let r;let u;if(i.h!==null){r=i.S=c.createTextNode(i.h)}else{r=i.S=c.createElement(i.m);{U(null,i,s)}if(w(e)&&r["s-si"]!==e){r.classList.add(r["s-si"]=e)}if(i.$){for(f=0;f<i.$.length;++f){u=v(t,i,f);if(u){r.appendChild(u)}}}}return r};const x=(t,e,s,l,o,c)=>{let i=t;let f;if(i.shadowRoot&&i.tagName===n){i=i.shadowRoot}for(;o<=c;++o){if(l[o]){f=v(null,s,o);if(f){l[o].S=f;i.insertBefore(f,e)}}}};const E=(t,e,n,s,l)=>{for(;e<=n;++e){if(s=t[e]){l=s.S;W(s);l.remove()}}};const L=(t,e,n,s)=>{let l=0;let o=0;let c=e.length-1;let i=e[0];let f=e[c];let r=s.length-1;let u=s[0];let a=s[r];let d;while(l<=c&&o<=r){if(i==null){i=e[++l]}else if(f==null){f=e[--c]}else if(u==null){u=s[++o]}else if(a==null){a=s[--r]}else if(N(i,u)){T(i,u);i=e[++l];u=s[++o]}else if(N(f,a)){T(f,a);f=e[--c];a=s[--r]}else if(N(i,a)){T(i,a);t.insertBefore(i.S,f.S.nextSibling);i=e[++l];a=s[--r]}else if(N(f,u)){T(f,u);t.insertBefore(f.S,i.S);f=e[--c];u=s[++o]}else{{d=v(e&&e[o],n,o);u=s[++o]}if(d){{i.S.parentNode.insertBefore(d,i.S)}}}}if(l>c){x(t,s[r+1]==null?null:s[r+1].S,n,s,o,r)}else if(o>r){E(e,l,c)}};const N=(t,e)=>{if(t.m===e.m){return true}return false};const T=(t,e)=>{const n=e.S=t.S;const l=t.$;const o=e.$;const c=e.m;const i=e.h;if(i===null){{if(c==="slot");else{U(t,e,s)}}if(l!==null&&o!==null){L(n,l,e,o)}else if(o!==null){if(t.h!==null){n.textContent=""}x(n,null,e,o,0,o.length-1)}else if(l!==null){E(l,0,l.length-1)}}else if(t.h!==i){n.data=i}};const W=t=>{{t.p&&t.p.ref&&t.p.ref(null);t.$&&t.$.map(W)}};const A=(t,s)=>{const l=t.i;const o=t.o;const c=t.g||j(null,null);const i=C(s)?s:g(null,null,s);n=l.tagName;if(o.j){i.p=i.p||{};o.j.map((([t,e])=>i.p[e]=l[t]))}i.m=null;i.t|=4;t.g=i;i.S=c.S=l.shadowRoot||l;{e=l["s-sc"]}T(c,i)};const F=(t,e,n)=>{const s=i.ce(e,n);t.dispatchEvent(s);return s};const H=(t,e)=>{if(e&&!t.k&&e["s-p"]){e["s-p"].push(new Promise((e=>t.k=e)))}};const R=(t,e)=>{{t.t|=16}if(t.t&4){t.t|=512;return}H(t,t.C);const n=()=>q(t,e);return bt(n)};const q=(t,e)=>{const n=a("scheduleUpdate",t.o.u);const s=t.M;let l;if(e){{l=B(s,"componentWillLoad")}}n();return D(l,(()=>I(t,s,e)))};const I=async(t,e,n)=>{const s=t.i;const l=a("update",t.o.u);const o=s["s-rc"];if(n){$(t)}const c=a("render",t.o.u);{V(t,e)}if(o){o.map((t=>t()));s["s-rc"]=undefined}c();l();{const e=s["s-p"];const n=()=>_(t);if(e.length===0){n()}else{Promise.all(e).then(n);t.t|=4;e.length=0}}};const V=(t,e,n)=>{try{e=e.render();{t.t&=~16}{t.t|=2}{{{A(t,e)}}}}catch(e){ft(e,t.i)}return null};const _=t=>{const e=t.o.u;const n=t.i;const s=a("postUpdate",e);const l=t.C;if(!(t.t&64)){t.t|=64;{G(n)}s();{t.O(n);if(!l){z()}}}else{s()}{if(t.k){t.k();t.k=undefined}if(t.t&512){mt((()=>R(t,false)))}t.t&=~(4|512)}};const z=e=>{{G(c.documentElement)}mt((()=>F(o,"appload",{detail:{namespace:t}})))};const B=(t,e,n)=>{if(t&&t[e]){try{return t[e](n)}catch(t){ft(t)}}return undefined};const D=(t,e)=>t&&t.then?t.then(e):e();const G=t=>t.classList.add("hydrated");const J=(t,e)=>{if(t!=null&&!S(t)){if(e&4){return t==="false"?false:t===""||!!t}if(e&2){return parseFloat(t)}if(e&1){return String(t)}return t}return t};const K=(t,e)=>lt(t).P.get(e);const Q=(t,e,n,s)=>{const l=lt(t);const o=l.P.get(e);const c=l.t;const i=l.M;n=J(n,s.U[e][0]);const f=Number.isNaN(o)&&Number.isNaN(n);const r=n!==o&&!f;if((!(c&8)||o===undefined)&&r){l.P.set(e,n);if(i){if((c&(2|16))===2){if(i.componentShouldUpdate){if(i.componentShouldUpdate(n,o,e)===false){return}}R(l,false)}}}};const X=(t,e,n)=>{if(e.U){const s=Object.entries(e.U);const l=t.prototype;s.map((([t,[s]])=>{if(s&31||n&2&&s&32){Object.defineProperty(l,t,{get(){return K(this,t)},set(n){Q(this,t,n,e)},configurable:true,enumerable:true})}}));if(n&1){const n=new Map;l.attributeChangedCallback=function(t,e,s){i.jmp((()=>{const e=n.get(t);if(this.hasOwnProperty(e)){s=this[e];delete this[e]}else if(l.hasOwnProperty(e)&&typeof this[e]==="number"&&this[e]==s){return}this[e]=s===null&&typeof this[e]==="boolean"?false:s}))};t.observedAttributes=s.filter((([t,e])=>e[0]&15)).map((([t,s])=>{const l=s[1]||t;n.set(l,t);if(s[0]&512){e.j.push([t,l])}return l}))}}return t};const Y=async(t,e,n,s,l)=>{if((e.t&32)===0){{e.t|=32;l=ut(n);if(l.then){const t=d();l=await l;t()}if(!l.isProxied){X(l,n,2);l.isProxied=true}const t=a("createInstance",n.u);{e.t|=8}try{new l(e)}catch(t){ft(t)}{e.t&=~8}t();Z(e.M)}if(l.style){let t=l.style;const e=m(n);if(!at.has(e)){const s=a("registerStyles",n.u);p(e,t,!!(n.t&1));s()}}}const o=e.C;const c=()=>R(e,true);if(o&&o["s-rc"]){o["s-rc"].push(c)}else{c()}};const Z=t=>{{B(t,"connectedCallback")}};const tt=t=>{if((i.t&1)===0){const e=lt(t);const n=e.o;const s=a("connectedCallback",n.u);if(!(e.t&1)){e.t|=1;{let n=t;while(n=n.parentNode||n.host){if(n["s-p"]){H(e,e.C=n);break}}}if(n.U){Object.entries(n.U).map((([e,[n]])=>{if(n&31&&t.hasOwnProperty(e)){const n=t[e];delete t[e];t[e]=n}}))}{Y(t,e,n)}}else{Z(e.M)}s()}};const et=t=>{if((i.t&1)===0){lt(t)}};const nt=(t,e={})=>{const n=a();const s=[];const l=e.exclude||[];const f=o.customElements;const r=c.head;const d=r.querySelector("meta[charset]");const h=c.createElement("style");const p=[];let y;let $=true;Object.assign(i,e);i.l=new URL(e.resourcesUrl||"./",c.baseURI).href;t.map((t=>{t[1].map((e=>{const n={t:e[0],u:e[1],U:e[2],v:e[3]};{n.U=e[2]}{n.j=[]}const o=n.u;const c=class extends HTMLElement{constructor(t){super(t);t=this;ct(t,n);if(n.t&1){{{t.attachShadow({mode:"open"})}}}}connectedCallback(){if(y){clearTimeout(y);y=null}if($){p.push(this)}else{i.jmp((()=>tt(this)))}}disconnectedCallback(){i.jmp((()=>et(this)))}componentOnReady(){return lt(this).L}};n.N=t[0];if(!l.includes(o)&&!f.get(o)){s.push(o);f.define(o,X(c,n,1))}}))}));{h.innerHTML=s+u;h.setAttribute("data-styles","");r.insertBefore(h,d?d.nextSibling:r.firstChild)}$=false;if(p.length){p.map((t=>t.connectedCallback()))}else{{i.jmp((()=>y=setTimeout(z,30)))}}n()};const st=new WeakMap;const lt=t=>st.get(t);const ot=(t,e)=>st.set(e.M=t,e);const ct=(t,e)=>{const n={t:0,i:t,o:e,P:new Map};{n.L=new Promise((t=>n.O=t));t["s-p"]=[];t["s-rc"]=[]}return st.set(t,n)};const it=(t,e)=>e in t;const ft=(t,e)=>(0,console.error)(t,e);const rt=new Map;const ut=(t,e,n)=>{const s=t.u.replace(/-/g,"_");const l=t.N;const o=rt.get(l);if(o){return o[s]}
/*!__STENCIL_STATIC_IMPORT_SWITCH__*/return import(`./${l}.entry.js${""}`).then((t=>{{rt.set(l,t)}return t[s]}),ft)};const at=new Map;const dt=[];const ht=[];const pt=(t,e)=>n=>{t.push(n);if(!l){l=true;if(e&&i.t&4){mt($t)}else{i.raf($t)}}};const yt=t=>{for(let e=0;e<t.length;e++){try{t[e](performance.now())}catch(t){ft(t)}}t.length=0};const $t=()=>{yt(dt);{yt(ht);if(l=dt.length>0){i.raf($t)}}};const mt=t=>f().then(t);const bt=pt(ht,true);export{k as H,nt as b,g as h,f as p,ot as r};
//# sourceMappingURL=p-f73aa137.js.map