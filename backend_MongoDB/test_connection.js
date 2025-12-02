import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conexión exitosa a MongoDB Atlas");
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Error de conexión:", err);
    process.exit(1);
  });
