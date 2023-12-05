module.exports = (sequelize, Sequelize) => {
    const jobs = sequelize.define("jobs", {
        job_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        job_title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        job_vision: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        job_about: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        job_responsibility: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        job_looking_for: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        job_pay_benifits: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        job_interview_process: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        job_category_id: {
            type: Sequelize.INTEGER,
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
        tableName: 'jobs',
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',

    });

    jobs.associate = function (models) {
        jobs.belongsTo(models.job_categories, {
            targetKey: 'job_category_id',
            foreignKey: 'job_category_id'
        });

    }
    return jobs;
};