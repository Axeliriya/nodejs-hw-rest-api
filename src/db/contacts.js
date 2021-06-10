import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';

const file = fileURLToPath(new URL('../../data/db.json', import.meta.url));
const adapter = new JSONFile(file);
const db = new Low(adapter);

db.read();

db.data ||= { contacts: [] };

db.write();

export default db;
