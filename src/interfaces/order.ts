interface MercadoPagoOrder {
  id: string; // ID de la orden en MercadoPago
  external_reference: string; // Referencia externa (puede ser tu ID de orden en tu sistema)
  status: string; // Estado actual de la orden (p. ej., "pending", "approved", "rejected")
  status_detail: string; // Detalles adicionales sobre el estado de la orden
  date_created: string; // Fecha de creación de la orden
  last_updated: string; // Última fecha de actualización de la orden
  total_amount: number; // Monto total de la orden
  currency_id: string; // ID de la moneda utilizada en la orden (p. ej., "ARS", "USD")
  items: MercadoPagoOrderItem[]; // Detalles de los artículos incluidos en la orden
  payer: MercadoPagoPayer; // Detalles del pagador
  notification_url: string; // URL a la que MercadoPago enviará notificaciones sobre la orden
  additional_info?: string; // Información adicional opcional sobre la orden
}

interface MercadoPagoOrderItem {
  id: string; // ID del artículo
  title: string; // Título del artículo
  description: string; // Descripción del artículo
  quantity: number; // Cantidad del artículo
  unit_price: number; // Precio unitario del artículo
  currency_id: string; // ID de la moneda utilizada para el artículo
}

interface MercadoPagoPayer {
  id: string; // ID del pagador
  email: string; // Correo electrónico del pagador
  nickname: string; // Nombre de usuario del pagador
  first_name: string; // Nombre del pagador
  last_name: string; // Apellido del pagador
}
