import Appointment from '../models/Appointment.js';
import Service from '../models/Service.js';

// Obtener todos los turnos con su servicio asociado
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: {
        model: Service,
        attributes: ['name', 'duration_minutes', 'price']
      },
      order: [['date', 'ASC'], ['time_slot', 'ASC']]
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los turnos', details: error.message });
  }
};

// Crear un turno validando disponibilidad
export const createAppointment = async (req, res) => {
  try {
    const { client_name, client_email, service_id, date, time_slot } = req.body;

    if (!client_name || !client_email || !service_id || !date || !time_slot) {
      return res.status(400).json({ error: 'Faltan datos obligatorios para la reserva' });
    }

    // Validar que el servicio exista
    const serviceExists = await Service.findByPk(service_id);
    if (!serviceExists) {
      return res.status(404).json({ error: 'El servicio seleccionado no existe' });
    }

    // Intentar crear la reserva (Sequelize lanzará error si se viola el índice único de date + time_slot)
    const newAppointment = await Appointment.create({
      client_name,
      client_email,
      service_id,
      date,
      time_slot
    });

    res.status(201).json({
      message: 'Turno reservado con éxito',
      appointment: newAppointment
    });
  } catch (error) {
    // Si el error es por restricción UNIQUE de la base de datos (turno ocupado)
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Lo siento, este horario ya se encuentra reservado para esa fecha.' });
    }
    res.status(500).json({ error: 'Error al registrar el turno', details: error.message });
  }
};