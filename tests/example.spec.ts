import { test, expect } from '@playwright/test';

/**
 En este escenario  iniciaremos sesion en la pagina de zegucom
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

  // Localizar el campo de búsqueda por el atributo "name"
  const searchInput = page.locator('input.input-search-autocomplete.search');
  await page.click('input.input-search-autocomplete.search');
  // Rellenar el campo de búsqueda con el valor 'laptop'
  const searchText = 'laptop';
  await searchInput.fill(searchText);
  await searchInput.press('Enter');

  await page.pause(); 

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


  // Verificar que el título de la alerta es el esperado
  const title = await page.locator('.swal2-title').textContent();
  if (title === "El Producto ha sido actualizado") {
    console.log("La alerta está mostrando el mensaje esperado");
  }
  // Hacer clic en el botón 'OK' para cerrar la alerta
  await page.locator('.swal2-confirm').click();
  // Verificar que la alerta ya no está visible
  await page.waitForSelector('.swal2-popup', { state: 'hidden' });

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
  Buscamos en el navegador laptops que tengan la especificion que tenga un Intel Core I7
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
 
  // Dar clic en "Armar la PC"
  await page.locator('a[href="/armar-pc-gamer"]').first().click();
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
  await page.waitForTimeout(8000);
});

    

/*
 Este escenario ira hacia los mejores marcas que tiene zegucom y busca un producto  y termina al 
 */
test('Escenario 5', async ({ page }) => {
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
  
  // Localiza el enlace 
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

  // Espera a que el botón esté disponible
  await page.waitForSelector('a#btn-car');
  // Encuentra el botón y haz clic en él
  await page.locator('a#btn-car').first().click();

  // Esperar a que la alerta se muestre
  //await page.waitForSelector('.swal2-popup.swal2-show');

  // Verificar que el título de la alerta es el esperado
  const title = await page.locator('.swal2-title').textContent();
  if (title === "El Producto ha sido actualizado") {
    console.log("La alerta está mostrando el mensaje esperado");
  }
  // Hacer clic en el botón 'OK' para cerrar la alerta
  await page.locator('.swal2-confirm').click();
  // Verificar que la alerta ya no está visible
  await page.waitForSelector('.swal2-popup', { state: 'hidden' });

  //hace click en el carrito de compra
  await page.waitForSelector('li#cart-count-items');
  // Encuentra el botón y haz clic en él
  await page.locator('li#cart-count-items').first().click();
  //await page.waitForTimeout(10000);

  // Esperar a que el botón "Siguiente" esté visible en la página
  await page.waitForSelector('a.beginCheckout');

  // Hacer clic en el botón "Siguiente"
  await page.locator('a.beginCheckout').click();

  // Esperar a que se cargue la siguiente página (por ejemplo, '/z-cart/delivery-method')
  await page.waitForURL('**/z-cart/delivery-method');

  // Esperar a que el campo de entrada esté disponible
  await page.waitForSelector('input.swal2-input.browser-default.input-cp');

  // Llenar el campo con el valor '20267'
  await page.fill('input.swal2-input.browser-default.input-cp', '20267');

  //clic en el boton de confirmar
  await page.waitForSelector('button.swal2-confirm');
  await page.click('button.swal2-confirm');
  await page.waitForTimeout(3000);

  //boton de siguiente para pagar 
  await page.waitForSelector('a.rounded');
  await page.click('a.rounded');
  await page.waitForTimeout(8000);
});
