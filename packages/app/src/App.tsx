import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { store } from './core/store';
import { Header } from '@rimac/shared';
import { ErrorBoundary } from './core/error/ErrorBoundary';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-1 flex items-center justify-center p-4">
              <AppRoutes />
            </main>
            <Toaster position="top-right" richColors />
          </div>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  );
}

export default App;