import * as React from "react";

interface Blobs {
    data: Array<ListConsumable>,
    value: string,
    title: string,
    addNew: string,
    active?: number,
    onChange: any,
    onSubmit: any,
    setActive?: (index: number) => void,
    onDelete: (index: number) => void,
    onEdit?: (index: number) => void,
    onSave?: (index: number) => void,
    position?: 'right' | 'left',
}

export interface ListConsumable {
    isEditing?: boolean,
    name: string
    ingredients?: Array<ListConsumable>
}

export class List extends React.Component<Blobs> {

    render() {

        return (
            <div className={'container-fluid dashboard ' + this.props.position}>

                <button className={'newButton'} name="add-button" onClick={() => this.props.onSubmit()}>Add new {this.props.addNew}</button><br/>

                <h3>{this.props.title}</h3>

                {this.props.data.map((item: ListConsumable, index) => {
                    let line;

                    if (this.props.data[index].isEditing) {
                        line = <div>
                            <input value={this.props.value} onChange={this.props.onChange}></input>
                            <button className={'right button'} name="save-button" onClick={() => this.props.onSave(index)}>
                                <img src={"https://image.flaticon.com/icons/svg/149/149654.svg"} height={'15px'} width={'15px'} />
                            </button>
                            <button className={'right button'} name="delete-button" onClick={() => this.props.onDelete(index)}>
                                <img src={"https://image.flaticon.com/icons/svg/64/64022.svg"} height={'15px'} width={'15px'}/>
                            </button>
                        </div>
                    } else {
                        if (this.props.setActive) {

                            if (this.props.active === index) {
                                line = <div>
                                    <span className={'left active'} onClick={() => this.props.setActive(index)}>{index+1}. {item.name}</span>
                                    <button className={'right button'} name="edit-button" onClick={() => this.props.onEdit(index)}>
                                        <img src={'https://image.flaticon.com/icons/svg/61/61456.svg'} height={'15px'} width={'15px'} />
                                    </button>
                                </div>
                            } else {
                                line = <div>
                                    <span className={'left'} onClick={() => this.props.setActive(index)}>{index+1}. {item.name}</span>
                                    <button className={'right button'} name="edit-button" onClick={() => this.props.onEdit(index)}>
                                        <img src={'https://image.flaticon.com/icons/svg/61/61456.svg'} height={'15px'} width={'15px'} />
                                    </button>
                                </div>
                            }


                        } else {
                            line = <div>
                                <span className={'left'}>{index+1}. {item.name}</span>
                                <button className={'right button'} name="edit-button" onClick={() => this.props.onEdit(index)}>
                                    <img src={'https://image.flaticon.com/icons/svg/61/61456.svg'} height={'15px'} width={'15px'} />
                                </button>
                            </div>
                        }
                    }

                    return <div key={index} className={'listline'}>{line}</div>;
                })}

            </div>
        )
    }
}