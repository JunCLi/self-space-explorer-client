const { Pool } = require('pg')
const squel = require('squel').useFlavour('postgres')
const config = require('../config/development.json')

const caregiverSeeds = require('./caregiverSeeds')
const keyContactSeeds = require('./keyContactSeeds')

const databaseSchema = 'senior_care'

const seed = async () => {
  const pg = await new Pool(config.db).connect()

  try {
    await pg.query('BEGIN')

    console.log('Seeding tables...')

    await Promise.all(
      caregiverSeeds.map(seed =>
        pg.query(
          squel
            .insert()
            .into(`${databaseSchema}.caregiver`)
            .setFields(seed)
            .toParam()
        )
			),
      keyContactSeeds.map(seed =>
        pg.query(
          squel
            .insert()
            .into(`${databaseSchema}.key_contact`)
            .setFields(seed)
            .toParam()
        )
			)
    )
    await pg.query('COMMIT')
  } catch (e) {
    await pg.query('ROLLBACK')
    throw e
  } finally {
    pg.release()
  }
}

seed().catch(e => {
  setImmediate(() => {
    throw e
  })
})
