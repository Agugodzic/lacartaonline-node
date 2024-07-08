export interface PaymentDataModel{
  userId:number,
  planId:number,
  plan:string,
  subscriptionId:number,
  amount:number,
}


const env = process.env; //eslint-disable-line 

export default function mpPreferenceGenerator(paymentData:PaymentDataModel){
  const preference = {
      back_urls:{ 
        success: env.MP_SUCCESS
      },
      items: [{id:paymentData.planId.toString(), currency_id:'ARS', title:paymentData.plan, unit_price:paymentData.amount, quantity:1}],
      metadata: {
        user_id: paymentData.userId,
      },
      notificationUrl: env.NOTIFICATION_URL
  }

  return preference;
}