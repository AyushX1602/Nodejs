const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { z } = require('zod');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

const registerUser = async (req, res) => {
    const validatedData = registerSchema.safeParse(req.body);
    if (!validatedData.success) {
        return res.status(400).json({
            errors: validatedData.error.errors,
        });
    }

    const { email, password } = validatedData.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        email,
        password: hashedPassword
    });
    
    await user.save();
    
    res.status(201).json({
        message: "User registered successfully"
    });

const existingUser = await User.findOne({ email});

if(existingUser){
    return res.status(400).json({
        message: "Email already in use"
    });
}
};

module.exports = { User, registerUser };