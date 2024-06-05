// Definición de variables de cantidad de productos
let cantProd = 0;
let cantAlf = 0;
let cantChe = 0;
let cantPos = 0;
let cantTor = 0;
let opc = 0;
let cantComp = 0;

// Función Vaciar

function vaciar() {
    carritoComp = []
}

const menu = [
    {opcion: 1, texto: "Comprar alfajores", textoCarroVacio: "", textoCarroProd: "", sePuedeComprar: true, productId: 1 },
    {opcion: 2, texto: "Comprar chesecake de limón", textoCarroVacio: "", textoCarroProd: "", sePuedeComprar: true, productId: 2 },
    {opcion: 3, texto: "Comprar  postre de 3 leches", textoCarroVacio: "", textoCarroProd: "", sePuedeComprar: true, productId: 3 },
    {opcion: 4, texto: "Comprar torta de chocolate", textoCarroVacio: "", textoCarroProd: "", sePuedeComprar: true, productId: 4 },
    {opcion: 5, texto: "Pagar", textoCarroVacio: "Usted no tiene productos para pagar", textoCarroProd: "" },
    {opcion: 6, texto: "Cancelar pedido", textoCarroVacio: "Usted no tiene productos para cancelar", textoCarroProd: "Su pedido ha sido cancelado exitosamente", sePuedeComprar: false},
    {opcion: 7, texto: "Salir", textoCarroVacio: "Gracias por visitarnos, vuelva pronto", textoCarroProd: "Para poder salir debe pagar o cancelar su pedido", sePuedeComprar: false },
]

let carritoComp = []

const productos = [ 
    {id:1 ,nombre: "alfajores", precioUnitario: 2 , moneda: "USD"},
    {id:2 ,nombre: "chesecake de limón", precioUnitario: 4 , moneda: "USD"},
    {id:3 ,nombre: "postre de 3 leches", precioUnitario: 6 , moneda: "USD"},
    {id:4 ,nombre: "torta de chocolate", precioUnitario: 9 , moneda: "USD"}
]

//  Función pagar

 const pago = function() {
    let totalApagar = 0;
    carritoComp.forEach(prod => {
        totalApagar = totalApagar + (prod.precioUnitario * prod.cantidad)
    });

    return totalApagar
}

const menuElement = document.getElementById("menu")

menu.forEach(menuEl => {
    const nuevoElemento = document.createElement('li');

    nuevoElemento.textContent = menuEl.texto;

    if(menuEl.sePuedeComprar){
        const precioElemento = document.createElement('strong');

        const producto = productos.find(prod => prod.id === menuEl.productId)

        precioElemento.textContent = " " + producto.precioUnitario + " " + producto.moneda;

        nuevoElemento.appendChild(precioElemento)
    }

    menuElement.appendChild(nuevoElemento);

})

// Menú de opciones

setTimeout(() => {
    do {
        opc = parseInt(prompt("ingrese la opción que desea")) // Usuario ingresa un valor
    
        const MenuItem = menu.find((menuOpcion) => { // Encontrar el objeto dependiendo del valor ingresado por el usuario
            return menuOpcion.opcion === opc
        }); 
    
        if(!MenuItem) alert("El código ingresado no es válido");
        else if(MenuItem.sePuedeComprar=== true){ //Objetos que se pueden comprar
            const producto = productos.find(prod => prod.id === MenuItem.productId)
            cantComp = parseInt(prompt("Ingrese la cantidad de " + producto.nombre + " que desea comprar"));
            while (Number.isNaN(cantComp)) {
                cantComp = parseInt(prompt("El valor ingresado no es correcto. Por favor ingrese una cantidad en número"));
            }
            
            producto["cantidad"] = cantComp;
            carritoComp.push(producto)
        } else { // Objetos que no son comprables
            if (carritoComp.length == 0){
                alert(MenuItem.textoCarroVacio);
                if(MenuItem.opcion !== 7)
                {
                    opc = 0;
                }
            } else {
               
                if (MenuItem.opcion == 5){
    
                    function mostrarProd(productos){
                       return console.log("El producto es:" + productos.nombre + " " + "y cuesta: " + productos.precioUnitario + productos.moneda +" "+ " Gracias por su compra");
                    }
                    carritoComp.forEach(mostrarProd);
    
                    alert("Su total a pagar fue: " + pago() +" USD")
                    vaciar();
    
                } else if(MenuItem.opcion == 6) {
                    alert(MenuItem.textoCarroProd);
                    vaciar();
                } else {
                    alert(MenuItem.textoCarroProd);
                    opc = 0;
                }
            }
        }
    } while (opc !== 7);
}, 1000);

