module.exports = function(sequelize, dataTypes)
 {
     const alias = "invoice";
     const cols = {
         id: {
             type: dataTypes.INTEGER,
             primaryKey: true,
             autoIncrement: true,
             allowNull: false
         },
         number: {
            type: dataTypes.STRING,
            allowNull: false
        },
        sum: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        payment_method: {
            type: dataTypes.STRING,
            allowNull: false
        }
         
         
     };
     const config = {
         tableName: "user",
         timeStamps: true,
     };
     const product = sequelize.define(alias, cols, config);
      invoice.associate = (models) => {
          invoice.belongsTo(models.invoice, {
              as: "order",
              foreignKey: "id_invoice"
          }),
          invoice.belongsTo(models.invoice, {
            as: "user",
            foreignKey: "id_user"
        })
      }
     return invoice

 }