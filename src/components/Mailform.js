import React, {Component} from 'react';
import EmailJS from 'emailjs-com';
import config from "../config";

// RFC 5322 Official Standard Email Regex (https://www.emailregex.com/)
const EmailRegex = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])";

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
        let {error_name, error_email, error_subject, error_message} = this.state;
        if(!error_name && !error_email && !error_subject && !error_message) {
            EmailJS.send('service_vxcdbsc', 'template_kz463fl', this.state, "user_KaOMyDwoQJOwzEfgseRH7")
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                }, (err) => {
                    console.log('FAILED...', err);
                });
        }
    };

    validateForm(){
        let { name, email, subject, message} = this.state;
        if(name.length === 0) this.setState({error_name: true});
        if(subject.length === 0) this.setState({error_subject: true});
        if(message.length === 0) this.setState({error_message: true});
        if(!email.match(EmailRegex)) this.setState({error_email: true})
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
                            If for any reason want so shoot me message use the form directly or the email adress below.
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