import sequelize from "./db";
import { DataTypes, Model } from "sequelize";

class User extends Model {
  public id!: number; // Здесь id должен быть числовым полем
  public username!: string;
  public password!: string;
}

const UserModel = sequelize.define('user', {
  id: {type: DataTypes.STRING, unique: true, primaryKey: true, allowNull: false},
  name: {type: DataTypes.STRING},
  username: {type: DataTypes.STRING},
  program: {type: DataTypes.STRING},
  temp: {type: DataTypes.STRING},
  presetIsActive: {type: DataTypes.BOOLEAN, defaultValue: true},
  lastInlineMessageId: {type: DataTypes.INTEGER},
  isActive: {type: DataTypes.BOOLEAN},
  preset: {type: DataTypes.JSON, defaultValue: {"К2":[],"К3":["К2","К4"],"К4":[],"К5":["К2","К4","К3"],"К6":[],"К7":[],"К8":["К7","К9"],"К9":[],"К12":["К13"],"К13":[],"К14":[],"К15":[],"К16":["К17"],"К17":[],"К20":["К22","К23"],"К22":["К23"],"К23":[],"К24":["К25","К26"],"К25":["К26"],"К26":[],"К29":["К12","К13"], 'К10':["К7","К9", "К8"]}},
  
}, {timestamps: false})

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Добавляем это для автоинкремента
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize, // Передаем экземпляр Sequelize
    modelName: 'desktopUser', // Название модели
    timestamps: false
  }
);

sequelize.sync();
export default User;