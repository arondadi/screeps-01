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
      }
    } else {
      let sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    }
  }
};

module.exports = roleBuilder;
