
document.getElementById('save-design').addEventListener('click', function() {
    alert('Diseño guardado (Funcionalidad de guardado no implementada)');
});


document.querySelector('.select-file-btn').addEventListener('click', function() {
    document.getElementById('file-upload-input').click();
});

document.getElementById('file-upload-input').addEventListener('change', function() {
    // Aquí puedes añadir código para manejar el archivo seleccionado.

    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        var img = document.getElementById('logo');
        img.src = e.target.result;
        img.style.display = 'block';
        makeDraggable(img); // Hacer la imagen arrastrable
    };

    reader.readAsDataURL(file);
});


document.addEventListener('DOMContentLoaded', function() {
    const logos = document.querySelectorAll('#logo-header .logo-image');
    const mainImageContainer = document.getElementById('image-container');
    const imageContainer = document.getElementById('image-container2');
    const colorPicker = document.getElementById('background-color-picker');

    colorPicker.value = '#ffffff';
    loadSvg('https://firebasestorage.googleapis.com/v0/b/cisco-shirts.appspot.com/o/Isolated_black_t-shirt_front.svg?alt=media&token=c3532aa8-fa91-47bc-9a8a-eec873c1a4b9', 'image-container');
    loadSvg('https://firebasestorage.googleapis.com/v0/b/cisco-shirts.appspot.com/o/shirt2.svg?alt=media&token=e0788f9b-d5de-4c0d-8d74-a48059fde006', 'image-container2');
    // Función para cambiar la imagen del contenedor y actualizar la clase seleccionada.
    function changeImage(event) {
        // Reinicia el color picker a blanco (o cualquier color por defecto)
        colorPicker.value = '#ffffff';

        // Actualiza la clase 'selected' para el logo clickeado.
        logos.forEach(logo => logo.classList.remove('selected'));
        event.target.classList.add('selected');

        // Cambia el contenido SVG en función del logo clickeado.
        if(event.target.id === 'camisa') {
            loadSvg('https://firebasestorage.googleapis.com/v0/b/cisco-shirts.appspot.com/o/Isolated_black_t-shirt_front.svg?alt=media&token=c3532aa8-fa91-47bc-9a8a-eec873c1a4b9', 'image-container');
            loadSvg('https://firebasestorage.googleapis.com/v0/b/cisco-shirts.appspot.com/o/shirt2.svg?alt=media&token=e0788f9b-d5de-4c0d-8d74-a48059fde006', 'image-container2');
        } else if(event.target.id === 'gorra') {
            loadSvg('https://firebasestorage.googleapis.com/v0/b/cisco-shirts.appspot.com/o/cap%20(1).svg?alt=media&token=91be93f2-2ff9-4baf-9f9f-8e13c9e7ff1a', 'image-container');
            loadSvg('https://firebasestorage.googleapis.com/v0/b/cisco-shirts.appspot.com/o/cap2.svg?alt=media&token=a0b74d0c-9f93-445a-8def-cf65fc2ac9f4', 'image-container2');
        }
    }

    function loadSvg(fileName, containerId) {
        document.getElementById(containerId).innerHTML = '';
        fetch(fileName)
            .then(response => response.text())
            .then(svgData => {
                document.getElementById(containerId).innerHTML = svgData;
                setColor('#ffffff')
            })
            .catch(error => console.error('Error al cargar el SVG:', error));
    }

    // Añade el evento click a cada imagen de logo.
    logos.forEach(logo => {
        logo.addEventListener('click', changeImage);
    });

    // Cambia el color de un elemento específico dentro del SVG.
    colorPicker.addEventListener('input', function() {
        setColor(this.value)
    });

    function setColor(colorValue) {
        const svgElement = imageContainer.querySelector('svg');
        if(svgElement) {
            const opacity = 0.4;
            const rgbaColor = hexToRGBA(colorValue, opacity);
            const paths = document.querySelectorAll('svg path');
            paths.forEach(path => {
                path.style.fill = rgbaColor;
            });
        }
    }

    function hexToRGBA(hex, opacity) {
        let r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);

        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
});


function makeDraggable(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // Obtener la posición del cursor al inicio
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // Calcular la nueva posición del cursor
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // Establecer la nueva posición del elemento
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // Detener el movimiento cuando se suelta el botón del mouse
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
