import styled from 'styled-components';
import { format, eachDayOfInterval } from 'date-fns';

//just a random sunday so the calendar always starts on Sunday
const randomSunday = new Date(2023, 1, 5);
const clone = new Date(randomSunday.getTime());
const sevenDaysLater = new Date(clone.setDate(randomSunday.getDate() + 6));

const daysOfWeek = eachDayOfInterval({
  start: randomSunday,
  end: sevenDaysLater
});

export const createWeekDays = locale =>
  daysOfWeek.map(day => format(day, 'EEE', { locale }));

export const WeekDays = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1fr;
  grid-gap: 0;
  margin: 0;
  padding: 0;
  font-size: 0.8em;
  font-weight: 500;
  text-transform: uppercase;
  opacity: 0.6;
`;

export const WeekDay = styled.li`
  list-style: none;
  display: grid;
  align-items: center;
  margin: 0;
  padding: 0;
`;
