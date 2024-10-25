[![Vercel Production Deployment](https://github.com/gustipardo/distro-pinto/actions/workflows/production.yml/badge.svg)](https://github.com/gustipardo/distro-pinto/actions/workflows/production.yml)
# Distribuidora Pinto
##  Analisis de la empresa

### **Actores:**

**1 (Hermana) Encargado de pagos a proveedores.**

**2 (2 empleados) Repartidor de pedidos.**

**2 (Hermana y padre) Levanta pedido.**

**1 (Gusti) El que hace el balance del negocio.**

**1 (Gusti o hermana) Factura los pedidos**

**1 (Todos) Prepara los pedidos de los clientes**

### **Descripción de la empresa:**

Una distribuidora de alimentos secos. La línea de proceso de venta hasta entrega consta de que al comienzo de la mañana dos personas recorren diferentes zonas y levantan pedidos de kioscos y supermercados de barrio. Anotan en listas escritas a mano los productos y sus respectivas cantidades. Una vez terminado el recorrido llegan al depósito donde se preparan los pedidos de los clientes, luego se facturan y se empacan en cajas de cartón. Una vez terminado el proceso de facturación se realiza una hoja de ruta de entrega de pedidos para que al día siguiente en la mañana otras dos personas se encarguen de entregar y si corresponde cobrar los pedidos de los clientes. Al terminar la entrega vuelven al depósito y se realiza el control respectivo de lo ingresado en el día teniendo en cuenta lo facturado y las cuentas pendientes que quedan por cobrar.

Hay días donde se debe re stockear por lo que antes de comenzar a facturar se realiza un pedido a un proveedor y se lo busca. Esto puede llegar a extender la línea de proceso al retrasar la facturación.

Se identifican los siguiente problemas:

- El encargado de llevar los pagos a los proveedores usualmente pide a los que entregan los pedidos que vayan informando sobre la marcha cuando dinero entró en un cierto tipo (por ejemplo en efectivo) para saber si llega al total de un pago que debe realizar.
- Las hojas de ruta están hechas en papel lo que provoca que si se quiere tener un registro accesible al balance del negocio se debe tomar el trabajo de digitalizar toda la información en un excel.
- El encargado de los pagos a los proveedores llega el registro de lo que debe pagar en un chat de whatsapp, de forma que no es accesible poder tenerlo como registro para realizar el balance de la empresa.

El sistema de solucionar estos problemas y remplazar a la digitalizacion manual de las hojas de ruta para poder liberar ese trabajo y tener un balance del negocio de forma automática.

A continuación se explicara como se hace esta digitalizacion:
Una vez llenada la hoja de ruta se la controla para confirmar que el efectivo que ingreso se refleje en la realidad, a esta hoja de ruta se el adjuntan las facturas que tienen una nota de credito por hacer, es decir que devolvieron algo de esta factura y por lo tanto su importe cambio. Y las facturas que quedan pendiente de pago se guardan en una carpeta de facturas pendientes de pago para ser agregadas a una nueva hoja de ruta cuando corresponda.

Luego se toma esta hoja de ruta y se crea una hoja en un excel con su dicha fecha, en una tabla se vuelcan los datos de Fecha, Cliente, Total y lo que pago, ya sea en efectivo, banco o mercado pago. En otra tabla se vuelcan los Egresos con su descripción. El excel calcula todos los totales y 

recupera el saldo del dia anterior, un saldo por cada metodo de pago, para sumarle los ingresos y los egresos dando una proyeccion de cuando dinero hay en cada billetera.

Ademas en la primera tabla hay una columna Nota de credito donde se puede agregar el monto que se ha devuelto, valor que se ingresa una vez hecha la nota de credito en el punto de venta, y otra columna facturado donde se ingresa el monto facturado con factura A una vez hecho la facturacion en el punto de venta, el importe puede variar ya que no todos los productos que se venden se facturan en blanco.

El sistema que se quiere desarrollar debe constar de dos pilares, uno el calculo automático del balance de las cuentas del negocio teniendo en cuenta todos los ingresos y todos los egresos, y segundo el seguimiento de facturas tanto de proveedores como de clientes pendientes de pago.

Crear una aplicación web que permita generar hoja de rutas digitales a fin de poder almacenar toda la información de forma digital y facilitar el balance de cuentas del negocio.

Ofrecer una interfaz donde se pueda hacer seguimiento de las facturas pendientes de clientes. Y ingresar pagos de clientes (ingresos del negocio)

### **Requerimientos:**

1 y 2 Registrar documentos comerciales provenientes de clientes y proveedores

1 y 2 Registrar pagos de documentos comerciales, puede ser mas de un pago por documento comercial.

1 y 2 Registrar otros movimientos de ingreso y egreso de dinero.

1 Crear una hoja de ruta de una fecha es especifico, contendrá un conjunto de facturas de clientes (No necesariamente de la misma fecha) y Egresos que si son de esa fecha.

1 A partir de la hoja de ruta completa y de los pagos hechos a proveedores en la fecha de la hoja de ruta, y de los Ingresos otros hechos en la fecha de la hoja de ruta poder armar un balance de dicha fecha.

2 Poder agregar notas de crédito a las facturas de los clientes

2 Consultar las facturas pendientes de los proveedores.

2 Consultar facturas de clientes con diferentes características, pagas, pendientes, de un cliente en especifico y poder operar sobre ellas.


### **Diagrama de clases:**

![image](https://github.com/user-attachments/assets/13013999-9659-4877-be14-b6236681e286)


### Hoja de ruta

La hoja de ruta sera un conjunto de facturas donde se podrán registrar sus respectivos pagos + un conjunto de egresos (generales). Donde la información que importara almacenar son los pagos (ingresos) hechos sobre las facturas en la fecha que coincide con la fecha de la hoja de ruta y los egresos generales que de por si siempre coinciden con la fecha de la hoja de ruta.

Esta hoja de ruta re cerrara con un boton para que la información

La hoja de ruta sera actualizable, esto quiere decir que si se quiere agregar un nuevo pago despues de un tiempo se podrá. Y actualizara el array de pagos que corresponde en esa fecha.

#### Interfaz:

![image](https://github.com/user-attachments/assets/db489f68-9749-47da-995e-3b0ab6cc11bd)


### Balance

El balance sera un pantallazo de información en una fecha en especifico acerca de los ingresos y egresos. 

Contendra una seccion de Ingresos con dos segmentos de ingresos por Clientes y ingresos por Generales. (el segmento de generales realmente no se ve mucho uso pero por la dudas se agrega).

La segunda sección de Egresos sera por Proveedores, los pagos a proveedores esos en esa fecha y generales, que seran los egresos generales de la hoja de ruta correspondiente a esa fecha.

Luego la siguiente seccion sera de Totales donde diferenciado por metodo de pago se mostraran los totales de las 4 segmentos anteriores, se calculara el balance de esa fecha (supando egresos y ingresos) y se obtendra el saldo anterior y se lo sumara al balance de esa fecha a fin de calcular el Saldo en Fecha.

El balance y actualizable es decir que si se realiza el balance de una fecha y luego se agrega un pago mas a la hoja de ruta de esa fecha se podra volver a crear el balance de esa fecha y por lo tanto el saldo de esa fecha se actualizara, provocando una ola de cambios hasta el saldo mas nuevo.

### Interfaz:
![image](https://github.com/user-attachments/assets/42bbcf48-f6d0-48aa-bb2a-cb2211ca484d)
![image](https://github.com/user-attachments/assets/dd5142c2-e1d8-4e1c-aeb1-8e234f8527ac)

## Aspectos Técnicos
### Tecnologías
Este proyecto es un monorepositorio donde contiene el Frontend en la carpeta /app hecho en React con componentes de ShadCn y lógica de tablas de TanStack Table. Por otra parte la API o Backend se encuentra de /api hecho en Express con arquitectura Model–View–Controller, con autenticación de usuarios en JWT, testing con SuperTest, bases de datos local en sqlite y en producción con Turso. Tanto Front como Back utilizan Zod para las validaciones.

El repositorio ha sido configurado con Github Actions las cuales verifican que al hacer un commit no se encuentren errores en la build o en los test del backend antes de permitir a Vercel que lleve a produccion el commit.
### Instalación
Clona el repositorio 
`git clone https://github.com/gustipardo/distro-pinto`

Entra a la carpeta clonada
`cd distro-pinto`

Instala las dependencias
`npm i`

Crea un archivo .env en la carpeta app y agrega la variable VITE_API_URL=http://localhost:1234 (localhost:1234 por defecto, es la url que se genera al levantar la api en local)
Crea otro archivo .env en la carpeta api y agrega la variable SECRET_JWT_KEY='una clave cualquiera' la clabe es secreta para cada uno,luego agrega SALT_ROUNDS = 10

Iniciar la Api y el Frontend.
`npm start:api-local`
`npm start:app`

Tambien esta preparado para recibir una base de datos de Turso mediante las variables de entorno de la carpeta api TURSO_DATABASE_URL y TURSO_AUTH_TOKEN
Luego de agregar estas variables con sus respectivos valores puedes iniciar la API y listo.
`npm start:api-turso`

## Estado del proyecto
Este proyecto se ha detenido debido al cierre de la empresa, el desarrollador tuve que haber apuntado a una solucion mas sencilla (MVP) para poder iterar en el desarrollo.

### Imagenes de la página
#### Login
![image](https://github.com/user-attachments/assets/d70fd918-9cf4-45bf-b710-0ca5d5d0d7e7)

#### Home
![image](https://github.com/user-attachments/assets/5f886f57-934a-4dae-9c62-f02a7ca40a73)

#### Agregar Facturas
https://github.com/user-attachments/assets/094f8d7f-0dc1-426e-bda5-68884a080e87

### Consultar Facturas
https://github.com/user-attachments/assets/70a822df-82cb-44b8-91d7-4a03ebf07141

### Consultar Facturas pendientes de proveedores
https://github.com/user-attachments/assets/b02b39a1-eb38-4813-8d24-6c9afbd6148b
Popup Historial de pagos de una factura:
![image](https://github.com/user-attachments/assets/5ad2823a-7cec-499f-b4c1-2a6748b99ce2)

### Mobile Friendly


