import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendResetPasswordEmail } from '../utils/emailService.js';

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET, // In production, use environment variable
        { expiresIn: '7d' }
    );
};

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        // Generate token
        
        const token = generateToken(user);
        
        res.status(201).json({ 
            message: 'Account created successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Error creating account' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt for email:', email);

        if (!email || !password) {
            console.log('Missing email or password');
            return res.status(400).json({ message: 'Please provide both email and password' });
        }

        // Check if user exists
        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            console.log('User not found:', email);
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        if (!user.password) {
            console.log('No password set - social login required');
            return res.status(400).json({ message: 'Please sign in with your social account' });
        }

        // Debug: Log the password comparison
        console.log('Comparing passwords...');
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            console.log('Password does not match');
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user);
        console.log('Login successful for user:', user.email);

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role || 'customer' // Ensure default role is set
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: 'Error during login',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const googleCallback = (req, res) => {
    try {
        const token = generateToken(req.user);
        res.redirect(`${process.env.FRONTEND_URL}/authentication/success?token=${token}`);
    } catch (error) {
        console.error('Google callback error:', error);
        res.redirect(`${process.env.FRONTEND_URL}/authentication/error`);
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({ message: 'Error fetching user data' });
    }
};

// Forgot password
export const forgotPassword = async (req, res) => {
    try {
        console.log('Forgot password request received:', req.body);
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log('No user found with email:', email);
            return res.status(404).json({ message: 'No user found with this email' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; 
        
        try {
            await user.save();
            console.log('Reset token saved for user:', email);
        } catch (saveError) {
            console.error('Error saving reset token:', saveError);
            return res.status(500).json({ message: 'Error saving reset token' });
        }

        // Send reset email
        try {
            const emailSent = await sendResetPasswordEmail(email, resetToken);
            if (!emailSent) {
                console.error('Failed to send reset email to:', email);
                return res.status(500).json({ message: 'Error sending reset email' });
            }
            console.log('Reset email sent successfully to:', email);
        } catch (emailError) {
            console.error('Error sending reset email:', emailError);
            return res.status(500).json({ message: 'Error sending reset email' });
        }

        res.json({ message: 'Password reset email sent successfully' });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Error processing request' });
    }
};

// Reset password
export const resetPassword = async (req, res) => {
    try {
        console.log('Reset password request received');
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({ message: 'Token and password are required' });
        }

        // Find user with valid reset token
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        
        // Clear reset token fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        
        await user.save();

        res.json({ message: 'Password has been reset successfully' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Error resetting password' });
    }
};
// ... existing imports and code ...

// NEW: Add after googleCallback
export const facebookCallback = (req, res) => {
    try {
        const token = generateToken(req.user);
        res.redirect(`${process.env.FRONTEND_URL}/authentication/success?token=${token}`);
    } catch (error) {
        console.error('Facebook callback error:', error);
        res.redirect(`${process.env.FRONTEND_URL}/authentication/error`);
    }
};

// ... rest of existing controller code ...
