import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import router from './routes/index.js';
import './models/Service.js';
import './models/Appointment.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Usar las rutas
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('API del Sistema de Reservas con Sequelize y ES Modules funcionando');
});

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos sincronizada correctamente con Sequelize');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });