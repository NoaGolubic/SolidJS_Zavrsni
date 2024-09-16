/* @refresh reload */
import { render } from 'solid-js/web';
import { Router} from "@solidjs/router";
import './CSS/index.css';
import App from './Pages/App';

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => 
  <Router>
    <App />
  </Router>,

  document.getElementById('root')
);
