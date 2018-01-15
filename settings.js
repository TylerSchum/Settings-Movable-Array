let data = {
  "Options": {
    "Files": [
      {
        "ActionLists": {
          "Files": {
            "shtml": "ActionLists.shtml",
            "js": "javascript/ActionLists.js"
          },
          "Name": {
            "CommonName": "Action Lists",
            "CodeName": "ActionLists"
          },
          "Settings": {
            "Visible": "true",
            "AuthLevel": 2
          }
        }
      },
      {
        "Graph2": {
          "Files": {
            "shtml": "vXGraph2.shtml",
            "js": "javascript/widXGraph2.js"
          },
          "Name": {
            "CommonName": "Graph2",
            "CodeName": "Graph2"
          },
          "Settings": {
            "Visible": "true",
            "AuthLevel": 2
          }
        }
      },
      {
        "WiperCtl": {
          "Files": {
            "shtml": "vWiperCtl.shtml",
            "js": "javascript/widWiperCtl.js"
          },
          "Name": {
            "CommonName": "Wiper Controls",
            "CodeName": "WiperCtl"
          },
          "Settings": {
            "Visible": "true",
            "AuthLevel": 2
          }
        }
      },
      {
        "LampStatusTable": {
          "Files": {
            "shtml": "vLampStatusTable.shtml",
            "js": "javascript/widXLampStatusTable.js"
          },
          "Name": {
            "CommonName": "Lamp Status Table",
            "CodeName": "LampStatusTable"
          },
          "Settings": {
            "Visible": "true",
            "AuthLevel": 2
          }
        }
      },
      {
        "External": {
          "Files": {
            "shtml": "vExternal.shtml",
            "js": "javascript/widExternal.js"
          },
          "Name": {
            "CommonName": "External Data",
            "CodeName": "External"
          },
          "Settings": {
            "Visible": "true",
            "AuthLevel": 2
          }
        }
      },
      {
        "GraphBar": {
          "Files": {
            "shtml": "vXGraphBar.shtml",
            "js": "javascript/widXGraphBar2.js"
          },
          "Name": {
            "CommonName": "Bar Graph",
            "CodeName": "GraphBar"
          },
          "Settings": {
            "Visible": "true",
            "AuthLevel": 2
          }
        }
      }
    ]
  }
}

let strData = JSON.stringify(data);
let parsedData = JSON.parse(strData);
let files = parsedData.Options.Files;

files.forEach((element, index) => {
  let menu = Object.keys(element)[0];
  $(".btn-group-vertical").append(
    `<div class="menu-options btn btn-default" data="${element[menu].Name.CodeName}" data-index="${index}"><input type="checkbox" id="${element[menu].Name.CodeName}">${element[menu].Name.CommonName}<i class="glyphicon glyphicon-question-sign"</div>`);
});
$(".btn-group-vertical").on("click", ".menu-options", function() {
  $(".menu-options").removeClass("active");
  $(this).addClass("active");
  let curData = $(this).attr("data");
  let curIndex = $(this).attr("data-index");
  $(".arrow-up").addClass("disabled");
  $(".arrow-down").addClass("disabled");
  if (curIndex > 0) {
    $(".arrow-up").removeClass("disabled");
  }
  if (parseInt(curIndex) !== files.length - 1) {
    $(".arrow-down").removeClass("disabled");
  }
});

$(".arrow-up").click(function () {
  if (!($(".arrow-up").hasClass("disabled"))) {
    // grab data from currently selected div
    let curIndex = $(".btn-group-vertical .active").attr("data-index");
    let newIndex = parseInt(curIndex) - 1;
    var filesClone = parsedData.Options.Files.slice();
    filesClone.splice(curIndex, 1);
    filesClone.splice(newIndex, 0, parsedData.Options.Files[curIndex]);
    $(".btn-group-vertical").html("");
    parsedData.Options.Files = [];
    filesClone.forEach((element, index) => {
      let menu = Object.keys(element)[0];
      $(".btn-group-vertical").append(
        `<div class="menu-options btn btn-default" data="${element[menu].Name.CodeName}" data-index="${index}"><input type="checkbox" id="${element[menu].Name.CodeName}">${element[menu].Name.CommonName}<i class="glyphicon glyphicon-question-sign"</div>`);
        parsedData.Options.Files.push(element);
      });
    $(`div[data-index="${newIndex}"]`).addClass("active");
    $(".arrow-up").addClass("disabled");
    $(".arrow-down").addClass("disabled");
    if (newIndex > 0) {
      $(".arrow-up").removeClass("disabled");
    }
    if (parseInt(newIndex) !== files.length - 1) {
      $(".arrow-down").removeClass("disabled");
    }
  }
});

$(".arrow-down").click(function () {
  if (!($(".arrow-down").hasClass("disabled"))) {
    // grab data from currently selected div
    let curIndex = $(".btn-group-vertical .active").attr("data-index");
    let newIndex = parseInt(curIndex) + 1;
    var filesClone = parsedData.Options.Files.slice();
    filesClone.splice(curIndex, 1);
    filesClone.splice(newIndex, 0, parsedData.Options.Files[curIndex]);
    $(".btn-group-vertical").html("");
    parsedData.Options.Files = [];
    filesClone.forEach((element, index) => {
      let menu = Object.keys(element)[0];
      $(".btn-group-vertical").append(
        `<div class="menu-options btn btn-default" data="${element[menu].Name.CodeName}" data-index="${index}"><input type="checkbox" id="${element[menu].Name.CodeName}">${element[menu].Name.CommonName}<i class="glyphicon glyphicon-question-sign"></i></div>`);
      parsedData.Options.Files.push(element);
    });
    $(`div[data-index="${newIndex}"]`).addClass("active");
    $(".arrow-up").addClass("disabled");
    $(".arrow-down").addClass("disabled");
    if (newIndex > 0) {
      $(".arrow-up").removeClass("disabled");
    }
    if (parseInt(newIndex) !== files.length - 1) {
      $(".arrow-down").removeClass("disabled");
    }
  }
});

$(".btn-group-vertical").on("change", ".menu-options input[type='checkbox']", function(e){
  e.stopPropagation();
  let name = e.currentTarget.id;
  let targetIndex = parsedData.Options.Files.findIndex(obj => obj[name]);
  parsedData.Options.Files[targetIndex][name].Settings.Visible = `${e.currentTarget.checked}`;
});