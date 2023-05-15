import DateTime from 'luxon'

/**
 * Extend Joi with Luxon date handling
 */
export default Joi => ({
  type: 'luxon',
  base: Joi.any(),
  messages: {
    'luxon.lt': `must be before {{#date}}"`,
    'luxon.gt': `must be after {{#date}}"`,
    'luxon.lte': `must be same as or before {{#date}}"`,
    'luxon.gte': `must be same as or after {{#date}}"`,
  },
  coerce(value, {schema, state, prefs}) {

    //No value
    if (!value) {
      return
    }

    //Convert to DateTime object
    if (!(value instanceof DateTime)) {
      value = DateTime.fromISO(value)
    }

    //If invalid at this stage, return as is
    if (!value.isValid) {
      return
    }

    //Get flags
    const timezone = schema.$_getFlag('timezone')
    const startOf = schema.$_getFlag('startOf')
    const endOf = schema.$_getFlag('endOf')
    let max = schema.$_getFlag('max')
    let min = schema.$_getFlag('min')

    //Resolve references
    if (Joi.isRef(min)) {
      min = min.resolve(value, state, prefs)
    }
    if (Joi.isRef(max)) {
      max = max.resolve(value, state, prefs)
    }

    //Apply a timezone
    if (timezone) {
      value = value.setZone(timezone)
    }
    else if (prefs.context && prefs.context.timezone) {
      value = value.setZone(prefs.context.timezone)
    }

    //Start/end of period
    if (startOf) {
      value = value.startOf(startOf)
    }
    if (endOf) {
      value = value.endOf(endOf)
    }

    //Min/max dates
    if (min && value < min) {
      value = min
    }
    if (max && value > max) {
      value = max
    }

    //Return value
    return {value}
  },
  validate(value, helpers) {

    //No value
    if (!value) {
      return value
    }

    //Invalid date provided
    if (!value.isValid) {
      const errors = helpers.error('date.iso')
      return {value, errors}
    }
  },
  rules: {
    setZone: {
      method(timezone) {
        return this.$_setFlag('timezone', timezone)
      },
    },
    startOf: {
      method(startOf) {
        return this.$_setFlag('startOf', startOf)
      },
    },
    endOf: {
      method(endOf) {
        return this.$_setFlag('endOf', endOf)
      },
    },
    max: {
      method(max) {
        return this.$_setFlag('max', max)
      },
    },
    min: {
      method(min) {
        return this.$_setFlag('min', min)
      },
    },
    lt: {
      method(date) {
        return this.$_addRule({
          name: 'lt',
          args: {date},
        })
      },
      args: [
        {
          name: 'date',
          ref: true,
          assert: (value) => (
            !value || typeof value === 'string' || 
            value instanceof Date || value instanceof DateTime
          ),
          message: 'must be a date string, Date, or DateTime object',
        },
      ],
      validate(value, helpers, args) {
        let {date} = args
        if (!date) {
          return value
        }
        if (typeof date === 'string') {
          date = DateTime.fromISO(date)
        }
        if (!(value instanceof DateTime) || value < date) {
          return value
        }
        return helpers.error('luxon.lt', {date})
      },
    },
    gt: {
      method(date) {
        return this.$_addRule({
          name: 'gt',
          args: {date},
        })
      },
      args: [
        {
          name: 'date',
          ref: true,
          assert: (value) => (
            !value || typeof value === 'string' ||
            value instanceof Date || value instanceof DateTime
          ),
          message: 'must be a date string, Date, or DateTime object',
        },
      ],
      validate(value, helpers, args) {
        let {date} = args
        if (!date) {
          return value
        }
        if (typeof date === 'string') {
          date = DateTime.fromISO(date)
        }
        if (!(value instanceof DateTime) || value > date) {
          return value
        }
        return helpers.error('luxon.gt', {date})
      },
    },
    lte: {
      method(date) {
        return this.$_addRule({
          name: 'lte',
          args: {date},
        })
      },
      args: [
        {
          name: 'date',
          ref: true,
          assert: (value) => (
            !value || typeof value === 'string' ||
            value instanceof Date || value instanceof DateTime
          ),
          message: 'must be a date string, Date, or DateTime object',
        },
      ],
      validate(value, helpers, args) {
        let {date} = args
        if (!date) {
          return value
        }
        if (typeof date === 'string') {
          date = DateTime.fromISO(date)
        }
        if (!(value instanceof DateTime) || value <= date) {
          return value
        }
        return helpers.error('luxon.lte', {date})
      },
    },
    gte: {
      method(date) {
        return this.$_addRule({
          name: 'gte',
          args: {date},
        })
      },
      args: [
        {
          name: 'date',
          ref: true,
          assert: (value) => (
            !value || typeof value === 'string' ||
            value instanceof Date || value instanceof DateTime
          ),
          message: 'must be a date string, Date, or DateTime object',
        },
      ],
      validate(value, helpers, args) {
        let {date} = args
        if (!date) {
          return value
        }
        if (typeof date === 'string') {
          date = DateTime.fromISO(date)
        }
        if (!(value instanceof DateTime) || value >= date) {
          return value
        }
        return helpers.error('luxon.gte', {date})
      },
    },
  },
})
