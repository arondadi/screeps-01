const roleHarvester = require("role.harvester");
const roleUpgrader = require("role.upgrader");
const roleBuilder = require("role.builder");
//const roleRepairer = require("role.repairer");
//const roleWallRepairer = require("role.wallrepairer");
const spawnCreep = require("spawning");

module.exports.loop = function() {
  // clear memory
  for (let name in Memory.creeps) {
    if (Game.creeps[name] === undefined) {
      delete Memory.creeps[name];
    }
  }
  for (let name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.role == "harvester") {
      roleHarvester.run(creep);
    }
    if (creep.memory.role == "upgrader") {
      roleUpgrader.run(creep);
    }
    if (creep.memory.role == "builder") {
      roleBuilder.run(creep);
    }
    // if (creep.memory.role == "repairer") {
    //   roleRepairer.run(creep);
    // }
    // if (creep.memory.role == "wallrepairer") {
    //   roleWallRepairer.run(creep);
    // }
  }
  spawnCreep.run(creep);
};

// Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester1' );

//Spaw new and set role
//Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Builder1', { memory: { role: 'builder' } } );

//Upgrade memory role
//Game.creeps.Harvester3.memory = {role: 'upgrader'}
