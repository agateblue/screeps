module.exports = {
    logLevel: 'INFO',
    creeps: {
        required: [
            {role: 'harvester', quantity: 2, priority: 2, parts: [WORK, WORK, CARRY, MOVE]},
            {role: 'builder', quantity: 3, priority: 1, parts: [WORK, WORK, CARRY, MOVE]},
            {role: 'upgrader', quantity: 0, priority: 1, parts: [WORK, WORK, CARRY, MOVE]},
        ],
        profiles: {
            harvester: {
                // preferredLocation: Game.flags['harvest'],
            },
        },
    },

    spawn: Game.spawns['Spawn1'],
};
