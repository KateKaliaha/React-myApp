import React from 'react';
import { Search } from 'component/Search/Search';
import { CardList } from 'component/CardList/CardList';

function MainPage() {
  return (
    <div className="main-page">
      <Search />
      <CardList />
    </div>
  );
}

export { MainPage };
