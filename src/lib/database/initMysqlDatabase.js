var Sequelize = require('sequelize');
var host = process.env.DBHOST || 'localhost';
var dbName = process.env.DBNAME || 'local';
var dbUser = process.env.DBUSER || 'root';
var dbPassword = process.env.DBPW || '';

module.exports = function() {
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

  var User = sequelize.define('user', {
    userName: {
      type: Sequelize.STRING
    },
    passWord: {
      type: Sequelize.STRING
    }
  }, {
    freezeTableName: true
  });

  var Location = sequelize.define('location', {
    xCoordinate: {
      type: Sequelize.INTEGER
    },
    yCoordinate: {
      type: Sequelize.INTEGER
    }
  }, {
    freezeTableName: true
  });

  var Troops = sequelize.define('troops', {
    type: {
      type: Sequelize.STRING
    }
  }, {
    freezeTableName: true
  });

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

  var Resources = sequelize.define('resources', {
    type: Sequelize.STRING
  });

  var LocationsResources = sequelize.define('locationsResources', {
    ammount: Sequelize.INTEGER
  });

  Resources.belongsToMany(Location, {through: LocationsResources});
  Location.belongsToMany(Location, {as: 'Attacker', through: Attacks, foreignKey: 'attackerId'});
  Location.belongsToMany(Location, {as: 'Target', through: Attacks, foreignKey: 'targetId'});
  Troops.belongsToMany(Attacks, {through: AttackingTroops});
  Troops.belongsToMany(Location, { through: LocationsTroops});
  Location.hasMany(Attacks);
  User.hasMany(Location);
  sequelize.sync();
  //sequelize.sync({force: true});
};
