(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const Ut=(e,t)=>e===t,oe=Symbol("solid-proxy"),Gt=Symbol("solid-track"),ae={equals:Ut};let wt=At;const U=1,ce=2,yt={owned:null,cleanups:null,context:null,owner:null};var w=null;let pe=null,Ht=null,b=null,S=null,j=null,ge=0;function se(e,t){const n=b,i=w,r=e.length===0,s=t===void 0?i:t,l=r?yt:{owned:null,cleanups:null,context:s?s.context:null,owner:s},o=r?e:()=>e(()=>E(()=>me(l)));w=l,b=null;try{return q(o,!0)}finally{b=n,w=i}}function y(e,t){t=t?Object.assign({},ae,t):ae;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},i=r=>(typeof r=="function"&&(r=r(n.value)),xt(n,r));return[pt.bind(n),i]}function _(e,t,n){const i=Me(e,t,!1,U);te(i)}function Ie(e,t,n){wt=Qt;const i=Me(e,t,!1,U);i.user=!0,j?j.push(i):te(i)}function C(e,t,n){n=n?Object.assign({},ae,n):ae;const i=Me(e,t,!0,0);return i.observers=null,i.observerSlots=null,i.comparator=n.equals||void 0,te(i),pt.bind(i)}function Yt(e){return q(e,!1)}function E(e){if(b===null)return e();const t=b;b=null;try{return e()}finally{b=t}}function rt(e,t,n){const i=Array.isArray(e);let r;return s=>{let l;if(i){l=Array(e.length);for(let c=0;c<e.length;c++)l[c]=e[c]()}else l=e();const o=E(()=>t(l,r,s));return r=l,o}}function Wt(e){Ie(()=>E(e))}function Vt(e){return w===null||(w.cleanups===null?w.cleanups=[e]:w.cleanups.push(e)),e}function Xt(e,t){const n=Symbol("context");return{id:n,Provider:en(n),defaultValue:e}}function Zt(e){return w&&w.context&&w.context[e.id]!==void 0?w.context[e.id]:e.defaultValue}function bt(e){const t=C(e),n=C(()=>Te(t()));return n.toArray=()=>{const i=n();return Array.isArray(i)?i:i!=null?[i]:[]},n}function pt(){if(this.sources&&this.state)if(this.state===U)te(this);else{const e=S;S=null,q(()=>fe(this),!1),S=e}if(b){const e=this.observers?this.observers.length:0;b.sources?(b.sources.push(this),b.sourceSlots.push(e)):(b.sources=[this],b.sourceSlots=[e]),this.observers?(this.observers.push(b),this.observerSlots.push(b.sources.length-1)):(this.observers=[b],this.observerSlots=[b.sources.length-1])}return this.value}function xt(e,t,n){let i=e.value;return(!e.comparator||!e.comparator(i,t))&&(e.value=t,e.observers&&e.observers.length&&q(()=>{for(let r=0;r<e.observers.length;r+=1){const s=e.observers[r],l=pe&&pe.running;l&&pe.disposed.has(s),(l?!s.tState:!s.state)&&(s.pure?S.push(s):j.push(s),s.observers&&St(s)),l||(s.state=U)}if(S.length>1e6)throw S=[],new Error},!1)),t}function te(e){if(!e.fn)return;me(e);const t=ge;Kt(e,e.value,t)}function Kt(e,t,n){let i;const r=w,s=b;b=w=e;try{i=e.fn(t)}catch(l){return e.pure&&(e.state=U,e.owned&&e.owned.forEach(me),e.owned=null),e.updatedAt=n+1,vt(l)}finally{b=s,w=r}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?xt(e,i):e.value=i,e.updatedAt=n)}function Me(e,t,n,i=U,r){const s={fn:e,state:i,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:w,context:w?w.context:null,pure:n};return w===null||w!==yt&&(w.owned?w.owned.push(s):w.owned=[s]),s}function ue(e){if(e.state===0)return;if(e.state===ce)return fe(e);if(e.suspense&&E(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<ge);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===U)te(e);else if(e.state===ce){const i=S;S=null,q(()=>fe(e,t[0]),!1),S=i}}function q(e,t){if(S)return e();let n=!1;t||(S=[]),j?n=!0:j=[],ge++;try{const i=e();return qt(n),i}catch(i){n||(j=null),S=null,vt(i)}}function qt(e){if(S&&(At(S),S=null),e)return;const t=j;j=null,t.length&&q(()=>wt(t),!1)}function At(e){for(let t=0;t<e.length;t++)ue(e[t])}function Qt(e){let t,n=0;for(t=0;t<e.length;t++){const i=e[t];i.user?e[n++]=i:ue(i)}for(t=0;t<n;t++)ue(e[t])}function fe(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const i=e.sources[n];if(i.sources){const r=i.state;r===U?i!==t&&(!i.updatedAt||i.updatedAt<ge)&&ue(i):r===ce&&fe(i,t)}}}function St(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=ce,n.pure?S.push(n):j.push(n),n.observers&&St(n))}}function me(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),i=e.sourceSlots.pop(),r=n.observers;if(r&&r.length){const s=r.pop(),l=n.observerSlots.pop();i<r.length&&(s.sourceSlots[l]=i,r[i]=s,n.observerSlots[i]=l)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)me(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function Jt(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function vt(e,t=w){throw Jt(e)}function Te(e){if(typeof e=="function"&&!e.length)return Te(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const i=Te(e[n]);Array.isArray(i)?t.push.apply(t,i):t.push(i)}return t}return e}function en(e,t){return function(i){let r;return _(()=>r=E(()=>(w.context={...w.context,[e]:i.value},bt(()=>i.children))),void 0),r}}const tn=Symbol("fallback");function it(e){for(let t=0;t<e.length;t++)e[t]()}function nn(e,t,n={}){let i=[],r=[],s=[],l=0,o=t.length>1?[]:null;return Vt(()=>it(s)),()=>{let c=e()||[],f,a;return c[Gt],E(()=>{let g=c.length,x,L,B,G,Y,$,I,N,F;if(g===0)l!==0&&(it(s),s=[],i=[],r=[],l=0,o&&(o=[])),n.fallback&&(i=[tn],r[0]=se(ne=>(s[0]=ne,n.fallback())),l=1);else if(l===0){for(r=new Array(g),a=0;a<g;a++)i[a]=c[a],r[a]=se(d);l=g}else{for(B=new Array(g),G=new Array(g),o&&(Y=new Array(g)),$=0,I=Math.min(l,g);$<I&&i[$]===c[$];$++);for(I=l-1,N=g-1;I>=$&&N>=$&&i[I]===c[N];I--,N--)B[N]=r[I],G[N]=s[I],o&&(Y[N]=o[I]);for(x=new Map,L=new Array(N+1),a=N;a>=$;a--)F=c[a],f=x.get(F),L[a]=f===void 0?-1:f,x.set(F,a);for(f=$;f<=I;f++)F=i[f],a=x.get(F),a!==void 0&&a!==-1?(B[a]=r[f],G[a]=s[f],o&&(Y[a]=o[f]),a=L[a],x.set(F,a)):s[f]();for(a=$;a<g;a++)a in B?(r[a]=B[a],s[a]=G[a],o&&(o[a]=Y[a],o[a](a))):r[a]=se(d);r=r.slice(0,l=g),i=c.slice(0)}return r});function d(g){if(s[a]=g,o){const[x,L]=y(a);return o[a]=L,t(c[a],x)}return t(c[a])}}}let rn=!1;function u(e,t){return E(()=>e(t||{}))}function re(){return!0}const ke={get(e,t,n){return t===oe?n:e.get(t)},has(e,t){return t===oe?!0:e.has(t)},set:re,deleteProperty:re,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:re,deleteProperty:re}},ownKeys(e){return e.keys()}};function xe(e){return(e=typeof e=="function"?e():e)?e:{}}function sn(){for(let e=0,t=this.length;e<t;++e){const n=this[e]();if(n!==void 0)return n}}function Ae(...e){let t=!1;for(let l=0;l<e.length;l++){const o=e[l];t=t||!!o&&oe in o,e[l]=typeof o=="function"?(t=!0,C(o)):o}if(t)return new Proxy({get(l){for(let o=e.length-1;o>=0;o--){const c=xe(e[o])[l];if(c!==void 0)return c}},has(l){for(let o=e.length-1;o>=0;o--)if(l in xe(e[o]))return!0;return!1},keys(){const l=[];for(let o=0;o<e.length;o++)l.push(...Object.keys(xe(e[o])));return[...new Set(l)]}},ke);const n={},i=Object.create(null);for(let l=e.length-1;l>=0;l--){const o=e[l];if(!o)continue;const c=Object.getOwnPropertyNames(o);for(let f=c.length-1;f>=0;f--){const a=c[f];if(a==="__proto__"||a==="constructor")continue;const d=Object.getOwnPropertyDescriptor(o,a);if(!i[a])i[a]=d.get?{enumerable:!0,configurable:!0,get:sn.bind(n[a]=[d.get.bind(o)])}:d.value!==void 0?d:void 0;else{const g=n[a];g&&(d.get?g.push(d.get.bind(o)):d.value!==void 0&&g.push(()=>d.value))}}}const r={},s=Object.keys(i);for(let l=s.length-1;l>=0;l--){const o=s[l],c=i[o];c&&c.get?Object.defineProperty(r,o,c):r[o]=c?c.value:void 0}return r}function Ct(e,...t){if(oe in e){const r=new Set(t.length>1?t.flat():t[0]),s=t.map(l=>new Proxy({get(o){return l.includes(o)?e[o]:void 0},has(o){return l.includes(o)&&o in e},keys(){return l.filter(o=>o in e)}},ke));return s.push(new Proxy({get(l){return r.has(l)?void 0:e[l]},has(l){return r.has(l)?!1:l in e},keys(){return Object.keys(e).filter(l=>!r.has(l))}},ke)),s}const n={},i=t.map(()=>({}));for(const r of Object.getOwnPropertyNames(e)){const s=Object.getOwnPropertyDescriptor(e,r),l=!s.get&&!s.set&&s.enumerable&&s.writable&&s.configurable;let o=!1,c=0;for(const f of t)f.includes(r)&&(o=!0,l?i[c][r]=s.value:Object.defineProperty(i[c],r,s)),++c;o||(l?n[r]=s.value:Object.defineProperty(n,r,s))}return[...i,n]}const _t=e=>`Stale read from <${e}>.`;function Q(e){const t="fallback"in e&&{fallback:()=>e.fallback};return C(nn(()=>e.each,e.children,t||void 0))}function v(e){const t=e.keyed,n=C(()=>e.when,void 0,{equals:(i,r)=>t?i===r:!i==!r});return C(()=>{const i=n();if(i){const r=e.children;return typeof r=="function"&&r.length>0?E(()=>r(t?i:()=>{if(!E(n))throw _t("Show");return e.when})):r}return e.fallback},void 0,void 0)}function ln(e){let t=!1;const n=(s,l)=>(t?s[1]===l[1]:!s[1]==!l[1])&&s[2]===l[2],i=bt(()=>e.children),r=C(()=>{let s=i();Array.isArray(s)||(s=[s]);for(let l=0;l<s.length;l++){const o=s[l].when;if(o)return t=!!s[l].keyed,[l,o,s[l]]}return[-1]},void 0,{equals:n});return C(()=>{const[s,l,o]=r();if(s<0)return e.fallback;const c=o.children;return typeof c=="function"&&c.length>0?E(()=>c(t?l:()=>{if(E(r)[0]!==s)throw _t("Match");return o.when})):c},void 0,void 0)}function ie(e){return e}const on=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],an=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...on]),cn=new Set(["innerHTML","textContent","innerText","children"]),un=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),fn=Object.assign(Object.create(null),{class:"className",formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1}});function dn(e,t){const n=fn[e];return typeof n=="object"?n[t]?n.$:void 0:n}const gn=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),mn=new Set(["altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","svg","switch","symbol","text","textPath","tref","tspan","use","view","vkern"]),hn={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function wn(e,t,n){let i=n.length,r=t.length,s=i,l=0,o=0,c=t[r-1].nextSibling,f=null;for(;l<r||o<s;){if(t[l]===n[o]){l++,o++;continue}for(;t[r-1]===n[s-1];)r--,s--;if(r===l){const a=s<i?o?n[o-1].nextSibling:n[s-o]:c;for(;o<s;)e.insertBefore(n[o++],a)}else if(s===o)for(;l<r;)(!f||!f.has(t[l]))&&t[l].remove(),l++;else if(t[l]===n[s-1]&&n[o]===t[r-1]){const a=t[--r].nextSibling;e.insertBefore(n[o++],t[l++].nextSibling),e.insertBefore(n[--s],a),t[r]=n[s]}else{if(!f){f=new Map;let d=o;for(;d<s;)f.set(n[d],d++)}const a=f.get(t[l]);if(a!=null)if(o<a&&a<s){let d=l,g=1,x;for(;++d<r&&d<s&&!((x=f.get(t[d]))==null||x!==a+g);)g++;if(g>a-o){const L=t[l];for(;o<a;)e.insertBefore(n[o++],L)}else e.replaceChild(n[o++],t[l++])}else l++;else t[l++].remove()}}}const st="_$DX_DELEGATE";function yn(e,t,n,i={}){let r;return se(s=>{r=s,t===document?e():p(t,e(),t.firstChild?null:void 0,n)},i.owner),()=>{r(),t.textContent=""}}function P(e,t,n){let i;const r=()=>{const l=document.createElement("template");return l.innerHTML=e,l.content.firstChild},s=()=>(i||(i=r())).cloneNode(!0);return s.cloneNode=s,s}function Et(e,t=window.document){const n=t[st]||(t[st]=new Set);for(let i=0,r=e.length;i<r;i++){const s=e[i];n.has(s)||(n.add(s),t.addEventListener(s,_n))}}function O(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function bn(e,t,n,i){i==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,i)}function A(e,t){t==null?e.removeAttribute("class"):e.className=t}function pn(e,t,n,i){if(i)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const r=n[0];e.addEventListener(t,n[0]=s=>r.call(e,n[1],s))}else e.addEventListener(t,n)}function xn(e,t,n={}){const i=Object.keys(t||{}),r=Object.keys(n);let s,l;for(s=0,l=r.length;s<l;s++){const o=r[s];!o||o==="undefined"||t[o]||(lt(e,o,!1),delete n[o])}for(s=0,l=i.length;s<l;s++){const o=i[s],c=!!t[o];!o||o==="undefined"||n[o]===c||!c||(lt(e,o,!0),n[o]=c)}return n}function An(e,t,n){if(!t)return n?O(e,"style"):t;const i=e.style;if(typeof t=="string")return i.cssText=t;typeof n=="string"&&(i.cssText=n=void 0),n||(n={}),t||(t={});let r,s;for(s in n)t[s]==null&&i.removeProperty(s),delete n[s];for(s in t)r=t[s],r!==n[s]&&(i.setProperty(s,r),n[s]=r);return n}function $t(e,t={},n,i){const r={};return _(()=>r.children=ee(e,t.children,r.children)),_(()=>typeof t.ref=="function"?Sn(t.ref,e):t.ref=e),_(()=>vn(e,t,n,!0,r,!0)),r}function Sn(e,t,n){return E(()=>e(t,n))}function p(e,t,n,i){if(n!==void 0&&!i&&(i=[]),typeof t!="function")return ee(e,t,i,n);_(r=>ee(e,t(),r,n),i)}function vn(e,t,n,i,r={},s=!1){t||(t={});for(const l in r)if(!(l in t)){if(l==="children")continue;r[l]=ot(e,l,null,r[l],n,s)}for(const l in t){if(l==="children")continue;const o=t[l];r[l]=ot(e,l,o,r[l],n,s)}}function Cn(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function lt(e,t,n){const i=t.trim().split(/\s+/);for(let r=0,s=i.length;r<s;r++)e.classList.toggle(i[r],n)}function ot(e,t,n,i,r,s){let l,o,c,f,a;if(t==="style")return An(e,n,i);if(t==="classList")return xn(e,n,i);if(n===i)return i;if(t==="ref")s||n(e);else if(t.slice(0,3)==="on:"){const d=t.slice(3);i&&e.removeEventListener(d,i),n&&e.addEventListener(d,n)}else if(t.slice(0,10)==="oncapture:"){const d=t.slice(10);i&&e.removeEventListener(d,i,!0),n&&e.addEventListener(d,n,!0)}else if(t.slice(0,2)==="on"){const d=t.slice(2).toLowerCase(),g=gn.has(d);if(!g&&i){const x=Array.isArray(i)?i[0]:i;e.removeEventListener(d,x)}(g||n)&&(pn(e,d,n,g),g&&Et([d]))}else if(t.slice(0,5)==="attr:")O(e,t.slice(5),n);else if((a=t.slice(0,5)==="prop:")||(c=cn.has(t))||!r&&((f=dn(t,e.tagName))||(o=an.has(t)))||(l=e.nodeName.includes("-")))a&&(t=t.slice(5),o=!0),t==="class"||t==="className"?A(e,n):l&&!o&&!c?e[Cn(t)]=n:e[f||t]=n;else{const d=r&&t.indexOf(":")>-1&&hn[t.split(":")[0]];d?bn(e,d,t,n):O(e,un[t]||t,n)}return n}function _n(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}});n;){const i=n[t];if(i&&!n.disabled){const r=n[`${t}Data`];if(r!==void 0?i.call(n,r,e):i.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function ee(e,t,n,i,r){for(;typeof n=="function";)n=n();if(t===n)return n;const s=typeof t,l=i!==void 0;if(e=l&&n[0]&&n[0].parentNode||e,s==="string"||s==="number")if(s==="number"&&(t=t.toString()),l){let o=n[0];o&&o.nodeType===3?o.data!==t&&(o.data=t):o=document.createTextNode(t),n=Z(e,n,i,o)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t;else if(t==null||s==="boolean")n=Z(e,n,i);else{if(s==="function")return _(()=>{let o=t();for(;typeof o=="function";)o=o();n=ee(e,o,n,i)}),()=>n;if(Array.isArray(t)){const o=[],c=n&&Array.isArray(n);if(Pe(o,t,n,r))return _(()=>n=ee(e,o,n,i,!0)),()=>n;if(o.length===0){if(n=Z(e,n,i),l)return n}else c?n.length===0?at(e,o,i):wn(e,n,o):(n&&Z(e),at(e,o));n=o}else if(t.nodeType){if(Array.isArray(n)){if(l)return n=Z(e,n,i,t);Z(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function Pe(e,t,n,i){let r=!1;for(let s=0,l=t.length;s<l;s++){let o=t[s],c=n&&n[e.length],f;if(!(o==null||o===!0||o===!1))if((f=typeof o)=="object"&&o.nodeType)e.push(o);else if(Array.isArray(o))r=Pe(e,o,c)||r;else if(f==="function")if(i){for(;typeof o=="function";)o=o();r=Pe(e,Array.isArray(o)?o:[o],Array.isArray(c)?c:[c])||r}else e.push(o),r=!0;else{const a=String(o);c&&c.nodeType===3&&c.data===a?e.push(c):e.push(document.createTextNode(a))}}return r}function at(e,t,n=null){for(let i=0,r=t.length;i<r;i++)e.insertBefore(t[i],n)}function Z(e,t,n,i){if(n===void 0)return e.textContent="";const r=i||document.createTextNode("");if(t.length){let s=!1;for(let l=t.length-1;l>=0;l--){const o=t[l];if(r!==o){const c=o.parentNode===e;!s&&!l?c?e.replaceChild(r,o):e.insertBefore(r,n):c&&o.remove()}else s=!0}}else e.insertBefore(r,n);return[r]}const En="http://www.w3.org/2000/svg";function $n(e,t=!1){return t?document.createElementNS(En,e):document.createElement(e)}function It(e){const[t,n]=Ct(e,["component"]),i=C(()=>t.component);return C(()=>{const r=i();switch(typeof r){case"function":return E(()=>r(n));case"string":const s=mn.has(r),l=$n(r,s);return $t(l,n,s),l}})}let In={data:""},Tn=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||In,kn=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Pn=/\/\*[^]*?\*\/|  +/g,ct=/\n+/g,H=(e,t)=>{let n="",i="",r="";for(let s in e){let l=e[s];s[0]=="@"?s[1]=="i"?n=s+" "+l+";":i+=s[1]=="f"?H(l,s):s+"{"+H(l,s[1]=="k"?"":t)+"}":typeof l=="object"?i+=H(l,t?t.replace(/([^,])+/g,o=>s.replace(/(^:.*)|([^,])+/g,c=>/&/.test(c)?c.replace(/&/g,o):o?o+" "+c:c)):s):l!=null&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=H.p?H.p(s,l):s+":"+l+";")}return n+(t&&r?t+"{"+r+"}":r)+i},R={},Tt=e=>{if(typeof e=="object"){let t="";for(let n in e)t+=n+Tt(e[n]);return t}return e},Ln=(e,t,n,i,r)=>{let s=Tt(e),l=R[s]||(R[s]=(c=>{let f=0,a=11;for(;f<c.length;)a=101*a+c.charCodeAt(f++)>>>0;return"go"+a})(s));if(!R[l]){let c=s!==e?e:(f=>{let a,d,g=[{}];for(;a=kn.exec(f.replace(Pn,""));)a[4]?g.shift():a[3]?(d=a[3].replace(ct," ").trim(),g.unshift(g[0][d]=g[0][d]||{})):g[0][a[1]]=a[2].replace(ct," ").trim();return g[0]})(e);R[l]=H(r?{["@keyframes "+l]:c}:c,n?"":"."+l)}let o=n&&R.g?R.g:null;return n&&(R.g=R[l]),((c,f,a,d)=>{d?f.data=f.data.replace(d,c):f.data.indexOf(c)===-1&&(f.data=a?c+f.data:f.data+c)})(R[l],t,i,o),l},Nn=(e,t,n)=>e.reduce((i,r,s)=>{let l=t[s];if(l&&l.call){let o=l(n),c=o&&o.props&&o.props.className||/^go/.test(o)&&o;l=c?"."+c:o&&typeof o=="object"?o.props?"":H(o,""):o===!1?"":o}return i+r+(l??"")},"");function h(e){let t=this||{},n=e.call?e(t.p):e;return Ln(n.unshift?n.raw?Nn(n,[].slice.call(arguments,1),t.p):n.reduce((i,r)=>Object.assign(i,r&&r.call?r(t.p):r),{}):n,Tn(t.target),t.g,t.o,t.k)}h.bind({g:1});h.bind({k:1});const Mn=Xt();function kt(e){let t=this||{};return(...n)=>{const i=r=>{const s=Zt(Mn),l=Ae(r,{theme:s}),o=Ae(l,{get class(){const x=l.class,L="class"in l&&/^go[0-9]+/.test(x);let B=h.apply({target:t.target,o:L,p:l,g:t.g},n);return[x,B].filter(Boolean).join(" ")}}),[c,f]=Ct(o,["as","theme"]),a=f,d=c.as||e;let g;return typeof d=="function"?g=d(a):t.g==1?(g=document.createElement(d),$t(g,a)):g=It(Ae({component:d},a)),g};return i.class=r=>E(()=>h.apply({target:t.target,p:r,g:t.g},n)),i}}const D=new Proxy(kt,{get(e,t){return e(t)}});function zn(){const e=kt.call({g:1},"div").apply(null,arguments);return function(n){return e(n),null}}const On=D("a")`
  padding-bottom: ${e=>typeof e.paddingBottom<"u"?`${e.paddingBottom}px`:"0"};
`,Dn=h`
  color: inherit;
  text-decoration: underline;

  &:hover {
    color: inherit;
  }
`,J=e=>u(On,{get title(){return e.title},get class(){return`${Dn} ${e.class}`},get href(){return e.href},target:"_blank",rel:"noopener noreferrer",get"aria-label"(){return e.label||"Open external link"},tabIndex:-1,get paddingBottom(){return e.paddingBottom},get children(){return e.children}});var Bn=P("<div>");const Rn=D("div")`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 3rem;
  background-color: transparent;
  z-index: 100;
`,jn=D("div")`
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`,Fn=D("div")`
  height: 50px;
  width: 50px;
  margin-left: -25px;
  margin-top: -25px;
  border-radius: 50%;
  display: inline-block;
  position: relative;

  &::before,
  &::after {
    content: '';
    border: 2px solid var(--color2);
    border: ${e=>e.bgColor==="transparent"?"2px solid rgba(0,0,0,0.25)":`2px solid ${e.bgColor}`};
    border-radius: 50%;
    width: 50px;
    height: 50px;
    position: absolute;
    left: 0px;
    right: 0px;
  }

  &::before {
    -webkit-transform: scale(1, 1);
    -ms-transform: scale(1, 1);
    transform: scale(1, 1);
    opacity: 1;
    -webkit-animation: spWaveBe 0.6s infinite linear;
    animation: spWaveBe 0.6s infinite linear;
  }

  &::after {
    -webkit-transform: scale(0, 0);
    -ms-transform: scale(0, 0);
    transform: scale(0, 0);
    opacity: 0;
    -webkit-animation: spWaveAf 0.6s infinite linear;
    animation: spWaveAf 0.6s infinite linear;
  }

  @-webkit-keyframes spWaveAf {
    from {
      -webkit-transform: scale(0.5, 0.5);
      transform: scale(0.5, 0.5);
      opacity: 0;
    }
    to {
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
      opacity: 1;
    }
  }
  @keyframes spWaveAf {
    from {
      -webkit-transform: scale(0.5, 0.5);
      transform: scale(0.5, 0.5);
      opacity: 0;
    }
    to {
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
      opacity: 1;
    }
  }

  @-webkit-keyframes spWaveBe {
    from {
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
      opacity: 1;
    }
    to {
      -webkit-transform: scale(1.5, 1.5);
      transform: scale(1.5, 1.5);
      opacity: 0;
    }
  }
  @keyframes spWaveBe {
    from {
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
      opacity: 1;
    }
    to {
      -webkit-transform: scale(1.5, 1.5);
      transform: scale(1.5, 1.5);
      opacity: 0;
    }
  }
`,Un=e=>u(Rn,{get children(){return u(jn,{get children(){var t=Bn();return p(t,u(Fn,{get bgColor(){return e.bgColor}})),t}})}});var Gn=P("<div role=alert><div>");const Hn=h`
  padding: 1.5rem;
  text-align: center;
  margin: 3rem auto;
  border: 1px solid #dee2e6;

  @media only screen and (min-width: 768px) {
    width: 75%;
    padding: 3rem;
  }
`,Yn=e=>(()=>{var t=Gn(),n=t.firstChild;return A(t,Hn),p(n,()=>e.children),t})(),Wn="key",Vn="headers",Xn="category-header",Zn="category-in-subcategory",Kn="title-uppercase",qn="title-alignment",Qn="title-font-size",Jn="title-font-family",er="item-name",tr="item-name-font-size",nr="style",rr="size",ir="items-alignment",sr="items-spacing",lr="bg-color",or="fg-color",Pt="base-path",ar="item-modal";var K=(e=>(e.Basic="clean",e.BorderedBasic="bordered",e.ShadowedBasic="shadowed",e.Card="card",e))(K||{}),k=(e=>(e.XSmall="xs",e.Small="sm",e.Medium="md",e.Large="lg",e.XLarge="xl",e))(k||{}),le=(e=>(e.Serif="serif",e.SansSerif="sans-serif",e.Monospace="monospace",e))(le||{}),Le=(e=>(e[e.GitHubCircle=0]="GitHubCircle",e[e.World=1]="World",e))(Le||{});const cr=!0,ur=!0,fr=!1,dr=!1,gr="left",mr="sans-serif",hr=13,wr=!1,yr=11,br="shadowed",pr="md",xr="left",Ar="#323437",Sr="#ffffff",vr=!1,de=()=>{const t=new URLSearchParams(location.search).get(Pt);return`${location.origin}${t||""}`};var Cr=P("<img>"),_r=P('<svg stroke=currentColor fill=currentColor stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M0 0h24v24H0z"></path><path d="M21.9 21.9l-6.1-6.1-2.69-2.69L5 5 3.59 3.59 2.1 2.1.69 3.51 3 5.83V19c0 1.1.9 2 2 2h13.17l2.31 2.31 1.42-1.41zM5 19V7.83l6.84 6.84-.84 1.05L9 13l-3 4h8.17l2 2H5zM7.83 5l-2-2H19c1.1 0 2 .9 2 2v13.17l-2-2V5H7.83z">');const Ne=e=>{const[t,n]=y(!1);return u(v,{get when(){return!t()},get fallback(){return _r()},get children(){var i=Cr();return i.addEventListener("error",()=>n(!0)),_(r=>{var s=`${e.name} logo`,l=e.class,o=`../${e.logo}`;return s!==r.e&&O(i,"alt",r.e=s),l!==r.t&&A(i,r.t=l),o!==r.a&&O(i,"src",r.a=o),r},{e:void 0,t:void 0,a:void 0}),i}})};var Er=P('<svg stroke=currentColor fill=currentColor stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm3.163 21.783h-.093a.513.513 0 0 1-.382-.14.513.513 0 0 1-.14-.372v-1.406c.006-.467.01-.94.01-1.416a3.693 3.693 0 0 0-.151-1.028 1.832 1.832 0 0 0-.542-.875 8.014 8.014 0 0 0 2.038-.471 4.051 4.051 0 0 0 1.466-.964c.407-.427.71-.943.885-1.506a6.77 6.77 0 0 0 .3-2.13 4.138 4.138 0 0 0-.26-1.476 3.892 3.892 0 0 0-.795-1.284 2.81 2.81 0 0 0 .162-.582c.033-.2.05-.402.05-.604 0-.26-.03-.52-.09-.773a5.309 5.309 0 0 0-.221-.763.293.293 0 0 0-.111-.02h-.11c-.23.002-.456.04-.674.111a5.34 5.34 0 0 0-.703.26 6.503 6.503 0 0 0-.661.343c-.215.127-.405.249-.573.362a9.578 9.578 0 0 0-5.143 0 13.507 13.507 0 0 0-.572-.362 6.022 6.022 0 0 0-.672-.342 4.516 4.516 0 0 0-.705-.261 2.203 2.203 0 0 0-.662-.111h-.11a.29.29 0 0 0-.11.02 5.844 5.844 0 0 0-.23.763c-.054.254-.08.513-.081.773 0 .202.017.404.051.604.033.199.086.394.16.582A3.888 3.888 0 0 0 5.702 10a4.142 4.142 0 0 0-.263 1.476 6.871 6.871 0 0 0 .292 2.12c.181.563.483 1.08.884 1.516.415.422.915.75 1.466.964.653.25 1.337.41 2.033.476a1.828 1.828 0 0 0-.452.633 2.99 2.99 0 0 0-.2.744 2.754 2.754 0 0 1-1.175.27 1.788 1.788 0 0 1-1.065-.3 2.904 2.904 0 0 1-.752-.824 3.1 3.1 0 0 0-.292-.382 2.693 2.693 0 0 0-.372-.343 1.841 1.841 0 0 0-.432-.24 1.2 1.2 0 0 0-.481-.101c-.04.001-.08.005-.12.01a.649.649 0 0 0-.162.02.408.408 0 0 0-.13.06.116.116 0 0 0-.06.1.33.33 0 0 0 .14.242c.093.074.17.131.232.171l.03.021c.133.103.261.214.382.333.112.098.213.209.3.33.09.119.168.246.231.381.073.134.15.288.231.463.188.474.522.875.954 1.145.453.243.961.364 1.476.351.174 0 .349-.01.522-.03.172-.028.343-.057.515-.091v1.743a.5.5 0 0 1-.533.521h-.062a10.286 10.286 0 1 1 6.324 0v.005z">'),$r=P('<svg stroke=currentColor fill=currentColor stroke-width=0 viewBox="0 0 512 512"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none stroke-miterlimit=10 stroke-width=32 d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48z"></path><path fill=none stroke-miterlimit=10 stroke-width=32 d="M256 48c-58.07 0-112.67 93.13-112.67 208S197.93 464 256 464s112.67-93.13 112.67-208S314.07 48 256 48z"></path><path fill=none stroke-linecap=round stroke-linejoin=round stroke-width=32 d="M117.33 117.33c38.24 27.15 86.38 43.34 138.67 43.34s100.43-16.19 138.67-43.34m0 277.34c-38.24-27.15-86.38-43.34-138.67-43.34s-100.43 16.19-138.67 43.34"></path><path fill=none stroke-miterlimit=10 stroke-width=32 d="M256 48v416m208-208H48">');const Ir=e=>(()=>{var t=Er();return _(()=>O(t,"class",e.class)),t})(),Tr=e=>(()=>{var t=$r();return _(()=>O(t,"class",e.class)),t})(),kr=[Ir,Tr],ut=e=>u(It,{get component(){return kr[e.kind]},get class(){return e.class}});var Se=P("<div>"),Pr=P("<div><div><div></div><div><div></div><div></div><div></div></div></div><div>"),Lr=P("<div> member");const Nr=h`
  flex: 0 0 auto;
  margin-top: 24px;
  padding: 0 12px;
  width: 100%;

  @media (min-width: 768px) {
    width: 50%;
  }

  @media (min-width: 992px) {
    width: 33.333333%;
  }

  @media (min-width: 1400px) {
    width: 25%;
  }

  @media (min-width: 1920px) {
    width: 20%;
  }
`,Mr=h`
  text-decoration: none;
`,zr=h`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 192px;
  border: 1px solid #d2d2d2;
  padding: 1rem;
  font-size: 90%;

  &:hover {
    border-color: var(--bg-color);
    box-shadow: 0 0 5px 0 rgba(13, 110, 253, 0.25);
  }
`,Or=h`
  width: 100%;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`,Dr=h`
  width: 100%;
  height: 100%;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  height: 90px;
  width: 70px;
  min-width: 70px;
`,Br=h`
  margin: auto;
  font-size: calc(var(--card-size-height) / 1.5);
  width: 100%;
  max-height: 100%;
  height: auto;
`,Rr=h`
  background-color: #f8f9fa;
  padding: 1rem;
  width: calc(100% - 70px - 1rem);
  height: 105px;
  margin-left: 1rem;
`,jr=h`
  font-size: 1.15rem;
  line-height: 1.15;
  font-weight: 600;
  padding-bottom: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Fr=h`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(33, 37, 41, 0.75);
  font-size: 0.875em;
  height: 15px;
`,Ur=h`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  overflow: hidden;
  height: 26px;
`,ve=h`
  margin-top: 0.5rem;
  border: 1px solid transparent;
  font-size: 0.6rem;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 0.5rem;
  padding: 0.2rem 0.5rem;
  margin-right: 0.5rem;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Gr=h`
  border-color: rgb(73, 80, 87) !important;
  color: rgb(73, 80, 87);
`,Hr=h`
  border-color: rgb(108, 117, 125) !important;
  background-color: rgb(108, 117, 125);
  color: #fff;
  max-width: calc(50% - 0.5rem) !important;
`,Yr=h`
  border-color: var(--bg-color) !important;
  background-color: var(--bg-color);
  color: #fff;
  max-width: calc(50% - 0.5rem) !important;
`,ft=h`
  margin-top: 0.5rem;
  position: relative;
  color: inherit;
  height: 18px;
  line-height: 22px;
  width: auto;
  margin-right: 0.5rem;

  &:hover {
    color: var(--bg-color);
  }

  svg {
    height: 15px;
    width: 15px;
  }
`,Wr=h`
  font-size: 0.8rem;
  line-height: 1.5;
  color: rgba(33, 37, 41, 0.75);
  margin-top: 1rem;
  overflow: hidden;
  text-overflow: unset;
  white-space: inherit;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-wrap: normal;
  max-height: 36px;
`,Vr=e=>(()=>{var t=Se();return A(t,Nr),p(t,u(J,{get href(){return`${de()}?item=${e.item.id}`},class:Mr,get children(){var n=Pr(),i=n.firstChild,r=i.firstChild,s=r.nextSibling,l=s.firstChild,o=l.nextSibling,c=o.nextSibling,f=i.nextSibling;return A(n,zr),A(i,Or),A(r,Dr),p(r,u(Ne,{get name(){return e.item.name},class:Br,get logo(){return e.item.logo}})),A(s,Rr),A(l,jr),p(l,()=>e.item.name),A(o,Fr),p(o,u(v,{get when(){return e.item.organization_name},get children(){return e.item.organization_name}})),A(c,Ur),p(c,u(v,{get when(){return e.item.maturity},get fallback(){return u(v,{get when(){return e.item.member_subcategory},get children(){var a=Lr(),d=a.firstChild;return A(a,`${ve} ${Gr}`),p(a,()=>e.item.member_subcategory,d),_(()=>O(a,"title",`${e.item.member_subcategory} member`)),a}})},get children(){return[(()=>{var a=Se();return A(a,`${ve} ${Yr}`),p(a,()=>e.foundation),_(()=>O(a,"title",e.item.maturity)),a})(),(()=>{var a=Se();return A(a,`${ve} ${Hr}`),p(a,()=>e.item.maturity),_(()=>O(a,"title",e.item.maturity)),a})()]}}),null),p(c,u(v,{get when(){return e.item.website},get children(){return u(J,{title:"Website",class:ft,get href(){return e.item.website},get children(){return u(ut,{get kind(){return Le.World}})}})}}),null),p(c,u(v,{get when(){return e.item.primary_repository_url},get children(){return u(J,{title:"Repository",class:ft,get href(){return e.item.primary_repository_url},get children(){return u(ut,{get kind(){return Le.GitHubCircle}})}})}}),null),A(f,Wr),p(f,()=>e.item.description||"This item does not have a description available yet"),n}})),t})();var Xr=P("<button>");const Zr={[k.XSmall]:"0.25rem",[k.Small]:"0.35rem",[k.Medium]:"0.5rem",[k.Large]:"0.75rem",[k.XLarge]:"1rem"},Kr=D("div")`
  border: ${e=>e.borderless?"":"1px solid rgba(0, 0, 0, 0.175)"};
  box-shadow: ${e=>e.withShadow?"0 .125rem .25rem rgba(0,0,0,.075)":"none"};
  padding: ${e=>Zr[e.size]};
  background-color: ${e=>e.borderless?"transparent":"#fff"};
`,qr=h`
  position: relative;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
`,dt=h`
  width: 100%;
  height: 100%;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
`,Qr=h`
  background: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
`,gt=h`
  margin: auto;
  font-size: calc(var(--card-size-height) / 1.5);
  max-width: 100%;
  max-height: 100%;
  height: auto;
`,mt=D("div")`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  font-size: ${e=>e.itemNameSize<40?`${e.itemNameSize}px`:"40px"};
  line-height: ${e=>e.itemNameSize<40?`${e.itemNameSize-2}px`:"38px"};
  padding: ${e=>e.borderless?"0.35rem 0":"0.35rem 0.25rem"};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-top: ${e=>e.borderless?"":"1px solid rgba(0, 0, 0, 0.175)"};
`,Ce=e=>u(Kr,{get class(){return`${qr} ${e.class}`},get borderless(){return e.borderless},get withShadow(){return typeof e.withShadow<"u"&&e.withShadow},get size(){return e.size},get children(){return u(v,{get when(){return e.onClick!==void 0},get fallback(){return u(J,{get href(){return`${de()}?item=${e.item.id}`},get paddingBottom(){return e.withName?e.itemNameSize+8:0},class:dt,get children(){return[u(Ne,{get name(){return e.item.name},class:gt,get logo(){return e.item.logo}}),u(v,{get when(){return e.withName},get children(){return u(mt,{get borderless(){return e.borderless},get itemNameSize(){return e.itemNameSize},get children(){return e.item.name}})}})]}})},get children(){var t=Xr();return t.$$click=()=>e.onClick(),A(t,`${dt} ${Qr}`),p(t,u(Ne,{get name(){return e.item.name},class:gt,get logo(){return e.item.logo}}),null),p(t,u(v,{get when(){return e.withName},get children(){return u(mt,{get borderless(){return e.borderless},get itemNameSize(){return e.itemNameSize},get children(){return e.item.name}})}}),null),_(n=>(n=`${e.withName?e.itemNameSize+8:0}px`)!=null?t.style.setProperty("padding-bottom",n):t.style.removeProperty("padding-bottom")),t}})}});Et(["click"]);var Jr=P("<div>");const _e={[k.XSmall]:{width:"55px",height:"50px",gap:"5px"},[k.Small]:{width:"77px",height:"70px",gap:"8px"},[k.Medium]:{width:"110px",height:"100px",gap:"10px"},[k.Large]:{width:"143px",height:"130px",gap:"12px"},[k.XLarge]:{width:"220px",height:"200px",gap:"15px"}},Ee=D("div")`
  --card-size-width: ${e=>_e[e.size].width};
  --card-size-height: ${e=>_e[e.size].height};

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${e=>typeof e.spacing<"u"?`${e.spacing}px`:_e[e.size].gap};
  justify-content: ${e=>e.alignment};
`,$e=h`
  width: var(--card-size-width);
  height: var(--card-size-height);
`,ei=h`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -12px;
  margin-top: -24px;
  width: calc(100% + 24px);
  overflow: hidden;
`,ht=e=>u(ln,{get children(){return[u(ie,{get when(){return e.style===K.Basic},get children(){return u(Ee,{get size(){return e.size},get alignment(){return e.alignment},get spacing(){return e.spacing},get children(){return u(Q,{get each(){return e.items},children:t=>u(Ce,{item:t,get size(){return e.size},class:$e,get withName(){return e.displayName},get itemNameSize(){return e.itemNameSize},get onClick(){return e.displayItemModal?()=>e.setActiveItemId(t.id):void 0},borderless:!0})})}})}}),u(ie,{get when(){return e.style===K.BorderedBasic},get children(){return u(Ee,{get size(){return e.size},get alignment(){return e.alignment},get spacing(){return e.spacing},get children(){return u(Q,{get each(){return e.items},children:t=>u(Ce,{item:t,get size(){return e.size},class:$e,get withName(){return e.displayName},get itemNameSize(){return e.itemNameSize},get onClick(){return e.displayItemModal?()=>e.setActiveItemId(t.id):void 0},borderless:!1})})}})}}),u(ie,{get when(){return e.style===K.ShadowedBasic},get children(){return u(Ee,{get size(){return e.size},get alignment(){return e.alignment},get spacing(){return e.spacing},get children(){return u(Q,{get each(){return e.items},children:t=>u(Ce,{item:t,get size(){return e.size},class:$e,get withName(){return e.displayName},get itemNameSize(){return e.itemNameSize},borderless:!1,get onClick(){return e.displayItemModal?()=>e.setActiveItemId(t.id):void 0},withShadow:!0})})}})}}),u(ie,{get when(){return e.style===K.Card},get children(){var t=Jr();return A(t,ei),p(t,u(Q,{get each(){return e.items},children:n=>u(Vr,{item:n,get foundation(){return e.foundation},get onClick(){return e.displayItemModal?()=>e.setActiveItemId(n.id):void 0}})})),t}})]}});var ti=P("<div><h4>Invalid embed url</h4><p>Please visit: ");const ni={[le.Serif]:'Times, "Times New Roman", Georgia, Palatino, serif',[le.SansSerif]:'"Clarity City", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, Roboto, Ubuntu, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',[le.Monospace]:'Courier, Consolas, "Andale Mono", monospace'},ri=D("div")`
  margin: 0;
  padding: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;

  *,
  *::before,
  *::after {
    font-family: ${e=>ni[e.fontFamily]};
    box-sizing: border-box;
  }
`,ii=D("div")`
  background-color: var(--bg-color);
  color: var(--fg-color);
  padding: ${e=>e.isBgTransparent?"0.5rem 0":"0.5rem 0.75rem"};
  font-size: ${e=>e.size?`${e.size}px`:"0.8rem"};
  text-align: ${e=>e.alignment};
  text-transform: ${e=>e.uppercase?"uppercase":"normal"};
  font-weight: 500;
  line-height: 1.5;
  overflow: hidden;
  margin-bottom: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
`,si=D("div")`
  background-color: var(--bg-color);
  color: var(--fg-color);
  padding: ${e=>e.isBgTransparent?"0.5rem 0":"0.5rem 0.75rem"};
  font-size: ${e=>e.size?`${e.size}px`:"0.8rem"};
  text-align: ${e=>e.alignment};
  text-transform: ${e=>e.uppercase?"uppercase":"normal"};
  font-weight: 500;
  line-height: 1.5;
  margin: ${e=>{const t=typeof e.spacing<"u"&&e.spacing>16?`${e.spacing}px`:"16px";return typeof e.firstTitle<"u"&&e.firstTitle?`0 0 ${t} 0`:`${t} 0 ${t} 0`}};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,li=()=>{const[e,t]=y(""),[n,i]=y(),[r,s]=y(),[l,o]=y(cr),[c,f]=y(br),[a,d]=y(!1),[g,x]=y(Ar),[L,B]=y(Sr),[G,Y]=y(pr),[$,I]=y(ur),[N,F]=y(fr),[ne,Lt]=y(dr),[ze,Nt]=y(gr),[Mt,zt]=y(mr),[Oe,Ot]=y(hr),[De,Dt]=y(wr),[Be,Bt]=y(yr),[Re,Rt]=y(xr),[he,jt]=y(),[je,Ft]=y(vr),[we,ye]=y(null),Fe=()=>`${e()}`,Ue=m=>m.sort((T,z)=>T.name.toLowerCase().localeCompare(z.name.toLowerCase()));return Wt(()=>{const m=new URLSearchParams(window.location.search),T=m.get(Pt),z=m.get(Wn),W=m.get(Vn),V=m.get(nr),X=m.get(rr),be=m.get(lr),Ge=m.get(or),He=m.get(Xn),Ye=m.get(Zn),We=m.get(qn),Ve=m.get(Jn),Xe=m.get(Qn),Ze=m.get(er),Ke=m.get(tr),qe=m.get(ir),Qe=m.get(sr),Je=m.get(Kn),et=m.get(ar);Yt(()=>{if(z!==null){let tt=!0,nt=!0;if(o(W==="true"),He!==null&&I(He==="true"),Ye!==null&&F(Ye==="true"),Je!==null&&Lt(Je==="true"),Ze!==null&&(Dt(Ze==="true"),Ke!==null)){const M=parseInt(Ke);M>=10&&M<=40&&Bt(M)}if(V!==null&&(Object.values(K).includes(V)?f(V):nt=!1),X!==null&&(Object.values(k).includes(X)?Y(X):tt=!1),be!==null&&(x(be),d(be==="transparent")),Ge!==null&&B(Ge),Ve!==null&&zt(Ve),We!==null&&Nt(We),Xe!==null){const M=parseInt(Xe);M>=10&&M<=60&&Ot(M)}if(qe!==null&&Rt(qe),Qe!==null){const M=parseInt(Qe);M>=0&&jt(M)}et!==null&&Ft(et==="true"),tt&&nt?(t(T||""),i(z)):s(null)}else s(null)})}),Ie(rt(n,()=>{async function m(){try{fetch(`${Fe()}/data/embed_${n()}.json`).then(T=>{if(T.ok)return T.json();throw new Error("Something went wrong")}).then(T=>{s(T)}).catch(()=>{s(null)})}catch{s(null)}}typeof n()<"u"&&m()})),Ie(rt(we,()=>{we()!==null&&(window.parent.postMessage({type:"showItemDetails",itemId:we(),key:n(),foundation:r().foundation,basePath:Fe()},"*"),ye(null))})),u(ri,{get fontFamily(){return Mt()},get style(){return{all:"initial",isolation:"isolate",overflow:"hidden","--bg-color":g(),"--fg-color":L()}},get children(){return u(v,{get when(){return r()!==null},get fallback(){return u(Yn,{get children(){var m=ti(),T=m.firstChild,z=T.nextSibling;return z.firstChild,p(z,u(J,{get href(){return`${de()}/embed-setup`},get children(){return[C(()=>de()),"/embed-setup"]}}),null),m}})},get children(){return u(v,{get when(){return typeof r()<"u"},get fallback(){return u(Un,{get bgColor(){return g()}})},get children(){return u(v,{get when(){return l()},get fallback(){return u(ht,{get items(){return Ue(r().items)},get foundation(){return r().foundation},get style(){return c()},get size(){return G()},get alignment(){return Re()},get spacing(){return he()},get displayName(){return De()},get itemNameSize(){return Be()},get displayItemModal(){return je()},setActiveItemId:ye})},get children(){return[u(v,{get when(){return $()},get children(){return u(ii,{get isBgTransparent(){return a()},get size(){return Oe()},get alignment(){return ze()},get uppercase(){return ne()},get children(){return r().category.name}})}}),u(Q,{get each(){return r().category.subcategories},children:(m,T)=>{const z=Ue(r().items.filter(W=>{let V=!1;return W.additional_categories&&(V=W.additional_categories.some(X=>X.category===r().category.name&&X.subcategory===m.name)),W.category===r().category.name&&W.subcategory===m.name||V}));return[u(si,{get isBgTransparent(){return a()},get size(){return Oe()},get alignment(){return ze()},get uppercase(){return ne()},get firstTitle(){return T()===0},get spacing(){return he()},get children(){return[u(v,{get when(){return N()},get children(){return[C(()=>r().category.name)," - "]}}),C(()=>m.name)," (",C(()=>z.length),")"]}}),u(ht,{items:z,get foundation(){return r().foundation},get style(){return c()},get size(){return G()},get alignment(){return Re()},get spacing(){return he()},get displayName(){return De()},get itemNameSize(){return Be()},get displayItemModal(){return je()},setActiveItemId:ye})]}})]}})}})}})}})},oi={body:{"overflow-x":"hidden",margin:"0px"}},ai=zn(oi),ci=document.getElementById("landscape-embeddable-view");yn(()=>[u(ai,{}),u(li,{})],ci);
