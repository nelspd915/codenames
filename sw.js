/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "index.html",
    "revision": "6388e0b28ca8ff4735db286f36829c9d"
  },
  {
    "url": "build/index.esm.js",
    "revision": "559a2ea214d9c794dd7b520bc1900f56"
  },
  {
    "url": "build/p-0ccad4bc.js"
  },
  {
    "url": "build/p-4d0c4345.entry.js"
  },
  {
    "url": "build/p-4f5c3fbf.entry.js"
  },
  {
    "url": "build/p-5401066b.js"
  },
  {
    "url": "build/p-5854c8f5.entry.js"
  },
  {
    "url": "build/p-6899f280.entry.js"
  },
  {
    "url": "build/p-6a1e8d93.entry.js"
  },
  {
    "url": "build/p-6c0b4435.js"
  },
  {
    "url": "build/p-78ab5146.js"
  },
  {
    "url": "build/p-9f42e523.js"
  },
  {
    "url": "build/p-a46eb8a3.entry.js"
  },
  {
    "url": "build/p-b09aada7.entry.js"
  },
  {
    "url": "build/p-b4ade62a.js"
  },
  {
    "url": "build/p-c3215bb5.entry.js"
  },
  {
    "url": "build/p-df024099.entry.js"
  },
  {
    "url": "build/p-e8605e2f.js"
  },
  {
    "url": "build/p-f68e23d0.js"
  },
  {
    "url": "main.js",
    "revision": "80fd369622bdd5781e933e3b48192ddc"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
