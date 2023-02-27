import { createBrowserRouter } from 'react-router-dom';
import ROUTER from '../constants/router.constants';
import App from '../container/App';
import LoginPage from '../container/AuthPage/loginPage';
import SelectHome from '../container/SelectHome';

const router = createBrowserRouter([
  {
    path: ROUTER.HOME,
    element: <App />,
  },
  {
    path: ROUTER.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTER.SELECT_HOME,
    element: <SelectHome />,
  },
]);

export default router;
