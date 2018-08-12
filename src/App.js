import React, { Component } from 'react';
import faker from 'faker';

import Editable from './Editable';

function createFakeData(num_rows) {
  return Array(num_rows)
    .fill(0)
    .map(() => {
      return {
        name: faker.name.findName()
      };
    });
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      list: createFakeData(20)
    };
  }
  onChange(index, newName) {
    let listCopy = this.state.list;
    listCopy[index].name = newName;
    this.setState(prevState => ({
      list: listCopy
    }));
  }
  renderRows() {
    return this.state.list.map((item, index) => (
      <Editable
        key={index}
        onChange={newText => this.onChange(index, newText)}
        htmlText={item.name}
        editable
      />
    ));
  }
  render() {
    return <div>{this.renderRows()}</div>;
  }
}

export default App;
