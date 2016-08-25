var log = require('log');
var terrain = require('terrain');

module.exports = {
    // Harvest energy and carry it to Spawn / Buildings
    /** @param {Creep} creep **/
    run: function(room) {
	    this.scheduleExtensions(room);
	},
    scheduleExtensions: function(room){
        var pending = _.filter(room.find(FIND_CONSTRUCTION_SITES), (site) => site.structureType == STRUCTURE_EXTENSION);
        if (pending.length > 0){
            // we don't want to build too many extensions at once
            return;
        }
        var pos = this.findExtensionSpot(room);
        if (!pos){
            return log.debug('No place to build energy extension');
        }

        var build = room.createConstructionSite(pos, STRUCTURE_EXTENSION);

        // we try to build one, if possible
        if (build != ERR_RCL_NOT_ENOUGH){
            log.info('Scheduled extension build at ' + pos.x + '-' + pos.y);
        }
    },
    findExtensionSpot: function(room){
        var spawn = room.spawn;
        var pos = terrain.findClosestBuildable(spawn);
        return pos
    },
};
