var terrain = require('terrain');
Object.defineProperty(Source.prototype, 'memory', {
    get: function() {
        if(_.isUndefined(Memory.sources)) {
            Memory.sources = {};
        }
        if(!_.isObject(Memory.sources)) {
            return undefined;
        }
        return Memory.sources[this.id] = Memory.sources[this.id] || {};
    },
    set: function(value) {
        if(_.isUndefined(Memory.sources)) {
            Memory.sources = {};
        }
        if(!_.isObject(Memory.sources)) {
            throw new Error('Could not set source memory');
        }
        Memory.sources[this.id] = value;
    }
});

Source.prototype.available = function() {
    return this.find(FIND_MY_SPAWNS)[0];
};

Source.prototype.creeps = function() {
    return _.filter(this.room.creeps, (creep) => creep.memory.energySource == this.id);
};
Source.prototype.getAdjacentTiles = function() {

    var x = this.pos.x;
    var y = this.pos.y;
    var tiles = [];
    tiles.push(this.room.lookForAt('terrain', x - 1, y -1));
    tiles.push(this.room.lookForAt('terrain', x, y - 1));
    tiles.push(this.room.lookForAt('terrain', x + 1, y -1));
    tiles.push(this.room.lookForAt('terrain', x - 1, y));
    tiles.push(this.room.lookForAt('terrain', x + 1, y));
    tiles.push(this.room.lookForAt('terrain', x - 1, y +1));
    tiles.push(this.room.lookForAt('terrain', x, y + 1));
    tiles.push(this.room.lookForAt('terrain', x + 1, y +1));
    return tiles
};

Source.prototype._computeCreepCapacity = function() {
    return terrain.scan(this.room, 'plain', this.pos.x, this.pos.y, 1)
};

Source.prototype.isAvailable = function() {

    if (!!this.isForbidden()){
        return false;
    }
    return this.creepCapacity >= this.creeps().length;
};
Source.prototype.isForbidden = function() {
    var hostile = this.pos.findInRange(FIND_HOSTILE_CREEPS, 5);
    if (hostile.length > 0){
        return true;
    }
    return terrain.scan(this.room, 'swamp', this.pos.x, this.pos.y, 4) > 0;
};

Source.prototype._init = function() {
    this.creepCapacity = this._computeCreepCapacity();
};

module.exports = {
    // ensure there is no more than 3 creeps workingon the same spot

    energy: {
        init: function(room){
            var sources = room.find(FIND_SOURCES);
            var realSources = [];
            sources.forEach(function(source){
                source._init();
                realSources.push(source);
            });
            return realSources;
        }
    }
};
