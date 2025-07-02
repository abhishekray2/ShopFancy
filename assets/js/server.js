import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { registerUser, loginUser, updateUserProfile, getUserProfile, updatePassword, updateEmail, updateProfilePicture, addToWishlist, removeFromWishlist, getUserOrders, getUserWishlist } from '../../api/auth.js';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

// Serve static files
app.use(express.static(__dirname));

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            console.log('No authorization header');
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        if (!authHeader.startsWith('Bearer ')) {
            console.log('Invalid authorization format');
            return res.status(401).json({ success: false, message: 'Invalid token format' });
        }

        const token = authHeader.split(' ')[1];
        
        if (!token) {
            console.log('No token found in Bearer header');
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        try {
            const decoded = jwt.verify(token, 'your-secret-key');
            req.userId = decoded.userId;
            next();
        } catch (error) {
            console.log('Token verification failed:', error.message);
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Apply token verification to protected routes
app.use('/api/auth/user', verifyToken);
app.use('/api/auth/profile', verifyToken);
app.use('/api/auth/orders', verifyToken);
app.use('/api/auth/wishlist', verifyToken);
app.use('/api/auth/password', verifyToken);
app.use('/api/auth/email', verifyToken);
app.use('/api/auth/profile-picture', verifyToken);

// Authentication routes
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }
        const result = await registerUser(email, password);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await loginUser(email, password);
        
        if (result.success) {
            // Generate JWT token
            const token = jwt.sign(
                { userId: result.user.id },
                'your-secret-key',
                { expiresIn: '24h' }
            );
            
            console.log('Login successful for user:', result.user.id);
            res.json({
                success: true,
                user: result.user,
                token: token
            });
        } else {
            console.log('Login failed:', result.message);
            res.status(401).json(result);
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(400).json({ success: false, message: error.message });
    }
});

// Get user profile
app.get('/api/auth/user/:userId', verifyToken, async (req, res) => {
    try {
        // Check if the requested userId matches the token's userId
        if (req.params.userId !== req.userId) {
            console.log('User ID mismatch:', req.params.userId, req.userId);
            return res.status(403).json({ success: false, message: 'Unauthorized access' });
        }

        const result = await getUserProfile(req.params.userId);
        res.json(result);
    } catch (error) {
        console.error('Error getting user profile:', error);
        res.status(400).json({ success: false, message: error.message });
    }
});

// Update user profile
app.put('/api/auth/profile/:userId', verifyToken, async (req, res) => {
    try {
        // Check if the requested userId matches the token's userId
        if (req.params.userId !== req.userId) {
            console.log('User ID mismatch in profile update:', req.params.userId, req.userId);
            return res.status(403).json({ success: false, message: 'Unauthorized access' });
        }

        const result = await updateUserProfile(req.params.userId, req.body);
        res.json(result);
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(400).json({ success: false, message: error.message });
    }
});

// Update user password
app.put('/api/auth/password/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { oldPassword, newPassword } = req.body;
        const result = await updatePassword(userId, oldPassword, newPassword);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Update user email
app.put('/api/auth/email/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { password, newEmail } = req.body;
        const result = await updateEmail(userId, password, newEmail);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Update profile picture
app.post('/api/auth/profile-picture/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { imageData } = req.body;
        const result = await updateProfilePicture(userId, imageData);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Add to wishlist
app.post('/api/auth/wishlist/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId } = req.body;
        const result = await addToWishlist(userId, productId);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Remove from wishlist
app.delete('/api/auth/wishlist/:userId/:productId', async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const result = await removeFromWishlist(userId, productId);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Get user orders
app.get('/api/auth/orders/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await getUserOrders(userId);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Get user wishlist
app.get('/api/auth/wishlist/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await getUserWishlist(userId);
        res.json(result);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Initialize JSON files if they don't exist
const files = ['users.json'];
files.forEach(file => {
    const filePath = path.join(dataDir, file);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify({ users: [] }));
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 