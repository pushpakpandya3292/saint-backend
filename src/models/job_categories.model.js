module.exports = (sequelize, Sequelize) => {
    const job_categories = sequelize.define("job_categories", {
        job_category_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
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
        tableName: 'job_categories',
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',

    });

    job_categories.associate = function (models) {
        job_categories.hasMany(models.jobs, {
            sourceKey: 'job_category_id',
            foreignKey: 'job_category_id'
        });
    };

    return job_categories;
};