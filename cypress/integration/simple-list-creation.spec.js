describe('New visitor', () => {
  it('can start a list for one user', () => {
    // Edith has heard about a cool new online to-do app. She goes
    // to check out its homepage
    cy.visit('');
    
    // She notices the page title and header mention to-do lists
    cy.title().should('include', 'To-Do');
    cy.get('h1').contains('To-Do');
    
    // she is invited to enter a to-do item straight away
    cy.get('#id_text').as('inputBox')
      .should('have.attr', 'placeholder', 'Enter a to-do item');
    
    // she types "Buy peacock feathers" into a text box (Edith's hobby
    // is tying fly-fishing lures)
    cy.get('@inputBox').type('Buy peacock feathers');
    
    // When she hits enter, the page updates, and now the page lists
    // "1: Buy peacock feathers" as an item in a to-do list
    cy.get('@inputBox').type('{enter}');
    cy.get('form').submit();
    cy.contains('1: Buy peacock feathers');
    
    // There is still a text box inviting her to add another item. She
    // enters "Use peacock feathers to make a fly" (Edith is very
    // methodical)
    cy.get('@inputBox')
      .type('Use peacock feathers to make a fly')
      .type('{enter}');
    cy.get('form').submit();
    
    // The page updates again, now shows both items on her list
    cy.contains('1: Buy peacock feathers');
    cy.contains('2: Use peacock feathers to make a fly');
  });
  
  it('multiple users can start lists at different urls', () => {
    cy.visit('');
    cy.get('#id_text').as('inputBox')
      .type('Buy peacock feathers{enter}');
    cy.get('form').submit();
    cy.contains('1: Buy peacock feathers');
    
    // she notices that her list has a unique URL
    let edithListUrl;
    cy.url()
      .should('match', /\/lists\/.+/)
      .then(url => edithListUrl = url);
    
    // Now a new user, Francis, comes along to the site
    
    // We use a new browser session to make sure that no information
    // of Edith's is coming through from cookies etc
    cy.clearCookies();
    
    // Francis visits the home page. There is no sign of Edith's list
    cy.visit('');
    cy.get('body')
      .should('not.contain', 'Buy peacock feathers')
      .should('not.contain', 'make a fly');
    
    // Francis starts a new list by entering a new item.
    // He is less interesting than Edith...
    cy.get('@inputBox')
      .type('Buy milk{enter}');
    cy.get('form').submit();
    cy.contains('1: Buy milk');
    
    // Francis gets his own unique URL
    cy.url()
      .should('match', /\/lists\/.+/)
      .then(url => expect(url).to.not.equal(edithListUrl));
    
    // Again, there is no trace of Edith's list
    cy.get('body')
      .should('not.contain', 'Buy peacock feathers')
      .contains('Buy milk');
  });
});
