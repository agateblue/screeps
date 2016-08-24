
module.exports = {
    schedule: function(){
        var data = Memory.tasks;
        console.log('Last task id was ' + data.count + ', currently, there are ' + data.registered.length + ' registered tasks');
        var unassignedTasks = _.filter(data.registered, (task) => !task.runner);
        var idleCreeps = _.filter(Game.creeps, (creep) => !creep.currentTask && creep.memory.runTasks);

        for (var idx in idleCreeps){
            console.log(idx)
            var creep = unassignedTasks[idx];
            var task = unassignedTasks[idx];


        }
    }
};
