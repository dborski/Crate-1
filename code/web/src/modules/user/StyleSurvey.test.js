import StyleSurvey from './StyleSurvey'
import React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux'


describe('user queries', () => {
  it('should return true', () => {
    const { getByRole, debug } = render(
    <Provider>
      <MemoryRouter>
        <StyleSurvey />
      </MemoryRouter>
    </Provider>)

    expect(true).toEqual(true)
  })
})