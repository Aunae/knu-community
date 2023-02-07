import { NextApiRequest, NextApiResponse } from 'next';
import { HTTP_METHOD, HTTP_STATUS } from '../../libs/constants/http';
import { userService } from '../../libs/services/user/user.service';
import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, process.env.NEXTAUTH_SECERT ?? 'oaisdhjoaishd');
  return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const valid = await bcrypt.compare(password, hashedPassword);
  return valid;
}

const UserController = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case HTTP_METHOD.POST:
      const { name, email, password } = req.body;
      const hashedPassword = await hashPassword(password);
      const user = await userService.createUser({ name, email, password: hashedPassword });

      return res.status(HTTP_STATUS.OK).json({ user });

    default:
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ user: null });
  }
};

export default UserController;
