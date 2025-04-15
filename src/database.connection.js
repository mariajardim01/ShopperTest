import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const configDatabase = {
  connectionString: process.env.DATABASE_URL,
};

const db = new Pool(configDatabase);

db.connect()
  .then(() => console.log("✅ Conexão com o banco de dados estabelecida com sucesso!"))
  .catch((error) => console.error("❌ Erro na conexão com o banco de dados:", error.message));

export { db };