Room.prototype.spawn = function() {
    return
};
Room.prototype._init = function() {
    this.creeps = this.find(FIND_MY_CREEPS);
    this.spawn = this.find(FIND_MY_SPAWNS)[0];
};
Room.prototype.availableSources = function() {
    var available = []
    for (var s of this.sources){
        if (s.isAvailable() === true){
            available.push(s);
        }
    }
    return available;
};

module.exports = {
};
