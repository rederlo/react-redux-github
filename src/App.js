import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRepos } from './redux/github/action'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
        inputValue: ''
      };
   }

  componentDidMount(){
      this.props.getRepos();
  }

  image(cell, row){
      return (<img style={{width:50}} src={cell} alt=""/>)
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }


  render() {
    let rows = [];
    this.props.github.map(repo => rows.push({
      id : repo.id, 
      name: repo.name,
      language: repo.language,
      avatar: repo.owner.avatar_url
    }));

  
    return (
      <div className="container header">

        <div className="row">
            <form className="form-inline">
              <div className="form-group">
                <div className="input-group">
                  <input type="text" className="form-control" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} placeholder="Bome" />
                </div>
              </div>
              <button type="submit" onClick={this.props.getRepos(this.state.inputValue)} className="btn btn-primary">Buscar</button>
            </form>
            <br/>
        </div>  
      <div className="row">
        <BootstrapTable data={rows} pagination search multiColumnSearch exportCSV>
          <TableHeaderColumn isKey dataField='id' dataSort={ true }>ID</TableHeaderColumn>
          <TableHeaderColumn dataField='avatar' dataSort={ true } dataFormat={this.image}>avatar</TableHeaderColumn>
          <TableHeaderColumn dataField='name' dataSort={ true }>Name</TableHeaderColumn>
          <TableHeaderColumn dataField='language' dataSort={ true }>language</TableHeaderColumn>
        </BootstrapTable>
      </div>
      </div>
     );
  }
}

const mapStateToProps = (state) => {
  return {
    github: state.github.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getRepos
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
