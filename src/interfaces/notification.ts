interface MercadoPagoNotification {
  id: string; // ID de la notificación en MercadoPago
  topic: string; // Tema de la notificación (p. ej., "payment", "merchant_order")
  resource: {
    id: string; // ID del recurso relacionado (p. ej., ID del pago o ID de la orden del comerciante)
    date_created: string; // Fecha de creación del recurso
    // Otros campos específicos del recurso según el tema de la notificación
  };
  user_id: string; // ID del usuario en MercadoPago
  application_id: string; // ID de la aplicación en MercadoPago
  // Otros campos de metadatos de la notificación
}
