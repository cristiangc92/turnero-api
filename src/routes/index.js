import { Router } from 'express';
import { getServices, createService } from '../controllers/service.controller.js';
import { getAppointments, createAppointment } from '../controllers/appointment.controller.js';

const router = Router();

// Rutas de Servicios
router.get('/services', getServices);
router.post('/services', createService);

// Rutas de Turnos
router.get('/appointments', getAppointments);
router.post('/appointments', createAppointment);

export default router;