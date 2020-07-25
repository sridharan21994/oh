import React from "react";

import { get } from 'lodash';


const renderList = (listItem, index) => {
    return (<li key={index} className="slide-up-fade-in py-10">
      <img src={get(listItem, 'pagemap.cse_image[0].src', '')} className="icon"/> 
      <p>{listItem.formattedUrl}</p>
      <h3>{listItem.title}</h3>
      <p>{listItem.snippet}</p>
      </li>);
  }

  export default renderList