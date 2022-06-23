describe('SolitaireSolver', () => {
  it('load web app', () => {
    cy.visit('http://localhost:3000/')

    cy.get("div.solitaireSolver-header")
      .should("be.visible")
      .within(() => {
        cy.get("a")
          .should("contain.text", "Solitaire Solver");
      })
    cy.contains("Start Game").click();
  })
  it("main component", () => {
    cy.contains("Draw Next!").click()
    cy.get("h2")
      .should("contain.text", "First Card in Tableau 1");

    cy.on('window:alert', (text) => {
      expect(text).to.contains("No card predictions found, Scan Again")
    })
  })
})