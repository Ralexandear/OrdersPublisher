require('dotenv').config();

// import exp from 'constants';
import { DataTypes ,Model, Sequelize} from 'sequelize'
// import sequilize from 'sequelize'

const sequelize = new Sequelize(
    'notificator_db',
    process.env.POSTGRES_USER as string,
    process.env.POSTGRES_PASSWORD,
    {
      host: process.env.HOST_IP,
      port: 5432,
      dialect: 'postgres',
    }
)

class User extends Model {
  public id!: number; // Здесь id должен быть числовым полем
  public username!: string;
  public password!: string;
}

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


