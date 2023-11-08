import sequelize from './db';
import DataTypes from 'sequelize';



const Points = sequelize.define('points',{
    id:  {type: DataTypes.INTEGER, unique: true, primaryKey: true, allowNull: false},
    point: {type: DataTypes.STRING, unique: true},
    morning: {type: DataTypes.STRING},
    evening: {type: DataTypes.STRING},
    morningListeners: {type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: []},
    eveningListeners: {type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: []}
},{timestamps: false})

const Centers = sequelize.define('newcenters', {
  id: {type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true},
  link: {type: DataTypes.STRING},
  address: {type: DataTypes.STRING},
  latitude: {type: DataTypes.DOUBLE},
  longitude: {type: DataTypes.DOUBLE},
  region: {type: DataTypes.STRING},
  letter: {type: DataTypes.STRING},
  house: {type: DataTypes.STRING},
  building: {type: DataTypes.STRING},
  cityType: {type: DataTypes.STRING},
  cityName: {type: DataTypes.STRING},
  streetType:  {type: DataTypes.STRING},
  worktime:  {type: DataTypes.STRING},
  schedule:  {type: DataTypes.JSON},
},{timestamps: false});

sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

module.exports = {UserModel, Points, Centers};

// (async () => {
//   const users = await UserModel.findAll()
//   users.forEach(e => {
//     e.preset['К10'] = ["К7","К9", "К8"]
//     e._changed.add('preset')
//     e.save()
//   })
// })()