import React from "react";
import StyleSurvey from "./StyleSurvey";
// import { render } from "@testing-library/react";
import { render, fireEvent, toHaveProperty } from "@testing-library/react";
import { createStore } from "redux";
import { rootReducer } from "../../setup/store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/";

describe("Style Survey Component", () => {
  let store, StyleSurveyContainer;
  beforeEach(() => {
    store = createStore(rootReducer, {
      user: {
        error: null,
        isLoading: false,
        isAuthenticated: true,
        details: {
          name: "The User",
          email: "user@crate.com",
          role: "USER",
        },
      },
    });

    StyleSurveyContainer = render(
      <Provider store={store}>
        <BrowserRouter>
          <StyleSurvey />
        </BrowserRouter>
      </Provider>
    );
  });

  it("Should render the StyleSurvey component", () => {
    const heading = StyleSurveyContainer.getByRole("heading", {
      name: "My Style Survey",
    });
    expect(heading).toBeInTheDocument();
  });

  it("should contain radio buttons that the user can select", () => {
    const radioButton = StyleSurveyContainer.getAllByRole("radio", {
      name: "name name",
    });

    expect(radioButton[0]).toBeInTheDocument();
    expect(radioButton.length).toEqual(15);
  });

  it("when the user clicks a radio button, the property of the button should change to 'checked", () => {
    const radioButton = StyleSurveyContainer.getAllByRole("radio", {
      name: "name name",
    });

    fireEvent.click(radioButton[0]);
    expect(radioButton[0]).toHaveProperty("checked");
  });

  it("should show a 'submit' button that the user selects upon completion of the survey", () => {
    const submitButton = StyleSurveyContainer.getByRole("button", {
      name: "SUBMIT",
    });

    expect(submitButton).toBeInTheDocument();

    // fireEvent.click(submitButton);
  });

  it("should display images of potential style selections to user", () => {
    const images = StyleSurveyContainer.getAllByRole("img");

    expect(images[0]).toBeInTheDocument();
  });

  it("should display style categories that the user can choose from ie. tops, bottoms, etc", () => {
    const tops = StyleSurveyContainer.getByText("Tops");

    expect(tops).toBeInTheDocument();
  });

  it("should display a message that tells the user to select one image from each category", () => {
    const message = StyleSurveyContainer.getByText(
      "please select one set of photos",
      { exact: false }
    );

    expect(message).toBeInTheDocument();
  });

  it("should display 30 images to the user to select from", () => {
    const images = StyleSurveyContainer.getAllByRole("img");

    expect(images.length).toEqual(30);
  });
});
