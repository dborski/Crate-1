import App from './App'
import React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from '../../setup/store'
import '@testing-library/jest-dom'

describe('user queries', () => {
  it('should return true', () => {
    const { getByRole, debug } = render(
      <Provider store={store} key="provider">
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>)

      debug()
    const welcomeHeading = getByRole('heading', { name: "Welcome to Crate" })
    expect(welcomeHeading).toBeInTheDocument()
  })
})