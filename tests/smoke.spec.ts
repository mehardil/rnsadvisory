import { expect, test } from '@playwright/test'

test('home page renders the hero and core sections', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Expertise')
  await expect(page.getByRole('link', { name: /explore services/i }).first()).toBeVisible()
  await expect(page.getByText(/8 regions/i).first()).toBeVisible()
})

test('services catalogue opens a service detail page', async ({ page }) => {
  await page.goto('/services')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Every advisory')
  await page.getByRole('link', { name: /UAE Golden Visa/i }).first().click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('UAE Golden Visa')
  await expect(page.getByText('Get a free quote').first()).toBeVisible()
})

test('command palette opens with the keyboard', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Control+K')
  await expect(page.getByRole('dialog', { name: /search rns global/i })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog', { name: /search rns global/i })).toBeHidden()
})

test('contact form validates before advancing', async ({ page }) => {
  await page.goto('/contact')
  await page.getByRole('button', { name: /^next$/i }).click()
  await expect(page.getByText(/enter your full name/i).first()).toBeVisible()
})

test('tools calculator is interactive', async ({ page }) => {
  await page.goto('/tools/company-cost')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Company Setup Cost')
  await expect(page.getByText(/estimated 3-year cost/i)).toBeVisible()
})
