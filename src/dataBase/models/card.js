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
         dni: {
            type: dataTypes.STRING,
            allowNull: false
        }, 
        card_number: {
            type: dataTypes.STRING,
            allowNull: false
        }, 
        card_holder: {
            type: dataTypes.STRING,
            allowNull: false
        }, 
        ccv: {
            type: dataTypes.STRING,
            allowNull: false
        }, 
        valid_till: {
            type: dataTypes.DATE,
            allowNull: false
        }, 
     };
     const config = {
         tableName: "category",
         timeStamps: true,
     };
     const category = sequelize.define(alias, cols, config);
     category.associate = (models) => {
         category.hasMany(models.user, {
             as: "user",
             foreignKey: "id_category"
         })
     }
     return card

 }