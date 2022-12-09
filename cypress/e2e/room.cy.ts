it("pagination first page", () => {
    cy.visit('/rooms');

    cy.url().should('match', /\/rooms/);

    cy.findAllByText("Page 1 of 3 (21 results in total)")

    cy.findByRole("button", {name: 'Previous page'}).should('be.disabled')
})

it('pagination second page', () => {
    cy.visit('/rooms');
    cy.findAllByText('Page 1 of 3 (21 results in total)');
   
    cy.findByRole('button', {name: 'Previous page'})
      .should('be.disabled');
   
    cy.findByRole('button', {name: 'Next page'})
      .click();
   
    cy.findAllByText('Page 2 of 3 (21 results in total)');
  });


it('Add a featured new cabin', () => {
    cy.visit('/create');

    cy.findByLabelText('Title')
    .type('A new cabin')
    .should('have.value', 'A new cabin');

    cy.findByLabelText('Description')
    .type('Best Ship in the whole world')
    .should('have.value', 'Best Ship in the whole world');

    cy.findByLabelText('Hero image URL')
    .type('https://c.pxhere.com/photos/5f/c8/galleon_ship_moored_sail_vessel_nautical_transportation_boat-553557.jpg!d')
    .should('have.value', 'https://c.pxhere.com/photos/5f/c8/galleon_ship_moored_sail_vessel_nautical_transportation_boat-553557.jpg!d');

    cy.findByLabelText('Featured')
      .click()
      .should("have.value", "on")

    cy.findByRole("button", {name: "Add cabin"})
      .click();

    cy.url().should("include", "/room")
});


it('Attempt to add a new cabin with an invalid URL', () => {
    cy.visit('/create');

    cy.findByLabelText('Title')
    .type('A new cabin')
    .should('have.value', 'A new cabin');

    cy.findByLabelText('Description')
    .type('Best Ship in the whole world')
    .should('have.value', 'Best Ship in the whole world');

    cy.findByLabelText('Hero image URL')
    .type('InvalidURL')
    .should('have.value', 'InvalidURL');

    cy.findByRole("button", {name: "Add cabin"})
      .click();

    cy.findAllByText("An error occured! Status: 400")
});

export {}