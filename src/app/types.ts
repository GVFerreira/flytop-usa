// @ts-ignore
import { ReturnTypeWithoutPromise } from '@/types/return-type-without-promise'
import { getHeroHeader } from './actions'

export type Destination = ReturnTypeWithoutPromise<typeof getHeroHeader>[0]