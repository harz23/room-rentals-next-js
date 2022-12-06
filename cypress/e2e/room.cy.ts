

it("passes", () => {
    // 1. Assert I'm on the first page
    cy.visit('/rooms');

    cy.url().should('match', /\/rooms/);

    cy.findAllByText("Page 1 of 3 (20 results in total)")

    // 2. Assert the previous button is disabled
    cy.findByRole("button", {name: 'Previous page'}).should('be.disabled')
  
})

export {}