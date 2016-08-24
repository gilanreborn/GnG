// global tilde objects
(function () {
  if ( typeof GnG === "undefined" ) { window.GnG = {}; }

  var Data = GnG.Data = {
    metaType: {},

    stageTypes: {
      DESERT: { default: 'FLOOR', featureCount: 1,
        typeMap: { FLOOR: 'SAND', WALL: 'ROCK' },
        features: {
          keys: ['ROCKS', 'OASIS', 'CACTUS'],
          ROCKS: { size: 3, tileType: 'WALL', subFeatures: { CACTUS: 3 } },
          OASIS: { size: 3, tileType: 'WATER', subFeatures: { CACTUS: 3 } },
          CACTUS: { size: 1, tileType: 'PLANT', subFeatures: false },
        },
        enemies: {
          keys: ['LIZARD', 'SNAKE', 'GOBLIN', 'GOBLIN_WARBAND'],
          LIZARD: {},
          SNAKE: {},
          GOBLIN: {},
        }
      },
      CAVE: { default: 'WALL', features: 2 },
      forest: {},
      desert: {

      },
      mountain: {},
      plains: {},
      swamp: {},
      water: {},
    },

    tileSampler: {}
  };

})();
