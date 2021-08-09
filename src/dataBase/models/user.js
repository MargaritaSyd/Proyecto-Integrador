module.exports = function(sequelize, dataTypes)
 {
     const alias = "user";
     const cols = {
         id: {
             type: dataTypes.INTEGER,
             primaryKey: true,
             autoIncrement: true,
             allowNull: false
         },
         email: {
            type: dataTypes.STRING,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        user_name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        lastNameUser: {
            type: dataTypes.STRING,
            allowNull: false
        },
        user_image: {
            type: dataTypes.STRING,
            allowNull: true
        }
         
         
     };
     const config = {
         tableName: "user",
         timeStamps: true,
     };
     const product = sequelize.define(alias, cols, config);
      user.associate = (models) => {
          user.hasMany(models.category, {
              as: "order",
              foreignKey: "id_user"
          }),
          user.hasMany(models.category, {
            as: "invoice",
            foreignKey: "id_user"
        }),
        user.hasMany(models.card, {
            as: "card",
            foreignKey: "id_card"
        })
      }
     return product

 }