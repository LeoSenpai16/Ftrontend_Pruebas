import { test, expect } from '@playwright/test';

/**
 En este escenario  iniciaremos sesion en la pagina de zegucom y buscamos en el navegador laptops que tengan la especificion que tenga un Intel Core I7 y lo agrega el carrito
 */
test('Escenario 1', async ({ page }) => {
  // Navegar a la pagina de zegucom y espera a que carge la pagina 
  await page.goto('https://www.zegucom.com.mx');
  await page.waitForLoadState('load');
  /**
   Parte de inicio de sesion
  */
  // Localiza el usuario  y da click y espera unos segundos 
  const usuaruioLink = page.locator('a#dd_acount_wos');
  await usuaruioLink.click();
  await page.waitForLoadState('load');
  //dar clik en el login
  await page.locator('a[href="/site/login"]').first().click();
  await page.waitForLoadState('load');
  // Seleccionar el campo de usurname
  const loginUsername = page.locator('#loginform-username');
  // Verificar que el campo de username esté visible
  await expect(loginUsername).toBeVisible();
  // Introducir el correo electrónico
  await loginUsername.fill('sijal82095@cashbn.com');
  await page.waitForTimeout(3000);
  // Seleccionar el campo de password por su selector
  const loginPassword = page.locator('#loginform-password'); // ID del campo de correo electrónico
  // Verificar que el campo de password esté visible
  await expect(loginPassword).toBeVisible();
  // Introducir la password
  await loginPassword.fill('123456789');
  await page.waitForTimeout(3000);
  //clic en el boton de entrar
  await page.waitForSelector('button.btn-login');
  await page.click('button.btn-login');
  await page.waitForLoadState('load');
  /**
    Termina el incio de sesion 
  */  

  await page.pause(); 
  // Localizar el campo de búsqueda por el atributo "name"
  const searchInput = page.locator('input.input-search-autocomplete.search');
  await page.click('input.input-search-autocomplete.search');
  // Rellenar el campo de búsqueda con el valor 'laptop'
  const searchText = 'laptop';
  await searchInput.fill(searchText);
  await searchInput.press('Enter');

  
  // Seleccionar el contenedor principal
  // Localizar los contenedores de los  productos
  const productContainers = page.locator('div.dfd-card.dfd-card-preset-product.dfd-card-type-productos');
  // Obtener la cantidad de contenedores encontrados para saber los productos existen 
  const count = await productContainers.count();
  console.log(`Cantidad de productos encontrados: ${count}`);
  //ciclo pasar por cada contenido
  for (let i = 0; i < count; i++) {
    //agarra el primer contenido
    const productLink = productContainers.nth(i).locator('div.dfd-card-title').first();
    // Esperar a que el enlace sea visible y clickeable
    await productLink.waitFor({ state: 'visible' });
    //agarra el texto del producto
    const productDescription = await productLink.textContent();
    console.log(`Descripción del producto: "${productDescription}"`); // Depura la descripción

    // Verificar si la descripción contiene "Intel Core I7" y cierra al encontrar el producto 
    if (productDescription && productDescription.toLowerCase().includes('intel core i7')) {
      //muestra en la consola el producto que tenga el Intel Core I7
      console.log(`Haciendo clic en el producto: ${productDescription}`);
      await productLink.click({ force: true });  // Forzar el clic si es necesario
      break; // Salir después de hacer clic en el primer producto encontrado
    } else {
      console.log(`Producto sin "Intel Core I7": ${productDescription}`);
    }
  }
  
  // Verificar que se haya cargado la página del producto
  await page.waitForLoadState('load');
  // Espera a que el botón esté disponible
  await page.waitForSelector('a#btn-car');
  // Encuentra el botón y haz clic en él
  await page.locator('a#btn-car').first().click();


  //hace click en el carrito de compra
  await page.waitForSelector('li#cart-count-items');
  // Encuentra el botón y haz clic en él
  await page.locator('li#cart-count-items').first().click();
  //await page.waitForTimeout(10000);

  // Esperar a que el botón "Siguiente" esté visible en la página
  await page.waitForSelector('a.beginCheckout');
  // Hacer clic en el botón "Siguiente"
  await page.locator('a.beginCheckout').click();

  //boton de siguiente para pagar 
  await page.waitForSelector('a.rounded.next-step-web.waves-effect.waves-light.btn.w-100:not([disabled])');
  await page.click('a.rounded.next-step-web.waves-effect.waves-light.btn.w-100');
  await page.waitForTimeout(3000);

});

