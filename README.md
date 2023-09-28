# @reis/joi-luxon

[![npm version](https://img.shields.io/npm/v/@reis/joi-luxon.svg)](https://www.npmjs.com/package/@reis/joi-luxon)
[![github issues](https://img.shields.io/github/issues/adamreisnz/joi-luxon.svg)](https://github.com/adamreisnz/joi-luxon/issues)


A Joi extension to automatically convert ISO date strings to Luxon DateTime objects

### Features
- Validates incoming date values as ISO date strings
- Automatically converts date strings to Luxon `DateTime` objects
- Able to set timezone and use modifiers like `startOf` or `endOf`
- Able to validate against other dates or Joi references using functions like `gt`, `lt`, `gte` or `lte`

### Installation

```shell
#npm
npm install @reis/joi-luxon

#yarn
yarn add @reis/joi-luxon
```

### Usage
```js
import Joi from 'joi'
import JoiLuxon from '@reis/joi-luxon'

export default Joi.extend(JoiLuxon)
```

### Examples

Validate a start and end date, setting the date to start and end of day respectively and validating that the end date is after the start date:

```js
const schema = Joi.object({
  startDate: Joi
    .luxon()
    .setZone(timezone)
    .startOf('day'),
  endDate: Joi
    .luxon()
    .setZone(timezone)
    .endOf('day')
    .gt(Joi.ref('startDate')),
})
```

Set the value to a given minimum date if it’s less than that:

```js
const schema = Joi.object({
  date: Joi
    .luxon()
    .required()
    .min(Joi.ref('$minDate'))
})

const schema = Joi.object({
  date: Joi
    .luxon()
    .required()
    .min(new Date())
})
```

All available rules and helpers:

```js
Joi

  //Base validation and conversion to Luxon DateTime object
  .luxon()

  //Sets the timezone on the object
  .setZone(timezone)

  //Modified the DateTime instance to the start/end of the given period
  .startOf(period)
  .endOf(period)

  //Validates silently against a minimum / maximum date
  .min(date)
  .max(date)

  //Validate and throw errors if the date is less than or greater than a reference date
  .lt(date)
  .gt(date)
  .lte(date)
  .gte(date)
```

## Issues & feature requests

Please report any bugs, issues, suggestions and feature requests in the [joi-luxon issue tracker](https://github.com/adamreisnz/joi-luxon/issues).


## License

(MIT License)

Copyright 2022-2023, Adam Reis
