var selectedRow = null;

function onFormSubmit(){
    if(validate()){
        var formData = readFormData();
        if(selectedRow == null)
            insertNewRecord(formData)
        else
            updateRecord(formData)
        resetForm();
    }
}

function readFormData(){
    var formData = {};
    formData["namaBarang"] = document.getElementById("namaBarang").value;
    formData["jumlah"] = document.getElementById("jumlah").value;
    formData["harga"] = document.getElementById("harga").value;
    formData["diskon"] = document.getElementById("diskon").value;
    formData["total"] = document.getElementById("total").value;
    return formData
}

function insertNewRecord(data){
    var table = document.getElementById("goods-list").getElementsByTagName("tbody")[0];
    var newRow = table.insertRow(table.length);
    var price = data.jumlah * data.harga;
    var discount = price / 100 * data.diskon;
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.namaBarang;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.jumlah;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.harga
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.diskon;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = price - discount;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<button onClick = onEdit(this)>Edit</button>
    <button onClick = onDelete(this)>Hapus</button>`
}

function resetForm(){
    document.getElementById("namaBarang").value = "";
    document.getElementById("jumlah").value = "";
    document.getElementById("harga").value = "";
    document.getElementById("diskon").value = "";
    selectedRow = null;
}

function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById("namaBarang").value = selectedRow.cells[0].innerHTML;
    document.getElementById("jumlah").value = selectedRow.cells[1].innerHTML;
    document.getElementById("harga").value = selectedRow.cells[2].innerHTML;
    document.getElementById("diskon").value = selectedRow.cells[3].innerHTML;
    document.getElementById("total").value = selectedRow.cells[4].innerHTML;
}

function updateRecord(formData){
    selectedRow.cells[0].innerHTML = formData.namaBarang;
    selectedRow.cells[1].innerHTML = formData.jumlah;
    selectedRow.cells[2].innerHTML = formData.harga;
    selectedRow.cells[3].innerHTML = formData.diskon;
    selectedRow.cells[4].innerHTML = formData.total;
}

function onDelete(td){
    if(confirm("Apakah Anda ingin menghapus data ini?")){
        row = td.parentElement.parentElement;
        document.getElementById("goods-list").deleteRow(row.rowIndex);
        resetForm()
    }
}

function validate(){
    isValid = true;
    if(document.getElementById("namaBarang").value == ""){
        isValid = false;
        document.getElementById("goods-validation").classList.remove("hide")
    }else {
        isValid = true;
        if(!document.getElementById("goods-validation").classList.contains("hide"))
            document.getElementById("goods-validation").classList.add("hide")
    }
    return isValid;
}
