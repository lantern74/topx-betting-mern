import React, { useMemo, useState, useCallback } from 'react';
import { debounce } from 'lodash';
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
  Typography,
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
import useAuthStore from '../../store/authStore';

const MemberTable = ({ 
  members, 
  handleBlockMember, 
  handleUnblockMember, 
  handleEditPriceOpen, 
  handleEditCredentialOpen, 
  handleDeleteMemberOpen 
}) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { userRole } = useAuthStore();

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((value) => {
      setGlobalFilter(value);
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };
  const { t } = useTranslation();

  const columns = useMemo(
    () => {
      const baseColumns = [
        {
          header: t('用戶名'),
          accessorKey: 'username',
        },
        {
          header: t('價格'),
          accessorKey: 'price',
        },
        {
          header: t('Date'),
          accessorKey: 'date',
          cell: (props) => {
            return props.getValue();
          }
        },
        {
          header: t('識別碼'),
          accessorKey: 'slug',
          cell: (props) => props.getValue()
        },
      ];

      if (userRole === 'main') {
        baseColumns.push({
          header: t('創建者'),
          accessorKey: 'createdBy.username',
          cell: (props) => {
            const username = props.row.original.createdBy?.username;
            if (username === 'admin') {
              return '大管理員';
            } else if (username === 'newSubadmin') {
              return '小管理員';
            } else if (username === 'sub1') {
              return '小管理員';
            }
            return username;
          },
        });
      }

      baseColumns.push({
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
      });
      return baseColumns;
    },
    [t, handleBlockMember, handleUnblockMember, handleEditPriceOpen, handleEditCredentialOpen, handleDeleteMemberOpen, userRole]
  );

  const table = useReactTable({
    data: members,
    columns,
    state: {
      globalFilter,
      sorting: [{ id: 'date', desc: true }],
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
        <>
          <Box mb={2} sx={{ mt: 4 }}>
            <TextField
              fullWidth
              variant="outlined"
              label={t("Search Members")}
              placeholder={t("Type to search...")}
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#90caf9',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#90caf9',
                },
              }}
              InputProps={{
                sx: {
                  color: 'white',
                }
              }}
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
        </>
  );
};

export default MemberTable;
