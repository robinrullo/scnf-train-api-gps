# SNCF Realtime Train position (on travel)

Small nodejs dependencies-free server used to track the train on a Map (In QGIS using vector source). This server adapt Train GPS response to a GeoJSON feature and handle GPS connections losts by sending previous trusted GPS signal.

## How to use
Clone the repository and run `npm start` (or node index.js). Because of using the new Fetch API, this server requires NodeJS > 18.

## Configuration

| ENV  | Description           |
|------|-----------------------|
| PORT | Server listening port |
| HOST | Server listening host |