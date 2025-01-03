import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/router';
import { exportRoutesForSchema } from 'axiosflow-api';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', router);

// Route to export API schema
app.get('/axiosflow', (req, res) => {
  const routes = exportRoutesForSchema();
  console.log('exposed routes are ',routes);
  res.json(routes);
});

// Global error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong', 
    error: process.env.NODE_ENV !== 'production' ? err : {} 
  });
});

app.listen(PORT, () => {
    console.log('exported routes ', exportRoutesForSchema());
  console.log(`Server is running on http://localhost:${PORT}`);
});