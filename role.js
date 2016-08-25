
Creep.prototype.pickSource = function(target) {
    var available = this.room.availableSources();
    if (available.length == 0){
        return null;
    }
    this.memory.energySource = available[0].id;
    return available[0];
};
Creep.prototype.releaseSource = function(target) {
    this.memory.energySource = null;
};
Creep.prototype.getSource = function(target) {
    var s = this.memory.energySource;
    if (!!s){
        var source = Game.getObjectById(s);
        if (!!source.isAvailable()){
            return source;
        } else {
            this.releaseSource();
        }
    }
    s = this.pickSource(target);
    if (!s){
        this.sleep(15);
    }
    return s;
};
Creep.prototype.wait = function() {
    this.moveTo(this.room.spawn);
};
Creep.prototype.harvestEnergy = function(target) {
    var source = this.getSource(target);
    var harvest = this.harvest(source);
    if(harvest == ERR_NOT_IN_RANGE) {
        this.moveTo(source);
    }
};
Creep.prototype.sleep = function(duration) {
    this.memory.sleep = duration;
    this.say('Sleep ' + duration);

};

var _roles = {
    "harvester": require('role.harvester'),
    "upgrader": require('role.upgrader'),
    "builder": require('role.builder'),
}

module.exports = {

    run: function(room) {
        for(var creep of room.creeps) {
            if (creep.memory.sleep > 0){
                creep.memory.sleep -= 1;
                continue;
            }
            if (!!creep.memory.role){
                var role = _roles[creep.memory.role]
                role.run(creep)
            }
        }
	}
};
