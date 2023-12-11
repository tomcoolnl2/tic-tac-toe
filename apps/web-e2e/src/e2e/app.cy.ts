// import { getGreeting } from '../support/app.po';

// describe('web-e2e', () => {
// 	beforeEach(() => cy.visit('/'));

// 	it('should display welcome message', () => {
// 		// Custom command example, see `../support/commands.ts` file
// 		cy.login('my-email@something.com', 'myPassword');

// 		// Function helper example, see `../support/app.po.ts` file
// 		getGreeting().contains(/Welcome/);
// 	});
// });
describe('Initial Loading Screen', () => {
	it('Loads the initial screen and transitions to the main app', () => {
		cy.visit('/');
		cy.get('.screen-front').should('exist');
		cy.get('.spinner').should('exist');
	});
});
