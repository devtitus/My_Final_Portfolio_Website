const rawApiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || ''
const isValidApiVersion = /^\d{4}-\d{2}-\d{2}$/.test(rawApiVersion) || rawApiVersion === '1'
export const apiVersion = isValidApiVersion ? rawApiVersion : '2024-01-01'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const useCdn = false

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
