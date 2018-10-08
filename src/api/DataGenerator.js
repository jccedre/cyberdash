import faker from 'faker';
import randomTimestamp from 'random-timestamps';

const typeArr = ['BOT', 'VIRUS', 'SPAM'];
class DataGenerator {
  constructor(data = []) {
    this.data = data;
  }

  get getData() {
    return this.data;
  }

  generate() {
    const incident = {};
    let randomIndex = Math.floor(Math.random() * typeArr.length);
    incident.id = faker.random.uuid();
    incident.ip = faker.internet.ip();
    incident.location = {
      lat: faker.address.latitude(),
      long: faker.address.longitude(),
    };
    incident.fqdn = faker.internet.domainName();
    incident.observed = {
      type: typeArr[randomIndex],
      name: faker.random.word(),
      score: Math.floor(Math.random() * 100),
    };
    incident.observedAt = randomTimestamp();

    this.data.push(incident);
  }
}

export default DataGenerator;
