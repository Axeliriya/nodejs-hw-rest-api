const { HttpCode } = require('../helpers/constants');
const { AuthsService, UsersService } = require('../services');

const authService = new AuthsService();
const userService = new UsersService();

const registration = async (req, res, next) => {
  const user = await userService.findByEmail(req.body);
  if (user) {
    return next({
      status: HttpCode.CONFLICT,
      message: `This email is already use`,
    });
  }
  try {
    const newUser = await userService.createUser(req.body);
    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      users: [
        {
          id: newUser.id,
          email: newUser.email,
          subscription: newUser.subscription,
        },
      ],
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const token = await authService.login(req.body);
    if (token) {
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        token,
      });
    }
    next({
      status: HttpCode.UNAUTHORIZED,
      message: `Invalid credentials`,
      data: 'Unauthorized',
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const id = req.user.id;
  await authService.logout(id);
  return res.status(HttpCode.NO_CONTENT).json({
    status: 'success',
    code: HttpCode.NO_CONTENT,
  });
};

module.exports = {
  registration,
  login,
  logout,
};
