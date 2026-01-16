import authService from '../services/auth-service';
const login = async (req, res) => {
    const { username, password } = req.body;
    const response = await authService.login(username, password);
    return res.status(200).json({
        data: response,
        message: 'success'
    });
};
const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    const newToken = await authService.generateTokenFromRefreshToken(refreshToken);
    return res.status(201).json({
        data: newToken,
        message: 'success'
    });
};
const register = async (req, res) => {
    const data = req.body;
    const response = await authService.createAccount(data);
    return res.status(201).json({
        data: response,
        message: 'Account created successfully.'
    });
};
export default {
    login,
    refreshToken,
    register
};
