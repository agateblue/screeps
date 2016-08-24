module.exports = {
    // ensure there is no more than 3 creeps workingon the same spot

    scan: function(room, terrain, x, y, size){
        // return the tiles count of the given terrain type in given area around
        // given coordinates
        var tiles = [];
        for (var xOffset = -size; xOffset <= size; xOffset++) {
            for (var yOffset = -size; yOffset <= size; yOffset++) {
                var r = room.lookForAt('terrain', x + xOffset, y + yOffset);
                if (r == terrain){
                    tiles.push(r);
                }
            }
        }
        return tiles.length;
    }
};
