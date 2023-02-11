// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
    const { photoreference, key: apiKey } = req.query
    const apiUrl = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoreference}&maxwidth=400&key=${apiKey}`;

    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });

    axios.get(apiUrl, { responseType: 'arraybuffer' })
      .then((response) => {
        res.set('Content-Type', 'image/jpeg');
        res.send(Buffer.from(response.data, 'binary'));
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('An error occurred while fetching data from the Google Maps API');
      });
  }
  