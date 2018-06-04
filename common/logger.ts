import { environment } from './environment';
import * as bunyan from 'bunyan'

export const logger = bunyan.createLogger({
    name: environment.log.name,
    leve: (<any>bunyan).resolveLevel(environment.log.level)
})