/**
  En este escenario  iniciaremos sesion en la pagina de zegucom y buscamos en la parte de categorias sus consolas 
 */
test('Escenario 2', async ({ page }) => {
  // Navegar a la pagina de zegucom y espera a que carge la pagina 
  await page.goto('https://www.zegucom.com.mx');
  await page.waitForLoadState('load');

  /**
   Parte de inicio de sesion
  */
  // Localiza el usuario  y da click y espera unos segundos 
  const usuaruioLink = page.locator('a#dd_acount_wos');
  await usuaruioLink.click();
  await page.waitForLoadState('load');
  //dar clik en el login
  await page.locator('a[href="/site/login"]').first().click();
  await page.waitForLoadState('load');
  // Seleccionar el campo de usurname
  const loginUsername = page.locator('#loginform-username');
  // Verificar que el campo de username esté visible
  await expect(loginUsername).toBeVisible();
  // Introducir el correo electrónico
  await loginUsername.fill('sijal82095@cashbn.com');
  await page.waitForTimeout(3000);
  // Seleccionar el campo de password por su selector
  const loginPassword = page.locator('#loginform-password'); // ID del campo de correo electrónico
  // Verificar que el campo de password esté visible
  await expect(loginPassword).toBeVisible();
  // Introducir la password
  await loginPassword.fill('123456789');
  await page.waitForTimeout(3000);
  //clic en el boton de entrar
  await page.waitForSelector('button.btn-login');
  await page.click('button.btn-login');
  await page.waitForLoadState('load');
  await page.pause();
  /**
    Termina el incio de sesion 
  */  

  //hace clik encima del nav de categorias 
  await page.click('i.material-icons.right.white-text');
  // Paso 1: Localizar el menu de Videojuegos y Gadgets
  const videoJuegosLink = page.locator('a.pt-px-10.pb-px-10.white-text >> text="Videojuegos y Gadgets"');
  await videoJuegosLink.hover();
  console.log("Se pasó el puntero por encima de 'Categorías'.");
  // Paso 2: Localizar el submenu de consolas
  const consolaLink = page.locator('a.pt-px-10.pb-px-10.grey-text.text-darken-3 >> text="consolas"');
  await consolaLink.hover();
  console.log("Se pasó el puntero por encima de 'Consola'.");
  // Paso 3: Localizar el menu de Videojuegos y Gadgets
  const consolaLinkf = page.locator('a[href="/Subcategorias/consolas/CNLS/3"]').first();
  await consolaLinkf.hover();
  console.log("Se pasó el puntero por encima de 'Consolas'.");
  await consolaLinkf.click();
  await page.waitForLoadState('load');

  //localiza el primer producto de consolas
  page.locator('div.col.s12.hoverable.pt-2.pb-2.mb-1.rounded white');
  //localiza el boton para agregar en favoritos
  const favoritoslink = page.locator('a.btn-favorites.btn-float.red-text');
  await favoritoslink.click();
 
  //localiza el boton de cuenta 
  await page.waitForSelector('a.dropdown-trigger');
  await page.click('a.dropdown-trigger');
  await page.waitForLoadState('load');
  //localiza el boton de favoritos
  await page.waitForSelector('a[href="/Subcategorias/consolas/CNLS/3"]');
  await page.click('a[href="/clientes/control-panel-favorites"]');
  await page.waitForLoadState('load');


  //localiza el producto de favoritos
  // Seleccionar el enlace del producto basado en la clase y el atributo único `href`
  const productoLink = page.locator('a.img-favorite-product[href="/producto/dispositivos-de-juegos/consolas/consola-portatil-msi-claw-a1m-052us-core-ultra-5-135h-512gb-16gb-lpdd/Q0xBV0ExMDUy"]');
  // Hacer clic en el producto
  await productoLink.click();
  // Verificar que se haya cargado la página del producto
  await page.waitForLoadState('load');

  // Espera a que el botón esté disponible
  await page.waitForSelector('a#btn-car');
  // Encuentra el botón y haz clic en él
  await page.locator('a#btn-car').first().click();

  //hace click en el carrito de compra
  await page.waitForSelector('li#cart-count-items');
  // Encuentra el botón y haz clic en él
  await page.locator('li#cart-count-items').first().click();
  //await page.waitForTimeout(10000);

  // Esperar a que el botón "Siguiente" esté visible en la página
  await page.waitForSelector('a.beginCheckout');
  // Hacer clic en el botón "Siguiente"
  await page.locator('a.beginCheckout').click();

  //boton de siguiente para pagar 
  await page.waitForSelector('a.rounded.next-step-web.waves-effect.waves-light.btn.w-100:not([disabled])');
  await page.click('a.rounded.next-step-web.waves-effect.waves-light.btn.w-100');
  await page.waitForTimeout(3000);
 
});


