import { createDB, createSchema, collection, column } from '@tanstack/db'

const peopleSchema = createSchema({
  id: column.string(),
  name: column.string(),
  email: column.string(),
  type: column.string(),
  church: column.string().optional(),
  totalGiven: column.number(),
  status: column.string(),
  lastGift: column.string().optional(),
  createdAt: column.string(),
  updatedAt: column.string(),
})

const giftsSchema = createSchema({
  id: column.string(),
  donorId: column.string(),
  donorName: column.string(),
  donorEmail: column.string(),
  amount: column.number(),
  date: column.string(),
  method: column.string(),
  fund: column.string(),
  status: column.string(),
  missionaryId: column.string().optional(),
  missionaryName: column.string().optional(),
  createdAt: column.string(),
})

export const clientDB = createDB({
  collections: {
    people: collection('people', peopleSchema),
    gifts: collection('gifts', giftsSchema),
  },
})

export type Person = typeof peopleSchema.infer
export type Gift = typeof giftsSchema.infer

export function seedPeopleFromQuery(data: Person[]) {
  data.forEach((person) => {
    clientDB.collections.people.insert(person)
  })
}

export function seedGiftsFromQuery(data: Gift[]) {
  data.forEach((gift) => {
    clientDB.collections.gifts.insert(gift)
  })
}

export function clearClientDB() {
  clientDB.collections.people.clear()
  clientDB.collections.gifts.clear()
}
