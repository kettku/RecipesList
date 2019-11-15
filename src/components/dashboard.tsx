import "./dashboard.scss";
import * as React from "react";
import {List} from "./list"
import {StateInterface} from "../StateInterface";


export class Dashboard extends React.Component<{}, StateInterface> {

    constructor(props){
        super(props);
        this.state = {
            active: 0,
            value: '',
            ingValue: '',
            data: [{
                "name": "Mac & cheese",
                "ingredients": [
                    {
                        "name": "Macaronis"
                    },
                    {
                        "name": "Cheese"
                    }
                ]
            },
                {
                    "name": "Chicken soup",
                    "ingredients": [
                        {
                            "name": "Chicken"
                        },
                        {
                            "name": "Cream"
                        }
                    ]
                }]
        }


    }

    setActive = (index) => {
        this.setState({ active: index });
    };

    onChange = (event) => {
        this.setState({ value: event.target.value });
    };

    onIngChange = (event) => {
        this.setState({ ingValue: event.target.value });
    };

    onSubmit = () => {
        const a = [...this.state.data];
        a.push({name: '', isEditing: true, ingredients: []})
        this.setState({
            data: a
        });
    };

    onIngSubmit = () => {
        const a = this.state.data.splice(0);
        a[this.state.active].ingredients.push({name: '', isEditing: true});
        this.setState({
            data: a
        });
    };

    onDelete = (index) => {
        const a = [...this.state.data];
        a.splice(index, 1);

        if (a.length < 1) {
            a.push({name: '', isEditing: true, ingredients: []})

            this.setState({
                active: 0,
                value: '',
                data: a
            });
        } else {
            this.setState({
                active: 0,
                value: '',
                data: a
            });
        }
    };

    onIngDelete = (index) => {
        const a = [...this.state.data];
        a[this.state.active].ingredients.splice(index, 1);
        this.setState({
            ingValue: '',
            data: a
        });
    };

    onEdit = (index) => {
        const a = [...this.state.data];
        a[index].isEditing = true;
        this.setState({
            value: a[index].name,
            data: a
        });
    };

    onIngEdit = (index) => {
        const a = [...this.state.data];
        a[this.state.active].ingredients[index].isEditing = true;
        this.setState({
            ingValue: a[this.state.active].ingredients[index].name,
            data: a
        });
    };

    onSave = (index) => {
        const a = [...this.state.data];
        a[index].name = this.state.value;
        a[index].isEditing = false;
        this.setState({
            value: '',
            data: a
        });
    };

    onIngSave = (index) => {
        const a = [...this.state.data];
        a[this.state.active].ingredients[index].name = this.state.ingValue;
        a[this.state.active].ingredients[index].isEditing = false;
        this.setState({
            ingValue: '',
            data: a
        });
    };


    render() {
        return <div className="cont">
            <h1>Recipes</h1>
            <br/>
            <List position={'left'}
                  title={'Name'}
                  addNew={'recipe'}
                  active={this.state.active}
                  setActive={this.setActive}
                  onEdit={this.onEdit}
                  onChange={this.onChange}
                  onDelete={this.onDelete}
                  onSubmit={this.onSubmit}
                  onSave={this.onSave}
                  data={this.state.data}
                  value={this.state.value}
            />
            <List position={'right'}
                  title={'Ingredients'}
                  addNew={'ingredient'}
                  onEdit={this.onIngEdit}
                  onChange={this.onIngChange}
                  onDelete={this.onIngDelete}
                  onSubmit={this.onIngSubmit}
                  onSave={this.onIngSave}
                  data={this.state.data[this.state.active].ingredients}
                  value={this.state.ingValue}
            />

        </div>
    }
}

