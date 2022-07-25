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
    "revision": "1dd4df2814d6abe99d7f783bfeb834a4"
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
    "revision": "614ce820fe0d4a3cd7294a93e81c1631"
  },
  {
    "url": "build/p-19b14d5f.js"
  },
  {
    "url": "build/p-9a70c03b.js"
  },
  {
    "url": "build/p-cf37d3eb.entry.js"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
