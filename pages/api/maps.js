// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
    const { place_id, key: apiKey } = req.query
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${apiKey}`;

    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });

    axios.get(apiUrl)
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('An error occurred while fetching data from the Google Maps API');
      });
  }
  