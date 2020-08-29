import App from './App'
import React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from '../../setup/store'
import { login } from '../../modules/user/api/actions'
import '@testing-library/jest-dom'
import { createMemoryHistory } from "history";



describe('App', () => {

  it('should render welcome heading', () => {
    const { getByRole, debug } = render(
      <Provider store={store} key="provider">
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>)
    const welcomeHeading = getByRole('heading', { name: "Welcome to Crate" })
    expect(welcomeHeading).toBeInTheDocument()
  })
  
  it('should go to Crates Page', () => {
    const { getByRole, getByPlaceholderText, debug } = render(
      <Provider store={store} key="provider">
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>)
    const loginBtn = getByRole('link', { name: "Login" })
    fireEvent.click(loginBtn)
    const emailInput = getByPlaceholderText("Email")
    const passwordInput = getByPlaceholderText("Password")

    fireEvent.change(emailInput, { target: { value: "user@crate.com"}})
    fireEvent.change(passwordInput, { target: { value: 123456 }})

    const submitLogin = getByRole('button', { name: "Login navigate_next" })
    fireEvent.click(submitLogin)

    expect(submitLogin).toBeInTheDocument()
  })

  it('should go to Style Survey Page if user has no style preference', async () => {
    const history = createMemoryHistory();
    history.push("/crates");
    const { getAllByText, getByRole, debug } = render(
      <Provider store={store} key="provider">
        <Router history={history}>
          <App />
        </Router>
      </Provider>)

    await waitFor(() => {
      fireEvent.click(getAllByText("Subscribe", { exact: false })[1]);
    });

    
    await waitFor(() => {
      const surveyHeading = getByRole('heading', { name: "My Style Survey" })
      expect(surveyHeading).toBeInTheDocument();
    })
  })

  it('should go to Style Survey Page if user has no style preference', async () => {
    const history = createMemoryHistory();
    history.push("/user/style-preference");
    const { getAllByText, getByRole, debug } = render(
      <Provider store={store} key="provider">
        <Router history={history}>
          <App />
        </Router>
      </Provider>)

    debug()

    await waitFor(() => {
      const surveyHeading = getByRole('heading', { name: "My Style Survey" })
      expect(surveyHeading).toBeInTheDocument();
    })
  })
})