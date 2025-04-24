// @ts-ignore
import { ReturnTypeWithoutPromise } from '@/types/return-type-without-promise'
import { getHeroHeader } from './actions'
import { getNewsletter } from './actions'
import { getClient } from './actions'
import { getLeads } from './actions'

export type Destination = ReturnTypeWithoutPromise<typeof getHeroHeader>[0]
export type Newsletter = ReturnTypeWithoutPromise<typeof getNewsletter>[0]
export type Leads = ReturnTypeWithoutPromise<typeof getLeads>[0]
export type Client = ReturnTypeWithoutPromise<typeof getClient>[0]