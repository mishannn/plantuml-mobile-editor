if(!self.define){let e,s={};const i=(i,l)=>(i=new URL(i+".js",l).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(l,n)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let t={};const o=e=>i(e,r),u={module:{uri:r},exports:t,require:o};s[r]=Promise.all(l.map((e=>u[e]||o(e)))).then((e=>(n(...e),t)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/basedecoder-3573ccae.js",revision:null},{url:"assets/decoder-caf308b6.js",revision:null},{url:"assets/deflate-29fb883b.js",revision:null},{url:"assets/index-b93cd579.css",revision:null},{url:"assets/jpeg-2f15dd85.js",revision:null},{url:"assets/lerc-dbfce753.js",revision:null},{url:"assets/lzw-901d9363.js",revision:null},{url:"assets/packbits-90020365.js",revision:null},{url:"assets/pako.esm-bae9e474.js",revision:null},{url:"assets/raw-7a0fe838.js",revision:null},{url:"assets/webimage-aa764004.js",revision:null},{url:"index.html",revision:"418eb34287c5f9d7239dff8ecd783b74"},{url:"plantuml-wasm/plantuml.js",revision:"9f66302a9b9dd19aa077950bdb7f97b7"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"./icons/192.png",revision:"f9d212b5c49943b316b2a12bfcce4f26"},{url:"./icons/512.png",revision:"7254b56766c65e705c40f2bf5d4907c5"},{url:"manifest.webmanifest",revision:"9cb5e30712903fb51e9efce9ae64fde0"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
