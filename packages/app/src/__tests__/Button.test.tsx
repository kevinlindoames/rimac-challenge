import { render, screen } from '@testing-library/react';
import { Button } from '@rimac/shared';
import { describe, it, expect } from 'vitest';

describe('Button', () => {
  it('renderiza con el texto y clase primaria por defecto', () => {
    render(<Button>Click</Button>);
    const button = screen.getByText('Click');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
  });

  it('aplica clase custom cuando variant="custom"', () => {
    render(<Button variant="custom" className="bg-red-500">Custom</Button>);
    const button = screen.getByText('Custom');
    expect(button).toHaveClass('bg-red-500');
  });
});