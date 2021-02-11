import { EntityRepository, Repository } from 'typeorm';
import Request from './requests.entity';

@EntityRepository(Request)
export default class RequestRepository extends Repository<Request> {}
