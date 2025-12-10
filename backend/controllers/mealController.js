import Meal from '../models/Meal.js'

// Create meal
export const createMeal = async (req, res, next) => {
  try {
    const {
      name,
      description,
      ingredients,
      calories,
      protein,
      carbs,
      fats,
      serving_size,
      category,
      type,
      image,
    } = req.body

    const meal = await Meal.create({
      name,
      description,
      ingredients,
      calories,
      protein,
      carbs,
      fats,
      serving_size,
      category,
      type,
      image,
      createdBy: req.user._id,
    })

    res.status(201).json(meal)
  } catch (error) {
    next(error)
  }
}

// Get all meals
export const getAllMeals = async (req, res, next) => {
  //   try {
  //     const meals = await Meal.find();
  //     res.status(200).json(meals);
  //   } catch (error) {
  //     next(error);
  //   }  or

  try {
    const page = parseInt(req.query.page) || 1 // default page 1
    const limit = parseInt(req.query.limit) || 10 // default 10 per page
    const skip = (page - 1) * limit

    const [meals, total] = await Promise.all([
      Meal.find().skip(skip).limit(limit),
      Meal.countDocuments(),
    ])

    //    const formattedMeals = meals.map((meal) => ({
    //   ...meal._doc,
    //   isFavorite: meal.favorites?.includes(req.user._id)
    // }));

    res.status(200).json({
      total,
      page,
      pages: Math.ceil(total / limit),
      count: meals.length,
      meals,
    })
  } catch (error) {
    next(error)
  }
}

// Get all meals created by logged in user
export const getMyCreatedMeals = async (req, res, next) => {
  //   try {
  //     const meals = await Meal.find({ createdBy: req.user._id });
  //     res.status(200).json(meals);
  //   } catch (error) {
  //     next(error);
  //   }

  // with pagination
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const [meals, total] = await Promise.all([
      Meal.find({ createdBy: req.user._id }).skip(skip).limit(limit),
      Meal.countDocuments({ createdBy: req.user._id }),
    ])

    res.status(200).json({
      total,
      page,
      pages: Math.ceil(total / limit),
      count: meals.length,
      meals,
    })
  } catch (error) {
    next(error)
  }
}

// Get meal by ID
export const getMealById = async (req, res, next) => {
  try {
    const meal = await Meal.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    })

    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' })
    }

    res.status(200).json(meal)

    //     res.status(200).json({
    //   ...meal._doc,
    //   isFavorite
    // });
  } catch (error) {
    next(error)
  }
}

// Update meal by ID
export const updateMeal = async (req, res, next) => {
  try {
    // const meal = await Meal.findOneAndUpdate(
    //   {
    //     _id: req.params.id,
    //     createdBy: req.user._id  // Check meal owner
    //   },
    //   req.body,
    //   { new: true,
    //     runValidators: true,
    //    }
    // );   or

    const meal = await Meal.findById(req.params.id)

    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' })
    }

    // Check meal owner
    if (meal.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: 'You are not allowed to update this meal' })
    }

    const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json(updatedMeal)
  } catch (error) {
    next(error)
  }
}

// Filter meals by category
export const getMealsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params

    //validate category
    const allowedCategories = ['breakfast', 'lunch', 'dinner', 'snack']
    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ message: 'Invalid category' })
    }

    const meals = await Meal.find({ category })

    if (!meals.length) {
      return res
        .status(404)
        .json({ message: 'No meals found in this category' })
    }

    res.status(200).json(meals)
  } catch (error) {
    next(error)
  }
}

// Filter meals by type
export const getMealsByType = async (req, res, next) => {
  try {
    const { type } = req.params

    //validate type
    const allowedTypes = [
      'balanced',
      'high-protein',
      'low-carb',
      'keto',
      'vegan',
      'veg',
      'gluten-free',
    ]
    if (!allowedTypes.includes(type)) {
      return res.status(400).json({ message: 'Invalid meal type' })
    }

    const meals = await Meal.find({ type })

    if (!meals.length) {
      return res.status(404).json({ message: 'No meals found for this type' })
    }

    res.status(200).json(meals)
  } catch (error) {
    next(error)
  }
}

// DELETE meal by ID
export const deleteMeal = async (req, res, next) => {
  try {
    // const meal = await Meal.findOneAndDelete({
    //   _id: req.params.id,
    //   createdBy: req.user._id //Check meal owner
    // });   or

    const meal = await Meal.findById(req.params.id)

    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' })
    }

    // Check meal owner
    if (meal.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: 'You are not allowed to delete this meal' })
    }

    await meal.deleteOne()

    res.status(200).json({ message: 'Meal deleted successfully' })
  } catch (error) {
    next(error)
  }
}

export const toggleFavorite = async (req, res, next) => {
  try {
    const mealId = req.params.id
    const userId = req.user._id

    const meal = await Meal.findById(mealId)

    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' })
    }

    const isFavorited = meal.favorites?.includes(userId)

    if (isFavorited) {
      // remove from favorites
      meal.favorites = meal.favorites.filter(
        (id) => id.toString() !== userId.toString(),
      )

      await meal.save()

      return res.status(200).json({
        message: 'Removed from favorites',
        favoritesCount: meal.favorites.length,
      })
    } else {
      // add to favorites
      meal.favorites.push(userId)

      await meal.save()

      return res.status(200).json({
        message: 'Added to favorites',
        favoritesCount: meal.favorites.length,
      })
    }
  } catch (error) {
    next(error)
  }
}
