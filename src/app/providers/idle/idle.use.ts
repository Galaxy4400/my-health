import { useContext } from 'react';
import { IdleContext } from './idle.context';

export const useIdle = () => useContext(IdleContext);
