import { env } from '../config/env'

interface GraphQLVariables {
  where?: {
    state?: { equals: string }
    [key: string]: unknown
  }
  [key: string]: unknown
}

interface GraphQLResponse<T = unknown> {
  data: T
  errors?: Array<{
    message: string
    locations?: Array<{ line: number; column: number }>
  }>
}

export async function queryData<T = unknown>(
  query: string,
  variables: GraphQLVariables
): Promise<T> {
  const response = await fetch(env.GRQPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const result: GraphQLResponse<T> = await response.json()

  if (result.errors) {
    throw new Error(
      `GraphQL errors: ${result.errors.map((e) => e.message).join(', ')}`
    )
  }

  return result.data
}
