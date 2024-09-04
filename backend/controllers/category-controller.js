const categories = [
    'Tech',
    'Entertainment',
    'Sports',
    'Movies',
    'Music',
    'Books',
    'Travel',
    'Food',
    'Health',
    'Education'
]

const GetAllCategories = async (req,res,next) => {
    try {
        return res.status(200).json({categories})
    } catch (error) {
        res.status(500).json({ message: "Could not fetch categories" });
    }
}

module.exports = GetAllCategories;