/**
En este escenario armaras tu pc en Zegucom
*/
test('Escenario 3: Armar PC en Zegucom', async ({ page }) => {
  // Navega a la página principal
  await page.goto('https://www.zegucom.com.mx');
  await page.waitForLoadState('load');
  /**
   Parte de inicio de sesion
  */
  // Localiza el usuario  y da click y espera unos segundos 
  const usuaruioLink = page.locator('a#dd_acount_wos');
  await usuaruioLink.click();
  await page.waitForLoadState('load');
  //dar clik en el login
  await page.locator('a[href="/site/login"]').first().click();
  await page.waitForLoadState('load');
  // Seleccionar el campo de usurname
  const loginUsername = page.locator('#loginform-username');
  // Verificar que el campo de username esté visible
  await expect(loginUsername).toBeVisible();
  // Introducir el correo electrónico
  await loginUsername.fill('sijal82095@cashbn.com');
  await page.waitForTimeout(3000);
  // Seleccionar el campo de password por su selector
  const loginPassword = page.locator('#loginform-password'); // ID del campo de correo electrónico
  // Verificar que el campo de password esté visible
  await expect(loginPassword).toBeVisible();
  // Introducir la password
  await loginPassword.fill('123456789');
  await page.waitForTimeout(3000);
  //clic en el boton de entrar
  await page.waitForSelector('button.btn-login');
  await page.click('button.btn-login');
  await page.waitForLoadState('load');
  await page.pause();
  /**
    Termina el incio de sesion 
  */  

  // Dar clic en "Armar la PC"
  await page.locator('a[href="/history/assemblies"]').first().click();
  await page.waitForLoadState('load');

  //da click a ensamblar pc
  await page.locator('a.btn.indigo.darken-4').click();
  await page.waitForLoadState('load');

  // Espera a que los elementos del slider estén cargados
  await page.waitForSelector('.slick-track');
  // Obtén todos los botones "Seleccionar" dentro del slider
  const botonesSeleccionar = page.locator('.slick-track .select-asembly');
  const totalBotonesSeleccionar = await botonesSeleccionar.count();
  if (totalBotonesSeleccionar > 0) {
    // Selecciona un botón de forma aleatoria y haz clic
    const indiceAleatorio = Math.floor(Math.random() * totalBotonesSeleccionar);
    await botonesSeleccionar.nth(indiceAleatorio).click();
    console.log(`Clic en el botón "Seleccionar" número ${indiceAleatorio + 1}`);
  } else {
    console.log("No se encontraron botones para seleccionar componentes.");
    return; 
    // Salir del test si no hay botones disponibles
  }
  await page.waitForLoadState('load');

  // **Seleccionar productos alternativos para componentes agotados**
  let agotados = true;
  while (agotados) {
    // Buscar todos los productos agotados por su descripción
    const productosAgotados = page.locator('h6:has-text("Este producto se encuentra agotado en la sucursal")');
    const count = await productosAgotados.count();
    if (count === 0) {
      agotados = false; // No hay más productos agotados, salir del bucle
      break;
    }
    // Siempre trabajar con el primer producto agotado disponible
    for (let i = 0; i < count; i++) {
      const productoAgotado = productosAgotados.nth(0); // Seleccionar siempre el primero disponible
      const cambiarProductoButton = productoAgotado.locator('..').locator('button[data-estado="change-product"]');
      // Verificar que el botón "Cambiar producto" esté visible y hacer clic
      await expect(cambiarProductoButton).toBeVisible();
      await cambiarProductoButton.click();
      await page.waitForLoadState('load');
      // Seleccionar el primer producto alternativo
      const primerProductoAlternativo = page.locator('a.add-to-assembly').first();
      await expect(primerProductoAlternativo).toBeVisible();
      await primerProductoAlternativo.click();
      // Esperar a que el overlay se cierre
      await page.waitForTimeout(3000); // Ajustar según comportamiento
    }
    // Recalcular la lista de productos agotados después de procesar
    await page.waitForLoadState('load');
  }

  console.log("Todos los productos agotados han sido reemplazados.");

  //da click an armar tu pc
  await page.locator('span.lever').click();
  await page.waitForLoadState('load');

  //enviar el esamble al carrito
  await page.locator('a.z-depth-0.rounded.waves-effect.waves-light.zegublue.btn.w-100').click();
  await page.waitForLoadState('load');

  // Esperar a que el botón de OK
  await page.waitForSelector('button.swal2-confirm.swal2-styled');
  // Hacer clic en el botón "Ok"
  await page.locator('button.swal2-confirm.swal2-styled').click();

  // Esperar a que el botón "Siguiente" esté visible en la página
  await page.waitForSelector('a.beginCheckout');
  // Hacer clic en el botón "Siguiente"
  await page.locator('a.beginCheckout').click();

  //boton de siguiente para pagar 
  await page.waitForSelector('a.rounded.next-step-web.waves-effect.waves-light.btn.w-100:not([disabled])');
  await page.click('a.rounded.next-step-web.waves-effect.waves-light.btn.w-100');
  await page.waitForTimeout(3000);
 
});

    

