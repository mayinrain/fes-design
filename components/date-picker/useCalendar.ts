import { watch, watchEffect, ref, reactive, computed, Ref } from 'vue';
import { isNil } from 'lodash-es';
import getPrefixCls from '../_util/getPrefixCls';

import { DATE_TYPE, RANGE_POSITION, YEAR_COUNT } from './const';
import {
    parseDate,
    timeFormat,
    contrastDate,
    transformDateToTimestamp,
} from './helper';

import type {
    DatePickerType,
    DateObj,
    CalendarProps,
    CalendarEmits,
} from './interface';

const prefixCls = getPrefixCls('calendar');
const WEEK_NAMES = ['日', '一', '二', '三', '四', '五', '六'];

const isCompeleteSelected = (selectedDate: DateObj, type?: DatePickerType) => {
    if (!type) return false;
    if (DATE_TYPE[type].hasTime) {
        return (
            selectedDate?.day &&
            !(
                isNil(selectedDate.hour) &&
                isNil(selectedDate.minute) &&
                isNil(selectedDate.second)
            )
        );
    }
    return !!selectedDate;
};

type UpdateCurrentDate = (date: DateObj) => void;

export const useCurrentDate = (props: CalendarProps, emit: CalendarEmits) => {
    const currentDate = reactive(parseDate(props.defaultDate));
    const updateCurrentDate: UpdateCurrentDate = (date: DateObj) => {
        Object.assign(currentDate, date);

        emit('changeCurrentDate', transformDateToTimestamp(currentDate));
    };

    watch(
        () => props.defaultDate,
        () => {
            Object.assign(currentDate, parseDate(props.defaultDate));
        },
    );

    return {
        currentDate,
        updateCurrentDate,
    };
};

type UpdateSelectedDates = (
    date: DateObj,
    index: number,
    isTime?: boolean,
) => void;

export const useSelectedDates = (props: CalendarProps, emit: CalendarEmits) => {
    const selectedDates = ref<DateObj[]>([]);
    const updateSelectedDates: UpdateSelectedDates = (
        date: DateObj,
        index: number,
        isTime?: boolean,
    ) => {
        const newDate = Object.assign({}, selectedDates.value[index], date);
        if (
            !isTime &&
            ((selectedDates.value[index] &&
                props.type === DATE_TYPE.daterange.name) ||
                (props.type === DATE_TYPE.datetimerange.name &&
                    props.rangePosition === RANGE_POSITION.LEFT &&
                    selectedDates.value[1]))
        ) {
            selectedDates.value = [];
            selectedDates.value[index] = newDate;
        } else {
            selectedDates.value.splice(index, 1, newDate);
        }

        if (isCompeleteSelected(selectedDates.value[index], props.type)) {
            if (DATE_TYPE[props.type].isRange) {
                emit('change', [
                    transformDateToTimestamp(selectedDates.value[0]),
                    transformDateToTimestamp(selectedDates.value[1], true),
                ]);
            } else {
                emit('change', [
                    transformDateToTimestamp(selectedDates.value[0]),
                ]);
            }
        }
    };

    watch(
        () => props.modelValue,
        () => {
            const dates = props.modelValue || [];
            selectedDates.value = dates.map((item) =>
                item ? parseDate(item) : null,
            );
        },
        {
            immediate: true,
        },
    );

    return {
        selectedDates,
        updateSelectedDates,
    };
};

export function useYear(
    props: CalendarProps,
    selectedDates: Ref<DateObj[]>,
    updateSelectedDates: UpdateSelectedDates,
    activeIndex: Ref<number>,
    currentDate: DateObj,
    updateCurrentDate: UpdateCurrentDate,
) {
    const isYearSelect = ref(false);
    // 年份相关
    watchEffect(() => {
        if (props.type === DATE_TYPE.year.name) {
            isYearSelect.value = true;
        }
    });
    const selectYear = (year: number) => {
        updateCurrentDate({
            year,
        });
        updateSelectedDates(
            {
                year,
            },
            activeIndex.value,
        );
    };

    const yearStart = computed(
        () => currentDate.year - (currentDate.year % YEAR_COUNT),
    );
    const yearEnd = computed(() => yearStart.value + YEAR_COUNT);
    const years = computed(() => {
        const arr = [];
        let start = yearStart.value;
        while (arr.length < 16) {
            arr.push(start++);
        }
        return arr;
    });

    const disabled = (year: number) => {
        const date = new Date(year, 0);
        return props.disabledDate && props.disabledDate(date, 'YYYY');
    };

    const isSelectedYear = (year: number) => {
        if (props.type === DATE_TYPE.year.name) {
            return !!selectedDates.value.find((item) => item?.year === year);
        }
        return false;
    };

    const yearCls = (year: number) => [
        `${prefixCls}-date`,
        disabled(year) && `${prefixCls}-date-disabled`,
        isSelectedYear(year) && `${prefixCls}-date-selected`,
        year === new Date().getFullYear() && [`${prefixCls}-date-now`],
    ];

    return {
        years,
        yearStart,
        yearEnd,
        selectYear,
        isYearSelect,
        yearCls,
    };
}

