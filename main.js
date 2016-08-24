var settings = require('settings');
var manager = require('manager');
var log = require('log');
var _sources = require('sources');
var clean = require('clean');
var _room = require('room');
var role = require('role');
var task = require('task');
var scheduler = require('scheduler');


module.exports.loop = function () {
    clean.run();
    var startCpu = Game.cpu.getUsed();
    for(var r in Game.rooms) {
        var room = Game.rooms[r];
        room._init();
        room.sources = _sources.energy.init(room);
        manager.run(room);
        role.run(room);
    }
    log.debug('Cpu used at the end of the loop: ' + (Game.cpu.getUsed() - startCpu) );
    // t = task({type: 'harvest'});
    // // t.schedule()
    // // // t.delete()
    // scheduler.schedule();
}
