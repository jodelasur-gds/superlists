describe('Layout and styling', () => {
  it('works', () => {
    // Edith goes to the home page
    cy.visit('');
    cy.viewport(1024, 768);
    
    cy.get('#id_text').as('inputBox');
    
    // She notices the input box is nicely centered
    cy.get('@inputBox').then($el => {
      const inputBox = $el[0];
      const {left, right} = inputBox.getBoundingClientRect();
      const width = right - left;
      expect(left + (width / 2)).to.be.closeTo(512, 10);
    });
    
    // She starts a new list and sees the input is nicely
    // centered there too
    cy.get('@inputBox').type('testing');
    cy.get('form').submit();
    cy.get('#id_list_table').find('tr').contains('1: testing');
    cy.get('@inputBox').then($el => {
      const inputBox = $el[0];
      const {left, right} = inputBox.getBoundingClientRect();
      const width = right - left;
      expect(left + (width / 2)).to.be.closeTo(512, 10);
    });
  });
});
