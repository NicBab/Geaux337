import { GetOrdersByUserParams } from "@/types"
import { connectToDatabase } from "../database"
import User from "../database/models/user.model"
import { handleError } from "../utils"
import Order from "../database/models/order.model"

// GET ORDERS BY USER
export async function getOrdersByUser({ userId, limit = 3, page }: GetOrdersByUserParams) {
    try {
      await connectToDatabase()
  
      const skipAmount = (Number(page) - 1) * limit
      const conditions = { buyer: userId }
  
      const orders = await Order.distinct('event._id')
        .find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)
        .populate({
          path: 'event',
          model: Event,
          populate: {
            path: 'organizer',
            model: User,
            select: '_id firstName lastName',
          },
        })
  
      const ordersCount = await Order.distinct('event._id').countDocuments(conditions)
  
      return { data: JSON.parse(JSON.stringify(orders)), totalPages: Math.ceil(ordersCount / limit) }
    } catch (error) {
      handleError(error)
    }
  }