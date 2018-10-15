import React, { Component } from "react";
import Grocery from "./Grocery";
import Client from "./Client";
import Pagi from "./pagi";
import { Search, Dropdown } from 'semantic-ui-react'


class App extends Component {
  state = {
    grocery : {
      count: 0,
      rows:[]
    },
    page: 1,
    psize: 20,
    isLoading: false,
    value: '',
    searchType : 'Name',
    searchTypeOpt: [
      { key: 'name', text: 'Name', value: 'Name' },
      { key: 'brand', text: 'Brand', value: 'Brand' },
    ],
    sortBy: 'ASC',
    sortByOpt: [
      { key: 'ASC', text: 'ASC', value: 'ASC' },
      { key: 'DESC', text: 'DESC', value: 'DESC' },
    ],
  };

  constructor(){
    super();
    this.searchChange = this.searchChange.bind(this);
    this.typeChange = this.typeChange.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
    this.sortChange = this.sortChange.bind(this);
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  searchChange(e,{ value }){
    this.setState({ isLoading: true, value, page: 1 });
    const { searchType,sortBy } = this.state;
    if(searchType === ''){
    }
    else{
      Client.list({ keyword:value, searchType, page: 1, sortBy }, data => {
        this.setState({ grocery: data,isLoading: false })
      })
    }

  }

  sortChange(e,{ value }){
    this.setState({ isLoading: true, sortBy: value, page: 1 });
    const { searchType } = this.state;
    if(searchType === ''){
    }
    else{
      Client.list({ keyword: this.state.value, searchType, page: 1,sortBy: value }, data => {
        this.setState({ grocery: data,isLoading: false })
      })
    }

  }
  
  typeChange(e,{ value }){
    this.setState({ isLoading: true, searchType:value });
  }

  componentWillMount(){
    Client.list('', data => {
      this.setState({ grocery: data })
    })
  }

  handlePaginationChange(e, { activePage }){
    this.setState({ page: activePage });
    const { searchType, value } = this.state;
    if(searchType === ''){
    }
    else{
      Client.list({ keyword:value, searchType, page:activePage }, data => {
        this.setState({ grocery: data,isLoading: false })
      })
    }
  }


  render() {
    const { grocery, page, psize, value, searchTypeOpt, searchType, sortBy, sortByOpt } = this.state;
    const { rows, count } = grocery;
    return (
      <div className="App">
        <div className="ui text container">
          
          <Dropdown
            button
            fluid
            value={searchType}
            options={searchTypeOpt}
            onChange={this.typeChange}
          />
          <Search
            onSearchChange={this.searchChange}
            value={value}
          />
          <Dropdown
            button
            fluid
            value={sortBy}
            options={sortByOpt}
            onChange={this.sortChange}
          />
          <Grocery grocery={rows} />
          <Pagi count={count} 
          page={page} 
          onPageChange={this.handlePaginationChange}
          psize={psize}/>
        </div>
      </div>
    );
  }
}

export default App;
