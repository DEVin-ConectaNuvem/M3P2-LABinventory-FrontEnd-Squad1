import lodash from 'lodash'

/**
 * useLodash hook to use lodash in your components
 *
 * @export
 * @returns
 */

export function useLodash() {
  return {
    $_: lodash
  }
}
