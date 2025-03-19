import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import 
import UrlCreator from '../components/sandbox/UrlCreator';
import '@testing-library/jest-dom';
import 
import { Value } from 'sass';

describe("#offcanvas", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <UrlCreator query={""} />
      </MemoryRouter>
    );
  });

  it("should check whether the input is rendered with the correct value", async () => {
    const inputElement = screen.getByText("SIMnet Lightyear scaffolding tool");
    expect(inputElement).toBeInTheDocument();

    const buttonSubmit = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(buttonSubmit);


    await waitFor(() => {
      expect(screen.queryByText("SIMnet Lightyear scaffolding tool")).not.toBeInTheDocument();
    });

    const buttonOpen = screen.getByLabelText(/open-canvas-button/i);
    expect(buttonOpen).toBeInTheDocument();

    fireEvent.click(buttonOpen);

    await waitFor(() => {
      expect(screen.getByText("SIMnet Lightyear scaffolding tool")).toBeInTheDocument();
    });
  });
});


describe("#form",() =>{
  beforeEach(()=>{
    render(
    <MemoryRouter>
      <UrlCreator query={""} />
    </MemoryRouter>
    )
  })

  it("form input",() =>{
    const input = screen.getByLabelText("uri-input",{selector :"input"}); 
    expect(input).toBeInTheDocument();

    fireEvent.change({target : {value : ""}})



  })
})