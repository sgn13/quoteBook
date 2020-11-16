window.addEventListener('load', () => {

    const quotes = document.querySelector('.quotes')
    const writter = document.querySelector('.writter')

    const newQuotes = document.querySelector('.random button')

    fetch('https://type.fit/api/quotes')
        .then(response => response.json())
        .then(data => {

            var state = {
                'querySet': data,
                'page': 1,
                'rows': 10,
            }

            function pagination(querySet, page, rows) {
                var trimStart = (page - 1) * rows
                var trimEnd = trimStart + rows

                var trimedData = querySet.slice(trimStart, trimEnd)

                var pages = Math.ceil(querySet.length / rows)

                return {
                    'querySet': trimedData,
                    'pages': pages
                }
            }
            var DataList = pagination(state.querySet, state.page, state.rows)
            console.log(data);

            console.log(DataList);


            function pageButtons(pages) {
                console.log(pages);

                var wrapper = document.querySelector('.pagination-wrapper');
                wrapper.innerHTML = '';

                for (let page = 0; page <= pages; page++) {

                    wrapper.innerHTML += `<button value=${page} class="page-btn">${page}</button>`
                }
            }

            newQuotes.addEventListener('click', function () {


                console.log(data);

                quotes.classList.add("fade-in");
                const random = Math.floor(Math.random() * 1643);
                quotes.textContent = " ' " + data[random].text + " ' "
                writter.textContent = '-' + data[random].author
                setTimeout(() => {
                    quotes.classList.remove("fade-in");
                }, 500);
            })
            if (data.length > 0) {

                var size = 50;

                var temp = "";


                DataList.querySet.forEach(report => {
                    temp += "<tr>";
                    temp += "<td>" + report.text + "</td>";
                    temp += "<td>" + report.author + "</td>";
                    "</tr>";
                });


                var dat = document.getElementById('data-c');
                dat.innerHTML = temp;

                pageButtons(DataList.pages)

            }


        }
        );




    // Search ====================================================





})


function searchFunction() {
    var input = document.getElementById('myInput');
    console.log(input.value);

    var filter = input.value.toUpperCase();
    var table = document.getElementById('myTable');
    var tr = table.getElementsByTagName('tr');

    for (var i = 0; i < tr.length; i++) {
        var td = tr[i].getElementsByTagName('td')[0];
        if (td) {
            var txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            }
            else {
                tr[i].style.display = 'none';
            }
        }
    }

}
