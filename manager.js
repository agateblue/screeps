var settings = require('settings');
var log = require('log');

module.exports = {
    run: function(room) {
        this.disable(room);
        this.reassign(room);
        this.create(room);
	},
    disable: function(room){
        var _this = this;
        this.getRolesConf().forEach(function(conf){
            var existing = _this.getCreepsByRole(room, conf.role);
            var excedentCount = existing.length - conf.quantity;
            if (excedentCount > 0){
                log.info('Too many creeps with role ' + conf.role + ': ' + excedentCount + ' excedent.');
                var excedent = existing.slice(0, excedentCount);
                for (var creep of excedent){
                    _this.disableCreep(creep);
                }
            }
        });
    },
    disableCreep: function(creep){
        creep.memory.role = null;
    },
    assign: function(creep, role){
        creep.memory.role = role;
    },
    reassign: function(room){
        var _this = this;
        var disabled = _this.getCreepsByRole(room, null);
        if (disabled === 0){
            return;
        }
        var reassigned = 0;
        this.getRolesConf().forEach(function(conf){
            var existing = _this.getCreepsByRole(room, conf.role);
            var missing = conf.quantity - existing.length;
            if (missing <= 0){
                return;
            }
            for (var i = 0; i < missing; i++){
                if (disabled.length <= 0){
                    return;
                }
                var c = disabled[0];
                _this.assign(c, conf.role);
                reassigned++;
                disabled.splice(0, 1);
            }
        });
        if (reassigned > 0){
            log.info(reassigned + ' creeps reassigned!');
        }
    },
    getCreepsByRole: function(room, role){
        return _.filter(room.creeps, (creep) => creep.memory.role == role);
    },
    getRolesConf: function(){
        return settings.creeps.required.sort(function(a, b){
            return b.priority - a.priority
        });
    },
    create: function(room){
        if (room.energyAvailable < room.energyCapacityAvailable){
            return;
        }
        var remaining = room.energyCapacityAvailable;
        var template = this.getCreepTemplate(room);
        var required = this.getRolesConf();
        for (var conf of required){
            var existing = this.getCreepsByRole(room, conf.role);
            if (existing.length < conf.quantity){
                if (remaining < template.cost){
                    break;
                }
                var result = room.spawn.createCreep(template.parts, undefined, {role: conf.role});
                if (typeof result === 'string') {
                    log.info('Creep ' + result + ' created with role ' + conf.role);
                }
                remaining -= template.cost;
            }
        }
    },
    getCreepTemplate: function(room){
        var energy = room.energyAvailable;
        var costs = settings.parts.costs;
        var template = settings.parts.templates.worker;
        var parts = [];
        var goOn = true;
        var iterations = 0;
        var minimumCost = 0;
        for (var part of template.parts){
            var cost = costs[part];
            minimumCost += cost;
            parts.push(part);
        }
        if (minimumCost > energy){
            log.error('Cannot build minimal template, not enough energy');
        }
        var currentCost = minimumCost;

        while (goOn){
            for (var part of template.parts){
                var cost = costs[part];
                if (currentCost + cost > energy){
                    goOn = false;
                    continue;
                }
                currentCost += cost;
                parts.push(part);
            }
        }
        return {cost: currentCost, parts: parts};
    }
};
