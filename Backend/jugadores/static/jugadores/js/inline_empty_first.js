document.addEventListener('DOMContentLoaded', function () {
    const inlineGroups = document.querySelectorAll('.inline-group');
  
    inlineGroups.forEach(group => {
      // Reordenar dinámicamente los formularios existentes (sin incluir empty-form)
      const allForms = Array.from(group.querySelectorAll('.inline-related'))
        .filter(form => !form.classList.contains('empty-form'));
  
      // Invertir el orden visual
      allForms.reverse().forEach((form, index) => {
        group.appendChild(form);
  
        // Convertir cada formulario en colapsable
        const header = document.createElement('div');
        header.classList.add('collapsable-header');
        header.innerText = `📊 Estadística`;
        const body = document.createElement('div');
        body.classList.add('collapsable-body');
  
        while (form.children.length > 0) {
          body.appendChild(form.firstChild);
        }
  
        form.classList.add('collapsable-block');
        form.appendChild(header);
        form.appendChild(body);
  
        header.addEventListener('click', () => {
          form.classList.toggle('active');
        });
      });
  
    });
  });