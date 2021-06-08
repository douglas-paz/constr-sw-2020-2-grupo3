import { Request, Response } from 'express';
import { Avaliacao, AvaliacaoDocument } from '../models/avaliacaoModel';
import * as service from '../service/avaliacaoService';

export async function getByQueryHandler(request: Request, response: Response): Promise<void> {
  const handler = await service.getByFields(request.query);
  handler.handle(response);
}

export async function getHandler(request: Request, response: Response): Promise<void> {
  if (request.query) {
    getByQueryHandler(request, response);
  } else {
    const handler = await service.getAll();
    handler.handle(response);
  }
}

export async function getByIdHandler(request: Request, response: Response): Promise<void> {
  const handler = await service.getById(request.params.id);
  handler.handle(response);
}

export async function getByIdAulaHandler(request: Request, response: Response): Promise<void> {
  const handler = await service.getByIdAula(request.params.id);
  handler.handle(response);
}

export async function deleteHandler(request: Request, response: Response): Promise<void> {
  if (await service.deleteById(request.params.id)) {
    response.status(200).end();
  } else {
    response.status(404).end();
  }
}

export async function postHandler(request: Request, response: Response): Promise<void> {
  const handler = await service.create(request.body as Avaliacao);
  handler.handle(response, 201);
}

export async function putHandler(request: Request, response: Response): Promise<void> {
  const avaliacao = request.body as AvaliacaoDocument;
  const handler = await service.replace(request.params.id, avaliacao);
  handler.handle(response);
}

export async function patchHandler(request: Request, response: Response): Promise<void> {
  const avaliacao = request.body as AvaliacaoDocument;
  const handler = await service.update(request.params.id, avaliacao);
  handler.handle(response);
}
