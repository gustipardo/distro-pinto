import express from 'express';

const app = express();

app.use(express.json());

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.get('/tasks', (req, res) => {
    res.json([]);
});

app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    try{ 
        if(!title || !description){
            throw new Error('Missing title or description');
        }
    res.json({
        title,
        description,
        id: 1,
    });
    }catch(error){
        res.status(400).json({
            error: error.message,
        });
    }
});


const server = app.listen(3000, () => {
  console.log('Server started on port http://localhost:3000');

});

export default app;