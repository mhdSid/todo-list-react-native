const { todo_items: TodoItem, users: User } = require('../../../../models')
const { Op } = require('sequelize')

async function todoItemsByTask (_, { task }) {
  try {
    const todoItems = await TodoItem.findAll({
      where: {
        task: {
          [Op.like]: `%${task}%`
        }
      },
      include: {
        model: User,
        as: 'users'
      }
    })
    return todoItems
  } catch (error) {
    throw new Error('Failed to fetch todo items by task')
  }
}

module.exports = { todoItemsByTask }
