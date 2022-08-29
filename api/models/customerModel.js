const mongoose = require('mongoose');

const Pet = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    genger: { type: String, required: true },
    weight: { type: Number, required: true },
    service: { type: String, required: true },
    species: { type: String, required: true}
})

const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: {type: String, required: true},
    phone: { type: Number, required: true },
    cpf: { type: Number, required: true},
    payment: { type: Boolean, required: true },
    pets: [Pet]
});

const CustomerModel = mongoose.model('Customer', CustomerSchema);

class Customer {
    constructor(body, id) {
        this.body = body;
        this.error = [];
        this.user = null;
        this.http_status = 0;
        this.id = id;
    }

    async createCustomer() {
        this.validate()
        if (this.error.length > 0) {
            this.http_status = 422
            return
        }

        await this.customerExists()

        if (this.error.length > 0) {
            this.http_status = 422
            return
        }

        this.user = await CustomerModel.create(this.body)
        this.http_status = 201
    }

    static async searchCustomer() {
        const customers = await CustomerModel.find()
        return customers
    }

    static async searchCustomerById(id) {
        const customers = await CustomerModel.findById({ _id: id })
        return customers
    }

    async delCustomer() {
        const customers = await CustomerModel.findById({ _id: this.id })

        if (!customers) {
            this.error.push({ msg: 'Cliente não encontrado' })
            return
        }
        await CustomerModel.deleteOne({ _id: this.id })
        return
    }

    async uptadeCustomer(){
        await this.validate()

        if(this.error > 0)return  
    
        const putCustomer = await CustomerModel.updateOne({ _id: this.id }, this.body)

        if (putCustomer.matchedCount === 0) {
            this.error.push({ msg: 'Usuário não encontrado' })
            return
        }
        
    }

    static async insertPet(id, pet_body){
        const owner = await CustomerModel.findById({_id: id})

        owner.pets.push(pet_body)
        owner.save()
        return owner
    }

    static async deletePet(id, index){
        const owner = await CustomerModel.findById({_id: id})
        owner.pets.splice(index, 1)
        owner.save()
        return owner
    }

    async validate() {
        if (!this.body.name) {
            this.error.push('Insira o nome')
            this.http_status = 422
            return
        }

        if(!this.body.lastName){
            this.error.push('Insira o sobrenome')
            this.http_status = 422
            return
        }

        if (!this.body.phone) {
            this.error.push('Insira o telefone')
            this.http_status = 422
            return
        }

        if(!this.body.cpf){
            this.error.push('Insira o CPF')
            this.http_status = 422
            return
        }
        
        if(this.body.phone.toString().length !== 11){
            this.error.push('Telefone inválido')
            this.http_status = 422
            return
        }

        if(this.body.cpf.toString().length !== 11){
            this.error.push('CPF inválido')
            this.http_status = 422
            return
        }
        
    }

    async customerExists() {
        this.user = await CustomerModel.findOne({ cpf: this.body.cpf })
        if (this.user) {
            this.error.push('CPF já cadastrado')
            this.http_status = 404
        }
    }
}

module.exports = Customer;