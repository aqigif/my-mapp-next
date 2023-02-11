// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

export default function handler(req, res) {
    const place_id = req.params.place_id;
    const apiKey = req.params.key;
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${apiKey}`;

    axios.get(apiUrl)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('An error occurred while fetching data from the Google Maps API');
      });
  }
  