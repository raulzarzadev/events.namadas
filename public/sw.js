if(!self.define){let e,s={};const c=(c,n)=>(c=new URL(c+".js",n).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(n,a)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>c(e,i),o={module:{uri:i},exports:t,require:r};s[i]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(a(...e),t)))}}define(["./workbox-6a1bf588"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/0c428ae2-a7ad9269507df599.js",revision:"a7ad9269507df599"},{url:"/_next/static/chunks/1bfc9850-ca266fb85509501c.js",revision:"ca266fb85509501c"},{url:"/_next/static/chunks/252f366e-40dd7e5e062e5b5c.js",revision:"40dd7e5e062e5b5c"},{url:"/_next/static/chunks/28-31eecbddf14ae8ec.js",revision:"31eecbddf14ae8ec"},{url:"/_next/static/chunks/440-7104947dd1abb08c.js",revision:"7104947dd1abb08c"},{url:"/_next/static/chunks/482-5a6927cecf756149.js",revision:"5a6927cecf756149"},{url:"/_next/static/chunks/78e521c3-c7966a6564c4f93e.js",revision:"c7966a6564c4f93e"},{url:"/_next/static/chunks/7f0c75c1-37b2e9a57dfc01a7.js",revision:"37b2e9a57dfc01a7"},{url:"/_next/static/chunks/b98bc7c3-04b87c7914e299de.js",revision:"04b87c7914e299de"},{url:"/_next/static/chunks/d0447323-b8634718ef930ac9.js",revision:"b8634718ef930ac9"},{url:"/_next/static/chunks/d7eeaac4-a4f203cd933b52e4.js",revision:"a4f203cd933b52e4"},{url:"/_next/static/chunks/de71a805-346fa8bb96bedfab.js",revision:"346fa8bb96bedfab"},{url:"/_next/static/chunks/framework-4556c45dd113b893.js",revision:"4556c45dd113b893"},{url:"/_next/static/chunks/main-6c884fd140def4f4.js",revision:"6c884fd140def4f4"},{url:"/_next/static/chunks/pages/_app-0b10572b60e2d913.js",revision:"0b10572b60e2d913"},{url:"/_next/static/chunks/pages/_error-a4ba2246ff8fb532.js",revision:"a4ba2246ff8fb532"},{url:"/_next/static/chunks/pages/events/%5Bid%5D-228f758fb1433441.js",revision:"228f758fb1433441"},{url:"/_next/static/chunks/pages/events/%5Bid%5D/edit-6fc0c6421f8726f0.js",revision:"6fc0c6421f8726f0"},{url:"/_next/static/chunks/pages/events/%5Bid%5D/manage-c16d9c6a7c5d2576.js",revision:"c16d9c6a7c5d2576"},{url:"/_next/static/chunks/pages/index-5cc03e5bc1135e2b.js",revision:"5cc03e5bc1135e2b"},{url:"/_next/static/chunks/pages/new-event-310101f03a16acea.js",revision:"310101f03a16acea"},{url:"/_next/static/chunks/pages/profile-f1322c2ea0f98cc0.js",revision:"f1322c2ea0f98cc0"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-9b312e20a4e32339.js",revision:"9b312e20a4e32339"},{url:"/_next/static/css/c87c780809ba79f6.css",revision:"c87c780809ba79f6"},{url:"/_next/static/css/cc4b0ceb626a31fb.css",revision:"cc4b0ceb626a31fb"},{url:"/_next/static/mjF4qd3yGWAAe5iYGEhiJ/_buildManifest.js",revision:"1d2d35b7da8a26a218845588327aa934"},{url:"/_next/static/mjF4qd3yGWAAe5iYGEhiJ/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/icons/icon-b.png",revision:"72269d8baaa1981f75e8f14c0c028fcd"},{url:"/icons/icon.ico",revision:"c0c00a5ef890fa2f09d45de784ef0eb4"},{url:"/icons/icon.png",revision:"c0c00a5ef890fa2f09d45de784ef0eb4"},{url:"/images/defaultEventImage.jpg",revision:"941524b26fc6029b2e26d812e0cbe1af"},{url:"/manifest.json",revision:"f087661750406ebb6f1a8a24c9f898d1"},{url:"/vercel.svg",revision:"a2126adf97093bf2a234da8a6b530b5f"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
