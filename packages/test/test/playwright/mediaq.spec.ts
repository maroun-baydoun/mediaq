import { expect, test, type Page } from "@playwright/test";

async function openFixture(
  page: Page,
  options: {
    viewport?: { width: number; height: number };
    colorScheme?: "dark" | "light" | "no-preference";
    reducedMotion?: "reduce" | "no-preference";
  } = {},
) {
  await page.setViewportSize(options.viewport ?? { width: 800, height: 600 });
  const emulateMedia: {
    colorScheme?: "dark" | "light" | "no-preference";
    reducedMotion?: "reduce" | "no-preference";
  } = {};

  if (options.colorScheme) {
    emulateMedia.colorScheme = options.colorScheme;
  }

  if (options.reducedMotion) {
    emulateMedia.reducedMotion = options.reducedMotion;
  }

  if (Object.keys(emulateMedia).length > 0) {
    await page.emulateMedia(emulateMedia);
  }

  await page.goto("/");
}

test.describe("mediaq", () => {
  test("desktop viewport query matches at wide widths", async ({ page }) => {
    await openFixture(page, { viewport: { width: 800, height: 600 } });

    await expect(
      page.getByRole("checkbox", { name: "Desktop viewport" }),
    ).toBeChecked();
    await expect(
      page.getByRole("checkbox", { name: "Mobile viewport" }),
    ).not.toBeChecked();
  });

  test("mobile viewport query matches at narrow widths", async ({ page }) => {
    await openFixture(page, { viewport: { width: 375, height: 600 } });

    await expect(
      page.getByRole("checkbox", { name: "Desktop viewport" }),
    ).not.toBeChecked();
    await expect(
      page.getByRole("checkbox", { name: "Mobile viewport" }),
    ).toBeChecked();
  });

  test("a query can become matching after a viewport change", async ({
    page,
  }) => {
    await openFixture(page, { viewport: { width: 375, height: 600 } });

    await expect(
      page.getByRole("checkbox", { name: "Desktop viewport" }),
    ).not.toBeChecked();

    await page.setViewportSize({ width: 800, height: 600 });

    await expect(
      page.getByRole("checkbox", { name: "Desktop viewport" }),
    ).toBeChecked();
  });

  test("stopping mediaq prevents viewport changes from updating", async ({
    page,
  }) => {
    await openFixture(page, { viewport: { width: 800, height: 600 } });

    await expect(
      page.getByRole("checkbox", { name: "Desktop viewport" }),
    ).toBeChecked();

    await page.getByRole("button", { name: "Stop observing" }).click();

    await page.setViewportSize({ width: 375, height: 600 });

    await expect(
      page.getByRole("checkbox", { name: "Desktop viewport" }),
    ).toBeChecked();
    await expect(
      page.getByRole("checkbox", { name: "Mobile viewport" }),
    ).not.toBeChecked();
  });

  test("dark color scheme query matches when dark mode is emulated", async ({
    page,
  }) => {
    await openFixture(page, {
      viewport: { width: 800, height: 600 },
      colorScheme: "dark",
    });

    await expect(
      page.getByRole("checkbox", { name: "Dark color scheme" }),
    ).toBeChecked();
  });

  test("reduced motion query matches when reduced motion is emulated", async ({
    page,
  }) => {
    await openFixture(page, {
      viewport: { width: 800, height: 600 },
      reducedMotion: "reduce",
    });

    await expect(
      page.getByRole("checkbox", { name: "Reduced motion" }),
    ).toBeChecked();
  });

  test("print media query stays off in screen mode", async ({ page }) => {
    await openFixture(page, { viewport: { width: 800, height: 600 } });

    await expect(
      page.getByRole("checkbox", { name: "Print media" }),
    ).not.toBeChecked();
  });

  test("broken media query stays off", async ({ page }) => {
    await openFixture(page, { viewport: { width: 800, height: 600 } });

    await expect(
      page.getByRole("checkbox", { name: "Broken viewport query" }),
    ).not.toBeChecked();
  });

  test("two queries can match at the same time", async ({ page }) => {
    await openFixture(page, { viewport: { width: 800, height: 600 } });

    await expect(
      page.getByRole("checkbox", { name: "Desktop viewport" }),
    ).toBeChecked();
    await expect(
      page.getByRole("checkbox", { name: "Landscape orientation" }),
    ).toBeChecked();
  });
});
