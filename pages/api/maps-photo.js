// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

export default function handler(req, res) {
    const photoreference = req.params.photoreference;
    const apiKey = req.params.key;
    const apiUrl = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoreference}&maxwidth=400&key=${apiKey}`;

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
  