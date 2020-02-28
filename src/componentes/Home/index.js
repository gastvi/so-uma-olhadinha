import React, { Component } from 'react';
import {
    Navbar, Input, Button, InputGroup, InputGroupAddon, Container, Col, Form, Card, CardImg,
    CardText, CardBody, CardTitle, CardSubtitle, Row, Spinner
} from 'reactstrap';
import { MdSearch, MdThumbUp } from 'react-icons/md';
import axios from 'axios'
import { Link } from 'react-router-dom'

class Home extends Component {

    state = {
        carregando: false,
        meteoro: []
    }

    meteoroDaPaixao = async (evento) => {
        evento.preventDefault()

        this.setState({ carregando: true })

        const Form = evento.target
        const InputGroup = Form.children[0]
        const input = InputGroup.children[0]

        // const {data: seguidores} = await axios (`https://api.github.com/users/${input.value}/followers`)
        const meteoro = await axios(`https://api.nasa.gov/planetary/apod?date=${input.value}&api_key=WRcpz56IyuWc0irY8WbZM3Whi0qqf3lGHeTWZZhG`)

        // this.setState({seguidores})
        this.setState({ meteoro: [meteoro.data, ...this.state.meteoro], carregando: false })


    }

    render() {
        return (
            <>
                <Navbar color="dark">
                    <Container className="d-flex justify-content-center">
                            <img src="https://www.thispersondoesnotexist.com/image" alt="pessoa aleatoria" 
                            className='rounded-circle border border-white mr-3' width="50" />
                            <span className="text-white">
                                logado como:
                                    <Link className="text-white font-weight-bold ml-3" to="/">
                                {this.props.match.params.usuario}
                                </Link>
                            </span>                     
                    </Container>
                </Navbar>

                <Navbar color="dark" fixed="bottom">
                    <Container className="d-flex justify-content-center">
                        <Col xs="12" md="6">
                            <Form onSubmit={this.meteoroDaPaixao} >
                                <InputGroup>
                                    <Input type='date' />
                                    <InputGroupAddon addonType="append">
                                        <Button color="danger">

                                            {this.state.carregando ? (<Spinner color="light" size="sm" />) :
                                                (<MdSearch size="21" />)}

                                        </Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Form>
                        </Col>
                    </Container>
                </Navbar>


                {this.state.meteoro.length === 0 && (
                    <Container className=" h-100 d-flex justify-content-center align-items-center flex-row">
                        <MdThumbUp size="70" color='#000' />
                        <h1 className="">Digite seu ano de nascimento na caixa
                lá em baixo para mostrar qual foi o astro que teve nesse dia</h1>
                    </Container>
                )}


                {this.state.carregando ? (
                    <Container className="h-100 d-flex justify-content-center align-items-center flex-column">
                        <Spinner color="dark" size="lg" />
                        <span>carregando...</span>
                    </Container>
                ) : (
                        <Container className="mt-3 mb-5">
                            <Row>
                                {this.state.meteoro.map((meteoro) => (
                                    <Col xs="12" md="3" lg="4" className="d-flex">
                                        <Card color="dark" className="text-white mb-3">

                                            <CardImg top width="100%" height="30%" src={meteoro.url}
                                                alt={meteoro.title} />

                                            <CardBody>
                                                <CardTitle className="h3 text-center" >{meteoro.title}</CardTitle>

                                                <CardSubtitle className="text-muted text-center">
                                                    {meteoro.date.split('-').reverse().join('/')}</CardSubtitle>

                                                <CardText className="text-justify">{meteoro.explanation}</CardText>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    )}




                {/* { this.state.carregando &&(
                    <Container className="h-100 d-flex justify-content-center align-items-center flex-column">
                        <Spinner color="dark" size="lg"/>
                        <span>carregando...</span> 
                    </Container>
                    )} */}

            </>
        )
    }
}

export default Home;