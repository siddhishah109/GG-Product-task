import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, CircularProgress } from '@mui/material';
import { Pagination } from '@mui/material';
import axios from 'axios';
import Papa from 'papaparse';

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
  

  const handleSearch = () => {
    setPage(1); 
    fetchData();
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
      <TextField
        label="Search Products"
        variant="outlined"
        value={searchTerm}
        // onChange={(event) => setSearchTerm(event.target.value)}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
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
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.price}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
      />
      <TextField
        label="Items Per Page"
        variant="outlined"
        type="number"
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
      />
      <Button variant="contained" onClick={handleDownloadCSV}>
        Download CSV
      </Button>
    </div>
  );
};

export default Tables;
