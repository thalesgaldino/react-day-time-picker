# React Day Time picker

[This is a Fork of the original repo]

A React component to help with scheduling a day and time.

For documentation see the [website](https://react-day-time-picker.netlify.com/).

## New in this fork

1. Latest react version - currently 18
2. Locale and date Pattern props:

For instance:

```
  <DayTimePicker
    timeSlotSizeMinutes={60}
    datePattern={PT_FORMAT_PATTERN}
    locale={pt}
  />
```

## Running Locally

```
npm start
```

## Publish

For now we publish manually using:

```
npm publish --access public
```

Make sure:

- You increment the npm version after you make code changes with `npm version`.
- You're logged in.

More information can be found [here](https://docs.npmjs.com/creating-and-publishing-an-org-scoped-package).
