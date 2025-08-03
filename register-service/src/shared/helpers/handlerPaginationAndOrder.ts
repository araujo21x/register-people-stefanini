import { BasicIndexDto } from '@shared/dto/request/basic-index.dto';

export function handlerPageAndOrder(query: BasicIndexDto, entityKeys: string[] = ['createdAt']) {
  const skip = ((query.page || 1) - 1) * (query.limit ?? 10);
  const take = query.limit || 10;

  const order = query.order || 'desc';
  const orderKey = query.orderKey || 'createdAt';

  if (!entityKeys.includes(orderKey)) {
    throw new Error(`orderKey deve ser um dos seguintes valores: ${entityKeys.join(', ')}`);
  }

  return { skip, take, orderBy: { [orderKey]: order } };
}
