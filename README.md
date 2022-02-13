# @helloclub/joi-luxon

[![npm version](https://img.shields.io/npm/v/@helloclub/joi-luxon.svg)](https://www.npmjs.com/package/@helloclub/joi-luxon)
[![github issues](https://img.shields.io/github/issues/helloclub/joi-luxon.svg)](https://github.com/helloclub/joi-luxon/issues)


A Joi extension to automatically convert ISO date strings to Luxon DateTime objects

![Hello Club](https://helloclub.com/images/logo/logo-text.svg)

### Features
- Validates incoming date values as ISO date strings
- Automatically converts date strings to Luxon `DateTime` objects
- Able to set timezone and use modifiers like `startOf` or `endOf`
- Able to validate against other dates or Joi references using functions like `gt`, `lt`, `gte` or `lte`

### Installation

```shell
#npm
npm install @helloclub/joi-luxon

#yarn
yarn add @helloclub/joi-luxon
```

### Usage
```js
const Joi = require('@hapi/joi')
const JoiLuxon = require('@helloclub/joi-luxon')

module.exports = Joi.extend(JoiLuxon)
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

Please report any bugs, issues, suggestions and feature requests in the [joi-luxon issue tracker](https://github.com/helloclub/joi-luxon/issues).

## Sponsor

This package is sponsored by [Hello Club](https://helloclub.com?source=github), an [all-in-one club and membership management solution](https://helloclub.com?source=github) complete with booking system, automated membership renewals, online payments and integrated access and light control. 

If you belong to any kind of club or membership based organisation, or if you know someone who helps run a club, please [check us out](https://helloclub.com?source=github)!

## License

(MIT License)

Copyright 2022, Hello Club
