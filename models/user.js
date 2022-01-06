'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
   id:{
type:DataTypes.INTEGER,
allowNull:false,
primaryKey:true,
autoIncrement:true,
 },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    
    password:{
    type: DataTypes.STRING,
    allowNull: false,
    
 },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};