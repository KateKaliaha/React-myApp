import React from 'react';

type SearchState = {
  value: string;
};

type SearchProps = Record<string, (value: string) => void>;

class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      value: localStorage.getItem('value') ? (localStorage.getItem('value') as string) : '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: React.FormEvent) {
    this.setState({ value: (event.target as HTMLInputElement).value });
    this.props.filter((event.target as HTMLInputElement).value);
  }

  componentWillUnmount(): void {
    localStorage.setItem('value', this.state.value);
  }

  render(): JSX.Element {
    return (
      <input
        className="search"
        id="search"
        type="search"
        onChange={this.handleChange}
        value={this.state.value}
        placeholder="Поиск..."
      ></input>
    );
  }
}

export { Search };
