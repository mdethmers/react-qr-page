const routes = require('next-routes')();

routes.add('/infoPages/POIinfo/:id/:poiName', '/infoPages/POIinfo')
routes.add('/infoPages/QRinfo/:id', '/infoPages/QRinfo')


module.exports = routes;