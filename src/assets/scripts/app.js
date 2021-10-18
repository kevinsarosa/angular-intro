function klikTombolConnect() {
  // gunanya menerima input dari user.
  const nama = prompt('Siapa namamu?');

  var tbody = document.getElementById('data-nama').getElementsByTagName('tbody')[0];

  var count =document.getElementById('data-nama').getElementsByTagName('tr').length;
  var row = document.createElement('tr')
  row.innerHTML= '<td>'+count+'</td><td>' + nama + '</td>'

  // gunanya menampilkan output.
  tbody.append(row)
  // alert('Halo ' + nama);
}

const button = document.getElementById('connect');
  
button.addEventListener('click', klikTombolConnect);

// click
// mouseover
// keyup
// press
// focus
// blur
