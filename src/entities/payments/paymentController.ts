import mercadopago, { Preference } from "mercadopago";
import Payment from "./paymentModel.js";
import express, { Request, Response } from 'express';

const env = process.env; //eslint-disable-line 

mercadopago.configure({
  access_token: env.MP_ACCESS_TOKEN_TEST
});

const createPayment = async (req:Request,res:Response) =>{
  const {userid, plan, planid, amount } = req.params;

  const preference = {
    back_urls:{ 
      success: env.MP_SUCCESS
    },
    items: [{id:planid,currency_id: 'ARS',title:plan,unit_price:amount}],
    metadata: {
      user_id: userid,
    },
    notificationUrl: env.NOTIFICATION_URL
  }

  const order = await mercadopago.preference.create(preference);

  const payment_ = {
    mercadoPagoOrderId:order.id,
    paymentDate:order.created,
    payAmount:order.amount
  }

  const payment = await Payment.create(payment_);

  res.json(payment);
  
}

const findPayment = async (req:Request,res:Response) =>{ //eslint-disable-line 
 
}

const getPaymentStatus = async (req:Request,res:Response) =>{//eslint-disable-line 
 
}

const handleNotification = async (req:Request,res:Response) =>{//eslint-disable-line 
 
}


export { createPayment, findPayment, getPaymentStatus, handleNotification}