export function useMonth(
    props: CalendarProps,
    selectedDates: Ref<DateObj[]>,
    updateSelectedDates: UpdateSelectedDates,
    activeIndex: Ref<number>,
    currentDate: DateObj,
    updateCurrentDate: UpdateCurrentDate,
) {
    // 月份相关
    const format = 'YYYY-MM';
    const isMonthSelect = ref(false);
    watchEffect(() => {
        if (props.type === DATE_TYPE.month.name) {
            isMonthSelect.value = true;
        }
    });
    const selectMonth = (month: number) => {
        if (props.type !== DATE_TYPE.month.name) {
            isMonthSelect.value = false;
        }
        updateSelectedDates(
            {
                year: currentDate.year,
                month,
            },
            activeIndex.value,
        );
    };

    const monthToNext = () => {
        if (currentDate.month! < 11) {
            updateCurrentDate({
                year: currentDate.year,
                month: currentDate.month! + 1,
            });
        } else {
            updateCurrentDate({
                year: currentDate.year + 1,
                month: 0,
            });
        }
    };
    const monthToPre = () => {
        if (currentDate.month! > 0) {
            updateCurrentDate({
                year: currentDate.year,
                month: currentDate.month! - 1,
            });
        } else {
            updateCurrentDate({
                month: 11,
                year: currentDate.year - 1,
            });
        }
    };

    const disabled = (month: number) => {
        const date = new Date(currentDate.year, month);

        return props.disabledDate && props.disabledDate(date, format);
    };
    const isSelectedMonth = (month: number) => {
        if (props.type === DATE_TYPE.month.name) {
            return !!selectedDates.value.find(
                (item) =>
                    item &&
                    item.year === currentDate.year &&
                    item.month === month,
            );
        }
        return false;
    };
    const monthCls = (month: number) => [
        `${prefixCls}-date`,
        disabled(month) && `${prefixCls}-date-disabled`,
        isSelectedMonth(month) && `${prefixCls}-date-selected`,
        timeFormat(new Date(currentDate.year, month), format) ===
            timeFormat(new Date(), format) && [`${prefixCls}-date-now`],
    ];

    return {
        isMonthSelect,
        selectMonth,
        monthToNext,
        monthToPre,
        monthCls,
    };
}

export function useDay(
    props: CalendarProps,
    selectedDates: Ref<DateObj[]>,
    updateSelectedDates: UpdateSelectedDates,
    activeIndex: Ref<number>,
    currentDate: DateObj,
) {
    // TODO 英文一个星期的第一天是 周日
    const weekFirstDay = ref(1);
    // 展示数据
    const weekNames = computed(() => {
        const weekFirstDayValue = weekFirstDay.value;
        return WEEK_NAMES.concat(WEEK_NAMES).slice(
            weekFirstDayValue,
            weekFirstDayValue + 7,
        );
    });
    const isDaySelect = computed(() =>
        [
            DATE_TYPE.date.name,
            DATE_TYPE.datetime.name,
            DATE_TYPE.daterange.name,
            DATE_TYPE.datetimerange.name,
        ].includes(props.type),
    );

    const days = computed(() => {
        const daysTemp = [];
        const { year, month } = currentDate;
        const time = new Date(year, month!, 1);
        const weekFirstDayValue = weekFirstDay.value;
        time.setDate(0); // switch to the last day of last month
        let lastDay = time.getDate();
        const week = time.getDay() || 7;
        let count =
            weekFirstDayValue <= week
                ? week - weekFirstDayValue + 1
                : week + (7 - weekFirstDayValue + 1);
        while (count > 0 && count < 7) {
            daysTemp.push({
                day: lastDay - count + 1,
                year: month > 0 ? year : year - 1,
                month: month > 0 ? month - 1 : 11,
                pre: true,
            });
            count--;
        }
        time.setMonth(time.getMonth() + 2, 0); // switch to the last day of the current month
        lastDay = time.getDate();
        let i = 1;
        for (i = 1; i <= lastDay; i++) {
            daysTemp.push({
                day: i,
                year,
                month,
            });
        }
        for (i = 1; daysTemp.length < 42; i++) {
            daysTemp.push({
                day: i,
                year: month < 11 ? year : year + 1,
                month: month < 11 ? month + 1 : 0,
                next: true,
            });
        }
        return daysTemp;
    });

    const isSelected = (selectedDate: DateObj, dayItem: DateObj) =>
        dayItem.year === selectedDate?.year &&
        dayItem.month === selectedDate?.month &&
        dayItem.month === currentDate.month &&
        dayItem.day === selectedDate?.day;
    const findSelectedIndex = (dayItem) =>
        selectedDates.value.findIndex((selectedDate) =>
            isSelected(selectedDate, dayItem),
        );

    const startDate = computed(
        () =>
            selectedDates.value[0] &&
            new Date(transformDateToTimestamp(selectedDates.value[0])),
    );
    const endDate = computed(
        () =>
            selectedDates.value[1] &&
            new Date(transformDateToTimestamp(selectedDates.value[1])),
    );
    const completeRangeSelected = computed(
        () => startDate.value && endDate.value,
    );
    // 样式计算
    const inRangeDate = (date, format) => {
        if (DATE_TYPE[props.type].isRange && startDate.value && endDate.value) {
            const isIn =
                contrastDate(date, startDate.value, format) === 1 &&
                contrastDate(date, endDate.value, format) === -1;
            return isIn && date.getMonth() === currentDate.month;
        }
        return false;
    };

    const dayCls = (item) => {
        const format = 'YYYY-MM-DD';
        const { year, month } = item;
        const date = new Date(year, month, item.day);
        const selectedIndex = findSelectedIndex(item);
        return {
            [`${prefixCls}-date-out`]: item.pre || item.next,
            [`${prefixCls}-date`]: true,
            [`${prefixCls}-date-disabled`]: props.disabledDate(date, format),
            [`${prefixCls}-date-selected`]: selectedIndex !== -1,
            'is-start':
                DATE_TYPE[props.type].isRange &&
                completeRangeSelected.value &&
                selectedIndex === 0,
            'is-end':
                DATE_TYPE[props.type].isRange &&
                completeRangeSelected.value &&
                (selectedIndex === 1 ||
                    isSelected(selectedDates.value[1], item)),
            [`${prefixCls}-date-now`]:
                timeFormat(date, format) === timeFormat(new Date(), format),
            [`${prefixCls}-date-on`]: inRangeDate(date, format),
        };
    };

    return {
        days,
        isDaySelect,
        weekNames,
        dayCls,
    };
}

