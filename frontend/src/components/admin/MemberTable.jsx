import React, { useMemo } from 'react';
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
} from '@mui/material';
import { Block as BlockIcon, CheckCircle as CheckCircleIcon, Edit as EditIcon, AttachMoney as AttachMoneyIcon } from '@mui/icons-material';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';

const MemberTable = ({ members, handleBlockMember, handleUnblockMember, handleEditPriceOpen, handleEditCredentialOpen }) => {
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
    [t, handleBlockMember, handleUnblockMember, handleEditPriceOpen, handleEditCredentialOpen]
  );

  const table = useReactTable({
    data: members,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
        <TableContainer >
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
  );
};

export default MemberTable;
