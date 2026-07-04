// Agrega puntos y guión de forma dinámica
function formatearRUT(input) {
    let valor = input.value.replace(/[^0-9kK]/g, ''); // Deja solo números y K
    if (valor.length < 2) return;
    
    let cuerpo = valor.slice(0, -1);
    let dv = valor.slice(-1).toUpperCase();
    
    // Añadir puntos
    let cuerpoFormateado = cuerpo.toString().split('').reverse().join('')
        .replace(/(?=\d{3})+(?!\b)/g, '.')
        .split('').reverse().join('');
        
    input.value = cuerpoFormateado + '-' + dv;
}

// Valida matemáticamente el RUT antes de enviar el formulario
function validarFormulario() {
    const rutInput = document.getElementById('rut').value;
    const errorMsg = document.getElementById('error-msg');
    
    // Limpiar formato para la operación matemática
    let valor = rutInput.replace(/\./g, '').replace('-', '');
    let cuerpo = valor.slice(0, -1);
    let dv = valor.slice(-1).toUpperCase();
    
    if (cuerpo.length < 7) {
        errorMsg.innerText = "RUT inválido.";
        return false;
    }
    
    // Calcular Dígito Verificador (Módulo 11)
    let suma = 0;
    let multiplo = 2;
    
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += multiplo * parseInt(cuerpo.charAt(i));
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }
    
    let dvEsperado = 11 - (suma % 11);
    if (dvEsperado === 11) dvEsperado = '0';
    else if (dvEsperado === 10) dvEsperado = 'K';
    else dvEsperado = dvEsperado.toString();
    
    if (dv !== dvEsperado) {
        errorMsg.innerText = "El RUT ingresado no es válido.";
        return false;
    }
    
    errorMsg.innerText = "";
    return true; // Permite el envío del formulario
}
