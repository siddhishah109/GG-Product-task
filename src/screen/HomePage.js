import React ,{useState}from 'react'
import Tables from '../components/tables'
import NavB from '../components/NavB'
const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  return (
    <div>
        <NavB onSearch={handleSearch}/>
        <Tables searchTerm={searchTerm}/>
    </div>
  )
}

export default HomePage