import mercadopago, { Preference ,  Payment} from "mercadopago";
import { Request, Response } from 'express';
import mpFunctions from "../../lib/mercadopagoExtends";
import { PaymentDataModel } from "../../lib/mercadopagoExtends/functions/createPreference";


const env = process.env; //eslint-disable-line 
const mpClient = new mercadopago({accessToken: env.MP_ACCESS_TOKEN_TEST || ''});
const payment = new Payment(mpClient);
const preference = new Preference(mpClient);


const createSubscription = async (req:Request,res:Response) => {
  const { payer_email, back_url, reason, auto_recurring } = req.body;
  //@ts-ignore
  const subscription = await mpClient.subscriptions.create({
    payer_email,
    back_url,
    reason,
    auto_recurring
  });

  res.status(201).json(subscription);
}

async function getAllSubscriptions() {
  //@ts-ignore
  const subscriptions = await mercadopago.subscriptions.all();
  return subscriptions;
}

const findPayment = async (req:Request,res:Response) =>{ //eslint-disable-line 
 
}

const getPaymentStatus = async (req:Request,res:Response) =>{ //eslint-disable-line 
 
}

const handleNotification = async (req:Request,res:Response) =>{ //eslint-disable-line 
  
}

const createPayment = async (req:Request<PaymentDataModel>,res:Response) =>{
  const { userId, plan, planId, subscriptionId, amount } = req.params;
  const newPreference  = mpFunctions.generatePreference({userId:userId, plan:plan ,planId:planId, subscriptionId:subscriptionId, amount:amount});
  const order = await preference.create({body:newPreference});

  res.json(order);
}


export { createPayment, findPayment, getPaymentStatus, handleNotification, createSubscription}