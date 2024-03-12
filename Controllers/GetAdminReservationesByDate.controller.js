const { Controller, storage } = require("sm-express-server");
const fs = require ("fs");
const Response = require("../Modules/Response");

const getAdminReservationesByDateController = new Controller({method:"GET", name:"Git admin reservationes by date", path:"/adminReservations", storage: storage("./").none()}, (req, res, app) => {
    fs.readFile("./Database/reservationes.json", (err, data) => {
        if(err)
            res.status(5000).send("Error");
        /**
         * @type {{client_id: number,date: string, startTime: string, endTime:string}[]} reservationes
         */
        const reservationes = JSON.parse(data.toString());
        const startDate = new Date(req.query.startDate);
        const endDate = new Date(req.query.endDate);
        const reservationesFilter = reservationes.filter(res =>  (new Date(res.date) >= startDate && new Date(res.date) <= endDate));
        fs.readFile("./Database/services.json", (err, data) => {
            if(err)
                res.status(5000).send("Error");
            const services = JSON.parse(data.toString());
            fs.readFile("./Database/users.json", (err, data) => {
                if(err)
                    res.status(5000).send("Error");
                const users = JSON.parse(data.toString());
                const response = reservationesFilter.map(res => {
                    let response = res;
                    let user = users.find(user => user.id == res.client_id);
                    let service = services.find(service => service.id == res.serviceId);
                    if (user && service) {
                        return {...res, ...user, serviceName: service.name, serviceTitle: service.title,price: service.price, id: undefined};
                    }
                    else
                        return null
    
                })
                res.send(new Response(JSON.stringify(response)));
            })
        })
    })    
})

module.exports = getAdminReservationesByDateController;