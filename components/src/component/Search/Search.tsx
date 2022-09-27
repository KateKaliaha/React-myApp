import React from 'react';

type SearchState = {
  value: string;
};

type SearchProps = Record<string, unknown>;

class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      value: localStorage.getItem('value') ? (localStorage.getItem('value') as string) : '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <input
        className="search"
        id="search"
        type="search"
        onChange={this.handleChange}
        value={(this.state as HTMLInputElement).value}
        placeholder="Поиск..."
      ></input>
    );
  }

  handleChange(event: React.FormEvent) {
    this.setState({ value: (event.target as HTMLInputElement).value });
  }

  componentWillUnmount() {
    localStorage.setItem('value', this.state.value);
  }
}

export { Search };
