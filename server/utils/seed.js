import models from '../models/index.js';
import api from './api.js';

const createLocationObj = async (organizationId, name, address) => {
  const locationDict = { name, organizationId };
  if (address) {
    const locationData = await api.getAddressDetails(address);
    if (locationData) {
      const { formattedAddress, latitude, longitude } = locationData;
      Object.assign(locationDict, { address: formattedAddress, latitude, longitude });
    }
  }
  return locationDict;
};

const seed = {
  async createOrganizations() {
    await models.Organization.create({ name: 'Econify' });
    await models.Organization.create({ name: 'Apple' });
    await models.Organization.create({ name: 'Google' });
  },
  async createEvents() {
    await models.Event.create(
      {
        name: 'Team Bonding',
        description: 'A rapturous event where we improve team morale through kayaking',
        date: '2022-09-09',
        time: '07:09:19',
        organizationId: 1,
      },
      {
        include: [models.Organization],
      },
    );
    await models.Event.create(
      {
        name: 'Tech Talk',
        description: 'A talk about JavaScript',
        date: '2022-09-12',
        time: '12:10:08',
        organizationId: 1,
      },
      {
        include: [models.Organization],
      },
    );
    await models.Event.create(
      {
        name: 'Happy Hour',
        description: 'Post-work discussion',
        date: '2022-10-23',
        time: '08:09:18',
        organizationId: 2,
      },
      {
        include: [models.Organization],
      },
    );
  },
  async createLocations() {
    await models.Location.create(
      await createLocationObj(1, 'Company Headquarters', '3536 Perkins Rd, Baton Rouge, LA 70808'),
      {
        include: [models.Organization],
      },
    );
    await models.Location.create(
      await createLocationObj(1, 'Group Gym Membership', '8708 S Congress Ave Building C, Austin, TX 78745'),
      {
        include: [models.Organization],
      },
    );
    await models.Location.create(
      await createLocationObj(3, 'Birthday Bash'),
      {
        include: [models.Organization],
      },
    );
  },
};

export default seed;
