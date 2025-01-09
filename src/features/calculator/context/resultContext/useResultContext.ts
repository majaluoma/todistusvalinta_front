import { useContext } from 'react';
import { ResultContext } from './ResultContext';

/** When user submits the calculation, the result and all degrees based on that 
 * calculation are stored in resultContext and the shown elsewhere
 */
export function useResultContext() {
  const context = useContext(ResultContext);
  if (!context) {
    throw new Error('ResultContext is used outside of the provider');
  }
  return context;
}
