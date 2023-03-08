import * as React from "react";
import {
  DatePicker,
  DayOfWeek,
  //   Dropdown,
  //   IDropdownOption,
  mergeStyles,
  defaultDatePickerStrings,
} from "@fluentui/react";

const rootClass = mergeStyles({
  maxWidth: 100,
  selectors: { "> *": { marginBottom: 15 } },
});

export const ManageActivitiesDatePicker: React.FunctionComponent = () => {
  const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Sunday);

  //   const onDropdownChange = React.useCallback(
  //     (
  //       event: React.FormEvent<HTMLDivElement>,
  //       option?: IDropdownOption<any> | undefined,
  //       index?: number | undefined
  //     ) => {
  //       setFirstDayOfWeek(option?.key as number);
  //     },
  //     []
  //   );

  return (
    <div className={rootClass}>
      <DatePicker
        firstDayOfWeek={firstDayOfWeek}
        placeholder="Select a date..."
        ariaLabel="Select a date"
        // DatePicker uses English strings by default. For localized apps, you must override this prop.
        strings={defaultDatePickerStrings}
      />
    </div>
  );
};
