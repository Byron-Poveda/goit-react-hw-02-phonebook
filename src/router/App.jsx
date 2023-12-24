import { BrowserRouter } from 'react-router-dom';
import AppRouter from './AppRouter';
import GeneralLayout from '../components/Layout/GeneralLayout';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/goit-react-hw-08-phonebook">
        <GeneralLayout>
          <AppRouter />
        </GeneralLayout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
