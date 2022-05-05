describe('Authentication', () => {
	it('does not log in with incorrect credentials', () => {
		// Incorrect email
		cy.login('eren.can.karada@hotmail.com', '123456789');
		cy.url().should('include', '/login');
		// Incorrect password
		cy.login('eren.can.karada@hotmail.com', '12345678');
		cy.url().should('include', '/login');
	});

	it('logs in with correct credentials as manager', () => {
		cy.login('eren.can.karadag@hotmail.com', '123456789');
		cy.url().should('include', '/home');
		cy.contains('Reservations').should('exist');
		cy.contains('App Data').should('exist');
	});

	it('logs in with correct credentials as user', () => {
		cy.login('gbalda@hotmail.com', '123456789');
		cy.url().should('include', '/home');
		cy.contains('Reservations').should('not.exist');
		cy.contains('App Data').should('not.exist');
	});
});
