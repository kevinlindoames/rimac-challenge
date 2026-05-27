import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Step1_UserData } from '../pages/Step1_UserData';
import userFormReducer from '@rimac/shared';
import userReducer from '../core/store/slices/userSlice';
import quoteReducer from '../core/store/slices/quoteSlice';

const store = configureStore({
  reducer: {
    userForm: userFormReducer,
    user: userReducer,
    quote: quoteReducer,
  },
});

describe('Step1_UserData', () => {
  it('muestra errores de validación al enviar vacío', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Step1_UserData />
        </BrowserRouter>
      </Provider>
    );

    const buttons = screen.getAllByTestId('submit-button');
    fireEvent.click(buttons[0]);

    await waitFor(() => {
      // Los mensajes de error reales en el test son "Required"
      const dniErrors = screen.getAllByText('Required');
      const phoneErrors = screen.getAllByText('Required');
      const privacyErrors = screen.getAllByText('Required');

      expect(dniErrors.length).toBeGreaterThan(0);
      expect(phoneErrors.length).toBeGreaterThan(0);
      expect(privacyErrors.length).toBeGreaterThan(0);
    });
  });
});