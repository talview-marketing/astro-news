// src/lib/sanityClient.ts
import { createClient } from '@sanity/client'

export const sanity = createClient({
  projectId: '0fl11mre',    // e.g. "abc123"
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-01-01',
})
