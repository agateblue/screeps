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
    },
    findClosestBuildable: function(target){
        var distance = 1;
        var toScan = [];
        var refX = target.pos.x;
        var refY = target.pos.y;
        while (distance <= 3){
            for (var x = -distance; x <= distance; x++) {
                for (var y = -distance; y <= distance; y++) {
                    if (Math.abs(x) < distance && Math.abs(y) < distance){
                        continue;
                    }
                    var pos = target.room.getPositionAt(refX + x, refY + y);
                    var buildable = this.isBuildable(pos);
                    if (buildable){
                        return pos;
                    }
                }
            }
            distance += 1;
        }
        return;
    },
    isBuildable: function(pos){
        var data = pos.look();

        for (var obj of data){
            if (obj.type === 'terrain' && obj.terrain != 'plain'){
                return false;
            }
            if (obj.type === 'structure'){
                return false;
            }
        }
        return true;
    }
};
