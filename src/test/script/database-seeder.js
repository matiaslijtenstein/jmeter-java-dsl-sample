const axios = require('axios');
const products =require('./products.json');
const suppliers =require('./suppliers.json');

class Seeder {
ProductsIds = [];
SuppliersIds = [];
Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTA1MGM5YjllYzdhOWNiOTkzMTBjZSIsImlhdCI6MTY4MzAwMDQ2NiwiZXhwIjoxNjgzMDg2ODY2fQ.U5jiGUw_SMeCmsUg0GPMe2tIS2PAKaz1B5_X0kFcJRg'
async run(){
    
     await this.createProducts();
     await this.createSuppliers();
     await this.createPurchases();
     await this.createSales();

}

  async createProducts() {

    for (var i = 0; i < 8; i++){
        try{
            let response =  await axios.post('http://dev-stock-env.eba-nhzdmizz.us-east-1.elasticbeanstalk.com/products', products[i], {headers: {'Authorization': this.Token}}).catch((err) => { throw new Error(err)});
            this.ProductsIds.push(response.data._id);     
            //this.ProductsIds.push(i);     
 
        }catch(err){
            console.log(err);
            continue;
        }
    }

  };

  async createSuppliers() {

    for (var i = 0; i < 5; i++){
        try{
            let response =  await axios.post('http://dev-stock-env.eba-nhzdmizz.us-east-1.elasticbeanstalk.com/suppliers', suppliers[i], {headers: {'Authorization': this.Token}}).catch((err) => { throw new Error(err)});
            this.SuppliersIds.push(response.data._id);
            //this.SuppliersIds.push(i); 
 
        }catch(err){
            console.log(err);
            continue;
        }
    }
  };

  async createSales() {
    for (var i = 0; i < 100; i++){
        try{
            const sale = {
                date: this.generateRandomDate(),
                client: "Pablo",
                products: [{
                    product: this.ProductsIds[this.generateRandomNumber(8)],
                    quantity: 1
                }]
            }

            let response =  await axios.post('http://dev-stock-env.eba-nhzdmizz.us-east-1.elasticbeanstalk.com/sales', sale, {headers: {'Authorization': this.Token}}).catch((err) => { throw new Error(err)});
        }catch(err){
            console.log(err);
            continue;
        }
    }
  }

  async createPurchases(){
    
        for (var i = 0; i < 100; i++){
            try{
                const purchase = {
                    date: this.generateRandomDate(),
                    supplier: this.SuppliersIds[this.generateRandomNumber(5)],
                    products: [{
                        product: this.ProductsIds[this.generateRandomNumber(8)],
                        quantity: 5
                    }],
                    price: 5
                }

                let response =  await axios.post('http://dev-stock-env.eba-nhzdmizz.us-east-1.elasticbeanstalk.com/purchases', purchase, {headers: {'Authorization': this.Token}}).catch((err) => { throw new Error(err)});
        

            } catch(err){
                console.log(err);
                continue;
            }
            
        }
  }

    generateRandomNumber(num) {
    return Math.floor(Math.random() * num); // Genera un número aleatorio entre 0 y 7
    }

    generateRandomDate() {
        // Convierte las cadenas de fecha a objetos Date
        const startDate = new Date('2023-01-01');
        const endDate = new Date('2023-04-01');
      
        // Genera un número aleatorio entre las fechas límites en milisegundos
        const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
      
        // Crea un objeto Date a partir del número aleatorio generado
        const randomDate = new Date(randomTime);
      
        // Formatea la fecha en el formato deseado
        const day = String(randomDate.getDate()).padStart(2, '0');
        const month = String(randomDate.getMonth() + 1).padStart(2, '0');
        const year = randomDate.getFullYear();
      
        return `${month}/${day}/${year}`;
      }
}

(async () => {
  const seeder = new Seeder();
  await seeder.run();
})();