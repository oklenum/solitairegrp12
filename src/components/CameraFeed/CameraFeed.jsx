import React, { useState, useEffect } from "react";
import test1 from '../../assets/test1.jpg';
import "./camerafeed.css"
import $ from 'jquery'

const CameraFeed = () => {

  $(function () {
    retrieveDefaultValuesFromLocalStorage();
    setupButtonListeners();
  });
  
  var infer = function () {
    $("#output").html("Inferring...");
    $("#resultContainer").show();
    $("html").scrollTop(100000);
  
    getSettingsFromForm(function (settings) {
      $.ajax(settings).then(function (response) {
        if (settings.format == "json") {
          var pretty = $("<pre>");
          var formatted = JSON.stringify(response, null, 4);
  
          pretty.html(formatted);
          $("#output").html("").append(pretty);
          $("html").scrollTop(100000);
        } else {
          var arrayBufferView = new Uint8Array(response);
          var blob = new Blob([arrayBufferView], {
            type: "image/jpeg"
          });
          var base64image = window.URL.createObjectURL(blob);
  
          var img = $("<img/>");
          img.get(0).onload = function () {
            $("html").scrollTop(100000);
          };
          img.attr("src", base64image);
          $("#output").html("").append(img);
        }
      });
    });
  };
  
  var retrieveDefaultValuesFromLocalStorage = function () {
    try {
      var access_token = localStorage.getItem("rf.access_token");
      var model = localStorage.getItem("rf.model");
      var format = localStorage.getItem("rf.format");
  
      if (access_token) $("#access_token").val(access_token);
      if (model) $("#model").val(model);
      if (format) $("#format").val(format);
    } catch (e) {
      // localStorage disabled
    }
  
    $("#model").change(function () {
      localStorage.setItem("rf.model", $(this).val());
    });
  
    $("#access_token").change(function () {
      localStorage.setItem("rf.access_token", $(this).val());
    });
  
    $("#format").change(function () {
      localStorage.setItem("rf.format", $(this).val());
    });
  };
  
  var setupButtonListeners = function () {
    // run inference when the form is submitted
    $("#inputForm").submit(function () {
      infer();
      return false;
    });
  
    // make the buttons blue when clicked
    // and show the proper "Select file" or "Enter url" state
    $(".bttn").click(function () {
      $(this).parent().find(".bttn").removeClass("active");
      $(this).addClass("active");
  
      if ($("#computerButton").hasClass("active")) {
        $("#fileSelectionContainer").show();
        $("#urlContainer").hide();
      } else {
        $("#fileSelectionContainer").hide();
        $("#urlContainer").show();
      }
  
      if ($("#jsonButton").hasClass("active")) {
        $("#imageOptions").hide();
      } else {
        $("#imageOptions").show();
      }
  
      return false;
    });
  
    // wire styled button to hidden file input
    $("#fileMock").click(function () {
      $("#file").click();
    });
  
    // grab the filename when a file is selected
    $("#file").change(function () {
      var path = $(this).val().replace(/\\/g, "/");
      var parts = path.split("/");
      var filename = parts.pop();
      $("#fileName").val(filename);
    });
  };
  
  var getSettingsFromForm = function (cb) {
    var settings = {
      method: "POST"
    };
  
    var parts = [
      "https://infer.roboflow.com/",
      $("#model").val(),
      "?access_token=" + $("#access_token").val()
    ];
  
    var classes = $("#classes").val();
    if (classes) parts.push("&classes=" + classes);
  
    var confidence = $("#confidence").val() / 100;
    if (confidence) parts.push("&confidence=" + confidence);
  
    var overlap = $("#overlap").val() / 100;
    if (overlap) parts.push("&overlap=" + overlap);
  
    var format = $("#format .active").attr("data-value");
    parts.push("&format=" + format);
    settings.format = format;
  
    if (format == "image") {
      var labels = $("#labels .active").attr("data-value");
      if (labels) parts.push("&labels=on");
  
      var stroke = $("#stroke .active").attr("data-value");
      if (stroke) parts.push("&stroke=" + stroke);
  
      settings.xhr = function () {
        var override = new XMLHttpRequest();
        override.responseType = "arraybuffer";
        return override;
      };
    }
  
    var method = $("#method .active").attr("data-value");
    if (method == "upload") {
      var file = $("#file").get(0).files && $("#file").get(0).files.item(0);
      if (!file) return alert("Please select a file.");
  
      getBase64fromFile(file).then(function (base64image) {
        settings.url = parts.join("");
        settings.data = base64image;
  
        console.log(settings);
        cb(settings);
      });
    } else {
      var url = $("#url").val();
      if (!url) return alert("Please enter an image URL");
  
      parts.push("&image=" + encodeURIComponent(url));
  
      settings.url = parts.join("");
      console.log(settings);
      cb(settings);
    }
  };
  
  var getBase64fromFile = function (file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function (error) {
        reject(error);
      };
    });
  };


  return (
    <>
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
    rel="stylesheet"
  />
  <link
    rel="stylesheet"
    href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
    integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
    crossOrigin="anonymous"
  />
  <form id="inputForm">
    <div className="header">
      <div className="header__grid">
        <img
          className="header__logo"
          src="https://uploads-ssl.webflow.com/5f6bc60e665f54545a1e52a5/6143750f1177056d60fc52d9_roboflow_logomark_inference.png"
          alt="Roboflow Inference"
        />
        <div>
          <label className="header__label" htmlFor="model">
            Model Name
          </label>
          <input className="input" type="text" id="model" />
        </div>
        <div>
          <label className="header__label" htmlFor="access_token">
            Access Token
          </label>
          <input className="input" type="text" id="access_token" />
        </div>
      </div>
    </div>
    <div className="content">
      <div className="content__grid">
        <div className="col-12-s6-m4" id="method">
          <label className="input__label">Upload Method</label>
          <div>
            <button
              data-value="upload"
              id="computerButton"
              className="bttn left fill active"
            >
              Upload
            </button>
            <button data-value="url" id="urlButton" className="bttn right fill">
              URL
            </button>
          </div>
        </div>
        <div className="col-12-m8" id="fileSelectionContainer">
          <label className="input__label" htmlFor="file">
            Select File
          </label>
          <div className="flex">
            <input
              className="input input--left flex-1"
              type="text"
              id="fileName"
              disabled=""
            />
            <button id="fileMock" className="bttn right active">
              Browse
            </button>
          </div>
          <input style={{ display: "none" }} type="file" id="file" />
        </div>
        <div className="col-12-m8" id="urlContainer">
          <label className="input__label" htmlFor="file">
            Enter Image URL
          </label>
          <div className="flex">
            <input
              type="text"
              id="url"
              placeholder="https://path.to/your.jpg"
              className="input"
            />
            <br />
          </div>
        </div>
        <div className="col-12-m6">
          <label className="input__label" htmlFor="classes">
            Filter Classes
          </label>
          <input
            type="text"
            id="classes"
            placeholder="Enter class names"
            className="input"
          />
          <br />
          <span className="text--small">Separate names with commas</span>
        </div>
        <div className="col-6-m3 relative">
          <label className="input__label" htmlFor="confidence">
            Min Confidence
          </label>
          <div>
            <i className="fas fa-crown" />
            <span className="icon">%</span>
            <input
              type="number"
              id="confidence"
              defaultValue={50}
              max={100}
              accuracy={2}
              min={0}
              className="input input__icon"
            />
          </div>
        </div>
        <div className="col-6-m3 relative">
          <label className="input__label" htmlFor="overlap">
            Max Overlap
          </label>
          <div>
            <i className="fas fa-object-ungroup" />
            <span className="icon">%</span>
            <input
              type="number"
              id="overlap"
              defaultValue={50}
              max={100}
              accuracy={2}
              min={0}
              className="input input__icon"
            />
          </div>
        </div>
        <div className="col-6-m3" id="format">
          <label className="input__label">Inference Result</label>
          <div>
            <button
              id="imageButton"
              data-value="image"
              className="bttn left fill active"
            >
              Image
            </button>
            <button
              id="jsonButton"
              data-value="json"
              className="bttn right fill"
            >
              JSON
            </button>
          </div>
        </div>
        <div className="col-12 content__grid" id="imageOptions">
          <div className="col-12-s6-m4" id="labels">
            <label className="input__label">Labels</label>
            <div>
              <button className="bttn left active">Off</button>
              <button data-value="on" className="bttn right">
                On
              </button>
            </div>
          </div>
          <div className="col-12-s6-m4" id="stroke">
            <label className="input__label">Stroke Width</label>
            <div>
              <button data-value={1} className="bttn left active">
                1px
              </button>
              <button data-value={2} className="bttn">
                2px
              </button>
              <button data-value={5} className="bttn">
                5px
              </button>
              <button data-value={10} className="bttn right">
                10px
              </button>
            </div>
          </div>
        </div>
        <div className="col-12">
          <button type="submit" value="Run Inference" className="bttn__primary">
            Run Inference
          </button>
        </div>
      </div>
      <div className="result" id="resultContainer">
        <div className="divider" />
        <div className="result__header">
          <h3 className="headline">Result</h3>
          <a href="#">Copy Code</a>
        </div>
        <pre id="output" className="codeblock">
          {" "}
          here is your json{" "}
        </pre>
      </div>
    </div>
  </form>
</>
  )
}

export default CameraFeed