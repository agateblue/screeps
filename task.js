

var Task = function(conf){
    var _this = this;

    this.registry = Memory.tasks;

    this.registry.count++;
    this._memory = {
        id: _this.registry.count,
        status: 'pending',
        conf: conf,
    }
    this.getMemory = function(){
        return this._memory;
    }
    this.schedule = function(){

        Memory.tasks.registered.push(_this.getMemory());
        console.log('task ' + this.getMemory().id + ' was appended to memory');
    }
    this.delete = function(){
        var index = Memory.tasks.registered.indexOf(_this.getMemory());
        if (index > -1) {
            Memory.tasks.registered.splice(index, 1);
        }
        console.log('task ' + this.getMemory().id + ' was removed from memory');
    }
    return this;

}

module.exports = Task;


var tasks = {

}
