import React, {Component} from 'react';
import EmailJS from 'emailjs-com';
import config from "../config";

export default class Mailform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            subject: "",
            message: "",
            error_name: false,
            error_email: false,
            error_subject: false,
            error_message: false,
        }
    }

    handleInputChange = (e) => {
        e.preventDefault();
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value });
    };

    sendMail = () => {
        EmailJS.send('service_vxcdbsc','template_kz463fl', this.state, "user_KaOMyDwoQJOwzEfgseRH7")
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
            }, (err) => {
                console.log('FAILED...', err);
            });
    };

    validateForm(){
        let { name, email, subject, message} = this.state;
        if(name.length === 0) this.setState({error_name: true});
        if(subject.length === 0) this.setState({subject: true});
        if(message.length === 0) this.setState({message: true});
    }

    render() {
        let {name, email, subject, message} = this.state;
        return(
            <div className="container">
                <h1>Contact</h1>
                <div className="col-2">
                    <div className="form">
                        <div className="header">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={name}
                                onChange={this.handleInputChange}/>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={this.handleInputChange}/>
                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                value={subject}
                                onChange={this.handleInputChange}/>
                        </div>
                        <div className="message">
                            <textarea
                                name="message"
                                placeholder="Message"
                                value={message}
                                onChange={this.handleInputChange}/>
                        </div>
                    </div>
                    <div className="info">
                        <p className="info-text">
                            If you like my work or want to talk tech feel free to contact me.
                        </p>
                        <div>
                            <p className="title">Email: <a tabIndex={-1} href={"mailto:" + config.email}>{config.email}</a>
                            </p>
                        </div>
                    </div>
                </div>
                <input type="submit" value="SEND EMAIL" className="submit" onClick={this.sendMail}/>
            </div>
        )
    }
}