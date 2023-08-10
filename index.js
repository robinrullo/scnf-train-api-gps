const http = require('http');

let previousResponse = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [0, 0],
      },
      properties: {
        altitude: 'N/A',
        fix: 'N/A',
        heading: 'N/A',
        speed: 'N/A',
        success: 'N/A',
        timestamp: 'N/A',
      },
    },
  ],
};
const getFeatureCollection = async () => {
  try {
    const res = await fetch('https://wifi.sncf/router/api/train/gps');
    const {
      altitude,
      fix,
      heading,
      latitude,
      longitude,
      speed,
      success,
      timestamp,
    } = await res.json();

    if (latitude === 0 || longitude === 0) throw new Error('GPS signal lost');

    previousResponse = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          properties: {
            altitude: `${altitude}m`,
            fix: `${fix}`, // TODO: Is this the number of satellites signals ?
            heading: `${heading}`, // TODO: This is train orientation
            speed: `${Math.round(speed * 3.6)}km/h`,
            success: `${success}`,
            timestamp: `${new Date(timestamp * 1000)}`,
          },
        },
      ],
    };
  } catch (e) {
    console.error(e);
    previousResponse.features[0].properties.success = 'false';
  }
  return previousResponse;
};

(async () => {
  const server = http.createServer(async function (_, res) {
    const featureCollection = await getFeatureCollection();
    res.writeHead(200);
    res.end(JSON.stringify(featureCollection));
  });
  const port = process.env.PORT ?? 8088;
  const host = process.env.HOST ?? 'localhost';
  server.listen(port, host, () => {
    console.info(`Server listening at ${host}:${port}`);
  });
})();
