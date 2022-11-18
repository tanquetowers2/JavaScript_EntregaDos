const carrito = [];
let totalCarrito;
let contenedor = document.getElementById("misprods");




function renderizarProds(){
    for(const producto of productos){
        contenedor.innerHTML += `
            <div class="card col-sm-2">
                <img src=${producto.foto} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.id}</h5>
                    <p class="card-text">${producto.nombre}</p>
                    <p class="card-text">$ ${producto.precio}</p>
                    <button id="btn${producto.id}" class="btn btn-primary">Comprar</button>
                </div>
            </div>
        `;
    }

    //Eventos
    productos.forEach(producto => {
        //evento para cada boton
        document.getElementById(`btn${producto.id}`).addEventListener("click",function(){
            agregarAlCarrito(producto);
        });
    })


    
}

renderizarProds();


function agregarAlCarrito(productoComprado){
    carrito.push(productoComprado);
    console.table(carrito);

    //AGREGAR STORAGE 
    localStorage.setItem("carrito", JSON.stringify(carrito));

    Swal.fire({
        title: productoComprado.nombre,
        text: 'Agregado al carrito',
        imageUrl: productoComprado.foto,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: productoComprado.nombre,
        showConfirmButton: false,
        timer: 1500
      })    

    //alert("Producto: "+productoComprado.nombre+" agregado al carrito!");
    document.getElementById("tablabody").innerHTML += `
        <tr>
            <td>${productoComprado.id}</td>
            <td>${productoComprado.nombre}</td>
            <td>${productoComprado.precio}</td>
            <td><button class="btn btn-light" onclick="eliminar(event)">❌ Eliminar producto </button></td>
        </tr>
    `;
    totalCarrito = carrito.reduce((acumulador,producto)=> acumulador + producto.precio,0);
    let infoTotal = document.getElementById("total");
    infoTotal.innerText="Total a pagar $: "+totalCarrito;
    
}

//Sacar prod
function eliminar(ev){
    console.log(ev);
    let fila = ev.target.parentElement.parentElement;
    console.log(fila);
    let id = fila.children[0].innerText;
    console.log(id);
    let indice = carrito.findIndex(producto => producto.id == id);
    console.log(indice)
    //remueve el producto del carro
    carrito.splice(indice,1);
    console.table(carrito);
    //remueve la fila de la tabla
    fila.remove();
    //recalcular el total
    let preciosAcumulados = carrito.reduce((acumulador,producto)=>acumulador+producto.precio,0);
    total.innerText="Total a pagar $: "+preciosAcumulados;
    //storage
    localStorage.setItem("carrito",JSON.stringify(carrito));
}


//boton de finalizar
let finalizar=document.getElementById("finalizarcompra");
finalizar.onclick=()=>{
    if(carrito.length==0){
        Swal.fire({
            title: 'No hay productos en el carro',
            text: 'Seleccione uno',
            showConfirmButton: false,
            timer: 1500
            
        });

    }
    //Sweet
    Swal.fire({
        title: 'Pedido confirmado!',
        text: 'Tu paquete está en proceso de preparación',
        imageUrl: '/ELEMENTOS/sticker-ok-vector-19181225.jpg',
        imageWidth: 180,
        imageHeight: 180,
        imageAlt: 'imagen ok',
    });

    //Toastify cuando finaliza la compra
    Toastify({
        text: "Gracias por su compra!",
        duration: 3000,
        gravity: 'top',
        position: 'right',
        style: {
            background: 'linear-gradient(to right, #FF0000, #0000FF)'
        }
    }).showToast();
    
    //LUXON
    //  cerrar la compra
    const fin=DateTime.now();
    const Interval=luxon.Interval;
    const tiempo=Interval.fromDateTimes(inicio,fin);
    Toastify({
        text: "Tardaste "+tiempo.length('minutes')+" minutos en comprar!",
        duration: 3000,
    }).showToast();
}

