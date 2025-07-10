
const btnBuildMaze = document.getElementById('btn-build-maze');
const textarea = document.getElementById('load-cells');
const btnGetResult = document.getElementById('btn-get-result');
const uploadFileBtn = document.getElementById('upload-file-btn');
const fileInput = document.getElementById('file-input');

if (textarea) {
  textarea.addEventListener('input', () => {
    textarea.value = textarea.value.replace(/[^\d\s]/g, '');
  });
}

['size-x', 'size-y', 'load-cells'].forEach(id => {
  const input = document.getElementById(id);
  if (input) {
    const error = document.getElementById('error-'+id);

    input.addEventListener('input', (event) => {
      if (id !== 'load-cells') {
        input.value = input.value.replace(/\D/g, '');
      }

      if (input.value.trim()) {
        input.classList.remove('is-invalid');
        error.style.display = 'none';
      }
    });
  }
});

['init-cell', 'dest-cell'].forEach(id => {
  const input = document.getElementById(id);

  if (input) {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^\d\s]/g, '');
    });
  }
});

if (btnBuildMaze) {
  btnBuildMaze.addEventListener('click', (event) => {
    event.preventDefault();
    const sizeX = document.getElementById('size-x');
    const errorSizeX = document.getElementById('error-size-x');
    const sizeY = document.getElementById('size-y');
    const errorSizeY = document.getElementById('error-size-y');
    const loadCells = document.getElementById('load-cells');
    const errorLoadCells = document.getElementById('error-load-cells');
    const initCell = document.getElementById('init-cell');
    const errorInitCell = document.getElementById('error-init-cell');
    const destCell = document.getElementById('dest-cell');
    const errorDestCell = document.getElementById('error-dest-cell');
    let valid = true;

    if (!sizeX.value.trim()) {
      sizeX.classList.add('is-invalid');
      errorSizeX.textContent = 'X no puede estar vacío';
      errorSizeX.style.display = 'block';
      valid = false;
    } else if (sizeX.value > 10) {
      sizeX.classList.add('is-invalid');
      errorSizeX.textContent = 'X no puede ser mayor a 10';
      errorSizeX.style.display = 'block';
      valid = false;
    } else if (sizeX.value == 0) {
      sizeX.classList.add('is-invalid');
      errorSizeX.textContent = 'X no puede ser 0';
      errorSizeX.style.display = 'block';
      valid = false;
    } else {
      sizeX.classList.remove('is-invalid');
      errorSizeX.style.display = 'none';
    }

    if (!sizeY.value.trim()) {
      sizeY.classList.add('is-invalid');
      errorSizeY.textContent = 'Y no puede estar vacío';
      errorSizeY.style.display = 'block';
      valid = false;
    } else if (sizeY.value > 10) {
      sizeY.classList.add('is-invalid');
      errorSizeY.textContent = 'Y no puede ser mayor a 10';
      errorSizeY.style.display = 'block';
      valid = false;
    } else if (sizeY.value == 0) {
      sizeY.classList.add('is-invalid');
      errorSizeY.textContent = 'Y no puede ser 0';
      errorSizeY.style.display = 'block';
      valid = false;
    } else {
      sizeY.classList.remove('is-invalid');
      errorSizeY.style.display = 'none';
    }

    if (!loadCells.value.trim()) {
      loadCells.classList.add('is-invalid');
      errorLoadCells.textContent = 'La carga de números no puede estar vacía';
      errorLoadCells.style.display = 'block';
      valid = false;
    } else if (!sizeX.value.trim() || !sizeY.value.trim()) {
      loadCells.classList.add('is-invalid');
      errorLoadCells.textContent = 'Debes establecer las dimensiones primero';
      errorLoadCells.style.display = 'block';
      valid = false;
    } else {
      const x = parseInt(sizeX.value.trim(), 10);
      const y = parseInt(sizeY.value.trim(), 10);
      const rows = loadCells.value.trim().split('\n');

      if (x > 10 || x == 0 || y > 10 || y === 0) {
        loadCells.classList.add('is-invalid');
        errorLoadCells.textContent = `Las dimensiones no son correctas`;
        errorLoadCells.style.display = 'block';
        valid = false;
      } else if (rows.length !== x) {
        loadCells.classList.add('is-invalid');
        errorLoadCells.textContent = `La cantidad de filas debe ser ${x}`;
        errorLoadCells.style.display = 'block';
        valid = false;
      } else {
        let aux = true;

        rows.forEach((row, idx) => {
          const cols = row.trim().split(/\s+/);

          if (cols.length !== y) {
            aux = false;
            loadCells.classList.add('is-invalid');
            errorLoadCells.textContent = `La fila ${idx + 1} debe tener ${y} números`;
            errorLoadCells.style.display = 'block';
            valid = false;
          }
        });

        if (aux) {
          loadCells.classList.remove('is-invalid');
          errorLoadCells.style.display = 'none';
        }
      }
    }

    

    if (!initCell.value.trim()) {
      initCell.classList.add('is-invalid');
      errorInitCell.textContent = 'La celda inicial no puede estar vacía';
      errorInitCell.style.display = 'block';
      valid = false;
    } else {
      const parts = initCell.value.trim().split(/\s+/);

      if (parts.length !== 2 || isNaN(parts[0]) || isNaN(parts[1])) {
        initCell.classList.add('is-invalid');
        errorInitCell.textContent = 'Debe tener 2 números separados por espacio';
        errorInitCell.style.display = 'block';
        valid = false;
      } else {
        initCell.classList.remove('is-invalid');
        errorInitCell.style.display = 'none';
      }
    }

    if (!destCell.value.trim()) {
      destCell.classList.add('is-invalid');
      errorDestCell.textContent = 'La celda destino no puede estar vacía';
      errorDestCell.style.display = 'block';
      valid = false;
    } else {
      const parts = destCell.value.trim().split(/\s+/);

      if (parts.length !== 2 || isNaN(parts[0]) || isNaN(parts[1])) {
        destCell.classList.add('is-invalid');
        errorDestCell.textContent = 'Debe tener 2 números separados por espacio';
        errorDestCell.style.display = 'block';
        valid = false;
      } else {
        destCell.classList.remove('is-invalid');
        errorDestCell.style.display = 'none';
      }
    }

    if (valid) {
      console.log(loadCells.value)
      console.log(sizeX.value, sizeY.value)
      console.log(initCell.value, destCell.value)
      document.getElementById('maze-form').submit();
    }
  });
}

if (btnGetResult) {
  btnGetResult.addEventListener('click', (event) => {
    event.preventDefault();
    const test = document.getElementById('size_x');

    document.getElementById('maze-form-get-result').submit();
  });
}

if (uploadFileBtn && fileInput && textarea) {
  uploadFileBtn.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];

    if (!file) return;

    if (file.type && file.type !== 'text/plain') {
      alert('Por favor, selecciona un archivo de texto.');
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      textarea.value = e.target.result;
    };
    
    reader.readAsText(file);
  });
}