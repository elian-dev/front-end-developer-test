let form = document.getElementById("product-form");
//console.log(form);

//Select tbody element
let table = document.querySelector("table tbody");

//Initialize data array
var data = [
    {
        id: 468,
        product: "Monitor",
        price: "100.00",
        iva: "21",
        total: "121.00",
        date: "12/13/2022"
    }
];

//On load, insert data into table
window.addEventListener("load", function() {
    insertProducts(data);

    //Add event listener to form submit
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        //Get form values
        const product = document.getElementById("product").value;
        let price = document.getElementById("price").value;
        price = parseFloat(price).toFixed(2);
        let iva = document.getElementById("iva").value;
        iva = iva !== "" ? parseFloat(iva).toFixed(2) : iva;

        //Validate form
        const validate = formValidate(product, price);

        if (validate.error) {
            console.log(validate.error);
            alert(validate.message);
        } else {
            //Calculate just in case that the validation is correct
            const total = (parseFloat(price) + parseFloat(iva))
            const date = new Date().toLocaleDateString();

            data.push({
                id: createId(),
                product,
                price,
                iva,
                total,
                date
            });

            //Insert data into table
            insertProducts(data);
        
            console.log("Form Submitted");
        }
    });
});

function insertProducts(data) {
    //Insert data into a row of the table.
    data = data.map((item) => {
        return `
        <tr>
            <td>${item.id}</td>
            <td>${item.product}</td>
            <td>${"$" + item.price}</td>
            <td>${item.iva + "%"}</td>
            <td>${"$" + item.total}</td>
            <td>${item.date}</td>
            <!-- ONCLICK EXEC deleteProduct  -->
            <td><button class="btn btn-delete" id="delete${item.id}" onclick="deleteProduct(${item.id})">Delete</button></td>
        </tr>
    `;
    });
    table.innerHTML = data.join("");

    //clear form
    form.reset();
}

function deleteProduct(id) {

    //Remove from data array
    data = data.filter((item) => {
        return item.id !== id;
    });

    //Remove from table
    let row = document.getElementById("delete" + id);
    console.log(row);

    //Update table
    insertProducts(data);
}

function formValidate(product, price) {
    //Some validations
    if (product === "") {
        console.log("Product Name can not be empty.");
        return {
            error: true,
            message: "Product Name can not be empty."
        }
    } else if (price === "" || price === "NaN") {
        console.log("Product Price can not be empty.");
        return {
            error: true,
            message: "Product Price can not be empty."
        }
    } else {
        return {
            error: false,
            message: "Form Validated"
        }
    }
}

//To create a random id between 1 and 999, not repeated
function createId() {
    let newId = Math.floor(Math.random() * 999) + 1;

    //Check if the id already exists
    data.forEach((item) => {
        if (item.id === newId) {
            newId = createId();
        }
    });

    return newId;
}