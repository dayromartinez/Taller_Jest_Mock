import * as app from "./app.js";
import * as math from "./math.js";

//Sumulación de funciones a través de mock
//math.add = jest.fn();
//math.subtract = jest.fn();

//Simulación de módulos a través de mock, en el que ya trae incorporados todas sus funciones
// Set all module functions to jest.fn
//jest.mock("./math.js");

// test("calls math.add", () => {
//     app.doAdd(1, 2);
//     expect(math.add).toHaveBeenCalledWith(1, 2);
// });

//También podemos supervisar el llamado de una función, pero manteniendo la implementación original. 
//En otras ocasiones, es posible que desee simular la implementación, pero restaurar el original más adelante.

//Aquí simplemente "espíamos" las llamadas a la función de math, pero dejamos la implementación original en su lugar:
// test("calls math.add", () => {
//     const addMock = jest.spyOn(math, "add");
//     // calls the original implementation
//     expect(app.doAdd(1, 2)).toEqual(3);
//     // and the spy stores the calls to add
//     expect(addMock).toHaveBeenCalledWith(1, 2);
// });

//En otros casos podemos simular la función para mockear su funcionamiento, 
//pero restaurar la implementación original en algún momento.
test("calls math.add", () => {
    const addMock = jest.spyOn(math, "add");
    // override the implementation
    addMock.mockImplementation(() => "mock");
    expect(app.doAdd(1, 2)).toEqual("mock");
    // restore the original implementation
    addMock.mockRestore();
    expect(app.doAdd(1, 2)).toEqual(3);
});

//En este test se realiza una dinámica similar al test anterior
//Guardando la implementación original, para luego espiar a dicha función 
//Y modificar su implementación, para finalmente volver a su implementación original
test("calls math.add", () => {
    // store the original implementation
    const originalAdd = math.add;
    // mock add with the original implementation
    math.add = jest.fn(originalAdd);
    // spy the calls to add
    expect(app.doAdd(1, 2)).toEqual(3);
    expect(math.add).toHaveBeenCalledWith(1, 2);
    // override the implementation
    math.add.mockImplementation(() => "mock");
    expect(app.doAdd(1, 2)).toEqual("mock");
    expect(math.add).toHaveBeenCalledWith(1, 2);
    // restore the original implementation
    math.add = originalAdd;
    expect(app.doAdd(1, 2)).toEqual(3);
});

// test("calls math.subtract", () => {
//     app.doSubtract(1, 2);
//     expect(math.subtract).toHaveBeenCalledWith(1, 2);
// });