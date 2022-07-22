import{r as t,h as e,H as s,c as i}from"./p-78ab5146.js";import{C as n,a as r}from"./p-9f42e523.js";const o=Object.create(null);o["open"]="0";o["close"]="1";o["ping"]="2";o["pong"]="3";o["message"]="4";o["upgrade"]="5";o["noop"]="6";const h=Object.create(null);Object.keys(o).forEach((t=>{h[o[t]]=t}));const c={type:"error",data:"parser error"};const f=typeof Blob==="function"||typeof Blob!=="undefined"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]";const a=typeof ArrayBuffer==="function";const u=t=>typeof ArrayBuffer.isView==="function"?ArrayBuffer.isView(t):t&&t.buffer instanceof ArrayBuffer;const l=({type:t,data:e},s,i)=>{if(f&&e instanceof Blob){if(s){return i(e)}else{return d(e,i)}}else if(a&&(e instanceof ArrayBuffer||u(e))){if(s){return i(e)}else{return d(new Blob([e]),i)}}return i(o[t]+(e||""))};const d=(t,e)=>{const s=new FileReader;s.onload=function(){const t=s.result.split(",")[1];e("b"+t)};return s.readAsDataURL(t)};const p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";const y=typeof Uint8Array==="undefined"?[]:new Uint8Array(256);for(let t=0;t<p.length;t++){y[p.charCodeAt(t)]=t}const g=t=>{let e=t.length*.75,s=t.length,i,n=0,r,o,h,c;if(t[t.length-1]==="="){e--;if(t[t.length-2]==="="){e--}}const f=new ArrayBuffer(e),a=new Uint8Array(f);for(i=0;i<s;i+=4){r=y[t.charCodeAt(i)];o=y[t.charCodeAt(i+1)];h=y[t.charCodeAt(i+2)];c=y[t.charCodeAt(i+3)];a[n++]=r<<2|o>>4;a[n++]=(o&15)<<4|h>>2;a[n++]=(h&3)<<6|c&63}return f};const b=typeof ArrayBuffer==="function";const m=(t,e)=>{if(typeof t!=="string"){return{type:"message",data:k(t,e)}}const s=t.charAt(0);if(s==="b"){return{type:"message",data:w(t.substring(1),e)}}const i=h[s];if(!i){return c}return t.length>1?{type:h[s],data:t.substring(1)}:{type:h[s]}};const w=(t,e)=>{if(b){const s=g(t);return k(s,e)}else{return{base64:true,data:t}}};const k=(t,e)=>{switch(e){case"blob":return t instanceof ArrayBuffer?new Blob([t]):t;case"arraybuffer":default:return t}};const v=String.fromCharCode(30);const E=(t,e)=>{const s=t.length;const i=new Array(s);let n=0;t.forEach(((t,r)=>{l(t,false,(t=>{i[r]=t;if(++n===s){e(i.join(v))}}))}))};const A=(t,e)=>{const s=t.split(v);const i=[];for(let t=0;t<s.length;t++){const n=m(s[t],e);i.push(n);if(n.type==="error"){break}}return i};const O=4;function x(t){if(t)return j(t)}function j(t){for(var e in x.prototype){t[e]=x.prototype[e]}return t}x.prototype.on=x.prototype.addEventListener=function(t,e){this._callbacks=this._callbacks||{};(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e);return this};x.prototype.once=function(t,e){function s(){this.off(t,s);e.apply(this,arguments)}s.fn=e;this.on(t,s);return this};x.prototype.off=x.prototype.removeListener=x.prototype.removeAllListeners=x.prototype.removeEventListener=function(t,e){this._callbacks=this._callbacks||{};if(0==arguments.length){this._callbacks={};return this}var s=this._callbacks["$"+t];if(!s)return this;if(1==arguments.length){delete this._callbacks["$"+t];return this}var i;for(var n=0;n<s.length;n++){i=s[n];if(i===e||i.fn===e){s.splice(n,1);break}}if(s.length===0){delete this._callbacks["$"+t]}return this};x.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=new Array(arguments.length-1),s=this._callbacks["$"+t];for(var i=1;i<arguments.length;i++){e[i-1]=arguments[i]}if(s){s=s.slice(0);for(var i=0,n=s.length;i<n;++i){s[i].apply(this,e)}}return this};x.prototype.emitReserved=x.prototype.emit;x.prototype.listeners=function(t){this._callbacks=this._callbacks||{};return this._callbacks["$"+t]||[]};x.prototype.hasListeners=function(t){return!!this.listeners(t).length};const C=(()=>{if(typeof self!=="undefined"){return self}else if(typeof window!=="undefined"){return window}else{return Function("return this")()}})();function B(t,...e){return e.reduce(((e,s)=>{if(t.hasOwnProperty(s)){e[s]=t[s]}return e}),{})}const N=setTimeout;const T=clearTimeout;function _(t,e){if(e.useNativeTimers){t.setTimeoutFn=N.bind(C);t.clearTimeoutFn=T.bind(C)}else{t.setTimeoutFn=setTimeout.bind(C);t.clearTimeoutFn=clearTimeout.bind(C)}}const L=1.33;function M(t){if(typeof t==="string"){return P(t)}return Math.ceil((t.byteLength||t.size)*L)}function P(t){let e=0,s=0;for(let i=0,n=t.length;i<n;i++){e=t.charCodeAt(i);if(e<128){s+=1}else if(e<2048){s+=2}else if(e<55296||e>=57344){s+=3}else{i++;s+=4}}return s}class R extends Error{constructor(t,e,s){super(t);this.description=e;this.context=s;this.type="TransportError"}}class U extends x{constructor(t){super();this.writable=false;_(this,t);this.opts=t;this.query=t.query;this.readyState="";this.socket=t.socket}onError(t,e,s){super.emitReserved("error",new R(t,e,s));return this}open(){if("closed"===this.readyState||""===this.readyState){this.readyState="opening";this.doOpen()}return this}close(){if("opening"===this.readyState||"open"===this.readyState){this.doClose();this.onClose()}return this}send(t){if("open"===this.readyState){this.write(t)}}onOpen(){this.readyState="open";this.writable=true;super.emitReserved("open")}onData(t){const e=m(t,this.socket.binaryType);this.onPacket(e)}onPacket(t){super.emitReserved("packet",t)}onClose(t){this.readyState="closed";super.emitReserved("close",t)}}const D="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),I=64;let S=0,$;function F(t){let e="";do{e=D[t%I]+e;t=Math.floor(t/I)}while(t>0);return e}function H(){const t=F(+new Date);if(t!==$)return S=0,$=t;return t+"."+F(S++)}function q(t){let e="";for(let s in t){if(t.hasOwnProperty(s)){if(e.length)e+="&";e+=encodeURIComponent(s)+"="+encodeURIComponent(t[s])}}return e}function X(t){let e={};let s=t.split("&");for(let t=0,i=s.length;t<i;t++){let i=s[t].split("=");e[decodeURIComponent(i[0])]=decodeURIComponent(i[1])}return e}let z=false;try{z=typeof XMLHttpRequest!=="undefined"&&"withCredentials"in new XMLHttpRequest}catch(t){}const V=z;function J(t){const e=t.xdomain;try{if("undefined"!==typeof XMLHttpRequest&&(!e||V)){return new XMLHttpRequest}}catch(t){}if(!e){try{return new(C[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")}catch(t){}}}function K(){}const W=function(){const t=new J({xdomain:false});return null!=t.responseType}();class Y extends U{constructor(t){super(t);this.polling=false;if(typeof location!=="undefined"){const e="https:"===location.protocol;let s=location.port;if(!s){s=e?"443":"80"}this.xd=typeof location!=="undefined"&&t.hostname!==location.hostname||s!==t.port;this.xs=t.secure!==e}const e=t&&t.forceBase64;this.supportsBinary=W&&!e}get name(){return"polling"}doOpen(){this.poll()}pause(t){this.readyState="pausing";const e=()=>{this.readyState="paused";t()};if(this.polling||!this.writable){let t=0;if(this.polling){t++;this.once("pollComplete",(function(){--t||e()}))}if(!this.writable){t++;this.once("drain",(function(){--t||e()}))}}else{e()}}poll(){this.polling=true;this.doPoll();this.emitReserved("poll")}onData(t){const e=t=>{if("opening"===this.readyState&&t.type==="open"){this.onOpen()}if("close"===t.type){this.onClose({description:"transport closed by the server"});return false}this.onPacket(t)};A(t,this.socket.binaryType).forEach(e);if("closed"!==this.readyState){this.polling=false;this.emitReserved("pollComplete");if("open"===this.readyState){this.poll()}}}doClose(){const t=()=>{this.write([{type:"close"}])};if("open"===this.readyState){t()}else{this.once("open",t)}}write(t){this.writable=false;E(t,(t=>{this.doWrite(t,(()=>{this.writable=true;this.emitReserved("drain")}))}))}uri(){let t=this.query||{};const e=this.opts.secure?"https":"http";let s="";if(false!==this.opts.timestampRequests){t[this.opts.timestampParam]=H()}if(!this.supportsBinary&&!t.sid){t.b64=1}if(this.opts.port&&("https"===e&&Number(this.opts.port)!==443||"http"===e&&Number(this.opts.port)!==80)){s=":"+this.opts.port}const i=q(t);const n=this.opts.hostname.indexOf(":")!==-1;return e+"://"+(n?"["+this.opts.hostname+"]":this.opts.hostname)+s+this.opts.path+(i.length?"?"+i:"")}request(t={}){Object.assign(t,{xd:this.xd,xs:this.xs},this.opts);return new G(this.uri(),t)}doWrite(t,e){const s=this.request({method:"POST",data:t});s.on("success",e);s.on("error",((t,e)=>{this.onError("xhr post error",t,e)}))}doPoll(){const t=this.request();t.on("data",this.onData.bind(this));t.on("error",((t,e)=>{this.onError("xhr poll error",t,e)}));this.pollXhr=t}}class G extends x{constructor(t,e){super();_(this,e);this.opts=e;this.method=e.method||"GET";this.uri=t;this.async=false!==e.async;this.data=undefined!==e.data?e.data:null;this.create()}create(){const t=B(this.opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");t.xdomain=!!this.opts.xd;t.xscheme=!!this.opts.xs;const e=this.xhr=new J(t);try{e.open(this.method,this.uri,this.async);try{if(this.opts.extraHeaders){e.setDisableHeaderCheck&&e.setDisableHeaderCheck(true);for(let t in this.opts.extraHeaders){if(this.opts.extraHeaders.hasOwnProperty(t)){e.setRequestHeader(t,this.opts.extraHeaders[t])}}}}catch(t){}if("POST"===this.method){try{e.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch(t){}}try{e.setRequestHeader("Accept","*/*")}catch(t){}if("withCredentials"in e){e.withCredentials=this.opts.withCredentials}if(this.opts.requestTimeout){e.timeout=this.opts.requestTimeout}e.onreadystatechange=()=>{if(4!==e.readyState)return;if(200===e.status||1223===e.status){this.onLoad()}else{this.setTimeoutFn((()=>{this.onError(typeof e.status==="number"?e.status:0)}),0)}};e.send(this.data)}catch(t){this.setTimeoutFn((()=>{this.onError(t)}),0);return}if(typeof document!=="undefined"){this.index=G.requestsCount++;G.requests[this.index]=this}}onError(t){this.emitReserved("error",t,this.xhr);this.cleanup(true)}cleanup(t){if("undefined"===typeof this.xhr||null===this.xhr){return}this.xhr.onreadystatechange=K;if(t){try{this.xhr.abort()}catch(t){}}if(typeof document!=="undefined"){delete G.requests[this.index]}this.xhr=null}onLoad(){const t=this.xhr.responseText;if(t!==null){this.emitReserved("data",t);this.emitReserved("success");this.cleanup()}}abort(){this.cleanup()}}G.requestsCount=0;G.requests={};if(typeof document!=="undefined"){if(typeof attachEvent==="function"){attachEvent("onunload",Q)}else if(typeof addEventListener==="function"){const t="onpagehide"in C?"pagehide":"unload";addEventListener(t,Q,false)}}function Q(){for(let t in G.requests){if(G.requests.hasOwnProperty(t)){G.requests[t].abort()}}}const Z=(()=>{const t=typeof Promise==="function"&&typeof Promise.resolve==="function";if(t){return t=>Promise.resolve().then(t)}else{return(t,e)=>e(t,0)}})();const tt=C.WebSocket||C.MozWebSocket;const et="arraybuffer";const st=typeof navigator!=="undefined"&&typeof navigator.product==="string"&&navigator.product.toLowerCase()==="reactnative";class it extends U{constructor(t){super(t);this.supportsBinary=!t.forceBase64}get name(){return"websocket"}doOpen(){if(!this.check()){return}const t=this.uri();const e=this.opts.protocols;const s=st?{}:B(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");if(this.opts.extraHeaders){s.headers=this.opts.extraHeaders}try{this.ws=!st?e?new tt(t,e):new tt(t):new tt(t,e,s)}catch(t){return this.emitReserved("error",t)}this.ws.binaryType=this.socket.binaryType||et;this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{if(this.opts.autoUnref){this.ws._socket.unref()}this.onOpen()};this.ws.onclose=t=>this.onClose({description:"websocket connection closed",context:t});this.ws.onmessage=t=>this.onData(t.data);this.ws.onerror=t=>this.onError("websocket error",t)}write(t){this.writable=false;for(let e=0;e<t.length;e++){const s=t[e];const i=e===t.length-1;l(s,this.supportsBinary,(t=>{try{{this.ws.send(t)}}catch(t){}if(i){Z((()=>{this.writable=true;this.emitReserved("drain")}),this.setTimeoutFn)}}))}}doClose(){if(typeof this.ws!=="undefined"){this.ws.close();this.ws=null}}uri(){let t=this.query||{};const e=this.opts.secure?"wss":"ws";let s="";if(this.opts.port&&("wss"===e&&Number(this.opts.port)!==443||"ws"===e&&Number(this.opts.port)!==80)){s=":"+this.opts.port}if(this.opts.timestampRequests){t[this.opts.timestampParam]=H()}if(!this.supportsBinary){t.b64=1}const i=q(t);const n=this.opts.hostname.indexOf(":")!==-1;return e+"://"+(n?"["+this.opts.hostname+"]":this.opts.hostname)+s+this.opts.path+(i.length?"?"+i:"")}check(){return!!tt}}const nt={websocket:it,polling:Y};const rt=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;const ot=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function ht(t){const e=t,s=t.indexOf("["),i=t.indexOf("]");if(s!=-1&&i!=-1){t=t.substring(0,s)+t.substring(s,i).replace(/:/g,";")+t.substring(i,t.length)}let n=rt.exec(t||""),r={},o=14;while(o--){r[ot[o]]=n[o]||""}if(s!=-1&&i!=-1){r.source=e;r.host=r.host.substring(1,r.host.length-1).replace(/;/g,":");r.authority=r.authority.replace("[","").replace("]","").replace(/;/g,":");r.ipv6uri=true}r.pathNames=ct(r,r["path"]);r.queryKey=ft(r,r["query"]);return r}function ct(t,e){const s=/\/{2,9}/g,i=e.replace(s,"/").split("/");if(e.substr(0,1)=="/"||e.length===0){i.splice(0,1)}if(e.substr(e.length-1,1)=="/"){i.splice(i.length-1,1)}return i}function ft(t,e){const s={};e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,(function(t,e,i){if(e){s[e]=i}}));return s}class at extends x{constructor(t,e={}){super();if(t&&"object"===typeof t){e=t;t=null}if(t){t=ht(t);e.hostname=t.host;e.secure=t.protocol==="https"||t.protocol==="wss";e.port=t.port;if(t.query)e.query=t.query}else if(e.host){e.hostname=ht(e.host).host}_(this,e);this.secure=null!=e.secure?e.secure:typeof location!=="undefined"&&"https:"===location.protocol;if(e.hostname&&!e.port){e.port=this.secure?"443":"80"}this.hostname=e.hostname||(typeof location!=="undefined"?location.hostname:"localhost");this.port=e.port||(typeof location!=="undefined"&&location.port?location.port:this.secure?"443":"80");this.transports=e.transports||["polling","websocket"];this.readyState="";this.writeBuffer=[];this.prevBufferLen=0;this.opts=Object.assign({path:"/engine.io",agent:false,withCredentials:false,upgrade:true,timestampParam:"t",rememberUpgrade:false,rejectUnauthorized:true,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:true},e);this.opts.path=this.opts.path.replace(/\/$/,"")+"/";if(typeof this.opts.query==="string"){this.opts.query=X(this.opts.query)}this.id=null;this.upgrades=null;this.pingInterval=null;this.pingTimeout=null;this.pingTimeoutTimer=null;if(typeof addEventListener==="function"){if(this.opts.closeOnBeforeunload){addEventListener("beforeunload",(()=>{if(this.transport){this.transport.removeAllListeners();this.transport.close()}}),false)}if(this.hostname!=="localhost"){this.offlineEventListener=()=>{this.onClose("transport close",{description:"network connection lost"})};addEventListener("offline",this.offlineEventListener,false)}}this.open()}createTransport(t){const e=Object.assign({},this.opts.query);e.EIO=O;e.transport=t;if(this.id)e.sid=this.id;const s=Object.assign({},this.opts.transportOptions[t],this.opts,{query:e,socket:this,hostname:this.hostname,secure:this.secure,port:this.port});return new nt[t](s)}open(){let t;if(this.opts.rememberUpgrade&&at.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1){t="websocket"}else if(0===this.transports.length){this.setTimeoutFn((()=>{this.emitReserved("error","No transports available")}),0);return}else{t=this.transports[0]}this.readyState="opening";try{t=this.createTransport(t)}catch(t){this.transports.shift();this.open();return}t.open();this.setTransport(t)}setTransport(t){if(this.transport){this.transport.removeAllListeners()}this.transport=t;t.on("drain",this.onDrain.bind(this)).on("packet",this.onPacket.bind(this)).on("error",this.onError.bind(this)).on("close",(t=>this.onClose("transport close",t)))}probe(t){let e=this.createTransport(t);let s=false;at.priorWebsocketSuccess=false;const i=()=>{if(s)return;e.send([{type:"ping",data:"probe"}]);e.once("packet",(t=>{if(s)return;if("pong"===t.type&&"probe"===t.data){this.upgrading=true;this.emitReserved("upgrading",e);if(!e)return;at.priorWebsocketSuccess="websocket"===e.name;this.transport.pause((()=>{if(s)return;if("closed"===this.readyState)return;f();this.setTransport(e);e.send([{type:"upgrade"}]);this.emitReserved("upgrade",e);e=null;this.upgrading=false;this.flush()}))}else{const t=new Error("probe error");t.transport=e.name;this.emitReserved("upgradeError",t)}}))};function n(){if(s)return;s=true;f();e.close();e=null}const r=t=>{const s=new Error("probe error: "+t);s.transport=e.name;n();this.emitReserved("upgradeError",s)};function o(){r("transport closed")}function h(){r("socket closed")}function c(t){if(e&&t.name!==e.name){n()}}const f=()=>{e.removeListener("open",i);e.removeListener("error",r);e.removeListener("close",o);this.off("close",h);this.off("upgrading",c)};e.once("open",i);e.once("error",r);e.once("close",o);this.once("close",h);this.once("upgrading",c);e.open()}onOpen(){this.readyState="open";at.priorWebsocketSuccess="websocket"===this.transport.name;this.emitReserved("open");this.flush();if("open"===this.readyState&&this.opts.upgrade&&this.transport.pause){let t=0;const e=this.upgrades.length;for(;t<e;t++){this.probe(this.upgrades[t])}}}onPacket(t){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState){this.emitReserved("packet",t);this.emitReserved("heartbeat");switch(t.type){case"open":this.onHandshake(JSON.parse(t.data));break;case"ping":this.resetPingTimeout();this.sendPacket("pong");this.emitReserved("ping");this.emitReserved("pong");break;case"error":const e=new Error("server error");e.code=t.data;this.onError(e);break;case"message":this.emitReserved("data",t.data);this.emitReserved("message",t.data);break}}}onHandshake(t){this.emitReserved("handshake",t);this.id=t.sid;this.transport.query.sid=t.sid;this.upgrades=this.filterUpgrades(t.upgrades);this.pingInterval=t.pingInterval;this.pingTimeout=t.pingTimeout;this.maxPayload=t.maxPayload;this.onOpen();if("closed"===this.readyState)return;this.resetPingTimeout()}resetPingTimeout(){this.clearTimeoutFn(this.pingTimeoutTimer);this.pingTimeoutTimer=this.setTimeoutFn((()=>{this.onClose("ping timeout")}),this.pingInterval+this.pingTimeout);if(this.opts.autoUnref){this.pingTimeoutTimer.unref()}}onDrain(){this.writeBuffer.splice(0,this.prevBufferLen);this.prevBufferLen=0;if(0===this.writeBuffer.length){this.emitReserved("drain")}else{this.flush()}}flush(){if("closed"!==this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const t=this.getWritablePackets();this.transport.send(t);this.prevBufferLen=t.length;this.emitReserved("flush")}}getWritablePackets(){const t=this.maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1;if(!t){return this.writeBuffer}let e=1;for(let t=0;t<this.writeBuffer.length;t++){const s=this.writeBuffer[t].data;if(s){e+=M(s)}if(t>0&&e>this.maxPayload){return this.writeBuffer.slice(0,t)}e+=2}return this.writeBuffer}write(t,e,s){this.sendPacket("message",t,e,s);return this}send(t,e,s){this.sendPacket("message",t,e,s);return this}sendPacket(t,e,s,i){if("function"===typeof e){i=e;e=undefined}if("function"===typeof s){i=s;s=null}if("closing"===this.readyState||"closed"===this.readyState){return}s=s||{};s.compress=false!==s.compress;const n={type:t,data:e,options:s};this.emitReserved("packetCreate",n);this.writeBuffer.push(n);if(i)this.once("flush",i);this.flush()}close(){const t=()=>{this.onClose("forced close");this.transport.close()};const e=()=>{this.off("upgrade",e);this.off("upgradeError",e);t()};const s=()=>{this.once("upgrade",e);this.once("upgradeError",e)};if("opening"===this.readyState||"open"===this.readyState){this.readyState="closing";if(this.writeBuffer.length){this.once("drain",(()=>{if(this.upgrading){s()}else{t()}}))}else if(this.upgrading){s()}else{t()}}return this}onError(t){at.priorWebsocketSuccess=false;this.emitReserved("error",t);this.onClose("transport error",t)}onClose(t,e){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState){this.clearTimeoutFn(this.pingTimeoutTimer);this.transport.removeAllListeners("close");this.transport.close();this.transport.removeAllListeners();if(typeof removeEventListener==="function"){removeEventListener("offline",this.offlineEventListener,false)}this.readyState="closed";this.id=null;this.emitReserved("close",t,e);this.writeBuffer=[];this.prevBufferLen=0}}filterUpgrades(t){const e=[];let s=0;const i=t.length;for(;s<i;s++){if(~this.transports.indexOf(t[s]))e.push(t[s])}return e}}at.protocol=O;function ut(t,e="",s){let i=t;s=s||typeof location!=="undefined"&&location;if(null==t)t=s.protocol+"//"+s.host;if(typeof t==="string"){if("/"===t.charAt(0)){if("/"===t.charAt(1)){t=s.protocol+t}else{t=s.host+t}}if(!/^(https?|wss?):\/\//.test(t)){if("undefined"!==typeof s){t=s.protocol+"//"+t}else{t="https://"+t}}i=ht(t)}if(!i.port){if(/^(http|ws)$/.test(i.protocol)){i.port="80"}else if(/^(http|ws)s$/.test(i.protocol)){i.port="443"}}i.path=i.path||"/";const n=i.host.indexOf(":")!==-1;const r=n?"["+i.host+"]":i.host;i.id=i.protocol+"://"+r+":"+i.port+e;i.href=i.protocol+"://"+r+(s&&s.port===i.port?"":":"+i.port);return i}const lt=typeof ArrayBuffer==="function";const dt=t=>typeof ArrayBuffer.isView==="function"?ArrayBuffer.isView(t):t.buffer instanceof ArrayBuffer;const pt=Object.prototype.toString;const yt=typeof Blob==="function"||typeof Blob!=="undefined"&&pt.call(Blob)==="[object BlobConstructor]";const gt=typeof File==="function"||typeof File!=="undefined"&&pt.call(File)==="[object FileConstructor]";function bt(t){return lt&&(t instanceof ArrayBuffer||dt(t))||yt&&t instanceof Blob||gt&&t instanceof File}function mt(t,e){if(!t||typeof t!=="object"){return false}if(Array.isArray(t)){for(let e=0,s=t.length;e<s;e++){if(mt(t[e])){return true}}return false}if(bt(t)){return true}if(t.toJSON&&typeof t.toJSON==="function"&&arguments.length===1){return mt(t.toJSON(),true)}for(const e in t){if(Object.prototype.hasOwnProperty.call(t,e)&&mt(t[e])){return true}}return false}function wt(t){const e=[];const s=t.data;const i=t;i.data=kt(s,e);i.attachments=e.length;return{packet:i,buffers:e}}function kt(t,e){if(!t)return t;if(bt(t)){const s={_placeholder:true,num:e.length};e.push(t);return s}else if(Array.isArray(t)){const s=new Array(t.length);for(let i=0;i<t.length;i++){s[i]=kt(t[i],e)}return s}else if(typeof t==="object"&&!(t instanceof Date)){const s={};for(const i in t){if(Object.prototype.hasOwnProperty.call(t,i)){s[i]=kt(t[i],e)}}return s}return t}function vt(t,e){t.data=Et(t.data,e);t.attachments=undefined;return t}function Et(t,e){if(!t)return t;if(t&&t._placeholder===true){const s=typeof t.num==="number"&&t.num>=0&&t.num<e.length;if(s){return e[t.num]}else{throw new Error("illegal attachments")}}else if(Array.isArray(t)){for(let s=0;s<t.length;s++){t[s]=Et(t[s],e)}}else if(typeof t==="object"){for(const s in t){if(Object.prototype.hasOwnProperty.call(t,s)){t[s]=Et(t[s],e)}}}return t}const At=5;var Ot;(function(t){t[t["CONNECT"]=0]="CONNECT";t[t["DISCONNECT"]=1]="DISCONNECT";t[t["EVENT"]=2]="EVENT";t[t["ACK"]=3]="ACK";t[t["CONNECT_ERROR"]=4]="CONNECT_ERROR";t[t["BINARY_EVENT"]=5]="BINARY_EVENT";t[t["BINARY_ACK"]=6]="BINARY_ACK"})(Ot||(Ot={}));class xt{constructor(t){this.replacer=t}encode(t){if(t.type===Ot.EVENT||t.type===Ot.ACK){if(mt(t)){t.type=t.type===Ot.EVENT?Ot.BINARY_EVENT:Ot.BINARY_ACK;return this.encodeAsBinary(t)}}return[this.encodeAsString(t)]}encodeAsString(t){let e=""+t.type;if(t.type===Ot.BINARY_EVENT||t.type===Ot.BINARY_ACK){e+=t.attachments+"-"}if(t.nsp&&"/"!==t.nsp){e+=t.nsp+","}if(null!=t.id){e+=t.id}if(null!=t.data){e+=JSON.stringify(t.data,this.replacer)}return e}encodeAsBinary(t){const e=wt(t);const s=this.encodeAsString(e.packet);const i=e.buffers;i.unshift(s);return i}}class jt extends x{constructor(t){super();this.reviver=t}add(t){let e;if(typeof t==="string"){if(this.reconstructor){throw new Error("got plaintext data when reconstructing a packet")}e=this.decodeString(t);if(e.type===Ot.BINARY_EVENT||e.type===Ot.BINARY_ACK){this.reconstructor=new Ct(e);if(e.attachments===0){super.emitReserved("decoded",e)}}else{super.emitReserved("decoded",e)}}else if(bt(t)||t.base64){if(!this.reconstructor){throw new Error("got binary data when not reconstructing a packet")}else{e=this.reconstructor.takeBinaryData(t);if(e){this.reconstructor=null;super.emitReserved("decoded",e)}}}else{throw new Error("Unknown type: "+t)}}decodeString(t){let e=0;const s={type:Number(t.charAt(0))};if(Ot[s.type]===undefined){throw new Error("unknown packet type "+s.type)}if(s.type===Ot.BINARY_EVENT||s.type===Ot.BINARY_ACK){const i=e+1;while(t.charAt(++e)!=="-"&&e!=t.length){}const n=t.substring(i,e);if(n!=Number(n)||t.charAt(e)!=="-"){throw new Error("Illegal attachments")}s.attachments=Number(n)}if("/"===t.charAt(e+1)){const i=e+1;while(++e){const s=t.charAt(e);if(","===s)break;if(e===t.length)break}s.nsp=t.substring(i,e)}else{s.nsp="/"}const i=t.charAt(e+1);if(""!==i&&Number(i)==i){const i=e+1;while(++e){const s=t.charAt(e);if(null==s||Number(s)!=s){--e;break}if(e===t.length)break}s.id=Number(t.substring(i,e+1))}if(t.charAt(++e)){const i=this.tryParse(t.substr(e));if(jt.isPayloadValid(s.type,i)){s.data=i}else{throw new Error("invalid payload")}}return s}tryParse(t){try{return JSON.parse(t,this.reviver)}catch(t){return false}}static isPayloadValid(t,e){switch(t){case Ot.CONNECT:return typeof e==="object";case Ot.DISCONNECT:return e===undefined;case Ot.CONNECT_ERROR:return typeof e==="string"||typeof e==="object";case Ot.EVENT:case Ot.BINARY_EVENT:return Array.isArray(e)&&e.length>0;case Ot.ACK:case Ot.BINARY_ACK:return Array.isArray(e)}}destroy(){if(this.reconstructor){this.reconstructor.finishedReconstruction()}}}class Ct{constructor(t){this.packet=t;this.buffers=[];this.reconPack=t}takeBinaryData(t){this.buffers.push(t);if(this.buffers.length===this.reconPack.attachments){const t=vt(this.reconPack,this.buffers);this.finishedReconstruction();return t}return null}finishedReconstruction(){this.reconPack=null;this.buffers=[]}}const Bt=Object.freeze({__proto__:null,protocol:At,get PacketType(){return Ot},Encoder:xt,Decoder:jt});function Nt(t,e,s){t.on(e,s);return function i(){t.off(e,s)}}const Tt=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class _t extends x{constructor(t,e,s){super();this.connected=false;this.receiveBuffer=[];this.sendBuffer=[];this.ids=0;this.acks={};this.flags={};this.io=t;this.nsp=e;if(s&&s.auth){this.auth=s.auth}if(this.io._autoConnect)this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const t=this.io;this.subs=[Nt(t,"open",this.onopen.bind(this)),Nt(t,"packet",this.onpacket.bind(this)),Nt(t,"error",this.onerror.bind(this)),Nt(t,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){if(this.connected)return this;this.subEvents();if(!this.io["_reconnecting"])this.io.open();if("open"===this.io._readyState)this.onopen();return this}open(){return this.connect()}send(...t){t.unshift("message");this.emit.apply(this,t);return this}emit(t,...e){if(Tt.hasOwnProperty(t)){throw new Error('"'+t+'" is a reserved event name')}e.unshift(t);const s={type:Ot.EVENT,data:e};s.options={};s.options.compress=this.flags.compress!==false;if("function"===typeof e[e.length-1]){const t=this.ids++;const i=e.pop();this._registerAckCallback(t,i);s.id=t}const i=this.io.engine&&this.io.engine.transport&&this.io.engine.transport.writable;const n=this.flags.volatile&&(!i||!this.connected);if(n);else if(this.connected){this.notifyOutgoingListeners(s);this.packet(s)}else{this.sendBuffer.push(s)}this.flags={};return this}_registerAckCallback(t,e){const s=this.flags.timeout;if(s===undefined){this.acks[t]=e;return}const i=this.io.setTimeoutFn((()=>{delete this.acks[t];for(let e=0;e<this.sendBuffer.length;e++){if(this.sendBuffer[e].id===t){this.sendBuffer.splice(e,1)}}e.call(this,new Error("operation has timed out"))}),s);this.acks[t]=(...t)=>{this.io.clearTimeoutFn(i);e.apply(this,[null,...t])}}packet(t){t.nsp=this.nsp;this.io._packet(t)}onopen(){if(typeof this.auth=="function"){this.auth((t=>{this.packet({type:Ot.CONNECT,data:t})}))}else{this.packet({type:Ot.CONNECT,data:this.auth})}}onerror(t){if(!this.connected){this.emitReserved("connect_error",t)}}onclose(t,e){this.connected=false;delete this.id;this.emitReserved("disconnect",t,e)}onpacket(t){const e=t.nsp===this.nsp;if(!e)return;switch(t.type){case Ot.CONNECT:if(t.data&&t.data.sid){const e=t.data.sid;this.onconnect(e)}else{this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"))}break;case Ot.EVENT:case Ot.BINARY_EVENT:this.onevent(t);break;case Ot.ACK:case Ot.BINARY_ACK:this.onack(t);break;case Ot.DISCONNECT:this.ondisconnect();break;case Ot.CONNECT_ERROR:this.destroy();const e=new Error(t.data.message);e.data=t.data.data;this.emitReserved("connect_error",e);break}}onevent(t){const e=t.data||[];if(null!=t.id){e.push(this.ack(t.id))}if(this.connected){this.emitEvent(e)}else{this.receiveBuffer.push(Object.freeze(e))}}emitEvent(t){if(this._anyListeners&&this._anyListeners.length){const e=this._anyListeners.slice();for(const s of e){s.apply(this,t)}}super.emit.apply(this,t)}ack(t){const e=this;let s=false;return function(...i){if(s)return;s=true;e.packet({type:Ot.ACK,id:t,data:i})}}onack(t){const e=this.acks[t.id];if("function"===typeof e){e.apply(this,t.data);delete this.acks[t.id]}}onconnect(t){this.id=t;this.connected=true;this.emitBuffered();this.emitReserved("connect")}emitBuffered(){this.receiveBuffer.forEach((t=>this.emitEvent(t)));this.receiveBuffer=[];this.sendBuffer.forEach((t=>{this.notifyOutgoingListeners(t);this.packet(t)}));this.sendBuffer=[]}ondisconnect(){this.destroy();this.onclose("io server disconnect")}destroy(){if(this.subs){this.subs.forEach((t=>t()));this.subs=undefined}this.io["_destroy"](this)}disconnect(){if(this.connected){this.packet({type:Ot.DISCONNECT})}this.destroy();if(this.connected){this.onclose("io client disconnect")}return this}close(){return this.disconnect()}compress(t){this.flags.compress=t;return this}get volatile(){this.flags.volatile=true;return this}timeout(t){this.flags.timeout=t;return this}onAny(t){this._anyListeners=this._anyListeners||[];this._anyListeners.push(t);return this}prependAny(t){this._anyListeners=this._anyListeners||[];this._anyListeners.unshift(t);return this}offAny(t){if(!this._anyListeners){return this}if(t){const e=this._anyListeners;for(let s=0;s<e.length;s++){if(t===e[s]){e.splice(s,1);return this}}}else{this._anyListeners=[]}return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(t){this._anyOutgoingListeners=this._anyOutgoingListeners||[];this._anyOutgoingListeners.push(t);return this}prependAnyOutgoing(t){this._anyOutgoingListeners=this._anyOutgoingListeners||[];this._anyOutgoingListeners.unshift(t);return this}offAnyOutgoing(t){if(!this._anyOutgoingListeners){return this}if(t){const e=this._anyOutgoingListeners;for(let s=0;s<e.length;s++){if(t===e[s]){e.splice(s,1);return this}}}else{this._anyOutgoingListeners=[]}return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(t){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const e=this._anyOutgoingListeners.slice();for(const s of e){s.apply(this,t.data)}}}}function Lt(t){t=t||{};this.ms=t.min||100;this.max=t.max||1e4;this.factor=t.factor||2;this.jitter=t.jitter>0&&t.jitter<=1?t.jitter:0;this.attempts=0}Lt.prototype.duration=function(){var t=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random();var s=Math.floor(e*this.jitter*t);t=(Math.floor(e*10)&1)==0?t-s:t+s}return Math.min(t,this.max)|0};Lt.prototype.reset=function(){this.attempts=0};Lt.prototype.setMin=function(t){this.ms=t};Lt.prototype.setMax=function(t){this.max=t};Lt.prototype.setJitter=function(t){this.jitter=t};class Mt extends x{constructor(t,e){var s;super();this.nsps={};this.subs=[];if(t&&"object"===typeof t){e=t;t=undefined}e=e||{};e.path=e.path||"/socket.io";this.opts=e;_(this,e);this.reconnection(e.reconnection!==false);this.reconnectionAttempts(e.reconnectionAttempts||Infinity);this.reconnectionDelay(e.reconnectionDelay||1e3);this.reconnectionDelayMax(e.reconnectionDelayMax||5e3);this.randomizationFactor((s=e.randomizationFactor)!==null&&s!==void 0?s:.5);this.backoff=new Lt({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()});this.timeout(null==e.timeout?2e4:e.timeout);this._readyState="closed";this.uri=t;const i=e.parser||Bt;this.encoder=new i.Encoder;this.decoder=new i.Decoder;this._autoConnect=e.autoConnect!==false;if(this._autoConnect)this.open()}reconnection(t){if(!arguments.length)return this._reconnection;this._reconnection=!!t;return this}reconnectionAttempts(t){if(t===undefined)return this._reconnectionAttempts;this._reconnectionAttempts=t;return this}reconnectionDelay(t){var e;if(t===undefined)return this._reconnectionDelay;this._reconnectionDelay=t;(e=this.backoff)===null||e===void 0?void 0:e.setMin(t);return this}randomizationFactor(t){var e;if(t===undefined)return this._randomizationFactor;this._randomizationFactor=t;(e=this.backoff)===null||e===void 0?void 0:e.setJitter(t);return this}reconnectionDelayMax(t){var e;if(t===undefined)return this._reconnectionDelayMax;this._reconnectionDelayMax=t;(e=this.backoff)===null||e===void 0?void 0:e.setMax(t);return this}timeout(t){if(!arguments.length)return this._timeout;this._timeout=t;return this}maybeReconnectOnOpen(){if(!this._reconnecting&&this._reconnection&&this.backoff.attempts===0){this.reconnect()}}open(t){if(~this._readyState.indexOf("open"))return this;this.engine=new at(this.uri,this.opts);const e=this.engine;const s=this;this._readyState="opening";this.skipReconnect=false;const i=Nt(e,"open",(function(){s.onopen();t&&t()}));const n=Nt(e,"error",(e=>{s.cleanup();s._readyState="closed";this.emitReserved("error",e);if(t){t(e)}else{s.maybeReconnectOnOpen()}}));if(false!==this._timeout){const t=this._timeout;if(t===0){i()}const s=this.setTimeoutFn((()=>{i();e.close();e.emit("error",new Error("timeout"))}),t);if(this.opts.autoUnref){s.unref()}this.subs.push((function t(){clearTimeout(s)}))}this.subs.push(i);this.subs.push(n);return this}connect(t){return this.open(t)}onopen(){this.cleanup();this._readyState="open";this.emitReserved("open");const t=this.engine;this.subs.push(Nt(t,"ping",this.onping.bind(this)),Nt(t,"data",this.ondata.bind(this)),Nt(t,"error",this.onerror.bind(this)),Nt(t,"close",this.onclose.bind(this)),Nt(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(t){this.decoder.add(t)}ondecoded(t){this.emitReserved("packet",t)}onerror(t){this.emitReserved("error",t)}socket(t,e){let s=this.nsps[t];if(!s){s=new _t(this,t,e);this.nsps[t]=s}return s}_destroy(t){const e=Object.keys(this.nsps);for(const t of e){const e=this.nsps[t];if(e.active){return}}this._close()}_packet(t){const e=this.encoder.encode(t);for(let s=0;s<e.length;s++){this.engine.write(e[s],t.options)}}cleanup(){this.subs.forEach((t=>t()));this.subs.length=0;this.decoder.destroy()}_close(){this.skipReconnect=true;this._reconnecting=false;this.onclose("forced close");if(this.engine)this.engine.close()}disconnect(){return this._close()}onclose(t,e){this.cleanup();this.backoff.reset();this._readyState="closed";this.emitReserved("close",t,e);if(this._reconnection&&!this.skipReconnect){this.reconnect()}}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const t=this;if(this.backoff.attempts>=this._reconnectionAttempts){this.backoff.reset();this.emitReserved("reconnect_failed");this._reconnecting=false}else{const e=this.backoff.duration();this._reconnecting=true;const s=this.setTimeoutFn((()=>{if(t.skipReconnect)return;this.emitReserved("reconnect_attempt",t.backoff.attempts);if(t.skipReconnect)return;t.open((e=>{if(e){t._reconnecting=false;t.reconnect();this.emitReserved("reconnect_error",e)}else{t.onreconnect()}}))}),e);if(this.opts.autoUnref){s.unref()}this.subs.push((function t(){clearTimeout(s)}))}}onreconnect(){const t=this.backoff.attempts;this._reconnecting=false;this.backoff.reset();this.emitReserved("reconnect",t)}}const Pt={};function Rt(t,e){if(typeof t==="object"){e=t;t=undefined}e=e||{};const s=ut(t,e.path||"/socket.io");const i=s.source;const n=s.id;const r=s.path;const o=Pt[n]&&r in Pt[n]["nsps"];const h=e.forceNew||e["force new connection"]||false===e.multiplex||o;let c;if(h){c=new Mt(i,e)}else{if(!Pt[n]){Pt[n]=new Mt(i,e)}c=Pt[n]}if(s.query&&!e.query){e.query=s.queryKey}return c.socket(s.path,e)}Object.assign(Rt,{Manager:Mt,Socket:_t,io:Rt,connect:Rt});const Ut=":host{display:block}codenames-board{width:800px}";const Dt=class{constructor(e){t(this,e)}revealCellHandler(t){const e=t.detail;this.socket.emit("revealCell",e)}async connectedCallback(){this.socket=Rt("https://bestdotaeu-codenames-backend.herokuapp.com");this.socket.on("updateBoard",(t=>{this.boardData=t}))}render(){return e(s,null,e("codenames-board",{boardData:this.boardData}))}};Dt.style=Ut;const It=":host{display:flex;margin:50px;flex-wrap:wrap;justify-content:space-between;height:600px}";const St=class{constructor(e){t(this,e)}render(){var t,i;return e(s,null,(i=(t=this.boardData)===null||t===void 0?void 0:t.map(((t,s)=>e("codenames-cell",{index:s,word:t.word,color:t.color,mode:t.mode,revealed:t.revealed}))))!==null&&i!==void 0?i:null)}};St.style=It;const $t=":host{width:18%;height:17%}div{display:flex;justify-content:center;align-items:center;text-align:center;width:100%;height:100%;font-family:Roboto, verdana, sans-serif;font-size:15pt;background:#e8e8e8;cursor:pointer}div.revealed,div.spymaster,div.endgame{cursor:default}.blue.spymaster{color:#4183cc;font-weight:bold}.blue.revealed{background:#4183cc;color:#ffffff}.blue.endgame{background:#a6c7ee}.red.spymaster{color:#d13030;font-weight:bold}.red.revealed{background:#d13030;color:#ffffff}.red.endgame{background:#ecabab}.gray.spymaster{color:#000000;font-weight:bold}.gray.revealed{background:#8e8e8e;color:#ffffff}.black.spymaster{background:#999999;outline:5px solid #000000;font-weight:bold}.black.revealed,.black.endgame{background:#000000;color:#ffffff;outline:0}";const Ft=class{constructor(e){t(this,e);this.revealCell=i(this,"revealCell",7);this.word="";this.color=n.Gray;this.mode=r.Normal;this.revealed=false;this.showSpinner=false;this.handleRevealCell=async()=>{if(this.mode===r.Normal&&this.revealed===false){this.showSpinner=true;this.revealCell.emit(this.index)}}}render(){this.showSpinner=false;return e("div",{class:`${this.color} ${this.mode} ${this.revealed?"revealed":""}`,onClick:this.handleRevealCell},this.showSpinner?e("codenames-spinner",null):e("span",null,this.word.toUpperCase()))}};Ft.style=$t;const Ht=':host{display:block}.lds-dual-ring:after{content:" ";display:block;width:32px;height:32px;margin:4px;border-radius:50%;border:4px solid #000;border-color:#000 transparent #000 transparent;animation:lds-dual-ring 1.2s linear infinite}@keyframes lds-dual-ring{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}';const qt=class{constructor(e){t(this,e)}render(){return e(s,null,e("div",{class:"lds-dual-ring"}))}};qt.style=Ht;export{Dt as codenames_app,St as codenames_board,Ft as codenames_cell,qt as codenames_spinner};
//# sourceMappingURL=p-067278d3.entry.js.map