/*
 Este escenario ira hacia los mejores marcas que tiene zegucom y busca un producto  y lo agregamos al carrito
 */
test('Escenario 4', async ({ page }) => {
  // Navega a la página donde está el slider
  await page.goto('https://www.zegucom.com.mx');
  await page.waitForLoadState('load');
  /**
   Parte de inicio de sesion
  */
  // Localiza el usuario  y da click y espera unos segundos 
  const usuaruioLink = page.locator('a#dd_acount_wos');
  await usuaruioLink.click();
  await page.waitForLoadState('load');
  //dar clik en el login
  await page.locator('a[href="/site/login"]').first().click();
  await page.waitForLoadState('load');
  // Seleccionar el campo de usurname
  const loginUsername = page.locator('#loginform-username');
  // Verificar que el campo de username esté visible
  await expect(loginUsername).toBeVisible();
  // Introducir el correo electrónico
  await loginUsername.fill('sijal82095@cashbn.com');
  await page.waitForTimeout(3000);
  // Seleccionar el campo de password por su selector
  const loginPassword = page.locator('#loginform-password'); // ID del campo de correo electrónico
  // Verificar que el campo de password esté visible
  await expect(loginPassword).toBeVisible();
  // Introducir la password
  await loginPassword.fill('123456789');
  await page.waitForTimeout(3000);
  //clic en el boton de entrar
  await page.waitForSelector('button.btn-login');
  await page.click('button.btn-login');
  await page.waitForLoadState('load');
  //pausa 
  await page.pause();
  /**
    Termina el incio de sesion 
  */
  
  // Localiza en las mejores marcas el enlace y la selecciona
  const lenovoLink = page.locator('a#slick-slide113');
  await lenovoLink.click();

  // Selecciona un div con la clase "transparent"
  const transparentDivs = await page.locator('div.transparent');
  // Obtiene todos los enlaces de productos dentro de esos divs
  const productLinks = await transparentDivs.locator('a.selectItem');
  // Escoge un enlace aleatorio
  const randomIndex = Math.floor(Math.random() * await productLinks.count());
  const randomProductLink = productLinks.nth(randomIndex);
  // Haz clic en el enlace del producto seleccionado
  await randomProductLink.click();
  await page.waitForLoadState('load');

  // Verificar que se haya cargado la página del producto
  await page.waitForLoadState('load');

  // Espera a que el botón esté disponible
  await page.waitForSelector('a#btn-car');
  // Encuentra el botón y haz clic en él
  await page.locator('a#btn-car').first().click();

  //hace click en el carrito de compra
  await page.waitForSelector('li#cart-count-items');
  // Encuentra el botón y haz clic en él
  await page.locator('li#cart-count-items').first().click();
  //await page.waitForTimeout(10000);

  // Esperar a que el botón "Siguiente" esté visible en la página
  await page.waitForSelector('a.beginCheckout');
  // Hacer clic en el botón "Siguiente"
  await page.locator('a.beginCheckout').click();

  //boton de siguiente para pagar 
  await page.waitForSelector('a.rounded.next-step-web.waves-effect.waves-light.btn.w-100:not([disabled])');
  await page.click('a.rounded.next-step-web.waves-effect.waves-light.btn.w-100');
  await page.waitForTimeout(3000);
});

