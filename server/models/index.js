import 'dotenv/config';
import Sequelize from 'sequelize';
import getOrganization from './organization.js';
import getEvent from './event.js';
import getLocation from './location.js';

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
} = process.env;

const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    dialect: 'postgres',
  },
);

const models = {
  Organization: getOrganization(sequelize, Sequelize),
  Event: getEvent(sequelize, Sequelize),
  Location: getLocation(sequelize, Sequelize),
};

export { sequelize };
export default models;
