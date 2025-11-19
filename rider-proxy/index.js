const express = require('express');
const axios = require('axios');
const app = express();

// Cette route va attraper toutes les requêtes commençant par /api/
app.use('/api', async (req, res) => {
  const apiUrl = req.originalUrl.replace('/api', ''); // récupère le chemin après /api
  try {
    const response = await axios.get('https://queue-times.com' + apiUrl);
    res.header('Access-Control-Allow-Origin', '*');
    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).send(error.message);
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
