const { DataTypes, Sequelize } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          // agregamos validaciones para que cumplan ciertos requisitos
          notEmpty: true,
          len: [1, 60],
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // agregamos validaciones para que cumplan ciertos requisitos
          notEmpty: true,
          isUrl: true,
        },
      },
      attack: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          // agregamos validaciones para que cumplan ciertos requisitos
          notEmpty: true,
          min: 1, // Debe ser al menos 1
          max: 150, // No puede superar 150
        },
      },
      defense: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          // agregamos validaciones para que cumplan ciertos requisitos
          notEmpty: true,
          min: 1, // Debe ser al menos 1
          max: 150, // No puede superar 150
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          // agregamos validaciones para que cumplan ciertos requisitos
          notEmpty: true,
          min: 1, // Debe ser al menos 1
          max: 150, // No puede superar 150
        },
      },
      created: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
