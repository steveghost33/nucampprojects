import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, FormFeedback, Input, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors} from 'react-redux-form';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);


function RenderCampsite({campsite}) {
        return (
            <div className="col-md-5 md-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

function RenderComments({comments}) {
        if (comments) {
            return (
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comments => {
                        return (
                            <div key={comments.id}>
                                <p>{comments.text}</p>
                                <p>
                                    {comments.text}<br />
                                    -- {comments.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}
                                </p>
                                    </div>
                                );
                            })}
                            <CommentForm/>
                          </div>
                        );
                      }
                      return (<div />
                      );
                    }

function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    }
    return <div />;
}

class CommentForm extends Component {
    constructor (props) {
        super(props); 

        this.state = {
            isModalOpen: false, 
            rating: '',
            author: '', 
            text: '', 
            touched: {
                rating: false, 
                author: false, 
                text: false,
            }
        };
        this.toggleModal =
this.toggleModal.bind(this);
        this.handleSubmit.bind(this);
}

toggleModal() {
    this.setState({
        isModalOpen:
!this.state.isModalOpen
    });
}

handleSubmit(values) {
    console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is " + JSON.stringify(values));
};

render () {
    return (
        <React.Fragment>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalBody>
                    <ModalHeader>Submit Comment</ModalHeader>
                    <LocalForm onSubmit={values => this.handleSubmit(values)}>
                        <div className="form-group">
                        <Label htmlFor="username">Rating</Label>
                            <Control.select className= "form-control" model=".rating" id="rating" name="rating">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                            </div>

                            <div className="form-group">
                            <Label htmlFor="username">Your Name</Label>
                            <Control.text model=".author" id="author" name="author" 
                                    className= "form-control" 
                                    validators={{
                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }}
                    />
                   <Errors
                         className="text-danger"
                         model=".author"
                          show="touched"
                          component="div"
                            messages={{
                            minLength: 'Must be at least 2 characters',
                            maxLength: 'Must be 15 characters or less'
                                  }}
                                    />
                            </div>
                            
                            <div className="form-group">
                            <Label htmlFor="username">Comment</Label>
                            <Control.textarea className= "form-control" model=".text" id="text" name="text" rows="6" />
                            </div>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                    </LocalForm>
                    </ModalBody>
                </Modal>
                    <Button type="submit" value="submit" outline onClick= {this.toggleModal}>
                    <i className="fa fa-pencil fa-lg" /> Submit Comment</Button>
        </React.Fragment>
         )
    }  
} 

export default CampsiteInfo;