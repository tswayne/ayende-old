var Sequelize = require('sequelize');
var db = require('../../init/db');

module.exports.User = db.define('user', {
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true
});

module.exports.Location = db.define('location', {
  xCoordinate: {
    type: Sequelize.INTEGER
  },
  yCoordinate: {
    type: Sequelize.INTEGER
  }
}, {
  freezeTableName: true
});

module.exports.Troops = db.define('troops', {
  type: {
    type: Sequelize.STRING
  },
  cost: {
    type: Sequelize.INTEGER
  }
}, {
  freezeTableName: true
});

module.exports.Resources = db.define('resources', {
  type: Sequelize.STRING
});

module.exports.Attacks = db.define('attacks', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  started: Sequelize.DATE
});

module.exports.initializeAccount = function(provisionDatabase) {

  var User = exports.User;

  var Location = exports.Location;

  var Troops = exports.Troops;

  var LocationsTroops = db.define('locationsTroops', {
    amount: Sequelize.INTEGER
  });

  var Attacks = exports.Attacks;

  var AttackingTroops = db.define('attackingTroops', {
    amount: Sequelize.INTEGER
  });

  var Resources = module.exports.Resources;

  var LocationsResources = db.define('locationsResources', {
    amount: Sequelize.INTEGER
  });

  Resources.belongsToMany(Location, {through: LocationsResources});
  Location.belongsToMany(Resources, {through: LocationsResources});
  Location.belongsToMany(Location, {as: 'Attacker', through: Attacks, foreignKey: 'attackerId'});
  Location.belongsToMany(Location, {as: 'Target', through: Attacks, foreignKey: 'targetId'});
  Troops.belongsToMany(Attacks, {through: AttackingTroops});
  Troops.belongsToMany(Location, { through: LocationsTroops});
  Location.belongsToMany(Troops, { through: LocationsTroops});
  Location.hasMany(Attacks);
  User.hasMany(Location);

  if (provisionDatabase) {
    db.sync({force: true}).then(function(){
      require('./provision').provision();
    });
  } else {
    db.sync();
  }

};
