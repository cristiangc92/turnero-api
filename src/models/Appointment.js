import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Service from './Service.js';

const Appointment = sequelize.define('Appointment', {
  client_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  client_email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  time_slot: {
    type: DataTypes.TIME,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'confirmed'
  }
}, {
  timestamps: true,
  tableName: 'appointments',
  indexes: [
    {
      unique: true,
      fields: ['date', 'time_slot']
    }
  ]
});

Service.hasMany(Appointment, { foreignKey: 'service_id', onDelete: 'CASCADE' });
Appointment.belongsTo(Service, { foreignKey: 'service_id' });

export default Appointment;