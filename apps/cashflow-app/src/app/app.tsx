import React from 'react';
import { QueryProvider } from '../providers/QueryProvider';
import { Router } from '../components/Router';

export function App() {
  return (
    <QueryProvider>
      <Router />
    </QueryProvider>
  );
}

export default App;

if (import.meta.vitest) {
  // add tests related to your file here
  // For more information please visit the Vitest docs site here: https://vitest.dev/guide/in-source.html

  const { it, expect, beforeEach } = import.meta.vitest;
  let render: typeof import('@testing-library/react').render;

  beforeEach(async () => {
    render = (await import('@testing-library/react')).render;
  });

  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getAllByText } = render(<App />);
    expect(
      getAllByText(new RegExp('Dashboard Financiero', 'gi')).length > 0,
    ).toBeTruthy();
  });
}
