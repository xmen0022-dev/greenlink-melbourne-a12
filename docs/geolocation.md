# Green Spaces map and geolocation

The Green Spaces page uses Leaflet with OpenStreetMap raster tiles. It does not
require a map API key. OpenStreetMap attribution remains visible in the map.

## Integrated features

- Twelve Firestore-backed locations are plotted from latitude and longitude.
- Name, suburb, and type filters immediately update markers and map bounds.
- Marker popups show a safe text-only summary and link to the routed detail page.
- Browser geolocation displays the user's position and reported accuracy radius.
- Haversine distance is calculated from the user to every matching green space.
- Map cards and the interactive table are sorted nearest-first after locating.
- Distance values remain sortable in Table View.
- Permission denial, unavailable position, timeout, and unsupported browsers have
  non-blocking status messages.
- Clearing location removes the position from memory and restores catalog order.

The location is used only in the current browser session. It is not written to
Firestore, local storage, analytics, or application logs.

## Automated verification

```sh
npm run test:geo
npm run build
```

The unit tests cover coordinate validation, Haversine distance, short-distance
formatting, and incomplete input. The Vite build verifies the Vue and Leaflet
integration.

## Manual verification

1. Sign in and open `/green-spaces` over localhost or HTTPS.
2. Confirm all matching locations appear on the real map.
3. Search for `Carlton` and confirm markers and bounds update.
4. Select **Use my location** and allow browser location access.
5. Confirm the blue position marker, accuracy circle, distances, and nearest-first
   order appear.
6. Switch between Map, List, and Table views and confirm the same filtered order.
7. Deny location once and confirm the page remains usable with a clear message.

## References

- [Leaflet quick start](https://leafletjs.com/examples/quick-start/)
- [OpenStreetMap tile usage policy](https://operations.osmfoundation.org/policies/tiles/)
