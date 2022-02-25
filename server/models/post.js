const { Model, DataTypes } = require("sequelize");
const db = require("../config/db");

class Post extends Model {}

Post.init(
    {
        title : {
            type: DataTypes.STRING,
            allowNull: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        sequelize: db,
        timestamps: true,
        createdAt: "ValidFromDate",
        updatedAt: "UpdatedAt",
        underscored: false,
 	    tableName: "Posts",
        modelName: 'post',
        schema: 'Data',
    }  
);
    
module.exports = Post;
