import { createRoot } from 'react-dom/client';
import { App } from './app';
import { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale';

registerLocale('ru', ru);

createRoot(document.getElementById('root')!).render(<App />);
