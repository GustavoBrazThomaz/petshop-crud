const mongoose = require('mongoose');

const Pet = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    genger: { type: String, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    service: { type: String, required: true },
    species: { type: String, required: true}
})

const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
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
            this.error.push('Inserira um nome')
            this.http_status = 422
        }

        if (!this.body.phone) {
            this.error.push('Inserira um telefone')
            this.http_status = 422
        }
        
        if(this.body.phone.length !== 11){
            this.error.push('O número do telefone precisa ter o DDD e mais 9 Dígitos')
            this.http_status = 422
        }

    }

    async customerExists() {
        this.user = await CustomerModel.findOne({ phone: this.body.phone })
        if (this.user) {
            this.error.push('Telefone já cadastrado')
            this.http_status = 404
        }
    }
}


module.exports = Customer;