const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Contact = sequelize.define('Contact', {
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING, allowNull: false, unique: true },
    address: { type: DataTypes.STRING, allowNull: false },
}, {
    timestamps: true
});

module.exports = Contact;
