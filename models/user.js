const { Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // define association here
          } 
    }
    User.init({
        old_id : DataTypes.STRING, //BINARY(16) NULL, -- uuid
        api_key:DataTypes.STRING, //varchar(50) NOT NULL
        display_name: DataTypes.STRING,
        avatar_big: DataTypes.STRING(1000),
        avatar_small: DataTypes.STRING(1000),
        user_type: DataTypes.INTEGER
    }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'User', // We need to choose the model name
        tableName: 'users',
        timestamps: false
    });
    return User
}