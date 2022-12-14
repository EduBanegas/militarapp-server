import { GraphQLScalarType } from 'graphql'
import validator from 'validator'

const parseISO8601 = (value: any) => {
  if (validator.isISO8601(value)) {
    return new Date(value)
  }
  throw new Error(
    'parseISO8601: DateTime cannot represent an invalid ISO-8601 Date string'
  )
}

const serializeISO8601 = (value: any) => {
  // For output i.e. response for graphql
  const valueAsString = value.toISOString()
  if (validator.isISO8601(valueAsString)) {
    return valueAsString
  }
  throw new Error(
    'serializeISO8601: DateTime cannot represent an invalid ISO-8601 Date string'
  )
}

const parseLiteralISO8601 = (ast: any) => {
  // For input payload i.e. for mutation
  if (validator.isISO8601(ast.value)) {
    return new Date(ast.value)
  }
  throw new Error(
    'parseLiteralISO8601: DateTime cannot represent an invalid ISO-8601 Date string'
  )
}

export const ScalarTypeDateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'An ISO-8601 encoded UTC date string.',
  serialize: serializeISO8601,
  parseValue: parseISO8601,
  parseLiteral: parseLiteralISO8601
})
