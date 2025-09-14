'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "1f2266cb2e54918b643c55c8bbad3975",
"assets/AssetManifest.bin.json": "cef9c56c26d0e4f3fa2b50975637c20d",
"assets/assets/%25C3%25A9lectricit%25C3%25A9.png": "8fb6ced725b1f8166db1a5002ceb9ad6",
"assets/assets/autre1.png": "8fb6ced725b1f8166db1a5002ceb9ad6",
"assets/assets/autre2.png": "3a0f61d9ecbefb108692c24e4f57f7f6",
"assets/assets/autre3.png": "b1d057ccb75fff8839bfe06998c1681b",
"assets/assets/autre4.png": "239d58c74cabf286e06775c1921b1662",
"assets/assets/epicerie.png": "b1d057ccb75fff8839bfe06998c1681b",
"assets/assets/first.png": "a7e3f3f33b789c277c24a03124e7e358",
"assets/assets/habit1.png": "48ea09b55bb5bb96f45de4d078470ac4",
"assets/assets/habit2.png": "f9e0ef8bb7cf37b7f5a879650ba63d6b",
"assets/assets/habit3.png": "49545a81891a002b1951dbffeb59ad74",
"assets/assets/habit4.png": "40e21ff67a21e80d279d9db9c3056aeb",
"assets/assets/icons8-google-48.png": "2b24ebd392bb041f9c245b423e627a6e",
"assets/assets/Nouriture.png": "8fb6ced725b1f8166db1a5002ceb9ad6",
"assets/assets/quinc1.png": "8ed680132fe01f8ba060a6c7f856c6d9",
"assets/assets/quinc2.png": "91ddd11b8146534d4dc682f900ecdb63",
"assets/assets/quinc3.png": "4b210b6a15eb98967e7b1f47670e4ad5",
"assets/assets/quinc4.png": "b4f6ea1ec4c8f7a942f21751d6caef8f",
"assets/assets/quincaillerie.png": "48ea09b55bb5bb96f45de4d078470ac4",
"assets/assets/second.png": "de8e47a10e388923dfa4548cc567473f",
"assets/assets/third.png": "2b24ebd392bb041f9c245b423e627a6e",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/fonts/MaterialIcons-Regular.otf": "e504603d789d04e31fe891aee62de2a7",
"assets/NOTICES": "66150e9f6b9cbc8861e07d3ef5eab0ec",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "140ccb7d34d0a55065fbd422b843add6",
"canvaskit/canvaskit.js.symbols": "4758a5c271cb5f89bdf17909e8077daa",
"canvaskit/canvaskit.wasm": "a84638bda3ae33d68a35859621178a4d",
"canvaskit/chromium/canvaskit.js": "5e27aae346eee469027c80af0751d53d",
"canvaskit/chromium/canvaskit.js.symbols": "9ab0bf2146ee8f138b86e867f347b3cf",
"canvaskit/chromium/canvaskit.wasm": "47fbc070b1764e4dd5b1749b68dac326",
"canvaskit/skwasm.js": "1ef3ea3a0fec4569e5d531da25f34095",
"canvaskit/skwasm.js.symbols": "11f1db856cf8668dc644d6c5fc545bd3",
"canvaskit/skwasm.wasm": "dcc34ed8d0596e795dd920f2fc7ac3c9",
"canvaskit/skwasm_heavy.js": "413f5b2b2d9345f37de148e2544f584f",
"canvaskit/skwasm_heavy.js.symbols": "065949b9c8e4b1fa47012d016671d2d1",
"canvaskit/skwasm_heavy.wasm": "4c5128b31cb77dc87e3bba740bfc5329",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "888483df48293866f9f41d3d9274a779",
"flutter_bootstrap.js": "844b8c959a7eaf9437ff91c07965df73",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "780a3b5e9035584bbd3fec804837380f",
"/": "780a3b5e9035584bbd3fec804837380f",
"main.dart.js": "7fb9cc84e8dd427d78e80087d0bd0fac",
"manifest.json": "f0451640ca59398e8578a8cc1d2074e8",
"version.json": "6020bc3f34ffa584c24800f8f5471f59"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
