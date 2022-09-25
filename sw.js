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
    "revision": "e2d6cf90a9cd0b2eb2fb2d6509a11bfb"
  },
  {
    "url": "app/main.css",
    "revision": "178b73d9131f56f77db547953ea083c7"
  },
  {
    "url": "app/main.js",
    "revision": "80fd369622bdd5781e933e3b48192ddc"
  },
  {
    "url": "build/index.esm.js",
    "revision": "e5d65abf5559d0b7cfa328c34ee29738"
  },
  {
    "url": "build/p-2c5a0a53.js"
  },
  {
    "url": "build/p-57c36330.entry.js"
  },
  {
    "url": "build/p-94a514a7.js"
  },
  {
    "url": "build/p-c8b2c846.css"
  },
  {
    "url": "build/p-f73aa137.js"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
