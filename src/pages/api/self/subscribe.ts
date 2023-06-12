// to hide backend IP, request to self / next-api
import { NextApiHandler } from 'next';
import { unAuthed } from '@utils/http';

const subscribe: NextApiHandler = async (req: any, res: any) => {
  const { email } = req.body;
  const { status } = await unAuthed.post('/newsletter', {
    email,
  });
  if (status === 200) {
    res.status(200).json({
      success: true,
    });
  } else {
    res.status(500).end();
  }
};

export default subscribe;
