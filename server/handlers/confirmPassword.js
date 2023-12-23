import bcrypt from 'bcryptjs';
export const confirmPassword = async (password, hashedPassword) => {
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
    return isPasswordMatch;
    }