module.exports = function(sequelize, DataTypes){
		return sequelize.define('todo',{
			description: {
				type: DataTypes.STRING,
				allowNull: false, //description is not optional
				validate: {
					len: [1, 250]
				}
			},
			completed : {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false
			}
	});
};