export const useQuarter = (
    props: CalendarProps,
    selectedDates: Ref<DateObj[]>,
    updateSelectedDates: UpdateSelectedDates,
    activeIndex: Ref<number>,
    currentDate: DateObj,
) => {
    const isQuarterSelect = computed(
        () => props.type === DATE_TYPE.quarter.name,
    );

    const quarterList = [
        {
            name: 'Q1',
            value: 1,
        },
        {
            name: 'Q2',
            value: 2,
        },
        {
            name: 'Q3',
            value: 3,
        },
        {
            name: 'Q4',
            value: 4,
        },
    ];

    const selectQuarter = (item) => {
        updateSelectedDates(
            {
                year: currentDate.year,
                month: (item.value - 1) * 3,
            },
            activeIndex.value,
        );
    };

    const isSelected = (item) =>
        !!selectedDates.value.find(
            (selectedDate) =>
                selectedDate &&
                selectedDate.year === currentDate.year &&
                item.value === selectedDate.month / 3 + 1,
        );

    const isNow = (item) => {
        const now = parseDate();
        return (
            now.year === currentDate.year &&
            Math.floor(now.month / 3) + 1 === item.value
        );
    };

    const quarterCls = (item) => ({
        [`${prefixCls}-date`]: true,
        [`${prefixCls}-date-selected`]: isSelected(item),
        [`${prefixCls}-date-now`]: isNow(item),
    });
    return {
        isQuarterSelect,
        quarterList,
        selectQuarter,
        quarterCls,
    };
};

const transformDateToTime = (selectedDate: DateObj) => {
    if (!selectedDate) return '';
    const times = [];
    if (!isNil(selectedDate.hour)) {
        times.push(`${selectedDate.hour}`.padStart(2, '0'));
    }
    if (!isNil(selectedDate.minute)) {
        times.push(`${selectedDate.minute}`.padStart(2, '0'));
    }
    if (!isNil(selectedDate.second)) {
        times.push(`${selectedDate.second}`.padStart(2, '0'));
    }
    return times.join(':');
};

const transformTimeToDate = (timeStr: string) => {
    const times = timeStr.split(':');
    return {
        hour: Number(times[0]),
        minute: Number(times[1]),
        second: Number(times[2]),
    };
};

export const useTime = (
    props: CalendarProps,
    selectedDates: Ref<DateObj[]>,
    updateSelectedDates: UpdateSelectedDates,
    activeIndex: Ref<number>,
) => {
    const hasTime = computed(() => DATE_TYPE[props.type].hasTime);
    const currentTime = ref('');
    watch(
        [selectedDates, activeIndex],
        () => {
            currentTime.value = transformDateToTime(
                selectedDates.value[activeIndex.value],
            );
        },
        {
            deep: true,
        },
    );

    const changeTime = (t: string) => {
        if (t) {
            updateSelectedDates(
                transformTimeToDate(t),
                activeIndex.value,
                true,
            );
        }
    };

    const innerDisabledTime = computed(() => {
        if (!props.disabledTime) return null;
        if (DATE_TYPE[props.type].isRange) {
            return props.disabledTime(
                selectedDates.value[activeIndex.value],
                props.rangePosition,
                selectedDates.value,
            );
        }

        return props.disabledTime(selectedDates.value[0]);
    });

    return {
        currentTime,
        changeTime,
        hasTime,
        innerDisabledTime,
    };
};
