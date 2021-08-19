import React, { useState } from 'react'
import "./SendMail.css"
import CloseIcon from '@material-ui/icons/Close';
import { Button, List } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { closeSendMessage } from './features/mailSlice';
import { db } from './firebase';
import firebase from "firebase";
function SendMail() {
    const { register, handleSubmit, watch, errors } = useForm();
    const [FormDataInfo, setFormDataInfo] = useState([]);
    const onSubmit = (formData) => {
        const tim = {
            to: formData.to,
            subject: formData.subject,
            message: formData.message
        }
        setFormDataInfo(tim);
        //console.log(formData);
        if (tim.to != "" && tim.subject != "" && tim.message != "") {
            db.collection('email').add(
                {
                    to: tim.to,
                    subject: tim.subject,
                    message: tim.message,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                }
            );
            dispatch(closeSendMessage());
        }
    };

    const dispatch = useDispatch();

    return (
        <div className="sendMail">
            <div className="sendMail__header">
                <h3>New Message</h3>
                <CloseIcon
                    onClick={() => dispatch(closeSendMessage())}
                    className="sendMail__close"
                />

            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    name="to"
                    placeholder="To"
                    type="email"
                    {...register("to")}
                />
                {FormDataInfo.to === "" &&
                    (<p className="sendMail__error">This is required</p>)
                }
                <input
                    name="subject"
                    placeholder="Subject"
                    type="text"
                    {...register("subject")}
                />
                {FormDataInfo.subject === "" &&
                    (<p className="sendMail__error">Subject is required</p>)
                }
                <input
                    name="message"
                    placeholder="Message.."
                    type="text"
                    className="sendMail__message"
                    {...register("message")}
                />
                {FormDataInfo.message === "" &&
                    (<p className="sendMail__error">Message is required</p>)
                }

                <div className="sendMail__options">
                    <Button className="sendMail__send"
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Send
                    </Button>
                </div>
            </form>
        </div>
    )
}

//3:21

export default SendMail

