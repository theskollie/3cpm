import React, { useEffect } from 'react';

import {
  useTable, useSortBy, useExpanded, useFlexLayout,
  TableCommonProps,
  TableOptions,
} from 'react-table';
import TableHeader from './TableParts/HeaderGroup';
import TableBody from './TableParts/Body';
import './Table.scss';
import type { ActiveDeals, Type_Query_bots } from '@/types/3Commas';
import { SubRowAsync } from '@/app/Pages/ActiveDeals/Components';
import { initialSortBy, setSortStorage } from './utils';

interface TableType extends TableOptions<{}> {
  renderRowSubComponent?: typeof SubRowAsync | undefined,
  columns: any[],
  data: ActiveDeals[] | any[]
  customHeaderProps?: TableCommonProps,
  customColumnProps?: TableCommonProps,
  customRowProps?: TableCommonProps,
  customCellProps?: TableCommonProps
  localStorageSortName?: string,
  updateLocalBotData?: React.Dispatch<React.SetStateAction<Type_Query_bots[]>>,
  updateReservedFunds?: (id: number, column: string, value: string) => void,
}

const blankCustomProps = { style: {}, className: '', role: undefined };
const tableState: TableType = {
  customHeaderProps: blankCustomProps,
  customColumnProps: blankCustomProps,
  customRowProps: blankCustomProps,
  customCellProps: blankCustomProps,
  data: [],
  columns: [],
  renderRowSubComponent: undefined,
  localStorageSortName: undefined,
  updateLocalBotData: undefined,
  updateReservedFunds: undefined,
};

// Expose some prop getters for headers, rows and cells, or more if you want!
const CustomTable: React.FC<typeof tableState> = ({
  columns, data,
  renderRowSubComponent = undefined,
  updateLocalBotData, updateReservedFunds, localStorageSortName,
  customHeaderProps = blankCustomProps,
  customColumnProps = blankCustomProps,
  customRowProps = blankCustomProps,
  customCellProps = blankCustomProps,
}) => {
  const defaultColumn = React.useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 30, // minWidth is only used as a limit for resizing
      width: 100, // width is used for both the flex-basis and flex-grow
    }),
    [],
  );

  const {
    getTableProps, getTableBodyProps, headerGroups, rows,
    prepareRow,
    visibleColumns,
    state: { sortBy },
  } = useTable(
    {
      columns,
      data,
      autoResetSortBy: false,
      updateLocalBotData,
      updateReservedFunds,
      autoResetExpanded: false,
      initialState: {
        sortBy: initialSortBy(localStorageSortName),
      },
      defaultColumn,
    },
    useSortBy,
    useExpanded,
    useFlexLayout,
  );

  useEffect(() => {
    if (sortBy !== undefined) setSortStorage(sortBy, localStorageSortName);
  }, [sortBy]);

  const tableProps = getTableProps();

  return (
    <div
      style={tableProps.style}
      className={`dealsTable table ${tableProps.className}`}
      role={tableProps.role}
    >
      <TableHeader
        headerGroups={headerGroups}
        customColumnProps={customColumnProps}
        customHeaderProps={customHeaderProps}
      />
      <TableBody
        bodyProps={getTableBodyProps()}
        customCellProps={customCellProps}
        customRowProps={customRowProps}
        prepareRow={prepareRow}
        visibleColumns={visibleColumns}
        renderRowSubComponent={renderRowSubComponent || undefined}
        rows={rows}
      />

    </div>
  );
};

export default CustomTable;
