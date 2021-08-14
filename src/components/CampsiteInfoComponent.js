/* eslint-disable */
import React from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import 'font-awesome/css/font-awesome.min.css';
import { Component } from 'react';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../components/shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

     function RenderCampsite({campsite}) {
        return(
            <div className="col-md-5 m-1">
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                        <CardBody>
                            <CardText>{campsite.description}</CardText>
                        </CardBody>
                </Card>
                </FadeTransform>
            </div>
        );
    }

    class CommentForm extends Component {
        constructor(props) {
            super(props);
            this.state = {
                isModalOpen: false,
                author: '',
                text: ''
            };

            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
            toggleModal() {
                console.log("this");
                this.setState({
                    isModalOpen: !this.state.isModalOpen
                });
            }

            handleSubmit(value) {
                this.toggleModal(); 
                this.props.postComment(this.props.campsiteId, value.rating, value.author, value.text);
            }

        render() {
            return (
                <div>
                    <Button outline color="secondary" onClick={this.toggleModal}>
                        <i class="fa fa-pencil fa-lg"></i>{' '}
                    Submit Comment </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={value => this.handleSubmit(value)}>
                                <div className="form-group">
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </div>
                                <div className="form-group">
                                    <Label htmlFor="author">Author</Label>
                                    <Control.text model=".author" id="author" name="author" className="form-control"
                                    validators={{
                                            required,
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
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters.',
                                            maxLength: 'Must be 15 characters or less.'
                                        }}
                                        />
                                </div>
                                <div className="form-group">
                                    <Label htmlFor="text">Text</Label>
                                    <Control.textarea model=".text" id="text" name="text" className="form-control" rows="6"
                                    validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                        />
                                        <Errors
                                        className="text-danger"
                                        model=".text"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters.',
                                            maxLength: 'Must be 15 characters or less.'
                                        }}
                                        />
                                </div>
                            </LocalForm>
                            <Button outline color="primary" onClick={this.toggleModal}> Submit </Button>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }
    }


    function RenderComments({comments, campsiteId, postComment}) {
        if (comments) {
            return (
                <div className="col-md-5 m-1"> 
                <h4>Comments</h4>
                <Stagger in>
                    {comments.map(comment => {
                        return (
                            <Fade in key={comment.id}>
                                <div>
                                    <p>
                                        {comment.text}<br />
                                        -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                    </p>
                                </div>
                            </Fade>
                        );
                    })}
                </Stagger>
                <CommentForm campsiteId={campsiteId} postComment={postComment} />
            </div>
        );
    }
    return <div />
}

   

    function CampsiteInfo(props) {
        if (props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        if (props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
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
                    <div className="row" >
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments={props.comments} campsiteId={props.campsiteId} postComment={props.postComment} />
                    </div>
                </div>
            );
        }
        return(<div />);
    }
    

 
    

export default CampsiteInfo;
