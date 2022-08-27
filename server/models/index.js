import 'dotenv/config';
import Sequelize from 'sequelize';
import getOrganization from './organization.js';

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
};

export { sequelize };
export default models;
