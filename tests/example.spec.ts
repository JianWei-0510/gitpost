import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("GitPost");
});

test.describe("Post Manipulation", () => {
  test("should able to create post", async ({ page }) => {
    await page.getByRole("link", { name: "Login" }).click();

    await page.waitForURL("/Jian-dog");

    await page.getByRole("link", { name: "post", exact: true }).click();

    await page.getByPlaceholder("Title").fill("playwright E2E posting test");
    await page
      .getByRole("textbox")
      .nth(1)
      .fill("This is a dummy post created by playwright testing framework.");

    await page.getByRole("button", { name: "Submit" }).click();

    await page.waitForURL(/\/Jian-dog\/(\d+)/);

    await page
      .getByRole("heading", { name: "playwright E2E posting test" })
      .isVisible();

    await page
      .getByRole("paragraph", {
        name: "This is a dummy post created by playwright testing framework.",
      })
      .isVisible();
  });
});
