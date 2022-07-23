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
    "revision": "248d2d5abe75936651e7616cec365bb8"
  },
  {
    "url": "build/index.esm.js",
    "revision": "614ce820fe0d4a3cd7294a93e81c1631"
  },
  {
    "url": "build/p-430fa09c.entry.js"
  },
  {
    "url": "build/p-80d51e5b.js"
  },
  {
    "url": "build/p-9a70c03b.js"
  },
  {
    "url": "main.js",
    "revision": "80fd369622bdd5781e933e3b48192ddc"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
