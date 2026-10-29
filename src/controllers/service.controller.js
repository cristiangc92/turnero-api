import Service from '../models/Service.js';

// Obtener todos los servicios
export const getServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los servicios', details: error.message });
  }
};

// Crear un nuevo servicio
export const createService = async (req, res) => {
  try {
    const { name, duration_minutes, price } = req.body;
    
    if (!name || !duration_minutes || !price) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const newService = await Service.create({ name, duration_minutes, price });
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el servicio', details: error.message });
  }
};