if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,l)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let t={};const o=e=>i(e,r),a={module:{uri:r},exports:t,require:o};s[r]=Promise.all(n.map((e=>a[e]||o(e)))).then((e=>(l(...e),t)))}}define(["./workbox-23fe103c"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"favicon.ico",revision:"abcf00917a5c4ef9c2ae356f6f87851c"},{url:"index.html",revision:"c98a2eb4918bb182dad8071e2a527004"},{url:"manifest.webmanifest",revision:"9cb5e30712903fb51e9efce9ae64fde0"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"assets/basedecoder-3573ccae.js",revision:null},{url:"assets/decoder-3be5c955.js",revision:null},{url:"assets/deflate-29fb883b.js",revision:null},{url:"assets/index-80b27d94.js",revision:null},{url:"assets/index-8a6bf445.css",revision:null},{url:"assets/jpeg-2f15dd85.js",revision:null},{url:"assets/lerc-6e2703e1.js",revision:null},{url:"assets/lzw-901d9363.js",revision:null},{url:"assets/materialdesignicons-webfont-48d3eec6.woff",revision:null},{url:"assets/materialdesignicons-webfont-861aea05.eot",revision:null},{url:"assets/materialdesignicons-webfont-bd725a7a.ttf",revision:null},{url:"assets/materialdesignicons-webfont-e52d60f6.woff2",revision:null},{url:"assets/packbits-90020365.js",revision:null},{url:"assets/pako.esm-bae9e474.js",revision:null},{url:"assets/raw-7a0fe838.js",revision:null},{url:"assets/webimage-aa764004.js",revision:null},{url:"icons/180.png",revision:"319261e0c199eae9d2e266d36919ff8a"},{url:"icons/192.png",revision:"f9d212b5c49943b316b2a12bfcce4f26"},{url:"icons/512.png",revision:"7254b56766c65e705c40f2bf5d4907c5"},{url:"./icons/192.png",revision:"f9d212b5c49943b316b2a12bfcce4f26"},{url:"./icons/512.png",revision:"7254b56766c65e705c40f2bf5d4907c5"},{url:"manifest.webmanifest",revision:"9cb5e30712903fb51e9efce9ae64fde0"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-cache",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i,new e.CacheFirst({cacheName:"gstatic-fonts-cache",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),e.registerRoute(/.*/,new e.CacheFirst({cacheName:"assets-cache",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
