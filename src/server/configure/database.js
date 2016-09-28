import Database from 'database';

export const DATABASE = 'DATABASE';
export default (app, config) => {
  const db = new Database(config.db);
  db.connect();

  app.set(DATABASE, db);
};
