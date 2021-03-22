import React from 'react';
import { lineString, featureCollection } from '@turf/helpers'

const EXPLORER_ZOOM = 14.0

export function CreateGridLines(bounds) {
    const x0 = lon2tile(bounds[1][0]);
    const x1 = lon2tile(bounds[0][0]);
    const y0 = lat2tile(bounds[0][1]);
    const y1 = lat2tile(bounds[1][1]);

    let gridLines = [];
    for (let x = x0 - 1; x <= x1 + 1; x++) {
        for (let y = y0 - 1; y <= y1 + 1; y++) {
            const bbox = this.tile2bbox(x, y)

            const myCoords = [
                [bbox.west, bbox.south],
                [bbox.west, bbox.north],
                [bbox.east, bbox.north]
            ]

            const line = lineString(myCoords);

            gridLines.push(line);
        }
    }

    return featureCollection(gridLines);        
}

lon2tile = (lon, zoom = EXPLORER_ZOOM) => {
    return Math.trunc(Math.floor((lon + 180) / 360 * Math.pow(2.0, zoom)));
}

lat2tile = (lat, zoom = EXPLORER_ZOOM) => {
    return Math.trunc(Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2.0, zoom)));
}

tile2lon = (x, z = EXPLORER_ZOOM) => {
    return x / Math.pow(2.0, z) * 360.0 - 180;
}

tile2lat = (y, z = EXPLORER_ZOOM) => {
    const n = Math.PI - 2.0 * Math.PI * y / Math.pow(2.0, z);
    return toDegrees(Math.atan(Math.sinh(n)));
}

tile2bbox = (x, y, zoom = EXPLORER_ZOOM) => {
    return {
        north: tile2lat(y, zoom),
        south: tile2lat(y + 1, zoom),
        west: tile2lon(x, zoom),
        east: tile2lon(x + 1, zoom)
    }
}

toDegrees = (radians) => {
    return (radians * 180) / Math.PI;
}