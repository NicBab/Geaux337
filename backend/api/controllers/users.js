import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    resizeBy.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserEvents = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const events = await Promise.all(
      user.events.map((id) => User.findById(id))
    );
    const formattedEvents = events.map(
      ({ _id, name, location, date, time, description, picturePath }) => {
        return { _id, name, location, date, time, description, picturePath };
      }
    );
    res.status(200).json(formattedEvents);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//UPDATE
export const addRemoveEvent = async (req, res) => {
    try {
      const { id, eventId } = req.params;
      const user = await User.findById(id);
      const event = await Event.findById(eventId);
  
      if (user.events.includes(eventId)) {
        user.events = user.events.filter((id) => id !== eventId);
        event.events = event.events.filter((id) => id !== id);
      } else {
        user.events.push(eventId);
        event.events.push(id);
      }
      await user.save();
      await event.save();
  
      const events = await Promise.all(
        user.events.map((id) => Event.findById(id))
      );
      const formattedEvents = events.map(
        ({ _id, name, location, date, time, description, picturePath }) => {
          return { _id, name, location, date, time, description, picturePath };
        }
      );
  
      res.status(200).json(formattedEvents);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
