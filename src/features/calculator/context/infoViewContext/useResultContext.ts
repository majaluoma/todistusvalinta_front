import { useContext } from 'react';
import { InfoViewContext } from './InfoViewContext';

export function useInfoViewContext() {
  const context = useContext(InfoViewContext);
  if (!context) {
    throw new Error('InfoViewContext is used outside of the provider');
  }
  return context;
}
