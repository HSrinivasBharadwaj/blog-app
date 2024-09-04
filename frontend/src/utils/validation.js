export const Validate = (name,email,password,confirmPassword) => {
    const errors = {};
    if (!name) {
        errors.name = "Name is required"
    }
    if (!email) {
        errors.email = "Email is required"
    }
    else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        errors.email = "Invalid email address"
    }
    if (!password) {
        errors.password = "Password is required"
    }
    if (password !== confirmPassword) {
        errors.confirmPassword = "Password doesnot match"
    }
    return errors
}