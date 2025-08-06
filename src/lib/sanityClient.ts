
import { createClient } from '@sanity/client'

export const sanity = createClient({
  projectId: '0fl11mre',    
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-01-01',
})     
