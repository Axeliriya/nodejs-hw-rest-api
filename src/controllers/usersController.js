const { HttpCode, Subscription } = require('../helpers/constants');
const { AuthsService, UsersService } = require('../services');

const authService = new AuthsService();
const userService = new UsersService();
const { STARTER, PRO, BUSINESS } = Subscription;

const registration = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userService.findByEmail(email);
  if (user) {
    return next({
      status: HttpCode.CONFLICT,
      message: `This email is already use`,
      data: 'Conflict',
    });
  }
  try {
    const newUser = await userService.createUser(email, password);
    return res.status(HttpCode.CREATED).json({
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

const getUser = async (req, res, next) => {
  try {
    const { name, email, subscription } = req.user;
    if (req.user) {
      return await res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        ResponseBody: { name, email, subscription },
      });
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    if (token) {
      return res.status(HttpCode.OK).json({
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

const updateSubscriptionById = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length > 0) {
      const user = await userService.updateSubscr(req.user.id, req.body);
      if (user) {
        return res.status(HttpCode.OK).json({
          status: 'success',
          code: HttpCode.OK,
          users: {
            user,
          },
        });
      } else {
        return next({
          status: HttpCode.NOT_FOUND,
          message: `You can choose from three subscriptions: ${STARTER}, ${PRO} or ${BUSINESS}`,
          data: 'Not Found',
        });
      }
    } else {
      return next({
        status: HttpCode.BAD_REQUEST,
        message: 'Missing field',
        data: 'Bad Request',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUser,
  registration,
  login,
  logout,
  updateSubscriptionById,
};
