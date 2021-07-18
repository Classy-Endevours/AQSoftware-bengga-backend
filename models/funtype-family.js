const { Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class FunTypeFamily extends Model {
        static associate(models) {
            // define association here
          } 
    }
    FunTypeFamily.init({
        name: DataTypes.STRING, //varchar(50) NOT NULL
        create_date: {
            type: DataTypes.DATE,
        },
        last_modified_date: {
            type: DataTypes.DATE,
        }
    }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'FunTypeFamily', // We need to choose the model name
        tableName: 'fun_type_families',
        timestamps: false
    });
    return FunTypeFamily
}