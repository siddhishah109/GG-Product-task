import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, tableCellClasses ,TableHead, TableRow, Paper, TextField, Button, CircularProgress } from '@mui/material';
import { Pagination } from '@mui/material';
import axios from 'axios';
import Papa from 'papaparse';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const Tables = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  

  useEffect(() => {
    fetchData();
    console.log("search",searchTerm)
  }, [page, itemsPerPage,searchTerm]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://dummyjson.com/products/search?q=${searchTerm}&limit=${itemsPerPage}&skip=${(page - 1) * itemsPerPage}`);
      if (response.data && response.data.products) {
        setProducts(response.data.products);
        setTotalPages(Math.ceil(response.data.total / itemsPerPage));
      } else {
        setError('Error fetching data. Please try again later.');
      }
      setLoading(false);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      setLoading(false);
    }
  };
  
  const handlePageChange = (event, value) => {
    console.log('page',value)
    setPage(value);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setPage(1);
  };

  const handleDownloadCSV = () => {
    const csv = Papa.unparse(products);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
     
     <TableContainer component={Paper} className='tabbb'>
  <Table>
    <TableHead>
      <StyledTableRow>
        <StyledTableCell>ID</StyledTableCell>
        <StyledTableCell>Name</StyledTableCell>
        <StyledTableCell>Description</StyledTableCell>
        <StyledTableCell>Price</StyledTableCell>
      </StyledTableRow>
    </TableHead>
    <TableBody>
      {loading ? (
        <TableRow>
          <TableCell colSpan={4} align="center">
            <CircularProgress />
          </TableCell>
        </TableRow>
      ) : error ? (
        <TableRow>
          <TableCell colSpan={4} align="center">
            {error}
          </TableCell>
        </TableRow>
      ) : (
        products.map((product) => (
          <StyledTableRow key={product.id}>
            <StyledTableCell>{product.id}</StyledTableCell>
            <StyledTableCell>{product.title}</StyledTableCell>
            <StyledTableCell>{product.description}</StyledTableCell>
            <StyledTableCell>{product.price}</StyledTableCell>
          </StyledTableRow>
        ))
      )}
    </TableBody>
  </Table>
</TableContainer>

      <Pagination
        className='paggg'
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
       
      />
      <div className='lim'>
     <div className='lim2' >
     <span>Items Per Page</span>
      <TextField
        variant="outlined"
        type="number"
        value={itemsPerPage}
        className='ipp'
        onChange={handleItemsPerPageChange}
      />
     </div>
      <Button variant="contained" onClick={handleDownloadCSV}>
        Download CSV
      </Button>
      </div>
    </div>
  );
};

export default Tables;
