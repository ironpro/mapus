const express = require('express')
const cors = require('cors');
const p = require("path");
const bodyParser = require('body-parser')
const MBTiles = require('@mapbox/mbtiles');
// const MBTiles = require('mbtiles-offline')
// const db = new MBTiles('data/out.mbtiles', 'tms')
const port = 5000
const app = express();
app.use(cors());
// app.use(express.json())
// app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json())
// app.set('json spaces', 2)
app.use(bodyParser.urlencoded({extended: true}))

// Enable CORS and set correct mime type/content encoding
var header = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Content-Type": "application/x-protobuf",
    "Content-Encoding": "gzip"
};

// Route which handles requests like the following: /<mbtiles-name>/0/1/2.pbf
app.get('/tiles/:source/:z/:x/:y.pbf', function (req, res) {
    // console.log(__dirname, "/data/"+req.params.source + '.mbtiles')
    new MBTiles(p.join(__dirname,"/data/"+ req.params.source + '.mbtiles'), function (err, mbtiles) {
        mbtiles.getTile(req.params.z, req.params.x, req.params.y, function (err, tile, headers) {
            if (err) {
                res.set({"Content-Type": "text/plain"});
                res.status(404).send('Tile rendering error: ' + err + '\n');
            } else {
                res.set(header);
                res.send(tile);
            }
        });
        if (err) console.log("error opening database");
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))