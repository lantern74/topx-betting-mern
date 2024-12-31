import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Tooltip,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import { Block as BlockIcon, CheckCircle as CheckCircleIcon, Edit as EditIcon, AttachMoney as AttachMoneyIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';

const MemberTable = ({ 
  members, 
  handleBlockMember, 
  handleUnblockMember, 
  handleEditPriceOpen, 
  handleEditCredentialOpen, 
  handleDeleteMemberOpen 
}) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const { t } = useTranslation();

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
        header: t('創建者'),
        accessorKey: 'createdBy.username',
      },
      {
        header: t('操作'),
        cell: (props) => (
          <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title={t('編輯')}>
                  <IconButton aria-label="edit" onClick={() => handleEditCredentialOpen(props.row.original)}>
                      <EditIcon sx={{ fontSize: '1rem' }} />
                  </IconButton>
              </Tooltip>
              <Tooltip title={t('編輯')}>
                  <IconButton aria-label="edit" onClick={() => handleEditPriceOpen(props.row.original)}>
                      <AttachMoneyIcon sx={{ fontSize: '1rem' }} />
                  </IconButton>
              </Tooltip>
              <Tooltip title={t('刪除')}>
                  <IconButton aria-label="delete" onClick={() => handleDeleteMemberOpen(props.row.original)}>
                      <DeleteIcon sx={{ fontSize: '1rem' }} />
                  </IconButton>
              </Tooltip>
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
    [t, handleBlockMember, handleUnblockMember, handleEditPriceOpen, handleEditCredentialOpen, handleDeleteMemberOpen]
  );

  const table = useReactTable({
    data: members,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={t("搜尋會員...")}
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Box>
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
            {t("上一頁")}
          </Button>
          <span>
            {t("第")} {table.getState().pagination.pageIndex + 1} {t("頁")} {t("共")} {table.getPageCount()} {t("頁")}
          </span>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {t("下一頁")}
          </Button>
        </Box>
  );
};

export default MemberTable;
