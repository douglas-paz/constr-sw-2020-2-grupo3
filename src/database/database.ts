import mongoose, { Connection } from 'mongoose';

export default function connect(url: string): Connection {
  mongoose.connect(`mongodb://${url}/avaliacoes`, {
    authSource: process.env.MONGODB_AUTH_SOURCE,
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASS,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.on('open', () => console.log('Database connected'));
  return db;
}

export function status(): string {
  switch (mongoose.connection.readyState) {
    case 0:
      return 'disconnected';
    case 1:
      return 'connected';
    case 2:
      return 'connecting';
    case 3:
      return 'disconnecting';
    default:
      return 'Unknown';
  }
}
