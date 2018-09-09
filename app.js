
var URL = "http://starlord.hackerearth.com/movieslisting";
loadJSON(URL, success, error);
var resultArr = [];
var genresSet = new Set();
var languageSet = new Set();
var countrySet = new Set();
var titleYearSet = new Set();

function success(arg) {
    resultArr = arg;
    buildHtml();
}

function error(arg) {
    console.log(arg);
}
function loadJSON(URL, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", URL, true);
    xhr.send();
}


function buildHtml() {
    blockUi();
    register(resultArr);
    let genereSelect = document.getElementById('genres');
    let languageSelect = document.getElementById('language');
    let countrySelect = document.getElementById('country');
    for (let item of genresSet) {
        let opt = document.createElement('option');
        opt.value = item;
        opt.innerHTML = item;
        genereSelect.appendChild(opt);
    }

    for (let item of languageSet) {
        if (item == "")
            continue;
        let opt = document.createElement('option');
        opt.value = item;
        opt.innerHTML = item;
        languageSelect.appendChild(opt);
    }
    for (let item of countrySet) {
        if (item == "")
            continue;
        let opt = document.createElement('option');
        opt.value = item;
        opt.innerHTML = item;
        countrySelect.appendChild(opt);
    }

    showUi();
}

function genereSelect(value) {
    blockUi();
    if (value == "") return;
    let genresFilter = _.map(resultArr, function (o) {
        if (containsGenre(o.genres, value)) return o;
    });
    genresFilter = _.without(genresFilter, undefined)

    register(genresFilter);
    showUi();
}
function languageSelect(value) {
    blockUi();
    if (value == "") return;
    let languageFilter = _.map(resultArr, function (o) {
        if (o.language == value) return o;
    });
    languageFilter = _.without(languageFilter, undefined)

    register(languageFilter);
    showUi();
}
function countrySelect(value) {
    blockUi();
    if (value == "") return;
    let countryFilter = _.map(resultArr, function (o) {
        if (o.country == value) return o;
    });
    languageFilter = _.without(countryFilter, undefined)

    register(languageFilter);
    showUi();
}
function containsGenre(genres, value) {
    if (genres.includes("|")) {
        var gen = genres.split("|");
        for (var ob in gen) {
            if (value == gen[ob])
                return true;
        }
    } else {
        if (value == genres)
            return true;
    }
    return false;
}

function register(arr) {
    var printThis = "";
    var genres = "";
    var plot = "";

    for (var i = 0; i < arr.length; i++) {
        printThis += "<div class='row'>";
        printThis += "<div class='" + "col-1 grid-item'" + ">" + arr[i].movie_title + "</div>";
        printThis += "<div class='" + "col-1 grid-item'" + ">" + arr[i].director_name + "</div>";
        printThis += "<div class='" + "col-1 grid-item'" + ">" + arr[i].actor_1_name + "</div>";
        printThis += "<div class='" + "col-1 grid-item'" + ">" + arr[i].actor_2_name + "</div>";
        if (arr[i].genres.includes("|")) {
            var gen = arr[i].genres.split("|");
            for (var ob in gen) {
                genres += gen[ob] + " ";
                genresSet.add(gen[ob]);
            }
        } else {
            genres = arr[i].genres;
            genresSet.add(arr[i].genres);
        }
        printThis += "<div class='" + "col-1 grid-item'" + ">" + genres + "</div>";
        printThis += "<div class='" + "col-1 grid-item'" + ">" + arr[i].language + "</div>";
        languageSet.add(arr[i].language);
        printThis += "<div class='" + "col-1 grid-item'" + ">" + arr[i].country + "</div>";
        countrySet.add(arr[i].country);
        printThis += "<div class='" + "col-1 grid-item'" + ">" + arr[i].content_rating + "</div>";

        printThis += "<div class='" + "col-1 grid-item'" + ">" + arr[i].budget + "</div>";
        printThis += "<div class='" + "col-1 grid-item'" + ">" + arr[i].title_year + "</div>";
        titleYearSet.add(arr[i].title_year);

        if (arr[i].plot_keywords.includes("|")) {
            var plotArr = arr[i].plot_keywords.split("|");
            for (var ob in plotArr) {
                plot += plotArr[ob] + " ";
            }
        } else {
            plot = arr[i].plot_keywords;
        }
        printThis += "<div class='" + "col-1 grid-item'" + ">" + plot + "</div>";
        printThis += "<div class='" + "col-1 grid-item'" + ">" + arr[i].movie_imdb_link + "</div>";
        printThis += "</div>";
    }
    document.getElementById('ids').innerHTML = printThis;
}

function showUi() {
    let loader = document.getElementById('loader');
    loader.classList.remove("loader");
}
function blockUi() {
    let loader = document.getElementById('loader');
    loader.classList.add("loader");
}