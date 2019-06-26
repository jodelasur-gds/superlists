describe('Item validation', () => {
  it('cannot add empty list items', () => {
    // Edith goes to the home page and accidentally tries to submit
    // an empty list item. She hits Enter on the empty input box
    cy.visit('');
    cy.get('#id_text').as('inputBox').type('{enter}');
    
    // The browser intercepts the request, and does not load the
    // list page
    cy.get('#id_text:invalid');
    
    // She starts typing some text for the new item and the error disappears
    cy.get('@inputBox').type('Buy milk');
    cy.get('#id_text:valid');
    
    // And she can submit it successfully
    cy.get('@inputBox').type('{enter}');
    cy.get('form').as('form').submit();
    cy.contains('1: Buy milk');
    
    // Perversely, she now decides to submit a second blank list item
    cy.get('@inputBox').type('{enter}');
    
    // Again, the browser will not comply
    cy.contains('1: Buy milk');
    cy.get('#id_text:invalid');
    
    // And she can correct it by filling some text in
    cy.get('@inputBox').type('Make tea');
    cy.get('#id_text:valid');
    cy.get('@inputBox').type('{enter}');
    cy.get('form').submit();
    cy.contains('1: Buy milk');
    cy.contains('2: Make tea');
  });
});
