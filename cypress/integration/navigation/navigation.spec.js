describe('Navigation', () => {
	beforeEach(() => {
		cy.login('eren.can.karadag@hotmail.com', '123456789');
		cy.url().should('include', '/home');
	});

	it('navigates via app bar correctly', () => {
		cy.contains('Search').click();
		cy.url().should('include', '/search');
		cy.contains('App Data').click();
		cy.url().should('include', '/app-data');
		cy.contains('Reservations').click();
		cy.url().should('include', '/reservations');
	});
});
