/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render } from "@testing-library/react";
import Todo from "./Todo";

test("renders a todo item", () => {
    const todo = {
        text: "Test Todo",
        done: false,
    };

    const deleteTodo = jest.fn();
    const completeTodo = jest.fn();

    const { getByText, getByTestId } = render(
        <Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
    );

    const todoText = getByText("Test Todo");
    expect(todoText).toBeInTheDocument();

    const deleteButton = getByText("Delete");
    expect(deleteButton).toBeInTheDocument();

    const setAsDoneButton = getByText("Set as done");
    expect(setAsDoneButton).toBeInTheDocument();
});
