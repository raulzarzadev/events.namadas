if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>a(e,i),d={module:{uri:i},exports:t,require:r};s[i]=Promise.all(n.map((e=>d[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-6a1bf588"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/_BRmlKjBCr8AIUMG2GAzo/_buildManifest.js",revision:"0db36646a1d2aec077c536d6f1553f01"},{url:"/_next/static/_BRmlKjBCr8AIUMG2GAzo/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/260-cd581f263f873c2b.js",revision:"cd581f263f873c2b"},{url:"/_next/static/chunks/263-a22b31eaec76d89e.js",revision:"a22b31eaec76d89e"},{url:"/_next/static/chunks/440-cf3e7945f322d3cd.js",revision:"cf3e7945f322d3cd"},{url:"/_next/static/chunks/536-37a3d7569b7de263.js",revision:"37a3d7569b7de263"},{url:"/_next/static/chunks/570-04eb44fe7032f7b2.js",revision:"04eb44fe7032f7b2"},{url:"/_next/static/chunks/894-69e75c18f34d3b4a.js",revision:"69e75c18f34d3b4a"},{url:"/_next/static/chunks/fec483df-34a1bf37c84d9b8b.js",revision:"34a1bf37c84d9b8b"},{url:"/_next/static/chunks/framework-4556c45dd113b893.js",revision:"4556c45dd113b893"},{url:"/_next/static/chunks/main-6c884fd140def4f4.js",revision:"6c884fd140def4f4"},{url:"/_next/static/chunks/pages/_app-e1462f64bb44a196.js",revision:"e1462f64bb44a196"},{url:"/_next/static/chunks/pages/_error-a4ba2246ff8fb532.js",revision:"a4ba2246ff8fb532"},{url:"/_next/static/chunks/pages/cart-1883f77d63a59263.js",revision:"1883f77d63a59263"},{url:"/_next/static/chunks/pages/checkout-c5aa2d0bd322950d.js",revision:"c5aa2d0bd322950d"},{url:"/_next/static/chunks/pages/companies-6a5f7d3da1b7d955.js",revision:"6a5f7d3da1b7d955"},{url:"/_next/static/chunks/pages/companies/%5Bid%5D-a188003d4e77789f.js",revision:"a188003d4e77789f"},{url:"/_next/static/chunks/pages/companies/%5Bid%5D/edit-e66e01cf957943f2.js",revision:"e66e01cf957943f2"},{url:"/_next/static/chunks/pages/events-40f54b84719912c0.js",revision:"40f54b84719912c0"},{url:"/_next/static/chunks/pages/events/%5Bid%5D-12359b16c89241d4.js",revision:"12359b16c89241d4"},{url:"/_next/static/chunks/pages/events/%5Bid%5D/edit-e61d3857baa39329.js",revision:"e61d3857baa39329"},{url:"/_next/static/chunks/pages/events/%5Bid%5D/join-80dc39734f07c59e.js",revision:"80dc39734f07c59e"},{url:"/_next/static/chunks/pages/events/%5Bid%5D/manage-c9118d9ab12d2097.js",revision:"c9118d9ab12d2097"},{url:"/_next/static/chunks/pages/events/%5Bid%5D/payment-7a948801db38891e.js",revision:"7a948801db38891e"},{url:"/_next/static/chunks/pages/events/%5Bid%5D/payment/%5BpriceId%5D-a452952f5a8cf9a8.js",revision:"a452952f5a8cf9a8"},{url:"/_next/static/chunks/pages/events/%5Bid%5D/payment/%5BpriceId%5D/checkout-e400aa3fdd50cf2b.js",revision:"e400aa3fdd50cf2b"},{url:"/_next/static/chunks/pages/events/%5Bid%5D/payment/%5BpriceId%5D/processing-f2430b41c78f329b.js",revision:"f2430b41c78f329b"},{url:"/_next/static/chunks/pages/index-aaa1a3d07273e5ee.js",revision:"aaa1a3d07273e5ee"},{url:"/_next/static/chunks/pages/new-event-0a5860e16f886c3c.js",revision:"0a5860e16f886c3c"},{url:"/_next/static/chunks/pages/payments-30d0a9de9c737ad1.js",revision:"30d0a9de9c737ad1"},{url:"/_next/static/chunks/pages/payments/%5Bid%5D-0b0cbd7eaba6ff51.js",revision:"0b0cbd7eaba6ff51"},{url:"/_next/static/chunks/pages/profile-5b1dbc2dea2eabeb.js",revision:"5b1dbc2dea2eabeb"},{url:"/_next/static/chunks/pages/publish-event-efab7d17d3f4de66.js",revision:"efab7d17d3f4de66"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-5752944655d749a0.js",revision:"5752944655d749a0"},{url:"/_next/static/css/aa15fe3776697b1b.css",revision:"aa15fe3776697b1b"},{url:"/_next/static/css/cc4b0ceb626a31fb.css",revision:"cc4b0ceb626a31fb"},{url:"/_next/static/css/f5969ab7e928499c.css",revision:"f5969ab7e928499c"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/icons/icon-b.png",revision:"72269d8baaa1981f75e8f14c0c028fcd"},{url:"/icons/icon.ico",revision:"98cd11ae0eaa0de12f3a2b20c78b87dc"},{url:"/icons/icon.png",revision:"98cd11ae0eaa0de12f3a2b20c78b87dc"},{url:"/images/defaultEventImage.jpg",revision:"941524b26fc6029b2e26d812e0cbe1af"},{url:"/manifest.json",revision:"6f040198db34fdce8630607585a5351f"},{url:"/vercel.svg",revision:"a2126adf97093bf2a234da8a6b530b5f"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
