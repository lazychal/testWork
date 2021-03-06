import * as React from 'react';
import './UsersTable.scss';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import {FC, useState} from "react";
import {PencilIcon} from "../../assets/icons/PencilIcon";
import {TrashIcon} from "../../assets/icons/TrashIcon";
import {ICity, IUser} from "../Users";
import {UserModal} from "../userModal/UserModal";
import {DeleteModal} from "../deleteModal/DeleteModal";

export function TablePaginationActions(props: any) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleBackButtonClick = (event: any) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: any) => {
        onPageChange(event, page + 1);
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};



interface IProps {
    rows: IUser[]
    citiesData: ICity[]
    showModal: boolean
    modalToggle: (value: boolean) => void
    editUser: (fio: string, cityName: string, userId: string | undefined) => any
    deleteUser: (userId: string) => void
}

export const UsersTable:FC<IProps> =
    ({rows, citiesData, showModal, modalToggle, editUser, deleteUser }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [editRow, setEditRow] = useState('')
    const [rowForDelete, setRowForDelete] = useState('')

    const getCityName = (id: number) => {
        const city = citiesData.filter(city => {
            return city.id === id
        })

        return city[0].name
    }
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const toEditUser = (id: string) => {
        if(editRow) {
            setEditRow('')
            modalToggle(false)
        } else {
            setEditRow(id)
            modalToggle(true)
        }
    }
    const toDeleteUser = (id: string) => {
        if(rowForDelete) {
            setRowForDelete('')
            modalToggle(false)
        } else {
            setRowForDelete(id)
            modalToggle(true)
        }
    }

    return (
        <TableContainer component={Paper} className='tableContainer'>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell>??????</TableCell>
                        <TableCell align="right">??????????</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                    ).map((row) => {
                        return <TableRow key={row.id} onClick={() => toEditUser(row.id)}>
                            <TableCell component="th" scope="row">
                                {row.fio}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {getCityName(row.cityId)}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                <span className='pencilIcon'
                                      onClick={() => toEditUser(row.id)}>
                                    <PencilIcon/>
                                    {
                                        editRow === row.id && showModal &&
                                        <UserModal onSubmit={editUser}
                                                   citiesData={citiesData}
                                                   modalToggle={modalToggle}
                                                   editData={[row.fio, getCityName(row.cityId), row.id]}
                                                   modalTitle='???????????????????????????? ????????????????????????'
                                                   primaryBtnTitle='??????????????????'
                                                   secondBtn={true}
                                        />
                                    }
                                </span>
                                <span className='trashIcon' onClick={() => toDeleteUser(row.id)}>
                                    <TrashIcon/>
                                    {
                                        rowForDelete === row.id && showModal &&
                                            <DeleteModal fio={row.fio}
                                                         cityName={getCityName(row.cityId)}
                                                         onSubmit={deleteUser}
                                                         userId={row.id}
                                                         modalToggle={modalToggle}
                                            />
                                    }
                                </span>
                            </TableCell>
                        </TableRow>
                    })}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}


