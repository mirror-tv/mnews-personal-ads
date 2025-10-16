const getOrdersStatusStatsQuery = `
  query GetOrdersStatusStats {
    orders {
      id
      state
      updatedAt
      createdAt
    }
  }
`

export { getOrdersStatusStatsQuery }
