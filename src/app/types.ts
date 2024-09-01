// @ts-ignore
import { ReturnTypeWithoutPromise } from '@/types/return-type-without-promise'
import { getHeroHeader } from './actions'
import { getNewsletter } from './actions'

export type Destination = ReturnTypeWithoutPromise<typeof getHeroHeader>[0]
export type Newsletter = ReturnTypeWithoutPromise<typeof getNewsletter>[0]