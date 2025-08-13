import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'neondb_owner',
  host: 'ep-round-mud-adpbq6xe-pooler.c-2.us-east-1.aws.neon.tech',
  database: 'neondb',
  password: 'npg_YSzgemGiFB24',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;
