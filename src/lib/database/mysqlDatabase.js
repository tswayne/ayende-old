var Sequelize = require('sequelize');
var host = process.env.DBHOST || 'localhost';
var dbName = process.env.DBNAME || 'local';
var dbUser = process.env.DBUSER || 'root';
var dbPassword = process.env.DBPW || '';

var sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    timestamps: false
  }
});

module.exports.User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true
});

module.exports.Location = sequelize.define('location', {
  xCoordinate: {
    type: Sequelize.INTEGER
  },
  yCoordinate: {
    type: Sequelize.INTEGER
  }
}, {
  freezeTableName: true
});

module.exports.Troops = sequelize.define('troops', {
  type: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true
});

module.exports.Resources = sequelize.define('resources', {
  type: Sequelize.STRING
});


module.exports.sequelize = sequelize;

module.exports.initializeAccount = function() {

  var User = exports.User;

  var Location = exports.Location;

  var Troops = exports.Troops;

  var LocationsTroops = sequelize.define('locationsTroops', {
    amount: Sequelize.INTEGER
  });

  var Attacks = sequelize.define('attacks', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    started: Sequelize.DATE
  });

  var AttackingTroops = sequelize.define('attackingTroops', {
    amount: Sequelize.INTEGER
  });

  var Resources = module.exports.Resources;

  var LocationsResources = sequelize.define('locationsResources', {
    ammount: Sequelize.INTEGER
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
  sequelize.sync();              //--uncomment and comment force: true to keep local data
  //sequelize.sync({force: true}).then(function(){
  //  require('./provision').provision();
  //});
};
