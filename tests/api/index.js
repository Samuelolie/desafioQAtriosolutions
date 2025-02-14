import { expect } from '@playwright/test';

export class Api {

    constructor(request, page) {
        this.request = request
        this.page = page
    }

    async extractsIdUser(){
        const response = await this.page.waitForResponse(response =>
            response.url() === 'https://www.grocerycrud.com/v1.x/demo/bootstrap_theme_v5/insert' && response.status() == 200);
        
          const jsonResponse = await response.json();
          const id = jsonResponse.insert_primary_key;

          return id
    }

    async deleteUserApi(id){
        await this.request.get(`https://www.grocerycrud.com/v1.x/demo/bootstrap_theme_v5/delete/${id}`);
    }

    async registerUser(name, lastName, contactFirstName, phone, addressLine1, addressLine2, city, state, postalCode, salesRepEmployeeNumber, creditLimit){
        
        await this.request.post('https://www.grocerycrud.com/v1.x/demo/bootstrap_theme_v5/insert', {
            headers:{
              Accept: 'text/plain, */*; q=0.01',
              ContentType: 'multipart/form-data'
            },
            multipart:{
              customerName: name,
              contactLastName: lastName,
              contactFirstName: contactFirstName,
              phone: phone,
              addressLine1: addressLine1,
              addressLine2: addressLine2,
              city: city,
              state: state,
              postalCode: postalCode,
              salesRepEmployeeNumber: salesRepEmployeeNumber,
              creditLimit: creditLimit,
              deleted: ''
            }
          })
    }
}