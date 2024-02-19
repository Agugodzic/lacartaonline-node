
PROCESO DE SUBSCRIPCION:

Cliente: El suscriptor realiza la solicitud de suscripción, a través del frontend. Esto puede implicar seleccionar un plan de suscripción específico, y completar cualquier otro dato necesario para la suscripción.

API / BASE DE DATOS: La solicitud de suscripción se envía desde el cliente al backend. En el backend, se procesa la solicitud y se interactúa con la API de Mercado Pago para crear la suscripción. La API de Mercado Pago devuelve una respuesta que indica si la suscripción se creó correctamente o si hubo algún error, de no haber error se registra la subscripcion en la tabla 'Subscripciones' en la base de datos.

Cliente: El frontend recibe la respuesta del backend y, en función de la misma, puede tomar diferentes acciones. Si la suscripción se creó correctamente, el frontend puede redirigir al suscriptor al proceso de pago, donde se completará el primer pago de la suscripción.

Proceso de Pago: El suscriptor completa el proceso de pago a través del checkout. Mercado Pago procesa el pago y devuelve una respuesta al frontend indicando si el pago fue exitoso o si ocurrió algún error mediante la SUCCESS_URL.

API: Mercado Pago envía una notificación (webhook) a tu API informando sobre el resultado del pago. Esta notificación puede contener detalles como el estado del pago (aprobado, rechazado, pendiente), el monto pagado, el ID de la suscripción asociada, entre otros. Se registra en la base de datos los pagos fallidos o exitosos.

Backend / Base de Datos: Tu backend procesa la notificación recibida de Mercado Pago y actualiza el estado del pago en tu base de datos. También puedes tomar acciones adicionales según el estado del pago, como enviar notificaciones por correo electrónico al suscriptor o actualizar la suscripción en tu sistema.