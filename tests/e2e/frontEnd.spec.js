import { test, expect } from '@playwright/test';

const { Cadastro } = require('../pages/Cadastro')
const { Api } = require('../api/index')

let cadastro
let api

test.beforeEach(async({ page, request })=>{
  cadastro = new Cadastro(page)
  api = new Api(request, page)
})

test('Cadastra Usuário', async ({ page, request }) => {

  await cadastro.visitPage()

  await cadastro.selectVersion('Bootstrap V5 Theme')

  await cadastro.submitForm('TesteDesafioTrisolution', 'Automatizado', 'ABC', '12345678911', '123', '123', 'Porto Alegre', 'RS', '91755-270', 'Brasil', 'Bow', '123')
  
  const idUser = await api.extractsIdUser()

  await cadastro.searchElement()

  const rows = await page.getByRole('row', { name: 'Automatizado' })
  await expect(rows).toContainText('TesteDesafioTrisolution')

  await api.deleteUserApi(idUser)
});

test('Deleta Usuário', async ({ page }) => {
  
  await cadastro.visitPage()
  
  await api.registerUser('TesteUserDelete', 'Automatizado', 'ABC', '12345678911', '123', '123', 'Porto Alegre', 'RS', '91755-270', 3, '123')

  await cadastro.searchUser('TesteUserDelete', 'Automatizado', '12345678911')

  await cadastro.deleteUser()

  const messageDelete = await page.locator('span[data-growl="message"]')

  await expect(messageDelete).toHaveText('Your data has been successfully deleted from the database.')
});
