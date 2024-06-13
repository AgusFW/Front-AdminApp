import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes';
import './styles.css';
import { Provider } from 'react-redux';
import { store } from './store';

export const CalendarApp = () => {
    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <AppRouter />
                </BrowserRouter>
            </Provider>

        </>
    );
};