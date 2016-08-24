var settings = require('settings');
module.exports = {
    levels: ['DEBUG', 'INFO', 'ERROR'],
    // ensure there is no more than 3 creeps workingon the same spot

    info: function(message){
        return this.log('INFO', message);
    },
    debug: function(message){
        return this.log('DEBUG', message);
    },
    error: function(message){
        return this.log('ERROR', message);
    },
    log: function(level, message){
        if (this.propagate(level)){
            console.log('[' + level + '] ' + message);
        }
    },
    propagate: function(level){
        var remaining = this.levels.indexOf(settings.logLevel);
        var levels = this.levels.slice(remaining);
        return levels.indexOf(level) > -1;
    },

};
