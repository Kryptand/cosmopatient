import {
  AbstractPersistor,
  getEntriesFromStorageByKeyAsync,
  NO_STORAGE_INSTANCE,
  NO_STORAGE_KEY
} from './abstract-persistor';
import {Key} from '../shared/key-decorator';

class Stub {
  @Key id: string;
}

export class MockStorage<T> {
  keys = async () => {
    return ['TEST_KEYa', 'b'];
  };
  get = async key => {
    if (key === 'TEST_KEYa') {
      return {a: 'asd'};
    }
  };
  values = {};
  set = async (key, value) => {
    this.values[key] = value;
  };
  remove: (key) => Promise<void>;
}

// @ts-ignore
export class TestPersistor extends AbstractPersistor<Stub> {
  constructor(protected storage: MockStorage<Stub>, type) {
    super(<any> storage, 'TEST_KEY', type);
  }
}

describe('getEntriesFromStorageByKeyAsync', async () => {
  it('should throw an error if there is no storageKey provided', async () => {
    try {
      await getEntriesFromStorageByKeyAsync(null, <any> new MockStorage());
    } catch (e) {
      expect(e.message).toMatch(NO_STORAGE_KEY);
    }
  });
  it('should throw an error if there is no storage provided', async () => {
    try {
      await getEntriesFromStorageByKeyAsync('Test', null);
    } catch (e) {
      expect(e.message).toMatch(NO_STORAGE_INSTANCE);
    }
  });
  it('should get entries from storage by key', async () => {
    const result = await getEntriesFromStorageByKeyAsync('TEST_KEYa', <any> (
        new MockStorage()
    ));
    expect(result).toEqual([{a: 'asd'}]);
  });
});

describe('AbstractPersistor', async () => {
  it('should get keys for an entity', async () => {
    const persistor = new TestPersistor(new MockStorage<Stub>(), Stub);
    let stub = new Stub();
    stub.id = 'asd';
    expect(persistor.getKeys(stub)).toEqual(['asd']);
  });
  it('should get keys even if the entity does not have any key', async () => {
    const persistor = new TestPersistor(new MockStorage<any>(), null);
    expect(persistor.getKeys({id: 'asd'})).toEqual(['asd']);
  });
  it('should save an entity', async () => {
    const persistor = new TestPersistor(new MockStorage<any>(), Stub);
    let stub = new Stub();
    stub.id = 'asd';
    await persistor.save(stub);
    expect(persistor['storage'].values).toEqual({TEST_KEYasd: {id: 'asd'}});
  });
  it('should save an entity without an id', async () => {
    const persistor = new TestPersistor(new MockStorage<any>(), Stub);
    let stub = new Stub();
    await persistor.save(stub);
    expect(persistor['storage'].values).toBeDefined();
  });
  it('should remove an entity', async () => {
    const persistor = new TestPersistor(new MockStorage<any>(), Stub);
    let stub = new Stub();
    stub.id = 'asd';
    await persistor.save(stub);
    expect(persistor['storage'].values).toEqual({TEST_KEYasd: {id: 'asd'}});
  });
});
