const creepSpawner = {
  /** @param {Creep} creep **/
  run: function(creep) {
    // Minimum number of workers
    const minimumNumberOfHarvesters = 10;
    const minimumNumberOfUpgraders = 5;
    const minimumNumberOfBuilders = 4;
    const minimumNumberOfRepairers = 1;
    const minimumNumberOfWallRepairers = 1;

    // Checks for number of different type of workers
    const numberofHarvesters = _.sum(
      Game.creeps,
      c => c.memory.role === "harvester"
    );
    const numberofUpgraders = _.sum(
      Game.creeps,
      c => c.memory.role === "upgrader"
    );
    const numberofBuilders = _.sum(
      Game.creeps,
      c => c.memory.role === "builder"
    );
    const numberofRepairers = _.sum(
      Game.creeps,
      c => c.memory.role === "repairer"
    );
    const numberofWallRepairers = _.sum(
      Game.creeps,
      c => c.memory.role === "wallrepairer"
    );

    let newName = undefined;

    // Creates creeps depending on needs
    if (numberofHarvesters < minimumNumberOfHarvesters) {
      newName = Game.spawns.Spawn1.createCreep(
        [WORK, WORK, CARRY, MOVE],
        `Harvester_${Game.time.toString()}`,
        { role: "harvester" }
      );
    } else if (numberofUpgraders < minimumNumberOfUpgraders) {
      newName = Game.spawns.Spawn1.createCreep(
        [WORK, CARRY, MOVE, MOVE],
        `Upgrader_${Game.time.toString()}`,
        { role: "upgrader" }
      );
    } else if (numberofRepairers < minimumNumberOfRepairers) {
      newName = Game.spawns.Spawn1.createCreep(
        [WORK, WORK, CARRY, MOVE],
        `Repairer_${Game.time.toString()}`,
        { role: "repairer" }
      );
      nameCounterRepairers++;
    } else if (numberofWallRepairers < minimumNumberOfWallRepairers) {
      newName = Game.spawns.Spawn1.createCreep(
        [WORK, WORK, CARRY, MOVE],
        `WallRepairer_${Game.time.toString()}`,
        { role: "wallrepairer" }
      );
    } else {
      newName = Game.spawns.Spawn1.createCreep(
        [WORK, CARRY, MOVE, MOVE],
        `Builder_${Game.time.toString()}`,
        { role: "builder" }
      );
    }
  }
};

module.exports = creepSpawner;
