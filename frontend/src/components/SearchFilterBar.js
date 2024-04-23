import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FilterIcon from '@mui/icons-material/FilterList';

const FilterBar = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#f8f8f8', // Set background color
  padding: '8px', // Set padding
});

const SearchFilterBar = () => {
  return (
    <FilterBar>
      <IconButton>
        <SearchIcon />
      </IconButton>
      <IconButton>
        <FilterIcon />
      </IconButton>
    </FilterBar>
  );
};

export default SearchFilterBar;
