module.exports = function(sequelize, dataTypes)
 {
     const alias = "order";
     const cols = {
         id: {
             type: dataTypes.INTEGER,
             primaryKey: true,
             autoIncrement: true,
             allowNull: false
         },
         unitary_price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        sale_price: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
         
         
     };
     const config = {
         tableName: "user",
         timeStamps: true,
     };
     const product = sequelize.define(alias, cols, config);
      order.associate = (models) => {
          order.belongsTo(models.order, {
              as: "user",
              foreignKey: "id_user"
          }),
          order.belongsTo(models.order, {
            as: "product",
            foreignKey: "id_product"
        }),
        order.belongsTo(models.order, {
            as: "invoice",
            foreignKey: "id_invoice"
        })

      }
     return order

 }