module.exports = function(sequelize, dataTypes)
 {
     const alias = "category";
     const cols = {
         id: {
             type: dataTypes.INTEGER,
             primaryKey: true,
             autoIncrement: true,
             allowNull: false
         },
         name: {
            type: dataTypes.STRING,
            allowNull: false
        }, 
     };
     const config = {
         tableName: "category",
         timeStamps: false,
     };
     const category = sequelize.define(alias, cols, config);
     category.associate = (models) => {
         category.hasMany(models.product, {
             as: "product",
             foreignKey: "id_category"
         })
     }
     return category

 }