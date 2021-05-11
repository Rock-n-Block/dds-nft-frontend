import React from 'react';
import { useHistory } from 'react-router-dom';
import { Input } from 'antd';

import SearchImg from '../../../assets/img/icons/pupa.svg';

import './Search.scss';

interface SearchProps {
  placeholder: string;
  className?: string;
}

const Search: React.FC<SearchProps> = ({ placeholder, className }) => {
  const history = useHistory();
  const inputRef = React.useRef<any>();
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && e.target.value) {
      history.push(`/search/?to_search=${e.target.value}`);
    }
  };
  const handleSearch = (): void => {
    if (inputRef.current.state.value) {
      history.push(`/search/?to_search=${inputRef.current.state.value}`);
    }
  };

  return (
    <div className={`${className ?? ''} search box-shadow`}>
      <div
        className="search__img"
        onClick={handleSearch}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <img src={SearchImg} alt="" />
      </div>
      <Input
        ref={inputRef}
        type="text"
        className="input__search text-smd text-regular"
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Search;
