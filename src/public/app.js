$(function(){
   $('#getProducts').on('click', function(){
       $.ajax({
           url: '/products',
           success: function(products){
            let tbody = $('tbody');

            tbody.html('');
               products.forEach(product =>{
                  tbody.append(`
                        <tr data-id=${product.id}>
                            <td class="id">
                                ${product.id}
                            </td>
                            <td class="id">
                                <input type="text" class="name" value="${product.name}" />
                            </td>
                            <td class="id">
                                <button class="update-button">Update</button>
                                <button class="delete-button">Delete</button>
                            </td>
                        </tr>
                    `)
               });
           }
       });
   });

    $('#productForm').on('submit', function(e){
       e.preventDefault();

       let newProduct = $('#newProduct')

       $.ajax({
          url: '/products',
           method: 'POST',
           data: {
               name: newProduct.val()
           },
           success: function(response){
               $('#getProducts').click();
           }
       });
    });

    $('table').on('click', '.update-button', function(){
        let row = $(this).closest('tr');
        let id = parseInt(row[0].dataset.id);
        let name = row.find('.name').val();

        $.ajax({
           url: "/products",
            method: 'PUT',
            data:{
              id: id,
              name: name
            },
            success: function(response){
              console.log(response);
              $('#getProducts').click();
            }
        });
    });

    $('table').on('click', '.delete-button', function(){
        if(confirm('¿Está seguro de eliminar el producto?')){
          let row = $(this).closest('tr');
          let id = parseInt(row[0].dataset.id);
          let name = row.find('.name').val();

          $.ajax({
             url: "/products",
              method: 'DELETE',
              data:{
                id: id
              },
              success: function(response){
                $(`tr[data-id=${id}]`).remove()
                $('#getProducts').click();
                console.log(response);
              }
          });
        }
    });
});
