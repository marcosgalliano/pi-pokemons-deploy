const { DataTypes } = require("sequelize");

// MODELO DE TYPES
module.exports = (sequelize) => {
  sequelize.define(
    "type",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(35), //UN MAXIMO DE 35 DIGITOS PARA NO SOBRECARGAR
        allowNull: false, // SI O SI DEBE TENER UN VALOR
        unique: true, // EL VALOR ES UNICO
      },
    },
    { timestamps: false }
  );
};
