const getLocation = (sequelize, { DataTypes }) => {
  const Location = sequelize.define('location', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Location.associate = (models) => {
    Location.belongsTo(models.Organization);
  };

  return Location;
};

export default getLocation;
