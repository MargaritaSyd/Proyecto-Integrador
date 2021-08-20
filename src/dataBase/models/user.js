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
        lastName_user: {
            type: dataTypes.STRING,
            allowNull: false
        },
        user_image: {
            type: dataTypes.STRING,
            allowNull: true
        },
        admin: {
            type: dataTypes.INTEGER
            
        }
    };
     const config = {
         tableName: "user",
         timestamps: false
     };
     const user = sequelize.define(alias, cols, config);
     return user
 }