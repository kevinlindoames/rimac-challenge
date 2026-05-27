import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { store } from '../../shared/src/store';
import { Header } from '@rimac/shared';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* Layout raíz: columna, altura completa, fondo gris */}
        <div className="min-h-screen flex flex-col bg-gray-50">
          {/* Header global */}
          <Header />
          {/* Contenido principal: centrado y con flex-1 para ocupar espacio restante */}
          <main className="flex-1 flex items-center justify-center p-4">
            <AppRoutes />
          </main>
          <Toaster position="top-right" richColors />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;