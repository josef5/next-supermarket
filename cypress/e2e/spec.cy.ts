describe("Basic spec", () => {
  before(() => {
    // ensure clean test slate for these tests
    // cy.then(Cypress.session.clearCurrentSessionData);
  });

  beforeEach(() => {
    // Cypress.session.clearAllSavedSessions();
    cy.visit("/");
  });

  it("has a title", () => {
    cy.contains("h1", "Awesome");
  });

  /**
   * Check if there are products displayed under the "Products" section
   */

  it("has products", () => {
    cy.contains("h2", "Products")
      .next()
      .children()
      .should("not.have.length", 0);
  });

  /**
   * Test case to verify the functionality of navigating to the cart
   * Steps:
   * 1. Intercept the request to "/basket*"
   * 2. Click on the "Basket" button
   * 3. Wait for the navigation to the cart
   * 4. Verify that the URL includes "/basket"
   */

  it("can navigate to cart", () => {
    cy.intercept("/basket*").as("navigateToCart");

    cy.contains("Basket").click();

    cy.wait("@navigateToCart");

    cy.url().should("include", "/basket");
  });

  /**
   * Test case to verify the functionality of navigating to a product
   * Steps:
   * 1. Click on the first product in the list
   * 2. Wait for the product page to load
   * 3. Verify that the URL includes "/product"
   */

  it("can navigate to product", () => {
    cy.intercept("/product/*").as("navigateToProduct");

    cy.contains("h2", "Products")
      .next()
      .children()
      .first()
      .contains("More details")
      .click();

    cy.wait("@navigateToProduct");

    cy.url().should("include", "/product");
  });

  /**
   * Test case to verify the functionality of adding a product to the cart
   * Steps:
   * 1. Click on the "Add" button for the first product
   * 2. Wait for the product to be added to the cart
   * 3. Verify that the cart is no longer empty
   */

  it("can add product to cart", () => {
    cy.intercept("POST", "/").as("addToBasket");

    cy.contains("h2", "Products")
      .next()
      .children()
      .first()
      .contains("button", "Add")
      .click();

    cy.wait("@addToBasket");

    cy.contains("Basket").should("not.contain", "(0)");
  });

  /**
   * Test case to verify the functionality of removing a product from the cart
   * Steps:
   * 1. Add a product to the cart
   * 2. Navigate to the cart
   * 3. Remove the product from the cart
   * 4. Verify the cart is empty
   */

  it("can remove product from cart", () => {
    cy.intercept("POST", "/").as("addToBasket");
    cy.contains("h2", "Products")
      .next()
      .children()
      .first()
      .contains("button", "Add")
      .click();
    cy.wait("@addToBasket");

    cy.intercept("/basket*").as("navigateToCart");
    cy.contains("Basket").click();
    cy.wait("@navigateToCart");

    cy.contains("Clear Basket").click();

    cy.wait(100);

    // Assert
    cy.contains("h2", "Basket").next().children().should("have.length", 0);
    cy.contains("Your basket is empty").should("be.visible");
  });
});

/* describe.only("API test", () => {
  beforeEach(() => {
    cy.intercept("GET", "/", [
      {
        id: 1,
        name: "Test Product",
        description: "This is a test product",
        price: 1.23,
      },
    ]).as("getProducts");

    cy.visit("/");
  });

  it("displays products", () => {
    cy.wait("@getProducts");

    cy.contains("h2", "Products")
      .next()
      .children()
      .first()
      .should("contain.text", "Test Product");
  });
}); */
