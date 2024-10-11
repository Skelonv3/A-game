import {db} from './db';
import {players} from './schema'

async function testConnection() {
    try {

      const result = await db.select().from(players);
      console.log('Połączenie działa, gracze:', result);
    } catch (error) {
      console.error('Błąd połączenia z bazą:', error);
    }
  }

  testConnection()