import { getResponseById } from '@utils/typeform';
import { NextApiHandler } from 'next';

const getTypeformResponse: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const response = await getResponseById(req.query.response_id);
    res.send(response);
  } else {
    res.send(404);
  }
};

export default getTypeformResponse;
