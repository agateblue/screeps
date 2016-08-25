module.exports = {
    logLevel: 'INFO',
    parts: {
        costs: {
            "move": 50,
            "work": 100,
            "carry": 50,
            "attack": 80,
            "ranged_attack": 200,
            "heal": 250,
            "claim": 600,
            "tough": 10,
        },
        templates: {
            worker: {
                parts: [WORK, MOVE, MOVE, CARRY, CARRY],
            }
        }
    },
    creeps: {
        required: [
            {role: 'harvester', quantity: 2, priority: 3, parts: [WORK, WORK, CARRY, MOVE]},
            {role: 'upgrader', quantity: 1, priority: 2, parts: [WORK, WORK, CARRY, MOVE]},
            {role: 'builder', quantity: 2, priority: 1, parts: [WORK, WORK, CARRY, MOVE]},
        ],
        profiles: {
            harvester: {
                // preferredLocation: Game.flags['harvest'],
            },
        },
    },

    spawn: Game.spawns['Spawn1'],
};
