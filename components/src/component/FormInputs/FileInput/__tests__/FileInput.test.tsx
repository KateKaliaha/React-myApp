import { cleanup, render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from 'component/Form/Form';
import React from 'react';

describe('FileInput', () => {
  beforeEach(cleanup);

  it('upload image into input file', async () => {
    const file = new File(['hello'], 'hello.png', { type: ' image/png' });
    render(<Form />);

    const photo = screen.getByTestId('photo') as HTMLInputElement;

    await act(async () => {
      await userEvent.upload(photo, file);
      Object.defineProperty(photo, 'files', { value: file.name });
    });

    expect(photo!.files).toEqual(file.name);
  });
});
