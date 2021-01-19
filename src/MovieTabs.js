import React from "react";
import classNames from "classnames";

export class MovieTabs extends React.Component {
    checkActive = tab => {
        return classNames("nav-link", {active: tab === this.props.sort_by});
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.sort_by !== this.props.sort_by
    }

    handleClick = value => () => this.props.updateSortBy(value)

    render() {
        return (
            <ul className="tabs nav nav-pills">
                <li className="nav-item">
                    <div className={this.checkActive("popularity.desc")}
                         onClick={this.handleClick("popularity.desc")}
                    >Popularity desc
                    </div>
                </li>
                <li className="nav-item">
                    <div className={this.checkActive("vote_average.desc")}
                         onClick={this.handleClick("vote_average.desc")}
                    >Vote average desc
                    </div>
                </li>
                <li className="nav-item">
                    <div className={this.checkActive("revenue.desc")}
                         onClick={this.handleClick("revenue.desc")}
                    >Revenue desc
                    </div>
                </li>
            </ul>
        );
    }
}