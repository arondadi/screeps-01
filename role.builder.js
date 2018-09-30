const roleHarvester = require("role.harvester");

const roleBuilder = {
  /** @param {Creep} creep **/
  run: function(creep) {
    if (creep.memory.building && creep.carry.energy == 0) {
      creep.memory.building = false;
      creep.say("🔄 harvest");
    }
    if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
      creep.memory.building = true;
      creep.say("🚧 build");
    }

    if (creep.memory.building) {
      // find closest constructionSite
      const constructionSite = creep.pos.findClosestByPath(
        FIND_CONSTRUCTION_SITES
      );
      // if one is found
      if (constructionSite !== undefined) {
        // try to build, if the constructionSite is not in range
        if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
          // move towards the constructionSite
          creep.moveTo(constructionSite, {
            visualizePathStyle: { stroke: "#ffffff" }
          });
        }
      } else if (constructionSite === undefined) {
        // If no construction sites:
        roleHarvester.run(creep);
      }
    } else {
      let sources = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
      if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources, { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    }
  }
};

module.exports = roleBuilder;
