// import Swal from 'sweetalert2'
window.addEventListener('load', () => {
  const buttonsDelete = document.querySelectorAll('.card__delete')

  buttonsDelete.forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault()
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          const form = e.target.parentElement
          setTimeout(() => {
            form.submit()
          }, 1000)
        }
      })
    })
  })
})
