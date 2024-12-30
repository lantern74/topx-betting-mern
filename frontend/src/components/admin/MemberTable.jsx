import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Tooltip,
  createTheme,
  ThemeProvider,
  Button,
} from '@mui/material';
import { Block as BlockIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';

const MemberTable = ({ members, handleBlockMember, handleUnblockMember }) => {
  const { t } = useTranslation();

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

  const columns = useMemo(
    () => [
      {
        header: t('用戶名'),
        accessorKey: 'username',
      },
      {
        header: t('價格'),
        accessorKey: 'price',
      },
      {
        header: t('操作'),
        cell: (props) => (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title={props.row.original.blocked ? t('解除封鎖') : t('封鎖')}>
              <IconButton
                aria-label={props.row.original.blocked ? t('解除封鎖') : t('封鎖')}
                onClick={() =>
                  props.row.original.blocked
                    ? handleUnblockMember(props.row.original._id)
                    : handleBlockMember(props.row.original._id)
                }
              >
                {props.row.original.blocked ? (
                  <CheckCircleIcon sx={{ fontSize: '1rem', color: 'green' }} />
                ) : (
                  <BlockIcon sx={{ fontSize: '1rem', color: 'red' }} />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        ),
        size: 100,
      },
    ],
    [t, handleBlockMember, handleUnblockMember]
  );

  const table = useReactTable({
    data: members,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <ThemeProvider theme={darkTheme}>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableCell key={header.id} onClick={header.column.getToggleSortingHandler()} style={{cursor: 'pointer'}}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {{
                                        asc: ' ⬆️',
                                        desc: ' ⬇️',
                                    }[header.column.getIsSorted() ]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
            <Button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                {t('上一頁')}
            </Button>
            <span>
              {t('第')} {table.getState().pagination.pageIndex + 1} {t('頁')} {t('共')} {table.getPageCount()} {t('頁')}
            </span>
            <Button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                {t('下一頁')}
            </Button>
        </Box>
    </ThemeProvider>
  );
};

export default MemberTable;
