const getOrganization = (sequelize, { DataTypes }) => {
  const Organization = sequelize.define('organization', {
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Organization.associate = (models) => {
    Organization.hasMany(models.Event, { onDelete: 'CASCADE' });
    Organization.hasMany(models.Location, { onDelete: 'CASCADE' });
  };

  return Organization;
};

export default getOrganization;
