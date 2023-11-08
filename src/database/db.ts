require('dotenv').config();
import {Sequelize} from 'sequelize'

const sequelize = new Sequelize(
    'notificator_db',
    process.env.POSTGRES_USER as string,
    process.env.POSTGRES_PASSWORD,
    {
      host: process.env.HOST_IP,
      port: 5432,
      dialect: 'postgres',
    }
);

export default sequelize;