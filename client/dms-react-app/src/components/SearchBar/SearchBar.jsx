import React, { Component } from 'react';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './SearchBar.css'

class SearcBar extends Component {
    render() {
        const { SearchBar } = Search;
        const documents = [{}];
        const columns = [{}];

        return (
            <div>
                <ToolkitProvider
                    keyField="id"
                    data={ documents }
                    columns={ columns }
                    search
                >
                {
                props => (
                <div>
                    <SearchBar { ...props.searchProps } className='searchBar' placeholder='Paieška...' />
                {/* <BootstrapTable { ...props.baseProps }/> */}
                </div> 
                )}
                </ToolkitProvider>
            </div>
        );
    }
}

export default SearcBar;