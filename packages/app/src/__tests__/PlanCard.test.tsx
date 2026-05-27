import { render, screen } from '@testing-library/react';
import { PlanCard } from '@rimac/shared';
import { describe, it, expect, vi } from 'vitest';

const mockPlan = {
  name: 'Plan Test',
  price: 100,
  description: ['Beneficio 1', 'Beneficio 2'],
  age: 30,
};

describe('PlanCard', () => {
  it('muestra el nombre y el precio', () => {
    render(
      <PlanCard
        name="Plan Test"
        currentPrice={100}
        benefits={['Beneficio 1']}
        onSelect={vi.fn()}
        iconSrc="test.png"
      />
    );
    expect(screen.getByText('Plan Test')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
  });

  it('aplica descuento del 5% si discountPercent es 5', () => {
    render(
      <PlanCard
        name="Plan Test"
        originalPrice={100}
        currentPrice={95}
        benefits={['Beneficio']}
        onSelect={vi.fn()}
        discountPercent={5}
        iconSrc="test.png"
      />
    );
    expect(screen.getByText('$100')).toBeInTheDocument(); // tachado
    expect(screen.getByText('$95.00')).toBeInTheDocument();
    expect(screen.getByText('5% de descuento aplicado')).toBeInTheDocument();
  });
});