const Admin = require('../../model/admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Coach = require('../../model/coach')
const Client = require('../../model/client');
const Package = require('../../model/package');

class AdminController {
    async allCoaches(req, res) {
        try {
            const coaches = await Coach.find({});
            // console.log(coaches)
            res.status(200).json({
                data: coaches,
                message: 'Coaches fetched successfully',
                success: true
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }


    async blockCoach(req, res) {
        try {
            const coachId = req.params.id;
            console.log('hiihih');
            console.log(req.params.id);
            await Coach.findByIdAndUpdate(coachId, { status: 'blocked' });
            console.log('Coach blocked successfully');
            res.status(200).json({ message: 'Coach blocked successfully', success: true })

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });

        }
    }

    async updateCoach(req, res) {
        try {
            const coachId = req.params.id;
            console.log('ooohih');
            console.log(req.params.id);
            await Coach.findByIdAndUpdate(coachId, req.body)
            console.log('Coach updated successfully');
            res.status(200).json({ message: 'Trainer updated successfully', success: true })
        } catch (error) {
            req.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async addCoach(req, res) {
        try {
            console.log('ADD COACH');
            const { fullName, email, password, status } = req.body;
            if (!fullName || !email || !password) {
                return res.status(400).json({ error: 'All fields are required' });
            }
            const coach = new Coach({ fullName, email, password });
            await coach.save();
            res.status(200).json({ message: 'Coach added successfully', success: true })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }


    async allClients(req, res) {
        try {
            console.log('clients')
            const clients = await Client.find({}).populate('coach', 'fullName email'); // Populate coach details
            console.log(clients);
            res.status(200).json({
                data: clients,
                message: 'Clients fetched successfully',
                success: true
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

     async  addClient(req, res) {
        try {
            console.log('ADD Clients');
            console.log(req.body);
            const { fullName, email, password , coach} = req.body;
            if (!fullName || !email || !password || !coach) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            // Check if client already exists
        const existingClient = await Client.findOne({ email });
        if (existingClient) {
            return res.status(409).json({ error: 'Client with this email already exists.' });
        }

         // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);


            // Create new client
        const newClient = new Client({
            fullName,
            email,
            password: hashedPassword,
            coach
        });

        await newClient.save();

            res.status(201).json({ message: 'Client added successfully', success: true })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

      async blockClient(req, res) {
        try {
            const clientId = req.params.id;
            console.log('hiihih');
            console.log(req.params.id);
            await Client.findByIdAndUpdate(clientId, { status: 'blocked' });
            console.log('client blocked successfully');
            res.status(200).json({ message: 'client blocked successfully', success: true })

        } catch (error) {
            console.log(error); 
            res.status(500).json({ error: 'Internal Server Error' });

        }
    }

    async updateClient(req, res) {
        try {
            const clientId = req.params.id;
            // console.log('ooohih');
            // console.log(req.params.id);
            await Client.findByIdAndUpdate(clientId, req.body)
            console.log('Client updated successfully');
            res.status(200).json({ message: 'Client updated successfully', success: true })
        } catch (error) {
            req.status(500).json({ error: 'Internal Server Error' });
        }
    }



    async allPackages(req, res) {
        try {
            const allPackages = await Package.find({});
            console.log(allPackages);
            return res.status(200).json({
                data: allPackages,
                message: 'Packages fetched successfully',
                success: true
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }


    async addPackage(req,res){
        try {
            const { name, price, duration , description } = req.body;
            if (!name || !price || !duration || !description) {
                return res.status(400).json({ error: 'All fields are required' });
            }
            const newPackage = new Package({ name, price, duration, description });
            await newPackage.save();
            return res.status(200).json({ message: 'Package added successfully', success: true })
        } catch (error) {
            console.log(error);
             return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updatePackage(req, res) {
        try {
            const packageId = req.params.id;
            console.log(req.params.id);
            await Package.findByIdAndUpdate(packageId, req.body)
            console.log('Package updated successfully');
            return res.status(200).json({ message: 'Package updated successfully', success: true })
        } catch (error) {
            console.log(error);
            return req.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async blockPackage(req,res){
        try {
            const packageId = req.params.id;
            await Package.findByIdAndUpdate(packageId, { status: 'inactive' });
            console.log('Package blocked successfully');
            return res.status(200).json({ message: 'Package blocked successfully', success: true })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
            
        }
    }


    async addWorkout(req, res) {
        try {
            const { name, description, duration, intensity, category, createdBy } = req.body;
            if (!name || !description || !duration || !intensity ) {
                return res.status(400).json({ error: 'All fields are required' });
            }
            const newWorkout = new Workout({ name, description, duration, intensity, category, createdBy });
            await newWorkout.save();
            return res.status(200).json({ message: 'Workout added successfully', success: true })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}


module.exports = new AdminController();