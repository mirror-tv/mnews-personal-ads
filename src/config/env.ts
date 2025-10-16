const ENV = import.meta.env.VITE_ENV ?? 'dev'
let GRQPHQL_ENDPOINT = ''

switch (ENV) {
  case 'prod':
    GRQPHQL_ENDPOINT =
      'https://advertising-gql-prod-439405143478.asia-east1.run.app/api/graphql'
    break
  case 'staging':
    GRQPHQL_ENDPOINT =
      'https://advertising-gql-staging-439405143478.asia-east1.run.app/api/graphql'
    break
  case 'dev':
    GRQPHQL_ENDPOINT =
      'https://advertising-gql-dev-439405143478.asia-east1.run.app/api/graphql'
    break
  default:
    GRQPHQL_ENDPOINT =
      'https://advertising-gql-dev-439405143478.asia-east1.run.app/api/graphql'
    break
}

export const env = {
  ENV: import.meta.env.VITE_ENV ?? 'dev',
  GRQPHQL_ENDPOINT,
}
