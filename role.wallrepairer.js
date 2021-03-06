const roleBuilder = require("role.builder");

const roleWallRepairer = {
  /** @param {Creep} creep **/
  run: function(creep) {
    if (creep.memory.building && creep.carry.energy === 0) {
      creep.memory.building = false;
      creep.say("🔄 harvest");
    }
    if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
      creep.memory.building = true;
      creep.say("🚧 build");
    }

    if (creep.memory.building) {
      // find closest constructionSite

      // find all walls in the room
      let walls = creep.room.find(FIND_STRUCTURES, {
        filter: s => s.structureType == STRUCTURE_WALL
      });

      let target = undefined;

      // loop with increasing percentages
      for (
        let percentage = 0.0001;
        percentage <= 1;
        percentage = percentage + 0.0001
      ) {
        // find a wall with less than percentage hits

        for (let wall of walls) {
          if (wall.hits / wall.hitsMax < percentage) {
            target = wall;
            break;
          }
        }

        // if there is one
        if (target != undefined) {
          // break the loop
          break;
        }
      }

      // if we find a wall that has to be repaired
      if (target != undefined) {
        // try to repair it, if not in range
        if (creep.repair(target) == ERR_NOT_IN_RANGE) {
          // move towards it
          creep.moveTo(target);
        }
      }
      // if we can't fine one
      else {
        // look for construction sites
        roleBuilder.run(creep);
      }
    } else {
      let sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    }
  }
};

module.exports = roleWallRepairer;