/**
Agregamos un  producto de la marca de logitech y borraremos todos los productos menos el seleccionado  anteriormente y compramos el producto 
*/
test('Escenario 5', async ({ page }) => {
  // Navegar a la pagina de zegucom y espera a que carge la pagina 
  await page.goto('https://www.zegucom.com.mx');
  await page.waitForLoadState('load');

  /**
   Parte de inicio de sesion
  */
  // Localiza el usuario  y da click y espera unos segundos 
  const usuaruioLink = page.locator('a#dd_acount_wos');
  await usuaruioLink.click();
  await page.waitForLoadState('load');
  //dar clik en el login
  await page.locator('a[href="/site/login"]').first().click();
  await page.waitForLoadState('load');
  // Seleccionar el campo de usurname
  const loginUsername = page.locator('#loginform-username');
  // Verificar que el campo de username esté visible
  await expect(loginUsername).toBeVisible();
  // Introducir el correo electrónico
  await loginUsername.fill('sijal82095@cashbn.com');
  await page.waitForTimeout(3000);
  // Seleccionar el campo de password por su selector
  const loginPassword = page.locator('#loginform-password'); // ID del campo de correo electrónico
  // Verificar que el campo de password esté visible
  await expect(loginPassword).toBeVisible();
  // Introducir la password
  await loginPassword.fill('123456789');
  await page.waitForTimeout(3000);
  //clic en el boton de entrar
  await page.waitForSelector('button.btn-login');
  await page.click('button.btn-login');
  await page.waitForLoadState('load');
  await page.pause(); 
  /**
    Termina el incio de sesion 
  */  

  // Localizar el campo de búsqueda por el atributo "name"
  const searchInput = page.locator('input.input-search-autocomplete.search');
  await page.click('input.input-search-autocomplete.search');
  // Rellenar el campo de búsqueda con el valor 'logitech'
  const searchText = 'logitech';
  await searchInput.fill(searchText);
  await searchInput.press('Enter');


  // Localizar los contenedores de los productos
  const productContainers = page.locator('div.dfd-card.dfd-card-preset-product.dfd-card-type-productos');
  // Obtener la cantidad de contenedores encontrados para saber si los productos existen
  const count = await productContainers.count();
  console.log(`Cantidad de productos encontrados: ${count}`);
  // Ciclo para pasar por cada contenedor
  for (let i = 0; i < count; i++) {
    // Agarra el primer contenido
    const productLink = productContainers.nth(i).locator('div.dfd-card-title').first();

    // Esperar a que el enlace sea visible y clickeable
    await productLink.waitFor({ state: 'visible' });

    // Agarra el texto del producto
    const productDescription = await productLink.getAttribute('title'); // Cambiado a 'title' para una comparación exacta
    console.log(`Descripción del producto: "${productDescription}"`); // Depura la descripción

    // Verificar si la descripción coincide exactamente con el producto deseado
    if (productDescription === 'Logitech Audifonos Gamer G733 7.1, Ps4/pc, Inalambrico, Usb, Azul') {
      // Muestra en la consola el producto que cumple con la descripción
      console.log(`Haciendo clic en el producto: ${productDescription}`);
      await productLink.click({ force: true }); // Forzar el clic si es necesario
      break; // Salir después de hacer clic en el producto encontrado
    } else {
      console.log(`Producto no coincide: ${productDescription}`);
    }
  }
    await page.waitForLoadState('load');

    // Espera a que el botón esté disponible
    await page.waitForSelector('a#btn-car');
    // Encuentra el botón y haz clic en él
    await page.locator('a#btn-car').first().click();
    await page.waitForLoadState('load');

    //hace click en el carrito de compra
    await page.waitForSelector('li#cart-count-items');
    // Encuentra el botón y haz clic en él
    await page.locator('li#cart-count-items').first().click();
    await page.waitForLoadState('load');
    await page.waitForTimeout(8000);

  // Descripción del producto que queremos conservar
  const productToKeep = "Logitech Audifonos Gamer G733 7.1, Ps4/pc, Inalambrico, Usb, Azul";
  // Localizar las tarjetas de las sucursales
  const sucursalCards = page.locator('.card-sucursal');
  // Obtener la cantidad de sucursales
  const sucursalCount = await sucursalCards.count();
  console.log(`Cantidad de sucursales encontradas: ${sucursalCount}`);
  // Iterar por cada sucursal
  for (let i = 0; i < sucursalCount; i++) {
      const sucursal = sucursalCards.nth(i);
      // Localizar los productos dentro de la sucursal
      const products = sucursal.locator('.collection-item');
      let productCount = await products.count();
      console.log(`Sucursal ${i + 1}: ${productCount} productos encontrados.`);

      // Iterar de forma inversa para evitar que los índices cambien después de eliminar un producto
      for (let j = productCount - 1; j >= 0; j--) {
          const product = products.nth(j);
          // Obtener la descripción del producto
          const productDescription = await product.getAttribute('data-descripcion');
          console.log(`Producto encontrado: "${productDescription}"`);
          // Verificar si la descripción coincide con el producto que queremos conservar
          if (productDescription !== productToKeep) {
              console.log(`Eliminando producto: "${productDescription}"`);
              // Localizar y hacer clic en el botón de eliminar
              const deleteButton = product.locator('.remove-cart-item');
              await deleteButton.click();
              // Esperar a que aparezca el modal de confirmación
              await page.waitForSelector('.swal2-popup', { state: 'visible' });
              console.log("Confirmación de SweetAlert2 detectada.");
              // Hacer clic en el botón "Aceptar" del modal
              const confirmButton = page.locator('.swal2-confirm');
              await confirmButton.click();
              // Opcional: Esperar un tiempo para que el producto sea eliminado del DOM
              await page.waitForTimeout(2000); 
          } else {
              console.log(`Conservando producto: "${productDescription}"`);
          }
    }
  }

  // Esperar a que el botón "Siguiente" esté visible en la página
  await page.waitForSelector('a.beginCheckout');
  // Hacer clic en el botón "Siguiente"
  await page.locator('a.beginCheckout').click();

  //boton de siguiente para pagar 
  await page.waitForSelector('a.rounded.next-step-web.waves-effect.waves-light.btn.w-100:not([disabled])');
  await page.click('a.rounded.next-step-web.waves-effect.waves-light.btn.w-100');
  await page.waitForTimeout(3000);

});