interface MercadoPagoPreference {
  id?: string; // ID de la preferencia en MercadoPago (opcional)
  items: MercadoPagoItem[]; // Lista de artículos incluidos en la preferencia
  payer?: MercadoPagoPayer; // Detalles del pagador (opcional)
  payment_methods?: MercadoPagoPaymentMethods; // Métodos de pago permitidos (opcional)
  notification_url?: string; // URL a la que MercadoPago enviará notificaciones sobre la preferencia (opcional)
  auto_return?: string; // Configuración de auto-redirección (opcional)
  expires?: boolean; // Indica si la preferencia expira (opcional)
  expiration_date_from?: Date; // Fecha de inicio de la vigencia de la preferencia (opcional)
  expiration_date_to?: Date; // Fecha de fin de la vigencia de la preferencia (opcional)
  marketplace?: string; // ID del mercado (opcional)
  external_reference?: string; // Referencia externa (puede ser tu ID de orden en tu sistema) (opcional)
  client_id?: string; // ID del cliente (opcional)
  marketplace_fee?: number; // Tarifa de marketplace (opcional)
  application_fee?: number; // Tarifa de aplicación (opcional)
  metadata?: any; // Metadatos adicionales (opcional)
  additional_info?: string; // Información adicional opcional sobre la preferenci

  // Otros campos opcionales según la documentación de MercadoPago
}

interface MercadoPagoItem {
  id: string; // ID del artículo
  title: string; // Título del artículo
  description?: string; // Descripción del artículo (opcional)
  quantity: number; // Cantidad del artículo
  currency_id: string; // ID de la moneda utilizada para el artículo (p. ej., "ARS", "USD")
  unit_price: number; // Precio unitario del artículo
  // Otros campos opcionales según la documentación de MercadoPago
}

interface MercadoPagoPayer {
  name: string; // Nombre del pagador
  surname: string; // Apellido del pagador
  email: string; // Correo electrónico del pagador
  phone?: string; // Teléfono del pagador (opcional)

  // Otros campos opcionales según la documentación de MercadoPago
}

interface MercadoPagoPaymentMethods {
  excluded_payment_methods?: string[]; // Métodos de pago excluidos (opcional)
  excluded_payment_types?: string[]; // Tipos de pago excluidos (opcional)
  default_payment_method_id?: string; // Método de pago predeterminado (opcional)
  installments?: number; // Cantidad de cuotas (opcional)
  default_installments?: number; // Cantidad de cuotas predeterminada (opcional)
  // Otros campos opcionales según la documentación de MercadoPago
}

// Interfaces para otros campos opcionales...

