const jwt = require('jsonwebtoken');

// Function to test - generateJWTToken
function generateJWTToken(user) {
  const payload = {
    UserName: user.UserName,
    UserId: user.UserId,
    // Any other user-specific data needed??
  };
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
  return accessToken;
}

// Test Suite for generateJWTToken function
describe('generateJWTToken function', () => {
  it('should generate a valid JWT access token', () => {
    // Mock user data
    const mockUser = {
      UserName: 'DemoGod',
      UserId: 'Demo123',
      // Add any other required user-specific data
    };

    // Call the function with mock user data
    const token = generateJWTToken(mockUser);

    // Verify the token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    // Assert the decoded payload contains expected user data
    expect(decoded.UserName).toBe(mockUser.UserName);
    expect(decoded.UserId).toBe(mockUser.UserId);
    // Add more assertions for other user-specific data if applicable
  });
});

// Function to test - authenticateToken
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) return res.sendStatus(403);

    req.user = payload;

    next();
  });
}
// Test Suite for authenticateToken function
describe('authenticateToken function', () => {
  it('should return 401 if no token is provided', () => {
    // Mock request object
    const mockRequest = {
      headers: {},
    };

    // Mock response object
    const mockResponse = {
      sendStatus: jest.fn(),
    };

    // Mock next function
    const mockNext = jest.fn();

    // Call the function with mock request, response and next objects
    authenticateToken(mockRequest, mockResponse, mockNext);

    // Assert that the response status is 401
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(401);
  });

  it('should return 403 if an invalid token is provided', () => {
    // Mock request object
    const mockRequest = {
      headers: {
        authorization: 'Bearer invalidToken',
      },
    };

    // Mock response object
    const mockResponse = {
      sendStatus: jest.fn(),
    };

    // Mock next function
    const mockNext = jest.fn();

    // Call the function with mock request, response and next objects
    authenticateToken(mockRequest, mockResponse, mockNext);

    // Assert that the response status is 403
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(403);
  });

  it('should call next function if a valid token is provided', () => {
    // Mock request object
    const mockRequest = {
      headers: {
        authorization: 'Bearer validToken',
      },
    };

    // Mock response object
    const mockResponse = {};

    // Mock next function
    const mockNext = jest.fn();

    // Mock jwt.verify function
    jwt.verify = jest.fn((token, secret, callback) => callback(null, { UserName: 'DemoGod', UserId: 'Demo123' }));

    // Call the function with mock request, response and next objects
    authenticateToken(mockRequest, mockResponse, mockNext);

    // Assert that the next function was called
    expect(mockNext).toHaveBeenCalled();
  });
});