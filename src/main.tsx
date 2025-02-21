import { createRoot } from 'react-dom/client'
import AppRouter from '@routes/AppRouter';
// redux 
import { store, persistor } from "@store"
import { PersistGate } from 'redux-persist/integration/react';
//axios
import "./service/axios-global"
// styles 
import 'bootstrap/dist/css/bootstrap.min.css';
import "@styles/global.css"
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AppRouter />
        </PersistGate>
    </Provider>
)
