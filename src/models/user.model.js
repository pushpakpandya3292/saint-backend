module.exports = (sequelize, Sequelize) => {
    const users = sequelize.define("users", {
        user_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.ENUM('Active', 'Inactive'),
            allowNull: false,
            defaultValue: 'Active',
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
        },
    }, {
        tableName: 'users',
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',

    });
    return users;
};