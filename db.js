import { Pool } from 'pg';
import dbConfig from './dbconfig.js';

const pool = new Pool(dbConfig);
export default pool;
