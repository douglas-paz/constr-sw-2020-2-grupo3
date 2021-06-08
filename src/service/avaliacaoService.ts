import { ParsedQs } from 'qs';
import { Document } from 'mongoose';
import Handler from '../handlers/responseHandler';
import AvaliacaoModel, { Avaliacao, AvaliacaoDocument } from '../models/avaliacaoModel';

export async function getAll(): Promise<Handler<Document[]>> {
  return Handler.handleCatching(async () => AvaliacaoModel.find({}));
}

export async function getById(id: string): Promise<Handler<AvaliacaoDocument>> {
  return Handler.handleCatching(async () => (await AvaliacaoModel.findById({ _id: id })) as AvaliacaoDocument);
}

export async function getByIdAula(idAula: string): Promise<Handler<Document[]>> {
  return Handler.handleCatching(async () => AvaliacaoModel.find({ aulas: idAula }));
}

export async function getByFields(fields: ParsedQs): Promise<Handler<Document[]>> {
  return Handler.handleCatching(async () => AvaliacaoModel.find(fields));
}

export async function deleteById(id: string): Promise<boolean> {
  const deleteCount = (await AvaliacaoModel.deleteOne({ _id: id })).deletedCount;
  return !!(deleteCount && deleteCount > 0);
}

export async function replace(id: string, avaliacao: Avaliacao): Promise<Handler<AvaliacaoDocument>> {
  return Handler.handleCatching(async () => {
    await AvaliacaoModel.replaceOne({ _id: id }, { ...avaliacao, _id: id });
    return (await AvaliacaoModel.findById({ _id: id })) as AvaliacaoDocument;
  });
}

export async function update(id: string, avaliacao: Avaliacao): Promise<Handler<AvaliacaoDocument>> {
  return Handler.handleCatching(async () => {
    await AvaliacaoModel.updateOne({ _id: id }, { ...avaliacao, _id: id });
    return (await AvaliacaoModel.findById({ _id: id })) as AvaliacaoDocument;
  });
}

export async function create(avaliacao: Avaliacao): Promise<Handler<AvaliacaoDocument>> {
  return Handler.handleCatching(async () => (await new AvaliacaoModel(avaliacao).save()) as AvaliacaoDocument);
}
