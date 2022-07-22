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
    "revision": "a20f07b51d251b5f1949cea683a46f5d"
  },
  {
    "url": "build/index.esm.js",
    "revision": "559a2ea214d9c794dd7b520bc1900f56"
  },
  {
    "url": "build/p-067278d3.entry.js"
  },
  {
    "url": "build/p-78ab5146.js"
  },
  {
    "url": "build/p-9f42e523.js"
  },
  {
    "url": "main.js",
    "revision": "80fd369622bdd5781e933e3b48192ddc"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
