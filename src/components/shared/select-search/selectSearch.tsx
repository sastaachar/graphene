import React, { createRef, ReactNode, RefObject, useEffect, useRef, useState } from 'react';

import './selectSearch.scss';

interface Option {
  key: string | number;
  value: string;
}

interface SelectSearchProps {
  defaultSlectText: string;
  defaultSelectKey?: string | number;
  options: Option[];
}

const SearchIcon = () => {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.7688 14.6976L13.4582 11.3876C13.3088 11.2382 13.1062 11.1552 12.8937 11.1552H12.3525C13.2689 9.9832 13.8135 8.50913 13.8135 6.90558C13.8135 3.09091 10.7221 0 6.90676 0C3.09144 0 0 3.09091 0 6.90558C0 10.7202 3.09144 13.8112 6.90676 13.8112C8.51058 13.8112 9.98491 13.2667 11.1571 12.3504V12.8915C11.1571 13.104 11.2401 13.3065 11.3895 13.4559L14.7001 16.7659C15.0122 17.078 15.517 17.078 15.8258 16.7659L16.7655 15.8264C17.0776 15.5143 17.0776 15.0097 16.7688 14.6976ZM6.90676 11.1552C4.55912 11.1552 2.65644 9.25613 2.65644 6.90558C2.65644 4.55834 4.5558 2.65599 6.90676 2.65599C9.25439 2.65599 11.1571 4.55502 11.1571 6.90558C11.1571 9.25281 9.25771 11.1552 6.90676 11.1552Z"
        fill="#26408B"
      />
    </svg>
  );
};

const SelectSearch: React.FC<SelectSearchProps> = (props: SelectSearchProps) => {
  const [searchText, setsearchText] = useState('');
  const [selectedOption, setSelectedOption] = useState<string>();
  const [showBar, setShowBar] = useState<boolean>(false);
  const inputBar = createRef<HTMLInputElement>();

  const handleOutsideClick = () => {
    if (showBar) setShowBar(false);
  };

  const searchBar = createRef<HTMLDivElement>();
  useOutsideClick(searchBar, handleOutsideClick);

  useEffect(() => {
    if (props.options.length > 0 && props.defaultSelectKey != undefined) {
      const defalutSelection = props.options.filter((e) => {
        if (e.key === props.defaultSelectKey) return e;
      });

      if (defalutSelection.length > 0) {
        setSelectedOption(defalutSelection[0].value);
      }
    }
  }, []);
  useEffect(() => {
    if (showBar) inputBar.current?.focus();
  }, [showBar]);

  const searchFilter = (ele: Option) => {
    if (ele.value.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())) return ele;
  };

  const handleToggleShow = () => {
    setShowBar(!showBar);
  };

  return (
    <div className={'select-search'} ref={searchBar} onClick={handleToggleShow}>
      <div className={'select-search-selected' + (showBar ? ' two-rounded' : ' all-rounded')}>
        <div className="select-search-selected-value">
          <span>{selectedOption || props.defaultSlectText}</span>
        </div>
        <div className={'select-search-selected-button' + (showBar ? ' down-arrow' : ' left-arrow')}></div>
      </div>
      {showBar && (
        <div className="select-search-bar">
          <div className="input-box">
            <span>
              <SearchIcon />
            </span>
            <input type="text" onChange={(e) => setsearchText(e.target.value)} ref={inputBar} value={searchText} />
          </div>
          {props.options.filter(searchFilter).map((option) => (
            <div key={option.key} className="select-search-option" onClick={() => setSelectedOption(option.value)}>
              <span>{option.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// arrow function gives error and i dont want to use the work around
function useOutsideClick<any>(ref: RefObject<any>, cb: any): void {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current?.contains && !ref.current.contains(event.target)) {
        cb();
      }
    };

    // bind the listner
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      // remove the listner
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [ref]);
}

export default SelectSearch;
