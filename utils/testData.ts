/**
 * Centralized test data.
 * Keep credentials and constants here — never hardcode in tests.
 */

export const USERS = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  performance_glitch: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
  invalid: {
    username: 'not_a_user',
    password: 'wrong_password',
  },
} as const;

export const ERRORS = {
  locked:         'Sorry, this user has been locked out.',
  invalidCreds:   'Username and password do not match any user in this service',
  emptyUsername:  'Username is required',
  emptyPassword:  'Password is required',
} as const;

export const URLS = {
  inventory: '/inventory.html',
  cart:      '/cart.html',
  login:     '/',
} as const;
