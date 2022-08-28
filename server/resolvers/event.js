const eventResolver = {
  Query: {
    event: async (parent, { id }, { Event }) => {
      const event = await Event.findOne({
        where: {
          id,
        },
      });
      if (!event) {
        console.log('This event was not found! Please try your query again.');
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
        console.log('Error creating event:', error);
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
          const modifiedEvent = {};
          modifiedEvent.id = id;
          if (eventName) modifiedEvent.name = eventName;
          if (description) modifiedEvent.description = description;
          if (date) modifiedEvent.date = date;
          if (time) modifiedEvent.time = time;
          await Event.update(modifiedEvent, {
            where: {
              id,
            },
          });
          return true;
        } catch (error) {
          console.log('Error in updating event:', error);
          return false;
        }
      } else {
        console.log(`The event record with an id of "${id}" does not exist!`);
        return false;
      }
    },
    deleteEvent: async (parent, { id }, { Event }) => {
      try {
        await Event.destroy({
          where: {
            id,
          },
        });
        return true;
      } catch (error) {
        console.log('Error in deleting event:', error);
      }
      return false;
    },
  },
  Event: {
    organization: async ({ organizationId }, args, { Organization }) => {
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
