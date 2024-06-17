import { test, expect } from '@playwright/test';

/*
    Author: Richard Owusu
    Tests Covered:
    1. Add new item
    2. Remove new item
    3. Mark item as completed
    4. Filter item by selecting Active
    5. Filter item by selecting Completed
    6. Fileter item by selecting All
*/

const newItem = 'Do some tests over the weekend';

test('Should be able to add new item', async ({ page }) => {
  await page.goto('/');

  // Add new item
  await page.getByPlaceholder('Add a new todo').fill(newItem);
  await page.keyboard.press('Enter');

  // Check that the new item has been added
  await expect(page.locator('[x-show="!todo.complete"]').last()).toHaveText(newItem);
});

test('Should be able to remove item', async ({ page }) => {
  await page.goto('/');

  // Add new item
  await page.getByPlaceholder('Add a new todo').fill(newItem);
  await page.keyboard.press('Enter');
  await page.locator(`button:near(:text("${newItem}"))`).first().click();

  // Check that the new item added does has been removed
  await expect(page.locator('[x-show="!todo.complete"]').last()).not.toHaveText(newItem);
});

test('Should be able to mark item as completed', async ({ page }) => {
  await page.goto('/');

  // Add new item
  await page.getByPlaceholder('Add a new todo').fill(newItem);
  await page.keyboard.press('Enter');

  // Click new item to mark as complete
  await page.locator(`input:near(:text("${newItem}"))`).first().click();

  // Check that the new item added does has been removed
  await expect(page.locator('[id="checkbox"]').last()).toBeChecked();
  await expect(page.locator('[x-show="todo.complete"]').last()).toBeVisible();
});

test('Should be able to filter items by selecting Active', async ({ page }) => {
  await page.goto('/');

  // Filter default items by selecting - Active
  await page.locator('[type=radio]:left-of(:text("Active"))').first().click();

  // Check that only 1 item exist - Active
  await expect(page.locator('[id="checkbox"]')).toHaveCount(1);
  await expect(page.locator('[x-show="!todo.complete"]').first()).toHaveText('Write some playwright tests');
});

test('Should be able to filter items by selecting Completed', async ({ page }) => {
  await page.goto('/');

  // Filter default items by selecting - Completed
  await page.locator('[type=radio]:left-of(:text("Completed"))').first().click();

  // Check that only 1 item exist - Completed
  await expect(page.locator('[id="checkbox"]')).toHaveCount(1);
  await expect(page.locator('[x-show="todo.complete"]').first()).toHaveText('Run the To Do app');
});

test('Should be able to filter items by selecting All', async ({ page }) => {
  await page.goto('/');

  // Filter default items by selecting - All
  await page.locator('[type=radio]:left-of(:text("All"))').first().click();

  // check the 2 default items exists (Active and Completed)
  await expect(page.locator('[id="checkbox"]')).toHaveCount(2);
  await expect(page.locator('[x-show="todo.complete"]').first()).toHaveText('Run the To Do app');
  await expect(page.locator('[x-show="!todo.complete"]').last()).toHaveText('Write some playwright tests');
});
