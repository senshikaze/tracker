const DB_VERSION = 3

interface DBRecord {
  id?: number
}

interface Filter {
  index: string
  value: any
}

function connectToIndexDB(): Promise<IDBDatabase> {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const dbConnection = indexedDB.open('tracker', DB_VERSION)

    dbConnection.onupgradeneeded = (e) => {
      const db = dbConnection.result
      if (!db.objectStoreNames.contains('battles')) {
        db.createObjectStore('battles', { keyPath: 'id', autoIncrement: true })
      }

      if (!db.objectStoreNames.contains('entities')) {
        db.createObjectStore('entities', { keyPath: 'id', autoIncrement: true })
      }

      if (!db.objectStoreNames.contains('battles-entities')) {
        let table = db.createObjectStore('battle-entities', {
          keyPath: 'id',
          autoIncrement: true,
        })
        table.createIndex('battle_id', 'battle_id', { unique: false })
        table.createIndex('entity_id', 'entity_id', { unique: false })
      }
    }

    dbConnection.onerror = (e) => {
      console.error('Could not connect to index db!')
      reject(dbConnection.error)
    }

    dbConnection.onsuccess = (e) => resolve(dbConnection.result)
  })
}

/**
 * Get a single object from db by id
 * @param table
 * @param id
 */
export function get<T extends DBRecord>(table: string, id: any): Promise<T> {
  return new Promise<T>(async (resolve, reject) => {
    const dbase = await connectToIndexDB()
    const transaction = dbase.transaction(table, 'readonly')
    const store = transaction.objectStore(table)
    const getRequest = store.get(id)

    getRequest.onerror = (e) => {
      console.error(`Could not load id ${id} from ${table}`)
      reject(getRequest.error)
    }

    getRequest.onsuccess = (e) => resolve(getRequest.result as T)

    transaction.commit = () => dbase.close()
  })
}

export function list<T extends DBRecord>(
  table: string,
  filter?: Filter,
): Promise<T[]> {
  return new Promise<T[]>(async (resolve, reject) => {
    const dbase = await connectToIndexDB()
    const transaction = dbase.transaction(table, 'readonly')
    const store = transaction.objectStore(table)

    if (filter !== undefined) {
      const index = store.index(filter.index)
      const cursor = index.openCursor()
      cursor.onsuccess = (e) => {
        resolve(cursor.result?.value as T[])
      }
    }

    const getRequest = store.getAll()

    getRequest.onerror = (e) => {
      console.error(`Could not load data from ${table}`)
      reject(getRequest.error)
    }

    getRequest.onsuccess = (e) => resolve(getRequest.result as T[])

    transaction.commit = () => dbase.close()
  })
}

export function create<T extends DBRecord>(table: string, data: T): Promise<T> {
  return new Promise<T>(async (resolve, reject) => {
    const dbase = await connectToIndexDB()
    const transaction = dbase.transaction(table, 'readwrite')
    const store = transaction.objectStore(table)

    const createRequest = store.add(data)

    createRequest.onerror = (e) => {
      console.error('Error creating object!')
      reject(createRequest.error)
    }

    createRequest.onsuccess = (e) => {
      data.id = createRequest.result as number
      resolve(data)
    }
    transaction.commit = () => dbase.close()
  })
}

export function update<T extends DBRecord>(
  table: string,
  data: any,
): Promise<T> {
  return new Promise<T>(async (resolve, reject) => {
    const dbase = await connectToIndexDB()
    const transaction = dbase.transaction(table, 'readwrite')
    const store = transaction.objectStore(table)

    const updateRequest = store.put(data, data.id)

    updateRequest.onerror = (e) => {
      console.error(`Console cannot update object ${data.id} on table ${table}`)
      reject(updateRequest.error)
    }

    updateRequest.onsuccess = (e) => resolve(updateRequest.result as T)

    transaction.commit = () => dbase.close()
  })
}
