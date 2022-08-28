import { logTools } from '../utils/index.js';

const { logger } = logTools;

const eventResolver = {
  Query: {
    event: async (parent, { id }, { Event }) => {
      const event = await Event.findOne({
        where: {
          id,
        },
      });
      if (!event) {
        logger.warn(`Event with id ${id} was not found! Please try your query again.`);
      }
      return event;
    },
  },
  Mutation: {
    createEvent: async (
      parent,
      {
        eventName,
        date,
        time,
        description,
        organizationId,
      },
      { Event, Organization },
    ) => {
      try {
        const event = await Event.create(
          {
            name: eventName,
            description,
            date,
            time,
            organizationId,
          },
          {
            include: [Organization],
          },
        );
        return event;
      } catch (error) {
        const { message } = error.errors[0];
        logger.error(`Error creating event: ${message}`);
        return error;
      }
    },
    updateEvent: async (parent, {
      id,
      eventName,
      description,
      date,
      time,
    }, { Event }) => {
      const event = await Event.findOne({ where: { id } });
      if (event) {
        try {
          const modifiedEvent = { id };
          if (eventName) modifiedEvent.name = eventName;
          if (description) modifiedEvent.description = description;
          if (date) modifiedEvent.date = date;
          if (time) modifiedEvent.time = time;
          await Event.update(modifiedEvent, {
            where: {
              id,
            },
          });
          return `Event with id ${id} updated.`;
        } catch (error) {
          const errorMessage = `Error in updating event with id ${id}: ${error}`;
          logger.error(errorMessage);
          return errorMessage;
        }
      } else {
        const warnMessage = `The event record with id ${id} does not exist!`;
        logger.warn(warnMessage);
        return warnMessage;
      }
    },
    deleteEvent: async (parent, { id }, { Event }) => {
      const event = await Event.findOne({ where: { id } });
      if (event) {
        try {
          await Event.destroy({
            where: {
              id,
            },
          });
          return `Event with id ${id} deleted.`;
        } catch (error) {
          const errorMessage = `Error in deleting event with id ${id}: ${error}`;
          logger.error(errorMessage);
          return errorMessage;
        }
      } else {
        const warnMessage = `The event record with id ${id} does not exist!`;
        logger.warn(warnMessage);
        return warnMessage;
      }
    },
  },
  Event: {
    organization: async (parent, args, { Organization }) => {
      const { organizationId } = parent;
      const organization = await Organization.findOne({
        where: {
          id: organizationId,
        },
      });
      return organization;
    },
  },
};

export default eventResolver;
