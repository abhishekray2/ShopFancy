import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

// Helper function to read users file
const readUsersFile = () => {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return { users: [] };
    }
};

// Helper function to write to users file
const writeUsersFile = (data) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));
};

// Register new user
export const registerUser = async (email, password) => {
    const userData = readUsersFile();
    
    // Check if user already exists
    if (userData.users.some(user => user.email === email)) {
        throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add new user with empty profile
    userData.users.push({
        id: Date.now().toString(),
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
        profile: {
            name: '',
            phone: '',
            address: '',
            city: '',
            postalCode: '',
            dateOfBirth: '',
            updatedAt: null
        }
    });

    writeUsersFile(userData);
    return { success: true, message: 'User registered successfully' };
};

// Login user
export const loginUser = async (email, password) => {
    const userData = readUsersFile();
    const user = userData.users.find(user => user.email === email);

    if (!user) {
        throw new Error('User not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Invalid password');
    }

    return {
        success: true,
        message: 'Login successful',
        user: {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt
        }
    };
};

// Update user profile
export const updateUserProfile = async (userId, profileData) => {
    try {
        const userData = readUsersFile();
        const userIndex = userData.users.findIndex(user => user.id === userId);
        
        if (userIndex === -1) {
            console.log('User not found for update:', userId);
            throw new Error('User not found');
        }

        // Validate profile data
        if (!profileData) {
            throw new Error('Profile data is required');
        }

        // Update only allowed fields
        const allowedFields = ['name', 'phone', 'address', 'city', 'postalCode'];
        const sanitizedProfile = {};
        
        allowedFields.forEach(field => {
            if (profileData[field] !== undefined) {
                sanitizedProfile[field] = profileData[field].trim();
            }
        });

        // Update the profile
        userData.users[userIndex].profile = {
            ...userData.users[userIndex].profile || {},
            ...sanitizedProfile,
            updatedAt: new Date().toISOString()
        };

        writeUsersFile(userData);

        // Return updated user without sensitive information
        const { password, ...updatedUser } = userData.users[userIndex];
        return {
            success: true,
            user: updatedUser,
            message: 'Profile updated successfully'
        };
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};

// Get user profile
export const getUserProfile = async (userId) => {
    try {
        const userData = readUsersFile();
        const user = userData.users.find(user => user.id === userId);
        
        if (!user) {
            console.log('User not found:', userId);
            throw new Error('User not found');
        }

        // Don't send sensitive information
        const { password, ...userWithoutPassword } = user;
        return {
            success: true,
            user: userWithoutPassword
        };
    } catch (error) {
        console.error('Error getting user profile:', error);
        throw error;
    }
};

// Update user password
export const updatePassword = async (userId, oldPassword, newPassword) => {
    const userData = readUsersFile();
    const userIndex = userData.users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
        throw new Error('User not found');
    }

    // Verify old password
    const isValidPassword = await bcrypt.compare(oldPassword, userData.users[userIndex].password);
    if (!isValidPassword) {
        throw new Error('Current password is incorrect');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    userData.users[userIndex].password = hashedPassword;
    userData.users[userIndex].passwordUpdatedAt = new Date().toISOString();

    writeUsersFile(userData);
    return { success: true, message: 'Password updated successfully' };
};

// Update user email
export const updateEmail = async (userId, password, newEmail) => {
    const userData = readUsersFile();
    const userIndex = userData.users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
        throw new Error('User not found');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, userData.users[userIndex].password);
    if (!isValidPassword) {
        throw new Error('Password is incorrect');
    }

    // Check if new email already exists
    if (userData.users.some(user => user.email === newEmail)) {
        throw new Error('Email already in use');
    }

    userData.users[userIndex].email = newEmail;
    userData.users[userIndex].emailUpdatedAt = new Date().toISOString();

    writeUsersFile(userData);
    return { success: true, message: 'Email updated successfully' };
};

// Update user profile picture
export const updateProfilePicture = async (userId, imageData) => {
    const userData = readUsersFile();
    const userIndex = userData.users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
        throw new Error('User not found');
    }

    // Update profile picture
    userData.users[userIndex].profile = {
        ...userData.users[userIndex].profile,
        profilePicture: imageData,
        pictureUpdatedAt: new Date().toISOString()
    };

    writeUsersFile(userData);
    return { success: true, message: 'Profile picture updated successfully' };
};

// Add to wishlist
export const addToWishlist = async (userId, productId) => {
    const userData = readUsersFile();
    const userIndex = userData.users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
        throw new Error('User not found');
    }

    // Initialize wishlist if it doesn't exist
    if (!userData.users[userIndex].wishlist) {
        userData.users[userIndex].wishlist = [];
    }

    // Check if product is already in wishlist
    if (!userData.users[userIndex].wishlist.includes(productId)) {
        userData.users[userIndex].wishlist.push(productId);
    }

    writeUsersFile(userData);
    return { success: true, message: 'Product added to wishlist' };
};

// Remove from wishlist
export const removeFromWishlist = async (userId, productId) => {
    const userData = readUsersFile();
    const userIndex = userData.users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
        throw new Error('User not found');
    }

    // Remove product from wishlist
    if (userData.users[userIndex].wishlist) {
        userData.users[userIndex].wishlist = userData.users[userIndex].wishlist.filter(id => id !== productId);
    }

    writeUsersFile(userData);
    return { success: true, message: 'Product removed from wishlist' };
};

// Get user orders
export const getUserOrders = async (userId) => {
    const userData = readUsersFile();
    const user = userData.users.find(user => user.id === userId);
    
    if (!user) {
        throw new Error('User not found');
    }

    return {
        success: true,
        orders: user.orders || []
    };
};

// Get user wishlist
export const getUserWishlist = async (userId) => {
    const userData = readUsersFile();
    const user = userData.users.find(user => user.id === userId);
    
    if (!user) {
        throw new Error('User not found');
    }

    return {
        success: true,
        wishlist: user.wishlist || []
    };
}; 