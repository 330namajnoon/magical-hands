const { Controller, storage } = require("sm-express-server");
const fs = require("fs");
const Response = require("../Modules/Response");

const postReservationController = new Controller({ method: "POST", name: "reservation", path: "/reservation", storage: storage("./").none() }, (req, res, app) => {
    fs.readFile("./Database/users.json", (err, data) => {
        if (err)
            res.status(5000).send("Error");
        /**
         * @type {{id: number,email: string, date: string}} user;
         */
        let user = JSON.parse(req.body.data);
        /**
         * @type {{id: number,email: string}[]} users;
         */
        const users = JSON.parse(data.toString());
        let date = user.date;
        let startTime = user.startTime;
        let endTime = user.endTime;
        let serviceId = user.serviceId;
        if (!users.find(us => us.email == user.email)) {
            user = {
                id: users.length + 1,
                email: user.email,
                name: user.name,
                lastName1: user.lastName1,
                lastName2: user.lastName2,
                phoneNumber: user.phoneNumber,
            }
            users.push(user);
        } else {
            user = users.find(us => us.email == user.email);
        }
        fs.readFile("./Database/reservationes.json", (err, data) => {
            if (err)
                res.status(5000).send("Error");
            /**
            * @type {{client_id: number,date: string, startTime: string, endTime: string, startTime: string, endTime:string}[]} reservationes
            */
            const reservationes = JSON.parse(data.toString());
            const reservation = { client_id: user.id, date, startTime, endTime, serviceId };
            reservationes.unshift(reservation);
            fs.readFile("./Database/adminHours.json", (err, data) => {
                if (err)
                    res.status(5000).send("Error");
                /**
                 * @type {{date: string, hours: {hour: string, isAvailable: boolean}[]}[]} adminHours
                 */
                let adminHours = JSON.parse(data.toString());
                let startDate = new Date(`${date} ${startTime}`);
                let endDate = new Date(`${date} ${endTime}`);
                adminHours = adminHours.map(ah => {
                    if (ah.date === reservation.date) {
                        return {
                            ...ah, hours: ah.hours.map(hs => {
                                let d = new Date(`${date} ${hs.hour}`);
                                if (d >= startDate && d <= endDate)
                                    return { ...hs, isAvailable: "R" };
                                return hs;
                            })
                        }
                    }
                    return ah;
                });

                fs.writeFile("./Database/reservationes.json", JSON.stringify(reservationes), (err) => {
                    if (err)
                        res.status(5000).send("Error");
                    fs.writeFile("./Database/users.json", JSON.stringify(users), (err) => {
                        if (err)
                            res.status(5000).send("Error");
                        fs.writeFile("./Database/adminHours.json", JSON.stringify(adminHours), (err) => {
                            if (err)
                                res.status(5000).send("Error");
                            res.status(200).send(new Response(JSON.stringify({ ...user, ...reservation, client_id: undefined })));
                        });
                    });

                });
            })

        })
    })
})

module.exports = postReservationController;