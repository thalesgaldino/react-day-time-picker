import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as dateFns from 'date-fns';
import { pt } from 'date-fns/locale';
import { ThemeProvider } from 'styled-components';

import { PopupWrapper, Popup, PopupHeader, PopupClose } from './Popup';
import { ConfirmButton } from './Confirm';
import { DayIcon, ClockIcon, SuccessIcon, FailedIcon } from './Icons';
import { Success, Failed } from './Feedback';

import Calendar from './calendar';
import TimeSlots from './time-slots';

import { preventPastDays } from './validators';

function DayTimePicker({
  timeSlotValidator,
  timeSlotSizeMinutes,
  isLoading,
  isDone,
  err,
  onConfirm,
  confirmText,
  loadingText,
  doneText,
  theme
}) {
  const [pickedDay, setPickedDay] = useState(null);
  const [pickedTime, setPickedTime] = useState(null);
  const [showPickTime, setShowPickTime] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handlePickDay = day => {
    setPickedDay(day);
    setShowPickTime(true);
  };

  const handlePickTime = time => {
    setPickedTime(time);
    setShowPickTime(false);
    setShowConfirm(true);
  };

  const handleClosePickTime = () => {
    setShowPickTime(false);
  };

  const handleConfirm = () => {
    onConfirm(pickedTime);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
    setShowPickTime(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <PopupWrapper>
        <Calendar validator={preventPastDays} pickDay={handlePickDay} />

        {showPickTime && (
          <Popup>
            <PopupHeader>
              <p>
                <DayIcon />
                {' '}
                {dateFns.format(pickedDay, "dd 'de' MMMM, yyyy", {
                  locale: pt
                })}
              </p>
              <p>
                <PopupClose onClick={handleClosePickTime}>Voltar</PopupClose>
              </p>
            </PopupHeader>

            <TimeSlots
              pickedDay={pickedDay}
              slotSizeMinutes={timeSlotSizeMinutes}
              validator={timeSlotValidator}
              pickTime={handlePickTime}
            />
          </Popup>
        )}

        {showConfirm && (
          <Popup>
            <PopupHeader>
              <p>
                <DayIcon /> {dateFns.format(pickedTime, "dd 'de' MMMM, yyyy", {
                  locale: pt
                })}
              </p>

              <p>
                <ClockIcon /> {dateFns.format(pickedTime, 'HH:mm')}
              </p>

              {!isDone && (
                <p>
                  <PopupClose disabled={isLoading} onClick={handleCloseConfirm}>
                    Voltar
                  </PopupClose>
                </p>
              )}
            </PopupHeader>

            {!isDone ? (
              <ConfirmButton disabled={isLoading} onClick={handleConfirm}>
                {isLoading ? loadingText : confirmText}
              </ConfirmButton>
            ) : doneText ? (
              <Success>
                <p>
                  <SuccessIcon /> {doneText}
                </p>
              </Success>
            ) : null}

            {err && (
              <Failed>
                <p>
                  <FailedIcon /> {err}
                </p>
              </Failed>
            )}
          </Popup>
        )}
      </PopupWrapper>
    </ThemeProvider>
  );
}

DayTimePicker.propTypes = {
  timeSlotValidator: PropTypes.func,
  timeSlotSizeMinutes: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
  isDone: PropTypes.bool,
  err: PropTypes.string,
  onConfirm: PropTypes.func,
  confirmText: PropTypes.string,
  loadingText: PropTypes.string,
  doneText: PropTypes.string,
  theme: PropTypes.shape({
    primary: PropTypes.string,
    secondary: PropTypes.string,
    background: PropTypes.string,
    buttons: PropTypes.shape({
      disabled: PropTypes.shape({
        color: PropTypes.string,
        background: PropTypes.string
      }),
      confirm: PropTypes.shape({
        color: PropTypes.string,
        background: PropTypes.string,
        hover: PropTypes.shape({
          color: PropTypes.string,
          background: PropTypes.string
        })
      })
    })
  })
};

DayTimePicker.defaultProps = {
  confirmText: 'Schedule',
  loadingText: 'Scheduling..',
  doneText: 'Your event has been scheduled!',
  theme: {
    primary: '#3a9ad9',
    secondary: '#f0f0f0',
    background: '#fff',
    buttons: {
      disabled: {
        color: '#333',
        background: '#dfdfdf'
      },
      confirm: {
        color: '#fff',
        background: '#3a9ad9',
        hover: {
          color: '',
          background: '#3a9ad9d6'
        }
      }
    },
    feedback: {
      success: {
        color: '#29aba4'
      },
      failed: {
        color: '#eb7260'
      }
    }
  }
};

export default DayTimePicker;
