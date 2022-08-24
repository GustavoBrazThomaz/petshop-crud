const Customer = require('../models/customerModel');

exports.createCustomer = async (req, res) => {

    try {
        const registerCustomer = new Customer(req.body)
        await registerCustomer.createCustomer()

        if(registerCustomer.error.length > 0){
            res.status(registerCustomer.http_status)
            res.json({msg: registerCustomer.error})
            return
        }
        res.status(registerCustomer.http_status).json(registerCustomer.user)
    } catch (err) {
        console.log(err)
    }

};

exports.getAllCustomer = async (req, res) => {

    try {
        const customer = await Customer.searchCustomer()
        res.status(200).json(customer)

    } catch (err) {
        res.status(500).json({ error: err })
        return
   }
};

exports.putCustomer = async (req, res) => {
    try{
        const costumer = new Customer(req.body, req.params.id)
        await costumer.uptadeCustomer()

        if(costumer.error.length > 0){
            res.status(404)
            res.json(costumer.error)
            return
        }
        res.json(costumer.body)
    }catch(err){
        console.log(err)
        res.status(500).json({msg: 'Ocorreu um Erro'})
    }

}

exports.getCustomerId = async (req, res) => {
    const id = req.params.id

    try {
        const customerId = await Customer.searchCustomerById(id)
        if (!customerId) {
            res.status(422).json({ message: 'O cliente não cadastrado' })
            return
        }
        res.status(200).json(customerId)

    } catch (err) {
        console.log(err)
    }
    
};

exports.deleteCustomer = async (req, res) => {
    const id = req.params.id

    try {
        const customer = new Customer(null, id)
        await customer.delCustomer()

        if(customer.error.length > 0){
            res.status(404)
            res.json(customer.error)
            return
        }

        res.status(200).json({msg: 'Cliente deletado com sucesso'})

    } catch (err) {
        res.status(500).json({ error: err })
    }

};

exports.createPet = async (req, res) => {
    const id = req.params.id

    try {
        const pet = await Customer.insertPet(id, req.body)
        res.json(pet)
        res.status(200)
    } catch (err) {
        console.log(err)
    }
}

exports.deletePet = async (req, res) => {
    const id = req.params.id
    const index = req.params.index

    try {
        const pet = await Customer.deletePet(id, index)
        res.json(pet)
        res.status(200)
    } catch (err) {
        console.log(err)
    }
}