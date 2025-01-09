import { useContext } from 'react';
import { InfoViewContext } from './InfoViewContext';

/** If user fetches more information on a specific degree
 * the degree is saved in InfoViewContext and the show on
 * user in a another component
 */
export function useInfoViewContext() {
  const context = useContext(InfoViewContext);
  if (!context) {
    throw new Error('InfoViewContext is used outside of the provider');
  }
  return context;
}
