import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

type SelectType = {
    children: React.ReactNode
    // handleFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    title: string;
    value: string;
}

export const Select = ({children, title, value}:SelectType) => {
  const [ filterFocus, setFilterFocus ] = useState<boolean>(false)
  return (
    <div>
      <label htmlFor="select">{title}</label>
      <div id="select"
          onClick={()=>setFilterFocus(s=>!s)}
          onBlur={()=>setFilterFocus(false)}
      >
        {value}
      </div>
      {
        filterFocus&&children
      }
      <svg width="24" height="24" className="pokeballIcon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="11" fill="white" stroke="#313131" strokeWidth="2"/>
          <path d="M1,12 H23" stroke="#313131" strokeWidth="2"/>
          <circle cx="12" cy="12" r="4" fill="white" stroke="#313131" strokeWidth="2"/>
      </svg>

      <span className={`${filterFocus&&'selected'}`}>
          <FontAwesomeIcon icon={filterFocus?faChevronDown:faChevronUp} className="fa-solid" />
      </span>
    </div>
  )
}

