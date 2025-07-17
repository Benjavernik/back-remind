import detonev from 'dotenv';
detonev.config();

export const dbConfig = {
host: process.env.PGHOST,
user:process.env.PGUSER,
database: process.env.PGDATABASE,
password: process.env.PGPASSWORD,
port: process.env.PGPORT ||5432,
connectionString: process.env.DATABASE_URL,
};