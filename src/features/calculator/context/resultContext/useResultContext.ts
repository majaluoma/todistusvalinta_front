import { useContext } from 'react';
import { ResultContext } from './ResultContext';

export function useResultContext() {
  const context = useContext(ResultContext);
  if (!context) {
    throw new Error('ResultContext is used outside of the provider');
  }
  return context;
}
