import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';

dayjs.extend(isBetweenPlugin);

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
  isSelected: boolean;
  isHovered: boolean;
}

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isHovered',
})<CustomPickerDayProps>(({ theme, isSelected, isHovered, day }) => ({
  borderRadius: "50%",
  ...(isSelected && {
    backgroundColor: "#814DE8",
    color: theme.palette.primary.contrastText,
    '&:hover, &:focus': {
      backgroundColor: "#814DE8",
    },
  }),
  ...(isHovered && {
    backgroundColor: "#9c78e3",
    '&:hover, &:focus': {
      backgroundColor: "#9c78e3",
    },
  }),
})) as React.ComponentType<CustomPickerDayProps>;

const isInSameDay = (dayA: Dayjs, dayB: Dayjs | null | undefined) => {
  if (dayB == null) {
    return false;
  }

  return dayA.isSame(dayB, 'day');
};

function Day(
  props: PickersDayProps<Dayjs> & {
    selectedDay?: Dayjs | null;
    hoveredDay?: Dayjs | null;
  },
) {
  const { day, selectedDay, hoveredDay, ...other } = props;

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      selected={false}
      isSelected={isInSameDay(day, selectedDay)}
      isHovered={isInSameDay(day, hoveredDay)}
    />
  );
}

export interface DayPickerProps {
    day: Dayjs | null;
    updateDay: (param: any) => void;
  }

export default function DayPicker(props: DayPickerProps) {
  const [hoveredDay, setHoveredDay] = React.useState<Dayjs | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={props.day}
        onChange={(newValue) => props.updateDay(newValue)}
        showDaysOutsideCurrentMonth
        fixedWeekNumber={6} 
        slots={{ day: Day }}
        slotProps={{
          day: (ownerState) =>
            ({
              selectedDay: props.day,
              hoveredDay,
              onPointerEnter: () => setHoveredDay(ownerState.day),
              onPointerLeave: () => setHoveredDay(null),
            } as any),
        }}
      />
    </LocalizationProvider>
  );
}