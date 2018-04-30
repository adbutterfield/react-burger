import React, { Component } from 'react';
import './Layout.css';
import Toolbar from './Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    isSideDrawerOpen: false,
  };

  toggleSideDrawer = () => {
    this.setState((prevState) => {
      return { isSideDrawerOpen: !prevState.isSideDrawerOpen };
    });
  }

  render() {
    return (
      <React.Fragment>
        <Toolbar toggleSideDrawer={this.toggleSideDrawer} />
        <SideDrawer
          toggleSideDrawer={this.toggleSideDrawer}
          isOpen={this.state.isSideDrawerOpen}
        />
        <main className="content">{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default Layout;
