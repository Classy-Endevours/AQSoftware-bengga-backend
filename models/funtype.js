const { Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class FunType extends Model {
        static associate(models) {
            // define association here
          } 
    }
    FunType.init({
        name: {
            type: DataTypes.STRING(1000),
        },
        description: {
            type: DataTypes.STRING(1000),
        },
        owner_id : {
            type: DataTypes.INTEGER,
        },
        image_big: {
            type: DataTypes.STRING(1000),
        },
        image_small: {
            type: DataTypes.STRING(1000),
        },
        is_deleted: {
            type:DataTypes.BOOLEAN,
        },
        type : {
            type: DataTypes.INTEGER
        },
        web_url: {
            type: DataTypes.STRING(1000),
        },
        package_file_url: {
            type: DataTypes.STRING(1000),
        },
        package_file_hash: {
            type: DataTypes.STRING(1000),
        },
        is_landscape: {
            type: DataTypes.INTEGER,
        },
        mode: {
            type: DataTypes.INTEGER,
        },
        numplayers: {
            type: DataTypes.INTEGER,
        },
        create_date: {
            type: DataTypes.DATE,
        },
        last_modified_date: {
            type: DataTypes.DATE,
        }
    }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'FunType', // We need to choose the model name
        tableName: 'fun_types',
        timestamps: false
    });
    return FunType
}