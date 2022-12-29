import { NextApiRequest, NextApiResponse } from 'next';
import { HTTP_METHOD, HTTP_STATUS } from '../../libs/constants/http';
import { userService } from '../../libs/services/user/user.service';

const UserController = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case HTTP_METHOD.POST:
      const { name, email, password } = req.body;
      const user = await userService.createUser({ name, email, password });

      return res.status(HTTP_STATUS.OK).json({ user });

    default:
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ user: null });
  }
};

export default UserController;
