import mongoose, { NativeError } from 'mongoose';
import { MongoError } from 'mongodb';

export interface Avaliacao {
  nome: string;
  peso: number;
  grau: number;
  descricao: string;
  questoes: [
    {
      enunciado: string;
      resposta: string;
    },
  ];
  aulas: Array<string>;
}

export interface AvaliacaoDocument extends Avaliacao, mongoose.Document { }

const schema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
  peso: {
    type: Number,
    required: true,
    default: 1,
  },
  grau: {
    type: Number,
    required: true,
  },
  descricao: {
    type: String,
    required: false,
  },
  questoes: [
    {
      enunciado: {
        type: String,
        required: true,
      },
      resposta: {
        type: String,
        required: true,
      },
    },
  ],
  aulas: [{ type: String, required: false }],
});

schema.post('save', (error: MongoError, doc: AvaliacaoDocument, next: (err?: NativeError) => void) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Chave Duplicada: verifique os dados'));
  } else {
    next(error);
  }
});

export default mongoose.model('Avaliacao', schema);
