const { Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class TournamentPrize extends Model {
        static associate(models) {
            // define association here
          } 
    }
    TournamentPrize.init({
        engagement_id: {
            type: DataTypes.INTEGER,
        },
        rank: {
            type: DataTypes.INTEGER,
        },
        bm_amount: {
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
        },
        product_id: {
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
        modelName: 'TournamentPrize', // We need to choose the model name
        tableName: 'tournament_prizes',
        timestamps: false
    });
    return TournamentPrize
}