import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface FetchDataExampleState {
    forecasts: IWeatherForecast[];
    books: IBook[],
    loading: boolean;
}

export class FetchData extends React.Component<RouteComponentProps<{}>, FetchDataExampleState> {
    constructor() {
        super();
        this.state = { forecasts: [], books: [], loading: true };

        fetch('api/SampleData/WeatherForecasts')
            .then(response => response.json() as Promise<IWeatherForecast[]>)
            .then(data => {
                this.setState({ forecasts: data, loading: false });
            });

        fetch('api/SampleData/Books')
            .then(response => response.json() as Promise<IBook[]>)
            .then(data => {
                this.setState({ books: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderForecastsTable(this.state.forecasts, this.state.books);

        return <div>
            <h1>Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            { contents }
        </div>;
    }

    private static renderForecastsTable(forecasts: IWeatherForecast[], books: IBook[]) {
        return <div>
                <table className='table'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                {forecasts.map(forecast =>
                    <tr key={ forecast.dateFormatted }>
                        <td>{ forecast.dateFormatted }</td>
                        <td>{ forecast.temperatureC }</td>
                        <td>{ forecast.temperatureF }</td>
                        <td>{ forecast.summary }</td>
                    </tr>
                )}
                </tbody>
                </table>
                   <table className='table'>
                       <thead>
                       <tr>
                           <th>Id</th>
                           <th>Name</th>
                           <th>Author</th>
                           <th>Description</th>
                       </tr>
                       </thead>
                       <tbody>
                {books.map(book =>
                    <tr key={book.id}>
                        <td>{book.id}</td>
                        <td>{book.name}</td>
                        <td>{book.author}</td>
                        <td>{book.description}</td>
                    </tr>
                    )}
                       </tbody>
                   </table>
            </div>;
    }
}

interface IWeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

interface IBook {
    id: number;
    name: string;
    author: string;
    description: string;
}